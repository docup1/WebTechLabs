const patternsContainer = document.getElementById('patterns-container');
const changeButton = document.getElementById('changeButton');
const patternInfo = document.getElementById('patternInfo');

// Параметры области для генерации узоров (в координатах синего квадрата)
const patternBounds = {
    minX: 50,
    maxX: 430,
    minY: 45,
    maxY: 430
};

// Массив названий узоров для отображения
const patternNames = [
    "Геометрический орнамент", "Точечная мозаика", "Зигзагообразные линии",
    "Концентрические круги", "Волнообразный паттерн", "Звездное небо",
    "Плетеный узор", "Снежинки", "Мандала", "Кристаллическая решетка",
    "Паутина", "Морские волны", "Лесные тропинки", "Соты", "Спирали"
];

// Генерация случайного числа в диапазоне
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Генерация случайного целого числа
function randomInt(min, max) {
    return Math.floor(random(min, max));
}

// Случайный выбор из массива
function randomChoice(arr) {
    return arr[randomInt(0, arr.length)];
}

// Функция генерации случайного узора
function generateRandomPattern() {
    // Очищаем предыдущий узор
    patternsContainer.innerHTML = '';

    // Случайно выбираем тип узора
    const patternType = randomInt(1, 7);

    switch(patternType) {
        case 1:
            generateDotsPattern();
            break;
        case 2:
            generateLinesPattern();
            break;
        case 3:
            generateGeometricPattern();
            break;
        case 4:
            generateZigzagPattern();
            break;
        case 5:
            generateWavesPattern();
            break;
        case 6:
            generateMixedPattern();
            break;
    }

    // Обновляем информацию о паттерне
    patternInfo.textContent = `Текущий узор: ${randomChoice(patternNames)} (${patternsContainer.children.length} элементов)`;
}

// Узор 1: Точки/круги
function generateDotsPattern() {
    const count = randomInt(50, 200);
    const maxSize = random(3, 15);

    for (let i = 0; i < count; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const x = random(patternBounds.minX, patternBounds.maxX);
        const y = random(patternBounds.minY, patternBounds.maxY);
        const r = random(1, maxSize);
        const opacity = random(0.3, 0.9);

        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', 'white');
        circle.setAttribute('opacity', opacity);

        // Случайно делаем некоторые круги полыми
        if (Math.random() > 0.7) {
            circle.setAttribute('fill', 'none');
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', random(0.5, 2));
        }

        patternsContainer.appendChild(circle);
    }
}

// Узор 2: Линии
function generateLinesPattern() {
    const count = randomInt(20, 60);

    for (let i = 0; i < count; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const x1 = random(patternBounds.minX, patternBounds.maxX);
        const y1 = random(patternBounds.minY, patternBounds.maxY);
        const x2 = random(patternBounds.minX, patternBounds.maxX);
        const y2 = random(patternBounds.minY, patternBounds.maxY);
        const width = random(0.5, 3);
        const opacity = random(0.4, 0.9);

        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'white');
        line.setAttribute('stroke-width', width);
        line.setAttribute('opacity', opacity);
        line.setAttribute('stroke-linecap', 'round');

        // Случайный тип линии
        if (Math.random() > 0.5) {
            line.setAttribute('stroke-dasharray', `${random(2, 10)},${random(2, 10)}`);
        }

        patternsContainer.appendChild(line);
    }
}

