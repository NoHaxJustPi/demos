let iterations = 256 // maximum times it runs
let scale = 2 // to make it not horrifyingly slow
let bounds = {
    x: [-2, 2],
    y: [-2, 2]
}
let windowSize = 4
let pos = {x: 0, y: 0}
let scaleFactor;

const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scaleFactor = canvas.width/canvas.height
    draw()
}

function draw() {
    let image = ctx.createImageData(canvas.width, canvas.height); 
    let data = image.data; 
    for (let i = 0; i < canvas.width; i+=scale) {
        for (let j = 0; j < canvas.height; j+=scale) {
            let c = new ComplexNumber(bounds.x[0]+i*(bounds.x[1]-bounds.x[0])/canvas.width,
            bounds.y[0]+j*(bounds.y[1]-bounds.y[0])/canvas.height)
            let z = new ComplexNumber(0, 0)
            let shouldBreak = false
            k = 0
            while (k < iterations && !shouldBreak) {
                k++;
                // z = z.piecewiseAbs()
                z = z.square().add(c)
                if (z.mag() > 8) {
                    val = (k/32)%1
                    shouldBreak = true
                }
            }
            if (k == iterations) bright = 0
            else bright = 1
            let [red, grn, blu] = hsvToRgb(val, 1, bright)
            for (let offset = 0; offset < scale**2; offset++) {
                w = (i+offset%scale + Math.floor(j+offset/scale)*canvas.width)*4
                data[w]   = red
                data[w+1] = grn
                data[w+2] = blu
                data[w+3] = 255
            }
            
        }
    }
    ctx.putImageData(image, 0, 0)
}

resizeCanvas()
bounds.x = [scaleFactor*(pos.x - windowSize/2), scaleFactor*(pos.x + windowSize/2)]
bounds.y = [pos.y - windowSize/2, pos.y + windowSize/2]
draw()

// function updateWindow(evt) {
//     x = evt.x / canvas.width
//     y = evt.y / canvas.height
//     bounds.x = [x*4 - (2+windowSize), x*4 - (2-windowSize)]
//     bounds.y = [y*4 - (2+windowSize), y*4 - (2-windowSize)]
//     draw()
// }

// document.addEventListener("mousemove", updateWindow)

document.addEventListener("keydown", (evt) => {
    if (evt.key == 'ArrowDown') {
        windowSize /= 1.2
    } else if (evt.key == 'ArrowUp') {
        windowSize *= 1.2
    } else if (evt.code == "KeyW") {
        pos.y -= windowSize/8
    } else if (evt.code == "KeyS") {
        pos.y += windowSize/8
    } else if (evt.code == "KeyA") {
        pos.x -= windowSize/8
    } else if (evt.code == "KeyD") {
        pos.x += windowSize/8
    } else if (evt.code == "KeyX") {
        iterations *= 2
    } else if (evt.code == "KeyZ") {
        iterations /= 2
    } else if (evt.code == "KeyQ") {
        scale += 1
    } else if (evt.code == "KeyE") {
        scale = Math.max(scale-1, 1)
    }
    scaleFactor = canvas.width/canvas.height
    bounds.x = [scaleFactor*(pos.x - windowSize/2), scaleFactor*(pos.x + windowSize/2)]
    bounds.y = [pos.y - windowSize/2, pos.y + windowSize/2]
    draw()
})