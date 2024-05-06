const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");

noise.seed(Math.random())

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw()
}

function getRandomColor() {
    if (Math.random() < 0.9) return [0, 0, 0]

    magnitude = Math.floor(255 * 2.5 + Math.random() * (255/2))
    if (Math.random() < 0.5) {
        r = 255
        g = 155 + Math.random() * 100
        b = 155 + Math.random() * 100
    } else {
        r = 155 + Math.random() * 100
        g = 155 + Math.random() * 100
        b = 255
    }
    return [r, g, b]
}

t = 0;
function draw() {
    t += 1
    let image = ctx.createImageData(canvas.width, canvas.height);
    let data = image.data;
    for (let i = 0; i < canvas.width; i++) {
        for (let j = 0; j < canvas.height; j++) {
            cell = (i + canvas.width*j) * 4
            val = (noise.perlin2(i/400, j/400)+3)**2
            col = (Math.random() * (4**2)) * Math.floor(Math.random()*2) < val ? 0 : getRandomColor()
            data[cell+0] = col[0]
            data[cell+1] = col[1]
            data[cell+2] = col[2]
            data[cell+3] = 255
        }
    }
    ctx.putImageData(image, 0, 0)
}

resizeCanvas()