// Узор 3: Геометрические фигуры
function generateGeometricPattern() {
    const count = randomInt(15, 40);
    const shapes = ['circle', 'rect', 'polygon', 'ellipse'];

    for (let i = 0; i < count; i++) {
        const shapeType = randomChoice(shapes);
        let shape;

        switch(shapeType) {
            case 'circle':
                shape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                shape.setAttribute('cx', random(patternBounds.minX, patternBounds.maxX));
                shape.setAttribute('cy', random(patternBounds.minY, patternBounds.maxY));
                shape.setAttribute('r', random(5, 30));
                break;

            case 'rect':
                shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                shape.setAttribute('x', random(patternBounds.minX, patternBounds.maxX - 40));
                shape.setAttribute('y', random(patternBounds.minY, patternBounds.maxY - 40));
                shape.setAttribute('width', random(10, 40));
                shape.setAttribute('height', random(10, 40));
                shape.setAttribute('rx', random(0, 10));
                break;

            case 'polygon':
                shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                const sides = randomInt(3, 8);
                const centerX = random(patternBounds.minX + 30, patternBounds.maxX - 30);
                const centerY = random(patternBounds.minY + 30, patternBounds.maxY - 30);
                const radius = random(10, 25);
                let points = '';

                for (let j = 0; j < sides; j++) {
                    const angle = (j * 2 * Math.PI) / sides;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                    points += `${x},${y} `;
                }

                shape.setAttribute('points', points.trim());
                break;

            case 'ellipse':
                shape = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                shape.setAttribute('cx', random(patternBounds.minX + 30, patternBounds.maxX - 30));
                shape.setAttribute('cy', random(patternBounds.minY + 30, patternBounds.maxY - 30));
                shape.setAttribute('rx', random(10, 35));
                shape.setAttribute('ry', random(10, 35));
                break;
        }

        if (shape) {
            shape.setAttribute('fill', Math.random() > 0.3 ? 'white' : 'none');
            if (shape.getAttribute('fill') === 'none') {
                shape.setAttribute('stroke', 'white');
                shape.setAttribute('stroke-width', random(1, 3));
            }
            shape.setAttribute('opacity', random(0.4, 0.9));

            // Случайный поворот
            if (Math.random() > 0.5) {
                shape.setAttribute('transform', `rotate(${random(0, 360)}, ${random(patternBounds.minX, patternBounds.maxX)}, ${random(patternBounds.minY, patternBounds.maxY)})`);
            }

            patternsContainer.appendChild(shape);
        }
    }
}

// Узор 4: Зигзаги
function generateZigzagPattern() {
    const rows = randomInt(5, 15);
    const cols = randomInt(5, 15);
    const cellWidth = (patternBounds.maxX - patternBounds.minX) / cols;
    const cellHeight = (patternBounds.maxY - patternBounds.minY) / rows;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = patternBounds.minX + j * cellWidth;
            const y = patternBounds.minY + i * cellHeight;

            // Создаем зигзаг
            const zigzag = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            const points = [];
            const segments = randomInt(3, 8);

            for (let k = 0; k <= segments; k++) {
                const segX = x + (k / segments) * cellWidth;
                const segY = y + (k % 2 === 0 ? 0 : cellHeight);
                points.push(`${segX},${segY}`);
            }

            zigzag.setAttribute('points', points.join(' '));
            zigzag.setAttribute('fill', 'none');
            zigzag.setAttribute('stroke', 'white');
            zigzag.setAttribute('stroke-width', random(0.5, 2));
            zigzag.setAttribute('opacity', random(0.5, 0.9));

            patternsContainer.appendChild(zigzag);
        }
    }
}

// Узор 5: Волны
function generateWavesPattern() {
    const waveCount = randomInt(8, 20);

    for (let w = 0; w < waveCount; w++) {
        const wave = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        // Случайные параметры волны
        const startX = patternBounds.minX;
        const endX = patternBounds.maxX;
        const y = random(patternBounds.minY, patternBounds.maxY);
        const amplitude = random(5, 20);
        const frequency = random(0.05, 0.2);
        const phase = random(0, Math.PI * 2);

        let pathData = `M ${startX} ${y}`;
        const steps = 50;

        for (let i = 1; i <= steps; i++) {
            const x = startX + (i / steps) * (endX - startX);
            const waveY = y + amplitude * Math.sin(frequency * x + phase);
            pathData += ` L ${x} ${waveY}`;
        }

        wave.setAttribute('d', pathData);
        wave.setAttribute('fill', 'none');
        wave.setAttribute('stroke', 'white');
        wave.setAttribute('stroke-width', random(0.5, 2.5));
        wave.setAttribute('opacity', random(0.4, 0.9));

        patternsContainer.appendChild(wave);
    }
}

