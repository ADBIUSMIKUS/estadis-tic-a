// --- Configuración y Estado Global ---
const translations = {
    es: {
        loading: "Cargando herramientas estadísticas...",
        language_title: "Idioma",
        viz_title: "Visualización",
        nav_bar: "Barras",
        nav_line: "Líneas",
        nav_scatter: "Dispersión",
        nav_pie: "Circular (Pie)",
        nav_pictogram: "Pictograma",
        tools_title: "Herramientas",
        nav_freq: "Tabla de Frecuencias",
        nav_prob: "Probabilidad",
        custom_title: "Personalización",
        color_primary: "Color Principal:",
        color_secondary: "Color Secundario:",
        clear_history: "Borrar Historial",
        main_title: "Dashboard Estadístico",
        export_all: "Exportar Todo",
        export_img: "Imagen (PNG)",
        input_card_title: "Entrada de Datos",
        history_empty: "Sin historial reciente",
        labels_input_label: "Etiquetas (eje X / Categorías)",
        labels_placeholder: "Ej: Ene, Feb, Mar, Abr",
        data_input_label: "Valores Numéricos (eje Y / Frecuencias)",
        data_placeholder: "Ej: 10, 20, 15, 30",
        process_btn: "Procesar Datos",
        chart_bar: "Gráfico de Barras",
        chart_line: "Gráfico de Líneas",
        chart_scatter: "Diagrama de Dispersión",
        chart_pie: "Gráfico Circular",
        chart_pictogram: "Pictograma",
        tool_freq: "Tabla de Frecuencias",
        table_class: "Clase (x)",
        table_abs: "Frec. Absoluta (f)",
        table_acc: "Frec. Acumulada (F)",
        table_rel: "Frec. Relativa (fr)",
        table_rel_acc: "Frec. Rel. Acum. (Fr)",
        tool_prob: "Calculadora de Probabilidad",
        prob_n: "n (Total)",
        prob_r: "r (Selección)",
        prob_fact: "Factorial (n!)",
        prob_perm: "Permutación P(n,r)",
        prob_comb: "Combinación C(n,r)",
        prob_calc_btn: "Calcular",
        alert_no_data: "Por favor ingresa algunos datos.",
        confirm_clear: "¿Borrar todo el historial?",
        history_label: "Datos:"
    },
    ru: {
        loading: "Загрузка статистических инструментов...",
        language_title: "Язык",
        viz_title: "Визуализация",
        nav_bar: "Столбчатая",
        nav_line: "Линейная",
        nav_scatter: "Рассеяние",
        nav_pie: "Круговая",
        nav_pictogram: "Пиктограмма",
        tools_title: "Инструменты",
        nav_freq: "Таблица частот",
        nav_prob: "Вероятность",
        custom_title: "Персонализация",
        color_primary: "Основной цвет:",
        color_secondary: "Вторичный цвет:",
        clear_history: "Очистить историю",
        main_title: "Статистическая панель",
        export_all: "Экспорт всего",
        export_img: "Изображение (PNG)",
        input_card_title: "Ввод данных",
        history_empty: "Нет недавней истории",
        labels_input_label: "Метки (ось X / Категории)",
        labels_placeholder: "Напр: Янв, Фев, Мар",
        data_input_label: "Числовые значения (ось Y)",
        data_placeholder: "Напр: 10, 20, 15",
        process_btn: "Обработать данные",
        chart_bar: "Столбчатая диаграмма",
        chart_line: "Линейный график",
        chart_scatter: "Диаграмма рассеяния",
        chart_pie: "Круговая диаграмма",
        chart_pictogram: "Пиктограмма",
        tool_freq: "Таблица частот",
        table_class: "Класс (x)",
        table_abs: "Абс. частота (f)",
        table_acc: "Накоп. частота (F)",
        table_rel: "Отн. частота (fr)",
        table_rel_acc: "Накоп. отн. част. (Fr)",
        tool_prob: "Калькулятор вероятностей",
        prob_n: "n (Всего)",
        prob_r: "r (Выбор)",
        prob_fact: "Факториал (n!)",
        prob_perm: "Перестановка P(n,r)",
        prob_comb: "Сочетание C(n,r)",
        prob_calc_btn: "Вычислить",
        alert_no_data: "Пожалуйста, введите данные.",
        confirm_clear: "Очистить всю историю?",
        history_label: "Данные:"
    },
    zh: {
        loading: "正在加载统计工具...",
        language_title: "语言",
        viz_title: "可视化",
        nav_bar: "柱状图",
        nav_line: "折线图",
        nav_scatter: "散点图",
        nav_pie: "饼图",
        nav_pictogram: "象形图",
        tools_title: "工具",
        nav_freq: "频数表",
        nav_prob: "概率",
        custom_title: "个性化",
        color_primary: "主色调:",
        color_secondary: "辅助色:",
        clear_history: "清除历史记录",
        main_title: "统计仪表板",
        export_all: "导出全部",
        export_img: "图片 (PNG)",
        input_card_title: "数据输入",
        history_empty: "无最近记录",
        labels_input_label: "标签 (X轴 / 类别)",
        labels_placeholder: "例如: 一月, 二月, 三月",
        data_input_label: "数值 (Y轴 / 频数)",
        data_placeholder: "例如: 10, 20, 15",
        process_btn: "处理数据",
        chart_bar: "柱状图",
        chart_line: "折线图",
        chart_scatter: "散点图",
        chart_pie: "饼图",
        chart_pictogram: "象形图",
        tool_freq: "频数表",
        table_class: "组别 (x)",
        table_abs: "频数 (f)",
        table_acc: "累积频数 (F)",
        table_rel: "相对频数 (fr)",
        table_rel_acc: "累积相对频数 (Fr)",
        tool_prob: "概率计算器",
        prob_n: "n (总数)",
        prob_r: "r (选择)",
        prob_fact: "阶乘 (n!)",
        prob_perm: "排列 P(n,r)",
        prob_comb: "组合 C(n,r)",
        prob_calc_btn: "计算",
        alert_no_data: "请输入一些数据。",
        confirm_clear: "确定清除所有历史记录吗？",
        history_label: "数据:"
    },
    fr: {
        loading: "Chargement des outils statistiques...",
        language_title: "Langue",
        viz_title: "Visualisation",
        nav_bar: "Barres",
        nav_line: "Lignes",
        nav_scatter: "Dispersion",
        nav_pie: "Circulaire (Pie)",
        nav_pictogram: "Pictogramme",
        tools_title: "Outils",
        nav_freq: "Tableau de Fréquences",
        nav_prob: "Probabilité",
        custom_title: "Personnalisation",
        color_primary: "Couleur Principale :",
        color_secondary: "Couleur Secondaire :",
        clear_history: "Effacer l'Historique",
        main_title: "Tableau de Bord Statistique",
        export_all: "Tout Exporter",
        export_img: "Image (PNG)",
        input_card_title: "Saisie de Données",
        history_empty: "Aucun historique récent",
        labels_input_label: "Étiquettes (axe X / Catégories)",
        labels_placeholder: "Ex: Jan, Fév, Mar",
        data_input_label: "Valeurs Numériques (axe Y)",
        data_placeholder: "Ex: 10, 20, 15",
        process_btn: "Traiter les Données",
        chart_bar: "Graphique à Barres",
        chart_line: "Graphique Linéaire",
        chart_scatter: "Nuage de Points",
        chart_pie: "Graphique Circulaire",
        chart_pictogram: "Pictogramme",
        tool_freq: "Tableau de Fréquences",
        table_class: "Classe (x)",
        table_abs: "Fréq. Absolue (f)",
        table_acc: "Fréq. Cumulée (F)",
        table_rel: "Fréq. Relative (fr)",
        table_rel_acc: "Fréq. Rel. Cum. (Fr)",
        tool_prob: "Calculateur de Probabilité",
        prob_n: "n (Total)",
        prob_r: "r (Sélection)",
        prob_fact: "Factorielle (n!)",
        prob_perm: "Permutation P(n,r)",
        prob_comb: "Combinaison C(n,r)",
        prob_calc_btn: "Calculer",
        alert_no_data: "Veuillez saisir des données.",
        confirm_clear: "Effacer tout l'historique ?",
        history_label: "Données :"
    }
};

