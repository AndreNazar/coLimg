import { canvas, deleteBlock, formContainer, outputColors, outputImg, textForm, upIcon } from "./elements"
import KMeans from "./KMeans"
import { IDropzone } from "./types"

export const dragHandler = (e: DragEvent, type: string) => {
  let texts_dropzone: IDropzone = {
    over: "Отпустите изображение, чтобы начать загрузку",
    leave: "Нажмите, чтобы выбрать картинку, либо перетащите картинку сюда",
  }

  e.preventDefault()
  textForm.innerHTML = texts_dropzone[type]
  if (type === "over") upIcon.classList.add("active")
  else upIcon.classList.remove("active")
}

export const dropHandler = (files: FileList) => {
  let img: HTMLImageElement = new Image()
  if (files.length === 1) {
    if (files[0].type === "image/png" || files[0].type === "image/jpeg" || files[0].type === "image/svg+xml") {
      formContainer.classList.remove("load-animation")

      const anim_time = setTimeout(() => {
        formContainer.style.display = "none"
        outputImg.innerHTML = ""

        img.src = URL.createObjectURL(files[0])
        img.onload = imageHandler(img)
        outputImg.appendChild(img)
        clearTimeout(anim_time)
      }, 600)
    }
  }
}

function imageHandler(img: HTMLImageElement) {
  return function () {
    const ctx = canvas.getContext("2d")
    const kmeans = new KMeans()
    let pixels = []
    let pixelData: Uint8ClampedArray = null
    let clusters: number[][][] = []
    let mainColors: number[][] = []

    canvas.width = img.width
    canvas.height = img.height

    ctx.drawImage(img, 0, 0) // отрисовка изображения в canvas, который не видно во время кластеризации
    pixelData = ctx.getImageData(0, 0, img.width, img.height).data // получение пиксельных данных

    for (var i = 0; i < pixelData.length; i += 4) pixels.push([pixelData[i], pixelData[i + 1], pixelData[i + 2]]) // создание массива точек

    clusters = kmeans.cluster(pixels, 3) // кластеризация точек

    mainColors = clusters.map((cluster) => kmeans.updateCentroids([cluster])[0]) // обновление центроидов
    mainColors.forEach((color) => drawColor(color)) // вывод цветов. drawColor - функция для отрисовки цветов

    animationOutputBlock()
  }
}

const animationOutputBlock = async () => {
  outputImg.classList.add("load-animation")

  const outputColorsItems = document.querySelectorAll(".container .output_colors .color-block")

  outputColorsItems.forEach((item, i) => {
    const anim_time = setTimeout(() => {
      item.classList.add("load-animation")
      if (i === 2) deleteBlock.style.display = "flex"
      clearTimeout(anim_time)
    }, (i + 1) * 100)
  })

  const anim_time = setTimeout(() => {
    deleteBlock.classList.add("load-animation")
    clearTimeout(anim_time)
  }, 400)
}

export const drawColor = (color: number[]) => {
  const colorDiv: HTMLDivElement = document.createElement("div")
  const colorText: HTMLParagraphElement = document.createElement("p")
  const r: number = color[0]
  const g: number = color[1]
  const b: number = color[2]
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  colorText.className = "color-text"
  colorText.innerHTML = "#" + to16bit(r) + to16bit(g) + to16bit(b)
  colorText.style.color = yiq > 128 ? "#000" : "#fff"

  colorDiv.className = "color-block"
  colorDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`

  const copy_element_alert: HTMLDivElement = document.createElement("div")
  copy_element_alert.className = "copied_alert"
  copy_element_alert.innerHTML = "Copied!"
  colorDiv.appendChild(copy_element_alert)

  outputColors.appendChild(colorDiv)
  colorDiv.appendChild(colorText)

  colorDiv.addEventListener("click", () => copyHandler(copy_element_alert, colorText))
}

const copyHandler = (copy_element_alert: HTMLDivElement, colorText: HTMLParagraphElement) => {
  let anim_time: NodeJS.Timeout = null
  copy_element_alert.style.display = "flex"
  anim_time = setTimeout(() => copy_element_alert.classList.add("active"))

  anim_time = setTimeout(() => {
    copy_element_alert.classList.remove("active")
    anim_time = setTimeout(() => {
      copy_element_alert.style.display = "none"
      clearTimeout(anim_time)
    }, 300)
  }, 500)

  navigator.clipboard.writeText(colorText.innerHTML)
}

export const to16bit = (color: number) => 
  (+color.toFixed()).toString(16).length === 1 
  ? "0" + (+color.toFixed()).toString(16) 
  : (+color.toFixed()).toString(16)
