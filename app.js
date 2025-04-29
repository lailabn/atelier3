let products = [];
let sortField = 'name';
let sortDir = 1;
let chart;

// Charger les données
async function loadData() {
    const response = await fetch('data.json');
    const data = await response.json();
    products = data.products;
    init();
}

// Initialisation
function init() {
    // Catégories
    [...new Set(products.map(p => p.category))].forEach(c => {
        filter.innerHTML += `<option>${c}</option>`;
    });

    // Événements
    document.querySelectorAll('th').forEach(th =>
        th.addEventListener('click', () => {
            if(sortField === th.dataset.sort) sortDir *= -1;
            sortField = th.dataset.sort;
            update();
        })
    );
    filter.addEventListener('change', update);
    search.addEventListener('input', update);
    threshold.addEventListener('change', update);

    // Graphique
    const ctx = document.getElementById('chart');
    ctx.width = 300;
    ctx.height = 300;
    chart = new Chart(ctx, {
        type: 'bar',
        data: { labels: [], datasets: [{
                label: 'Stock par catégorie',
                data: [],
                backgroundColor: '#4285F4'
            }]},
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });

    update();
}

// Mise à jour
function update() {
    const seuil = parseInt(threshold.value) || 5;
    const filtered = products
        .filter(p => (filter.value === 'all' || p.category === filter.value) &&
            p.name.toLowerCase().includes(search.value.toLowerCase()))
        .sort((a,b) => (a[sortField] > b[sortField] ? sortDir : -sortDir));

    // Tableau
    table.innerHTML = filtered.map(p => `
        <tr ${p.stock < seuil ? 'class="low"' : ''}>
            <td>${p.name}</td>
            <td>${p.price}MAD</td>
            <td>${p.category}</td>
            <td>${p.stock}</td>
        </tr>`).join('');

    // Graphique
    const cats = [...new Set(filtered.map(p => p.category))];
    const stocks = cats.map(c =>
        filtered.filter(p => p.category === c).reduce((a,p) => a + p.stock, 0));

    chart.data.labels = cats;
    chart.data.datasets[0].data = stocks;
    chart.update();
}

// Démarrer l'application
loadData();