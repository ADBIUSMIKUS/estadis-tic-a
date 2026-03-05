/**
 * Suite Estadística Universitaria - Lógica Principal
 * Todos los comentarios están en español para mayor claridad.
 */

// --- CONFIGURACIÓN Y ESTADO ---
const traducciones = {
    es: {
        loading: "Cargando herramientas estadísticas...",
        language_title: "Idioma",
        viz_title: "Gráficos",
        nav_bar: "Barras",
        nav_line: "Líneas",
        nav_pareto: "Pareto",
        nav_ojiva: "Ojiva",
        nav_pie: "Circular",
        nav_pictogram: "Pictograma",
        tools_title: "Herramientas",
        nav_stats: "Tendencia Central",
        nav_freq: "Frecuencias",
        nav_prob: "Probabilidad",
        nav_tree: "Árbol",
        nav_sets: "Conjuntos",
        nav_random: "Aleatorios",
        custom_title: "Personalización",
        clear_history: "Borrar Historial",
        main_title: "Dashboard Estadístico",
        export_all: "Exportar",
        input_card_title: "Entrada de Datos",
        labels_input_label: "Etiquetas (Eje X)",
        data_input_label: "Valores (Eje Y)",
        process_btn: "Procesar Datos",
        alert_no_data: "Por favor ingresa datos válidos.",
        confirm_clear: "¿Borrar todo el historial?",
        history_empty: "Historial vacío",
        history_label: "Datos:"
    },
    ru: { /* Ruso - Simplificado */ },
    zh: { /* Chino - Simplificado */ },
    fr: { /* Francés - Simplificado */ }
};

const estado = {
    graficos: {},
    colorEjeX: '#3498db',
    colorEjeY: '#e74c3c',
    historial: JSON.parse(localStorage.getItem('historialEstadistico')) || [],
    idioma: localStorage.getItem('idiomaApp') || 'es'
};

// --- REFERENCIAS AL DOM ---
const dom = {
    entradaDatos: document.getElementById('data-input'),
    entradaEtiquetas: document.getElementById('labels-input'),
    selectores: {
        bar: document.getElementById('toggle-bar'),
        line: document.getElementById('toggle-line'),
        pareto: document.getElementById('toggle-pareto'),
        ojiva: document.getElementById('toggle-ojiva'),
        pie: document.getElementById('toggle-pie'),
        pictogram: document.getElementById('toggle-pictogram'),
        stats: document.getElementById('toggle-stats'),
        freq: document.getElementById('toggle-freq'),
        prob: document.getElementById('toggle-prob'),
        tree: document.getElementById('toggle-tree'),
        sets: document.getElementById('toggle-sets'),
        random: document.getElementById('toggle-random')
    },
    tarjetas: {
        bar: document.getElementById('card-bar'),
        line: document.getElementById('card-line'),
        pareto: document.getElementById('card-pareto'),
        ojiva: document.getElementById('card-ojiva'),
        pie: document.getElementById('card-pie'),
        pictogram: document.getElementById('card-pictogram'),
        stats: document.getElementById('card-stats'),
        freq: document.getElementById('card-freq'),
        prob: document.getElementById('card-prob'),
        tree: document.getElementById('card-tree'),
        sets: document.getElementById('card-sets'),
        random: document.getElementById('card-random')
    },
    overlayCarga: document.getElementById('loading-overlay'),
    listaHistorial: document.getElementById('history-list'),
    selectorIdioma: document.getElementById('language-selector'),
    pickerX: document.getElementById('primary-color-picker'),
    pickerY: document.getElementById('secondary-color-picker')
};

// --- INICIALIZACIÓN ---
window.addEventListener('load', () => {
    aplicarIdioma();
    dom.selectorIdioma.value = estado.idioma;
    
    // Configurar valores iniciales de pickers
    dom.pickerX.value = estado.colorEjeX;
    dom.pickerY.value = estado.colorEjeY;

    // Ocultar pantalla de carga
    setTimeout(() => {
        dom.overlayCarga.style.opacity = '0';
        setTimeout(() => dom.overlayCarga.remove(), 500);
    }, 800);

    configurarEventos();
    actualizarVisibilidad();
});

