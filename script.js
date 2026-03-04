// --- Configuración y Estado Global ---
const state = {
    charts: {},
    primaryColor: '#3498db',
    secondaryColor: '#e74c3c',
    history: JSON.parse(localStorage.getItem('statsHistory')) || []
};

// Referencias DOM
const dom = {
    dataInput: document.getElementById('data-input'),
    labelsInput: document.getElementById('labels-input'),
    toggles: {
        bar: document.getElementById('toggle-bar'),
        line: document.getElementById('toggle-line'),
        scatter: document.getElementById('toggle-scatter'),
        pie: document.getElementById('toggle-pie'),
        pictogram: document.getElementById('toggle-pictogram'),
        freq: document.getElementById('toggle-freq'),
        venn: document.getElementById('toggle-venn'),
        prob: document.getElementById('toggle-prob')
    },
    cards: {
        bar: document.getElementById('card-bar'),
        line: document.getElementById('card-line'),
        scatter: document.getElementById('card-scatter'),
        pie: document.getElementById('card-pie'),
        pictogram: document.getElementById('card-pictogram'),
        freq: document.getElementById('card-freq'),
        venn: document.getElementById('card-venn'),
        prob: document.getElementById('card-prob')
    },
    historyList: document.getElementById('history-list'),
    loadingOverlay: document.getElementById('loading-overlay')
};

// --- Inicialización ---
window.addEventListener('load', () => {
    // Simular carga
    setTimeout(() => {
        dom.loadingOverlay.style.opacity = '0';
        setTimeout(() => dom.loadingOverlay.remove(), 500);
    }, 1000);

    renderHistory();
    setupEventListeners();
    updateVisibility();
});

function setupEventListeners() {
    document.getElementById('process-btn').addEventListener('click', processData);
    document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
    document.getElementById('history-btn').addEventListener('click', () => {
        dom.historyList.classList.toggle('hidden');
    });

    // Color Pickers
    document.getElementById('primary-color-picker').addEventListener('input', (e) => {
        state.primaryColor = e.target.value;
        updateAllCharts();
    });
    document.getElementById('secondary-color-picker').addEventListener('input', (e) => {
        state.secondaryColor = e.target.value;
        updateAllCharts();
    });

    // Toggles
    Object.keys(dom.toggles).forEach(key => {
        dom.toggles[key].addEventListener('change', updateVisibility);
    });
}

function updateVisibility() {
    Object.keys(dom.toggles).forEach(key => {
        if (dom.toggles[key].checked) {
            dom.cards[key].classList.remove('hidden');
        } else {
            dom.cards[key].classList.add('hidden');
        }
    });
}

// --- Procesamiento de Datos ---
function processData() {
    const rawData = dom.dataInput.value;
    const rawLabels = dom.labelsInput.value;
    
    if (!rawData) return alert('Por favor ingresa algunos datos.');

    const data = rawData.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    const labels = rawLabels ? rawLabels.split(',').map(s => s.trim()) : data.map((_, i) => `Dato ${i+1}`);

    addToHistory(rawData, rawLabels);
    
    // Actualizar todas las visualizaciones activas
    if(dom.toggles.bar.checked) updateChart('bar', 'canvas-bar', data, labels);
    if(dom.toggles.line.checked) updateChart('line', 'canvas-line', data, labels);
    if(dom.toggles.scatter.checked) updateChart('scatter', 'canvas-scatter', data, labels);
    if(dom.toggles.pie.checked) updateChart('pie', 'canvas-pie', data, labels);
    if(dom.toggles.pictogram.checked) updatePictogram(data, labels);
    if(dom.toggles.freq.checked) generateFrequencyTable(data);
    
    // Herramientas independientes
    if(dom.toggles.venn.checked) drawVenn(); // Usa sus propios inputs
    if(dom.toggles.prob.checked) calcProbability(); // Usa sus propios inputs
}

// --- Gráficos (Chart.js) ---
function updateChart(type, canvasId, data, labels) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Destruir gráfico existente si hay
    if (state.charts[canvasId]) {
        state.charts[canvasId].destroy();
    }

    let config = {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: 'Valores',
                data: type === 'scatter' ? data.map((v, i) => ({x: i, y: v})) : data,
                backgroundColor: type === 'pie' ? generateColors(data.length) : state.primaryColor,
                borderColor: state.secondaryColor,
                borderWidth: 1,
                fill: type === 'line'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    };

    state.charts[canvasId] = new Chart(ctx, config);
}

function updateAllCharts() {
    // Re-renderizar gráficos con nuevos colores sin cambiar datos (si existen)
    processData(); 
}

function generateColors(count) {
    const colors = [];
    for(let i=0; i<count; i++) {
        colors.push(`hsl(${(i * 360) / count}, 70%, 60%)`);
    }
    return colors;
}

// --- Pictograma ---
function updatePictogram(data, labels) {
    const container = document.getElementById('pictogram-container');
    container.innerHTML = '';
    
    data.forEach((val, i) => {
        const row = document.createElement('div');
        row.style.margin = '10px 0';
        row.style.fontSize = '1.5rem';
        row.style.color = state.primaryColor;
        
        const label = document.createElement('strong');
        label.innerText = (labels[i] || `Dato ${i+1}`) + ': ';
        label.style.marginRight = '10px';
        label.style.color = '#333';
        label.style.fontSize = '1rem';
        
        row.appendChild(label);
        
        // Limitar iconos para rendimiento
        const count = Math.min(Math.floor(val), 50); 
        for(let j=0; j<count; j++) {
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-user'; // Icono FontAwesome
            icon.style.marginRight = '2px';
            row.appendChild(icon);
        }
        
        if (val > 50) {
            const more = document.createElement('span');
            more.innerText = ' ...';
            row.appendChild(more);
        }

        container.appendChild(row);
    });
}