const state = {
    charts: {},
    primaryColor: '#3498db',
    secondaryColor: '#e74c3c',
    history: JSON.parse(localStorage.getItem('statsHistory')) || [],
    lang: localStorage.getItem('statsLang') || 'es'
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
        prob: document.getElementById('toggle-prob')
    },
    cards: {
        bar: document.getElementById('card-bar'),
        line: document.getElementById('card-line'),
        scatter: document.getElementById('card-scatter'),
        pie: document.getElementById('card-pie'),
        pictogram: document.getElementById('card-pictogram'),
        freq: document.getElementById('card-freq'),
        prob: document.getElementById('card-prob')
    },
    historyList: document.getElementById('history-list'),
    loadingOverlay: document.getElementById('loading-overlay'),
    langSelector: document.getElementById('language-selector')
};

// --- Inicialización ---
window.addEventListener('load', () => {
    // Aplicar idioma guardado
    dom.langSelector.value = state.lang;
    updateLanguage();

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

    // Language Selector
    dom.langSelector.addEventListener('change', (e) => {
        state.lang = e.target.value;
        localStorage.setItem('statsLang', state.lang);
        updateLanguage();
        if (dom.dataInput.value) processData(); // Refrescar tablas con nuevos encabezados
    });

    // Toggles
    Object.keys(dom.toggles).forEach(key => {
        dom.toggles[key].addEventListener('change', updateVisibility);
    });
}

function updateLanguage() {
    const langData = translations[state.lang];
    
    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langData[key]) {
            el.innerText = langData[key];
        }
    });

    // Traducir placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (langData[key]) {
            el.placeholder = langData[key];
        }
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
    
    if (!rawData) return alert(translations[state.lang].alert_no_data);

    const data = rawData.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    const labels = rawLabels ? rawLabels.split(',').map(s => s.trim()) : data.map((_, i) => `${translations[state.lang].history_label.split(':')[0]} ${i+1}`);

    addToHistory(rawData, rawLabels);
    
    // Actualizar todas las visualizaciones activas
    if(dom.toggles.bar.checked) updateChart('bar', 'canvas-bar', data, labels);
    if(dom.toggles.line.checked) updateChart('line', 'canvas-line', data, labels);
    if(dom.toggles.scatter.checked) updateChart('scatter', 'canvas-scatter', data, labels);
    if(dom.toggles.pie.checked) updateChart('pie', 'canvas-pie', data, labels);
    if(dom.toggles.pictogram.checked) updatePictogram(data, labels);
    if(dom.toggles.freq.checked) generateFrequencyTable(data);
    
    // Herramientas independientes
    if(dom.toggles.prob.checked) calcProbability();
}

