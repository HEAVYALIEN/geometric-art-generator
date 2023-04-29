const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Define the possible colors for each cell
const colorSets = [
    //["#413344","#614c65","#806485","#936397","#a662a8","#664972","#463c57","#6e8da9","#91bcdd","#567d99","#395e77","#305662","#264d4d","#315c45","#8a9a65","#b6b975","#b65d54","#b60033","#98062d","#800022"],
    //["#00202e","#003f5c","#2c4875","#8a508f","#bc5090","#ff6361","#ff8531","#ffa600","#ffd380"],
    ["#003049","#d62828","#f77f00","#fcbf49","#eae2b7"],
    //["#cdd6e3","#4d5464","#606677","#727889","#848b9b","#979dae","#aab0c1","#bbc2d3","#e1e7f8","#3b4152"]
];

// Get the form inputs and button
const gridSizeInput = document.getElementById('grid-size');
const cellSizeInput = document.getElementById('cell-size');
const cellPaddingInput = document.getElementById('cell-padding');
const changeColorBtn = document.getElementById('change-color-btn');
const colorSetSelect = document.getElementById('color-set');
const rectCheckbox = document.getElementById("rect");
const triCheckbox = document.getElementById("tri");
const circleCheckbox = document.getElementById("circle");
const flagCheckbox = document.getElementById("flag");
const checkeredFlagCheckbox = document.getElementById("checkered-flag");
const zuluCheckbox = document.getElementById("zulu");
const tri2Checkbox = document.getElementById("tri2");
const yankeeCheckbox = document.getElementById("yankee");
const golfCheckbox = document.getElementById("golf");
const circlezCheckbox = document.getElementById("circlez");
const animateBtn = document.getElementById('animate-btn');

// Define the animation interval in milliseconds
const animationInterval = 1000;
// Define a variable to keep track of the animation interval ID
let animationIntervalId = null;

// Attach a click event listener to the animate button
animateBtn.addEventListener('click', () => {
    // If the animation is already running, stop it
    if (animationIntervalId !== null) {
        clearInterval(animationIntervalId);
        animationIntervalId = null;
        return;
    }

    // Start the animation
    animationIntervalId = setInterval(() => {
        // Call the generate function to generate a new flag
        generateFlag();
    }, animationInterval);
});

// Define the shapes
const shapes = [
    { type: 'rect' },
    { type: 'tri' },
    { type: 'circle' },
    { type: 'circlez' },
    { type: 'flag' },
    { type: 'checkered-flag' },
    { type: 'zulu' },
    { type: 'tri2' },
    { type: 'yankee' },
    { type: 'golf' }
];

function getRandomColorSet() {
    const randomIndex = Math.floor(Math.random() * colorSets.length);
    const colorSet = colorSets[randomIndex];
    const backgroundColor = colorSet[Math.floor(Math.random() * colorSet.length)];
    return { colorSet, backgroundColor };
}