// Узор 6: Смешанный паттерн
function generateMixedPattern() {
    // Комбинация разных элементов
    const elementCount = randomInt(30, 80);

    for (let i = 0; i < elementCount; i++) {
        const type = randomInt(1, 5);
        let element;

        switch(type) {
            case 1: // Маленькие круги
                element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                element.setAttribute('cx', random(patternBounds.minX, patternBounds.maxX));
                element.setAttribute('cy', random(patternBounds.minY, patternBounds.maxY));
                element.setAttribute('r', random(1, 5));
                element.setAttribute('fill', 'white');
                break;

            case 2: // Короткие линии
                element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                const x = random(patternBounds.minX, patternBounds.maxX);
                const y = random(patternBounds.minY, patternBounds.maxY);
                const length = random(5, 25);
                const angle = random(0, Math.PI * 2);

                element.setAttribute('x1', x);
                element.setAttribute('y1', y);
                element.setAttribute('x2', x + length * Math.cos(angle));
                element.setAttribute('y2', y + length * Math.sin(angle));
                element.setAttribute('stroke', 'white');
                element.setAttribute('stroke-width', random(0.5, 2));
                break;

            case 3: // Крестики
                const centerX = random(patternBounds.minX, patternBounds.maxX);
                const centerY = random(patternBounds.minY, patternBounds.maxY);
                const size = random(3, 12);

                // Вертикальная линия
                const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                vLine.setAttribute('x1', centerX);
                vLine.setAttribute('y1', centerY - size);
                vLine.setAttribute('x2', centerX);
                vLine.setAttribute('y2', centerY + size);
                vLine.setAttribute('stroke', 'white');
                vLine.setAttribute('stroke-width', random(0.5, 1.5));
                vLine.setAttribute('opacity', random(0.6, 0.9));
                patternsContainer.appendChild(vLine);

                // Горизонтальная линия
                const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                hLine.setAttribute('x1', centerX - size);
                hLine.setAttribute('y1', centerY);
                hLine.setAttribute('x2', centerX + size);
                hLine.setAttribute('y2', centerY);
                hLine.setAttribute('stroke', 'white');
                hLine.setAttribute('stroke-width', random(0.5, 1.5));
                hLine.setAttribute('opacity', random(0.6, 0.9));
                patternsContainer.appendChild(hLine);

                continue; // Пропускаем добавление element в конце

            case 4: // Квадратики
                element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                element.setAttribute('x', random(patternBounds.minX, patternBounds.maxX - 10));
                element.setAttribute('y', random(patternBounds.minY, patternBounds.maxY - 10));
                element.setAttribute('width', random(2, 10));
                element.setAttribute('height', random(2, 10));
                element.setAttribute('fill', Math.random() > 0.5 ? 'white' : 'none');
                if (element.getAttribute('fill') === 'none') {
                    element.setAttribute('stroke', 'white');
                    element.setAttribute('stroke-width', 0.5);
                }
                break;
        }

        if (element && type !== 3) {
            element.setAttribute('opacity', random(0.4, 0.9));
            patternsContainer.appendChild(element);
        }
    }
}

// Анимация при смене узора
function animatePatternChange() {
    patternsContainer.style.opacity = '0';
    patternsContainer.style.transform = 'scale(0.9)';
    patternsContainer.style.transition = 'all 0.4s ease';

    setTimeout(() => {
        generateRandomPattern();

        patternsContainer.style.opacity = '0';
        patternsContainer.style.transform = 'scale(1.1)';

        setTimeout(() => {
            patternsContainer.style.opacity = '1';
            patternsContainer.style.transform = 'scale(1)';
        }, 50);
    }, 400);
}

// Обработчики событий
changeButton.addEventListener('click', animatePatternChange);

// Клик по синему квадрату также меняет узор
document.getElementById('blue-bg').addEventListener('click', animatePatternChange);

// Генерация первого узора при загрузке
window.addEventListener('load', () => {
    setTimeout(() => {
        generateRandomPattern();
        patternsContainer.style.opacity = '1';
    }, 100);
});

// Автоматическая смена каждые 15 секунд
setInterval(animatePatternChange, 15000);