function configurarEventos() {
    // Botón procesar
    document.getElementById('process-btn').addEventListener('click', procesarInformacion);
    
    // Cambios de color
    dom.pickerX.addEventListener('input', (e) => {
        estado.colorEjeX = e.target.value;
        if(dom.entradaDatos.value) procesarInformacion();
    });

    dom.pickerY.addEventListener('input', (e) => {
        estado.colorEjeY = e.target.value;
        if(dom.entradaDatos.value) procesarInformacion();
    });

    // Cambio de idioma
    dom.selectorIdioma.addEventListener('change', (e) => {
        estado.idioma = e.target.value;
        localStorage.setItem('idiomaApp', estado.idioma);
        aplicarIdioma();
        if(dom.entradaDatos.value) procesarInformacion();
    });

    // Código Konami
    detectarKonami();
}

function aplicarIdioma() {
    const d = traducciones[estado.idioma] || traducciones['es'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(d[key]) el.innerText = d[key];
    });
}

function actualizarVisibilidad() {
    Object.keys(dom.selectores).forEach(key => {
        if(dom.selectores[key].checked) dom.tarjetas[key].classList.remove('hidden');
        else dom.tarjetas[key].classList.add('hidden');
    });
}

// --- LÓGICA DE PROCESAMIENTO ---
function procesarInformacion() {
    const rawData = dom.entradaDatos.value;
    const rawLabels = dom.entradaEtiquetas.value;

    if(!rawData) return alert(traducciones[estado.idioma].alert_no_data || "Ingrese datos");

    // Limpiar y convertir datos
    const datos = rawData.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    const etiquetas = rawLabels ? rawLabels.split(',').map(s => s.trim()) : datos.map((_, i) => `D${i+1}`);

    // Cálculos estadísticos
    calcularTendenciaCentral(datos);
    generarTablaFrecuencias(datos);
    
    // Renderizar Gráficos
    if(dom.selectores.bar.checked) renderizarChart('bar', 'canvas-bar', datos, etiquetas);
    if(dom.selectores.line.checked) renderizarChart('line', 'canvas-line', datos, etiquetas);
    if(dom.selectores.pie.checked) renderizarChart('pie', 'canvas-pie', datos, etiquetas);
    if(dom.selectores.pareto.checked) renderizarPareto(datos, etiquetas);
    if(dom.selectores.ojiva.checked) renderizarOjiva(datos, etiquetas);
    if(dom.selectores.pictogram.checked) renderizarPictograma(datos, etiquetas);

    // Herramientas extras
    if(dom.selectores.tree.checked) dibujarArbol();
    if(dom.selectores.sets.checked) calcularConjuntos();
    if(dom.selectores.prob.checked) calcularProbabilidades();

    guardarHistorial(rawData, rawLabels);
}

// --- CÁLCULOS ESTADÍSTICOS ---
function calcularTendenciaCentral(datos) {
    const n = datos.length;
    const suma = datos.reduce((a, b) => a + b, 0);
    const media = suma / n;

    // Mediana
    const ordenados = [...datos].sort((a,b) => a-b);
    const mitad = Math.floor(n / 2);
    const mediana = n % 2 !== 0 ? ordenados[mitad] : (ordenados[mitad - 1] + ordenados[mitad]) / 2;

    // Moda
    const frec = {};
    datos.forEach(d => frec[d] = (frec[d] || 0) + 1);
    const maxFrec = Math.max(...Object.values(frec));
    const modas = Object.keys(frec).filter(d => frec[d] === maxFrec);

    document.getElementById('res-mean').innerText = media.toFixed(2);
    document.getElementById('res-median').innerText = mediana.toFixed(2);
    document.getElementById('res-mode').innerText = modas.length > 3 ? "Multimodal" : modas.join(', ');
    document.getElementById('res-max').innerText = Math.max(...datos);
    document.getElementById('res-min').innerText = Math.min(...datos);
}