// Generate a random flag
function generateFlag() {
    const gridSize = parseInt(gridSizeInput.value);
    const cellSize = parseInt(cellSizeInput.value);
    const cellPadding = parseInt(cellPaddingInput.value);

    // Get a random color set and background color
    const { colorSet, backgroundColor } = getRandomColorSet();

    // Set the canvas size and fill the background
    canvas.width = cellSize * gridSize + cellPadding * (gridSize + 1);
    canvas.height = cellSize * gridSize + cellPadding * (gridSize + 1);
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a semi-transparent rectangle on top of the background
    const darkerBackgroundColor = 'rgba(255, 255, 255, 0.3)'; // semi-transparent black color
    context.fillStyle = darkerBackgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Create a filtered array of shapes based on which checkboxes are checked
    const filteredShapes = shapes.filter(shape => {
        switch (shape.type) {
            case 'rect':
                return rectCheckbox.checked;
            case 'tri':
                return triCheckbox.checked;
            case 'circle':
                return circleCheckbox.checked;
            case 'flag':
                return flagCheckbox.checked;
            case 'checkered-flag':
                return checkeredFlagCheckbox.checked;
            case 'zulu':
                return zuluCheckbox.checked;
            case 'tri2':
                return tri2Checkbox.checked;
            case 'yankee':
                return yankeeCheckbox.checked;
            case 'golf':
                return golfCheckbox.checked;
            case 'circlez':
                return circlezCheckbox.checked;
        }
    });

    // Draw the cells
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const x = cellPadding + j * (cellSize + cellPadding);
            const y = cellPadding + i * (cellSize + cellPadding);

            // Get a random shape and color from the filtered array
            const shape = filteredShapes[Math.floor(Math.random() * filteredShapes.length)];
            const color = colorSet[Math.floor(Math.random() * colorSet.length)];

            // Set the fill color
            context.fillStyle = color;

            // Draw the shape
            switch (shape.type) {
                case 'rect':
                    // Get two different random colors from the color array
                    let color8Index, color9Index;
                    do {
                        color8Index = Math.floor(Math.random() * colorSet.length);
                        color9Index = Math.floor(Math.random() * colorSet.length);
                    } while (color8Index === color9Index);
                    const color8 = colorSet[color8Index];
                    const color9 = colorSet[color9Index];
                    // Draw a rectangle that fills the entire cell
                    context.fillStyle = color8;
                    context.fillRect(x, y, cellSize, cellSize);
                    // Draw a smaller square on top of the rectangle, rotated by 45 degrees
                    context.save();
                    context.fillStyle = color9;
                    context.translate(x + cellSize / 2, y + cellSize / 2);
                    context.rotate(Math.PI / 4);
                    context.fillRect(-cellSize / 4, -cellSize / 4, cellSize / 2, cellSize / 2);
                    context.restore();
                    break;
                case 'tri':
                    // Get two different random colors from the color array
                    let color10Index, color11Index;
                    do {
                        color10Index = Math.floor(Math.random() * colorSet.length);
                        color11Index = Math.floor(Math.random() * colorSet.length);
                    } while (color10Index === color11Index);
                    const color10 = colorSet[color10Index];
                    const color11 = colorSet[color11Index];
                    // Draw a rectangle that fills the entire cell
                    context.fillStyle = color10;
                    context.fillRect(x, y, cellSize, cellSize);
                    // draw a right angle triangle that covers half the cell
                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineTo(x + cellSize, y);
                    context.lineTo(x, y + cellSize);
                    context.closePath();
                    context.fillStyle = color11;
                    context.fill();
                    break;
                case 'circle':
                    // Get two different random colors from the color array
                    let color5Index, color6Index;
                    do {
                        color5Index = Math.floor(Math.random() * colorSet.length);
                        color6Index = Math.floor(Math.random() * colorSet.length);
                    } while (color5Index === color6Index);
                    const color5 = colorSet[color5Index];
                    const color6 = colorSet[color6Index];
                    // Draw a rectangle that fills the entire cell
                    context.fillStyle = color5;
                    context.fillRect(x, y, cellSize, cellSize);
                    // Draw a circle that fills the centre of the cell 50%
                    context.beginPath();
                    context.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 4, 0, 2 * Math.PI);
                    context.closePath();
                    context.fillStyle = color6;
                    context.fill();
                    break;
                case 'flag':
                    // Get two different random colors from the color array
                    let color12Index, color13Index;
                    do {
                        color12Index = Math.floor(Math.random() * colorSet.length);
                        color13Index = Math.floor(Math.random() * colorSet.length);
                    } while (color12Index === color13Index);
                    const color12 = colorSet[color12Index];
                    const color13 = colorSet[color13Index];
                    // Fill the top half of the square with the first color
                    context.fillStyle = color12;
                    context.fillRect(x, y, cellSize, cellSize / 2);
                    // Fill the bottom half of the square with the second color
                    context.fillStyle = color13;
                    context.fillRect(x, y + cellSize / 2, cellSize, cellSize / 2);
                    break;
                case 'checkered-flag':
                    // Get two different random colors from the color array
                    let color14Index, color15Index;
                    do {
                        color14Index = Math.floor(Math.random() * colorSet.length);
                        color15Index = Math.floor(Math.random() * colorSet.length);
                    } while (color14Index === color15Index);
                    const color14 = colorSet[color14Index];
                    const color15 = colorSet[color15Index];
                    // Draw a rectangle that fills the entire cell
                    context.fillStyle = color14;
                    context.fillRect(x, y, cellSize, cellSize);
                    //draw two rectangles in a checkered pattern
                    context.fillStyle = color15;
                    context.fillRect(x, y, cellSize / 2, cellSize / 2); // top left rectangle
                    context.fillRect(x + cellSize / 2, y + cellSize / 2, cellSize / 2, cellSize / 2); // bottom right rectangle
                    break
                case 'zulu':
                    // Generate four unique colors
                    let colors = [];
                    while (colors.length < 4) {
                        let color = colorSet[Math.floor(Math.random() * colorSet.length)];
                        if (!colors.includes(color)) {
                            colors.push(color);
                        }
                    }
                    // Draw four triangles with the generated colors
                    context.fillStyle = colors[0];
                    context.fillRect(x, y, cellSize, cellSize);

                    context.fillStyle = colors[1];
                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineTo(x + cellSize / 2, y + cellSize / 2);
                    context.lineTo(x + cellSize, y);
                    context.closePath();
                    context.fill();

                    context.fillStyle = colors[2];
                    context.beginPath();
                    context.moveTo(x + cellSize, y);
                    context.lineTo(x + cellSize / 2, y + cellSize / 2);
                    context.lineTo(x + cellSize, y + cellSize);
                    context.closePath();
                    context.fill();

                    context.fillStyle = colors[3];
                    context.beginPath();
                    context.moveTo(x + cellSize, y + cellSize);
                    context.lineTo(x + cellSize / 2, y + cellSize / 2);
                    context.lineTo(x, y + cellSize);
                    context.closePath();
                    context.fill();
                    break;
                case 'tri2':
                    // Get two different random colors from the color array
                    let color16Index, color17Index;
                    do {
                        color16Index = Math.floor(Math.random() * colorSet.length);
                        color17Index = Math.floor(Math.random() * colorSet.length);
                    } while (color16Index === color17Index);
                    const color16 = colorSet[color16Index];
                    const color17 = colorSet[color17Index];
                    // Draw a rectangle that fills the entire cell
                    context.fillStyle = color16;
                    context.fillRect(x, y, cellSize, cellSize);
                    // draw a right angle triangle that covers half the cell
                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineTo(x + cellSize, y + cellSize);
                    context.lineTo(x, y + cellSize);
                    context.closePath();
                    context.fillStyle = color17;
                    context.fill();
                    break;
                case 'yankee':
                    // Get four different random colors from the color array
                    let color18Index, color19Index, color20Index, color21Index;
                    do {
                        color18Index = Math.floor(Math.random() * colorSet.length);
                        color19Index = Math.floor(Math.random() * colorSet.length);
                        color20Index = Math.floor(Math.random() * colorSet.length);
                        color21Index = Math.floor(Math.random() * colorSet.length);
                    } while (new Set([color18Index, color19Index, color20Index, color21Index]).size !== 4);
                    const color18 = colorSet[color18Index];
                    const color19 = colorSet[color19Index];
                    const color20 = colorSet[color20Index];
                    const color21 = colorSet[color21Index];
                    // Fill the top left corner with color1
                    context.fillStyle = color18;
                    context.fillRect(x, y, cellSize, cellSize);
                    // Fill the bottom left corner with color2
                    context.fillStyle = color19;
                    context.fillRect(x, y + cellSize / 2, cellSize / 2, cellSize / 2);
                    // Fill the top right corner with color4
                    context.fillStyle = color20;
                    context.fillRect(x + cellSize / 2, y, cellSize / 2, cellSize / 2);
                    // Fill the bottom right corner with color3
                    context.fillStyle = color21;
                    context.fillRect(x + cellSize / 2, y + cellSize / 2, cellSize / 2, cellSize / 2);
                    break;
                case 'golf':
                    // Get two random colors from the color array
                    // Get two different random colors from the color array
                    let color22Index, color23Index;
                    do {
                        color22Index = Math.floor(Math.random() * colorSet.length);
                        color23Index = Math.floor(Math.random() * colorSet.length);
                    } while (color22Index === color23Index);
                    const color22 = colorSet[color22Index];
                    const color23 = colorSet[color23Index];
                    // Fill the entire square with the first color
                    context.fillStyle = color22;
                    context.fillRect(x, y, cellSize, cellSize);
                    // Fill the right half of the square with the second color
                    context.fillStyle = color23;
                    context.fillRect(x + cellSize / 2, y, cellSize / 2, cellSize);
                    break;
                case 'circlez':
                    // Get three different random colors from the color array
                    let color25Index, color26Index, color27Index;
                    do {
                        color25Index = Math.floor(Math.random() * colorSet.length);
                        color26Index = Math.floor(Math.random() * colorSet.length);
                        color27Index = Math.floor(Math.random() * colorSet.length);
                    } while (color25Index === color26Index || color25Index === color27Index || color26Index === color27Index);
                    const color25 = colorSet[color25Index];
                    const color26 = colorSet[color26Index];
                    const color27 = colorSet[color27Index];
                    // Draw a rectangle that fills the entire cell with the background color
                    context.fillStyle = color27;
                    context.fillRect(x, y, cellSize, cellSize);
                    // Draw multiple circles of decreasing size to create a bullseye pattern
                    const numCircles = 6; // Specify the number of circles here
                    for (let i = 0; i < numCircles; i++) {
                        context.beginPath();
                        context.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2 - i * cellSize / (numCircles * 2 - 2), 0, 2 * Math.PI);
                        context.closePath();
                        context.fillStyle = i % 2 === 0 ? color26 : color25;
                        context.fill();
                    }
                    break


            }
        }
    }
}

function saveImage() {
    const link = document.createElement('a');
    link.download = 'image.jpeg';
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
}


changeColorBtn.addEventListener('click', function () {
    generateFlag();

    // Get a random color set
    const colorSet = getRandomColorSet();

    // Generate a new flag
    generateFlag();
});