// --- Gráficos (Chart.js) ---
function updateChart(type, canvasId, data, labels) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    if (state.charts[canvasId]) {
        state.charts[canvasId].destroy();
    }

    let config = {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: state.lang === 'es' ? 'Valores' : (state.lang === 'ru' ? 'Значения' : (state.lang === 'zh' ? '数值' : 'Valeurs')),
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
    if (dom.dataInput.value) processData(); 
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
        
        const count = Math.min(Math.floor(val), 50); 
        for(let j=0; j<count; j++) {
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-user'; 
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
    
    const sorted = [...data].sort((a,b) => a - b);
    const n = sorted.length;
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
    
    if (state.history.length > 0 && state.history[0].data === dataStr) return;

    state.history.unshift(entry);
    if (state.history.length > 10) state.history.pop(); 
    
    localStorage.setItem('statsHistory', JSON.stringify(state.history));
    renderHistory();
}

function renderHistory() {
    dom.historyList.innerHTML = '';
    if (state.history.length === 0) {
        dom.historyList.innerHTML = `<p class="empty-msg" data-i18n="history_empty">${translations[state.lang].history_empty}</p>`;
        return;
    }

    state.history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <strong>${translations[state.lang].history_label}</strong> ${item.data.substring(0, 20)}...
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
    if(confirm(translations[state.lang].confirm_clear)) {
        state.history = [];
        localStorage.removeItem('statsHistory');
        renderHistory();
    }
}

// --- Exportación ---
window.exportAll = async (type) => {
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