// --- GRÁFICOS ESPECIALIZADOS ---
function renderizarPareto(datos, etiquetas) {
    const ctx = document.getElementById('canvas-pareto').getContext('2d');
    
    let items = datos.map((v, i) => ({ val: v, label: etiquetas[i] }));
    items.sort((a, b) => b.val - a.val);

    const labelsSort = items.map(i => i.label);
    const dataSort = items.map(i => i.val);
    const total = dataSort.reduce((a, b) => a + b, 0);
    
    let sumaAcum = 0;
    const porcentajes = dataSort.map(v => {
        sumaAcum += v;
        return (sumaAcum / total) * 100;
    });

    destruirGrafico('canvas-pareto');
    estado.graficos['canvas-pareto'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelsSort,
            datasets: [
                { label: 'Frecuencia', data: dataSort, backgroundColor: '#3498db', yAxisID: 'y' },
                { label: '% Acumulado', data: porcentajes, type: 'line', borderColor: '#e74c3c', yAxisID: 'y1', tension: 0.3 }
            ]
        },
        options: { 
            scales: { 
                y: { 
                    beginAtZero: true, 
                    position: 'left',
                    grid: { color: estado.colorEjeY },
                    ticks: { color: estado.colorEjeY }
                },
                y1: { 
                    max: 100, 
                    position: 'right', 
                    grid: { display: false },
                    ticks: { color: estado.colorEjeY }
                },
                x: {
                    grid: { color: estado.colorEjeX },
                    ticks: { color: estado.colorEjeX }
                }
            }
        }
    });
}

function renderizarOjiva(datos, etiquetas) {
    const ctx = document.getElementById('canvas-ojiva').getContext('2d');
    const ordenados = [...datos].sort((a,b) => a-b);
    let suma = 0;
    const acumulado = ordenados.map(v => {
        suma += v;
        return suma;
    });

    destruirGrafico('canvas-ojiva');
    estado.graficos['canvas-ojiva'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ordenados.map(v => v.toString()),
            datasets: [{
                label: 'Frecuencia Acumulada (Ojiva)',
                data: acumulado,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                fill: true,
                stepped: true
            }]
        },
        options: {
            scales: {
                x: {
                    grid: { color: estado.colorEjeX },
                    ticks: { color: estado.colorEjeX }
                },
                y: {
                    grid: { color: estado.colorEjeY },
                    ticks: { color: estado.colorEjeY }
                }
            }
        }
    });
}

// --- CÓDIGO KONAMI ---
function detectarKonami() {
    const codigo = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
    let indice = 0;

    document.addEventListener('keydown', (e) => {
        if(e.key === codigo[indice]) {
            indice++;
            if(indice === codigo.length) {
                document.getElementById('konami-modal').classList.remove('hidden');
                indice = 0;
            }
        } else {
            indice = 0;
        }
    });
}

// --- FUNCIONES DE SOPORTE ---
function renderizarChart(tipo, canvasId, datos, etiquetas) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    destruirGrafico(canvasId);
    
    estado.graficos[canvasId] = new Chart(ctx, {
        type: tipo,
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Datos',
                data: datos,
                backgroundColor: tipo === 'pie' ? generarColores(datos.length) : '#3498db',
                borderColor: '#e74c3c',
                borderWidth: 1
            }]
        },
        options: {
            scales: tipo !== 'pie' ? {
                x: {
                    grid: { color: estado.colorEjeX },
                    ticks: { color: estado.colorEjeX }
                },
                y: {
                    grid: { color: estado.colorEjeY },
                    ticks: { color: estado.colorEjeY }
                }
            } : {}
        }
    });
}

function destruirGrafico(id) {
    if(estado.graficos[id]) estado.graficos[id].destroy();
}

function generarColores(n) {
    return Array.from({length: n}, (_, i) => `hsl(${(i * 360) / n}, 70%, 60%)`);
}