// --- Tabla de Frecuencias ---
function generateFrequencyTable(data) {
    const tbody = document.querySelector('#freq-table tbody');
    tbody.innerHTML = '';
    
    // Ordenar datos
    const sorted = [...data].sort((a,b) => a - b);
    const n = sorted.length;
    
    // Calcular frecuencias
    const map = {};
    sorted.forEach(x => map[x] = (map[x] || 0) + 1);
    
    let cumulativeFreq = 0;
    let cumulativeRelFreq = 0;

    Object.keys(map).sort((a,b) => parseFloat(a)-parseFloat(b)).forEach(key => {
        const freqAbs = map[key];
        cumulativeFreq += freqAbs;
        const freqRel = freqAbs / n;
        cumulativeRelFreq += freqRel;

        const row = `
            <tr>
                <td>${key}</td>
                <td>${freqAbs}</td>
                <td>${cumulativeFreq}</td>
                <td>${freqRel.toFixed(4)}</td>
                <td>${cumulativeRelFreq.toFixed(4)}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// --- Diagrama de Venn (Lógica Visual) ---
function drawVenn() {
    const a = parseFloat(document.getElementById('venn-a').value) || 0;
    const b = parseFloat(document.getElementById('venn-b').value) || 0;
    const ab = parseFloat(document.getElementById('venn-ab').value) || 0;

    // Actualizar etiquetas
    document.getElementById('label-a').innerText = a;
    document.getElementById('label-b').innerText = b;
    document.getElementById('label-ab').innerText = ab;

    // Ajustar superposición visual (simple)
    const circleA = document.querySelector('.circle-a');
    const circleB = document.querySelector('.circle-b');
    
    // Cambiar colores dinámicamente
    circleA.style.backgroundColor = state.primaryColor;
    circleB.style.backgroundColor = state.secondaryColor;
}

// --- Probabilidad ---
function calcProbability() {
    const n = parseInt(document.getElementById('prob-n').value);
    const r = parseInt(document.getElementById('prob-r').value);

    function factorial(num) {
        if (num < 0) return -1;
        if (num == 0) return 1;
        return num * factorial(num - 1);
    }

    const nFact = factorial(n);
    const pResult = factorial(n) / factorial(n - r);
    const cResult = factorial(n) / (factorial(r) * factorial(n - r));

    document.getElementById('res-factorial').innerText = nFact.toLocaleString();
    document.getElementById('res-permutation').innerText = pResult.toLocaleString();
    document.getElementById('res-combination').innerText = cResult.toLocaleString();
}

// --- Historial (LocalStorage) ---
function addToHistory(dataStr, labelsStr) {
    const entry = {
        date: new Date().toLocaleString(),
        data: dataStr,
        labels: labelsStr
    };
    
    // Evitar duplicados consecutivos
    if (state.history.length > 0 && state.history[0].data === dataStr) return;

    state.history.unshift(entry);
    if (state.history.length > 10) state.history.pop(); // Mantener solo 10
    
    localStorage.setItem('statsHistory', JSON.stringify(state.history));
    renderHistory();
}

function renderHistory() {
    dom.historyList.innerHTML = '';
    if (state.history.length === 0) {
        dom.historyList.innerHTML = '<p class="empty-msg">Sin historial</p>';
        return;
    }

    state.history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <strong>Datos:</strong> ${item.data.substring(0, 20)}...
            <small>${item.date}</small>
        `;
        div.onclick = () => {
            dom.dataInput.value = item.data;
            dom.labelsInput.value = item.labels;
            processData();
            dom.historyList.classList.add('hidden');
        };
        dom.historyList.appendChild(div);
    });
}

function clearHistory() {
    if(confirm('¿Borrar todo el historial?')) {
        state.history = [];
        localStorage.removeItem('statsHistory');
        renderHistory();
    }
}

// --- Exportación ---
window.exportAll = async (type) => {
    // Seleccionar el área visible del dashboard
    const element = document.getElementById('dashboard-grid');
    
    if (type === 'png') {
        const canvas = await html2canvas(element);
        const link = document.createElement('a');
        link.download = 'dashboard-estadistico.png';
        link.href = canvas.toDataURL();
        link.click();
    } else if (type === 'pdf') {
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
            orientation: 'landscape',
        });
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('dashboard-estadistico.pdf');
    }
};

window.exportTableToExcel = (tableId) => {
    const table = document.getElementById(tableId);
    const wb = XLSX.utils.table_to_book(table, {sheet: "Frecuencias"});
    XLSX.writeFile(wb, 'tabla_frecuencias.xlsx');
};

window.exportElement = async (elementId, name) => {
    const element = document.getElementById(elementId);
    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.download = `${name}.png`;
    link.href = canvas.toDataURL();
    link.click();
};

// Eventos para botones de descarga individuales en gráficos
document.querySelectorAll('.download-chart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target');
        const canvas = document.getElementById(targetId);
        const link = document.createElement('a');
        link.download = `grafico-${targetId}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
});
