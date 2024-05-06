const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");

mousepos = {"x": 0, "y": 0}
mousedown = 0
onmousemove = onmousedown = onmouseup = function(e) {mousepos.x = e.x; mousepos.y = e.y; mousedown = e.buttons % 2}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    size = (canvas.width**2 + canvas.height**2)**0.5
}
resizeCanvas()


points = []
for (let i = 0; i < 100; i++) {
    base = [Math.random(), Math.random(), Math.random()]
    coeff = 255/Math.max(...base)


    points.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        xVel: ((Math.random()**0.25) * (Math.random() < 0.5 ? 1 : -1))*canvas.width/400,
        yVel: ((Math.random()**0.25) * (Math.random() < 0.5 ? 1 : -1))*canvas.width/400,
        color: [base[0]*coeff, base[1]*coeff, base[2]*coeff]
    })
}

function movePoints() {
    let dt = 1
    for (let i = 0; i < points.length; i++) {
    
        
        points[i].yVel *= 0.999
        points[i].xVel *= 0.999

        points[i].x += points[i].xVel*dt
        points[i].y += points[i].yVel*dt

        // points[i].x = (points[i].x + canvas.width) % canvas.width
        // points[i].y = (points[i].y + canvas.width) % canvas.width

        if (points[i].x > canvas.width) {
            points[i].xVel = -Math.abs(points[i].xVel)
        } else if (points[i].x < 0) {
            points[i].xVel = Math.abs(points[i].xVel)
        }
        if (points[i].y > canvas.height) {
            points[i].yVel = -Math.abs(points[i].yVel)
        } else if (points[i].y < 0) {
            points[i].yVel = Math.abs(points[i].yVel)
        }
    }
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            dist = ((points[i].x-points[j].x)**2 + (points[i].y-points[j].y)**2)**0.5
            xPart = (points[i].x - points[j].x)/dist
            yPart = (points[i].y - points[j].y)/dist
            if (dist !== 0) {
                points[i].xVel -= xPart * (size**0.5-(dist**0.5))*dt/10000
                points[i].yVel -= yPart * (size**0.5-(dist**0.5))*dt/10000
            }
        }
        if (mousedown) {
            dist = ((points[i].x-mousepos.x)**2 + (points[i].y-mousepos.y)**2)**0.5
            xPart = (points[i].x - mousepos.x)/dist
            yPart = (points[i].y - mousepos.y)/dist
            if (dist !== 0) {
                points[i].xVel += xPart * (size**0.5-(dist**0.5))*dt/10
                points[i].yVel += yPart * (size**0.5-(dist**0.5))*dt/10
            }
        }
    }
}

function draw() {
    movePoints()

    ctx.beginPath()
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()

    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            dist = ((points[i].x-points[j].x)**2 + (points[i].y-points[j].y)**2)**0.5
            xPart = (points[i].x - points[j].x)/dist
            yPart = (points[i].y - points[j].y)/dist
            if (dist < 150) {
                ctx.beginPath()
                ctx.moveTo(points[i].x, points[i].y)
                ctx.strokeStyle = "#CCC"
                ctx.lineWidth = 1
                ctx.globalAlpha = Math.max(1-(dist/150), 0)
                ctx.lineTo(points[j].x, points[j].y)
                ctx.stroke()
            }
        }
    }
    for (let i = 0; i < points.length; i++) {
        speed = Math.min(((points[i].xVel**2 + points[i].yVel**2)**0.5)/10, 1)+0.2
        r = points[i].color[0] * speed
        g = points[i].color[1] * speed
        b = points[i].color[2] * speed

        ctx.beginPath()
        ctx.globalAlpha = 1
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`
        ctx.arc(points[i].x, points[i].y, 4, 0, 2*Math.PI)
        ctx.fill()
    }
    ctx.beginPath()
    v = mousedown ? 255 : 150
    ctx.fillStyle = `rgba(${v}, ${v}, ${v}, 1)`
    ctx.arc(mousepos.x, mousepos.y, 6, 0, 2*Math.PI)
    ctx.fill()

}

document.addEventListener("mousedown", () => {})
               
interval = setInterval(draw, 1000/60)

// for (let i = 0; i < 1e3; i++) draw()