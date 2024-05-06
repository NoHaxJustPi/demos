const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");

noise.seed(Math.random())
let offsets = []

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    offsets = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            offsets = offsets.concat((i + canvas.width*j) * 4)
        }
    }
}

let t = 0;
let offset1 = Math.random()*1e4
let offset2 = -Math.random()*1e4



function draw() {
    let image = ctx.createImageData(canvas.width, canvas.height); // all this image stuff is magic to me.
    let data = image.data; // not even the scp kind of magic where i know enough to get away with saying thaumaturgy

    t += 0.05
    for (let i = 0; i < canvas.width; i+=3) {
        for (let j = 0; j < canvas.height; j+=3) {
            

            red = Math.floor(noise.perlin3(i / 100, j / 100, t)*10)*30
            grn = Math.floor(noise.perlin3(i / 100, j / 100, t+offset1)*10)*30
            blu = Math.floor(noise.perlin3(i / 100, j / 100, t+offset2)*10)*30

            // nah it's just straight up the unknown known to me
            for (let k = 0; k < 9; k++) {
                pos = offsets[k] + (i + j*canvas.width)*4
                data[pos]   = red
                data[pos+1] = grn
                data[pos+2] = blu
                data[pos+3] = 255
            }
        }
    }
    ctx.putImageData(image, 0, 0)
    requestAnimationFrame(draw)
}

resizeCanvas()
draw()