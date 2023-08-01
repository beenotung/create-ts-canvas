let canvas = document.createElement('canvas')

let ratio = 10

canvas.width = 400 / ratio
canvas.height = 400 / ratio

let batch = 100

canvas.style.width = canvas.width * ratio + 'px'
canvas.style.height = canvas.height * ratio + 'px'

let context = canvas.getContext('2d')!
let imageData = context.getImageData(0, 0, canvas.width, canvas.height)

function tick() {
  for (let i = 0; i < batch; i++) {
    let x = Math.floor(Math.random() * canvas.width)
    let y = Math.floor(Math.random() * canvas.height)
    let offset = (y * canvas.width + x) * 4
    imageData.data[offset + 0] = 132
    imageData.data[offset + 1] = 64
    imageData.data[offset + 2] = 132
    imageData.data[offset + 3] = 255
  }

  context.putImageData(imageData, 0, 0)

  requestAnimationFrame(tick)
}

requestAnimationFrame(tick)

document.body.appendChild(canvas)

Object.assign(window, { canvas, context, imageData, ratio, tick })
