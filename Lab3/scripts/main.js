const svgNS = "http://www.w3.org/2000/svg";
const layer = document.getElementById('dynamic-layer');
const btn = document.getElementById('generateBtn');
const statusText = document.getElementById('status');
const canvasBg = document.getElementById('canvas-bg');

// Границы синей области (для расчетов)
const area = { minX: 45, maxX: 438, minY: 42, maxY: 435 };

// Помогатор для создания элементов
function createSVG(tag, attrs) {
    const el = document.createElementNS(svgNS, tag);
    for (let key in attrs) el.setAttribute(key, attrs[key]);
    return el;
}

const Patterns = {
    // 1. Космический туман (точки)
    stars: (frag) => {
        for (let i = 0; i < 150; i++) {
            frag.appendChild(createSVG('circle', {
                cx: Math.random() * (area.maxX - area.minX) + area.minX,
                cy: Math.random() * (area.maxY - area.minY) + area.minY,
                r: Math.random() * 3,
                fill: "white",
                opacity: Math.random()
            }));
        }
        return "Звездное скопление";
    },

    // 2. Сетчатый чертеж (линии)
    grid: (frag) => {
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * 400 + 50;
            frag.appendChild(createSVG('line', {
                x1: x, y1: area.minY, x2: x + (Math.random() - 0.5) * 100, y2: area.maxY,
                stroke: "white", "stroke-width": 0.5, opacity: 0.4
            }));
        }
        return "Техно-сетка";
    },

    // 3. Абстрактные полигоны
    forms: (frag) => {
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * 300 + 50;
            const y = Math.random() * 300 + 50;
            const size = Math.random() * 40 + 10;
            frag.appendChild(createSVG('rect', {
                x, y, width: size, height: size,
                fill: "none", stroke: "white", "stroke-width": 2,
                transform: `rotate(${Math.random() * 360}, ${x + size/2}, ${y + size/2})`,
                opacity: 0.7
            }));
        }
        return "Геометрическая абстракция";
    }
};

function draw() {
    // Эффект затухания перед сменой
    layer.style.opacity = 0;

    setTimeout(() => {
        layer.innerHTML = '';
        const fragment = document.createDocumentFragment();

        // Случайный выбор функции рисования
        const keys = Object.keys(Patterns);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const name = Patterns[randomKey](fragment);

        layer.appendChild(fragment);
        layer.style.opacity = 1;
        statusText.innerText = `Узор: ${name}`;
    }, 200);
}

// События
btn.addEventListener('click', draw);
canvasBg.addEventListener('click', draw);

// Первый запуск
window.onload = draw;