// --- HERRAMIENTAS ADICIONALES ---
function calcularConjuntos() {
    const a = new Set(document.getElementById('set-a').value.split(',').map(v => v.trim()));
    const b = new Set(document.getElementById('set-b').value.split(',').map(v => v.trim()));

    const union = new Set([...a, ...b]);
    const inter = new Set([...a].filter(x => b.has(x)));
    const diff = new Set([...a].filter(x => !b.has(x)));

    document.getElementById('res-union').innerText = `{ ${[...union].join(', ')} }`;
    document.getElementById('res-inter').innerText = `{ ${[...inter].join(', ')} }`;
    document.getElementById('res-diff').innerText = `{ ${[...diff].join(', ')} }`;
}

function calcularProbabilidades() {
    const pa = parseFloat(document.getElementById('prob-pa').value) || 0;
    const pb = parseFloat(document.getElementById('prob-pb').value) || 0;
    const n = parseInt(document.getElementById('prob-n').value) || 0;
    const r = parseInt(document.getElementById('prob-r').value) || 0;

    // Regla Multiplicativa (Independiente)
    document.getElementById('res-multi').innerText = (pa * pb).toFixed(4);

    const fact = (num) => (num <= 1 ? 1 : num * fact(num - 1));
    
    if(n >= r) {
        document.getElementById('res-fact').innerText = fact(n).toLocaleString();
        document.getElementById('res-perm').innerText = (fact(n) / fact(n - r)).toLocaleString();
        document.getElementById('res-comb').innerText = (fact(n) / (fact(r) * fact(n - r))).toLocaleString();
    }
}

function dibujarArbol() {
    const container = document.getElementById('tree-visualizer');
    container.innerHTML = "Inicio\n ├── A (P: 0.5)\n │   ├── Éxito\n │   └── Fracaso\n └── B (P: 0.5)\n     ├── Éxito\n     └── Fracaso";
}

function generateRandom() {
    const n = parseInt(document.getElementById('rand-n').value) || 10;
    const min = parseInt(document.getElementById('rand-min').value) || 0;
    const max = parseInt(document.getElementById('rand-max').value) || 100;
    
    const vals = Array.from({length: n}, () => Math.floor(Math.random() * (max - min + 1)) + min);
    dom.entradaDatos.value = vals.join(', ');
    procesarInformacion();
}

function renderizarPictograma(datos, etiquetas) {
    const container = document.getElementById('pictogram-container');
    container.innerHTML = '';
    datos.forEach((v, i) => {
        const row = document.createElement('div');
        row.innerHTML = `<strong>${etiquetas[i]}:</strong> ` + '👤'.repeat(Math.min(Math.floor(v), 50));
        container.appendChild(row);
    });
}

function generarTablaFrecuencias(datos) {
    const tbody = document.querySelector('#freq-table tbody');
    tbody.innerHTML = '';
    const sorted = [...datos].sort((a,b) => a-b);
    const n = sorted.length;
    const fAbs = {};
    sorted.forEach(v => fAbs[v] = (fAbs[v] || 0) + 1);

    let acum = 0;
    Object.keys(fAbs).forEach(x => {
        const f = fAbs[x];
        acum += f;
        const row = `<tr><td>${x}</td><td>${f}</td><td>${acum}</td><td>${(f/n).toFixed(2)}</td><td>${(acum/n).toFixed(2)}</td></tr>`;
        tbody.innerHTML += row;
    });
}

function guardarHistorial(d, l) {
    const entry = { date: new Date().toLocaleTimeString(), d, l };
    estado.historial.unshift(entry);
    if(estado.historial.length > 5) estado.historial.pop();
    localStorage.setItem('historialEstadistico', JSON.stringify(estado.historial));
}

// Exportación global (Simple)
window.exportAll = async (type) => {
    const el = document.getElementById('dashboard-grid');
    const canvas = await html2canvas(el);
    if(type === 'png') {
        const a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.download = 'dashboard.png';
        a.click();
    } else {
        const pdf = new jspdf.jsPDF('l', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 280, 150);
        pdf.save('dashboard.pdf');
    }
};
