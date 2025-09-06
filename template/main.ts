import { new_oklab, new_rgb, oklab_to_rgb, range } from 'oklab.ts/dist/oklab'

let canvas = document.createElement('canvas')

let scale = 10

canvas.width = 400 / scale
canvas.height = 400 / scale

let batch = 100

canvas.style.width = canvas.width * scale + 'px'
canvas.style.height = canvas.height * scale + 'px'

let context = canvas.getContext('2d')!
let imageData = context.getImageData(0, 0, canvas.width, canvas.height)

let rgb = new_rgb()
let oklab = new_oklab()

function tick() {
  let t = Math.sin(Date.now() / 1000)

  for (let i = 0; i < batch; i++) {
    let x = Math.floor(Math.random() * canvas.width)
    let y = Math.floor(Math.random() * canvas.height)
    let offset = (y * canvas.width + x) * 4

    oklab.L = ((t + 1) / 2) * range.L.range + range.L.min
    oklab.a = (x / canvas.width) * range.a.range + range.a.min
    oklab.b = (y / canvas.height) * range.b.range + range.b.min

    oklab_to_rgb(oklab, rgb)

    imageData.data[offset + 0] = rgb.r
    imageData.data[offset + 1] = rgb.g
    imageData.data[offset + 2] = rgb.b
    imageData.data[offset + 3] = 255
  }

  context.putImageData(imageData, 0, 0)

  requestAnimationFrame(tick)
}

requestAnimationFrame(tick)

document.body.appendChild(canvas)

Object.assign(window, {
  canvas,
  context,
  imageData,
  scale,
  tick,
})
