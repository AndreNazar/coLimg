import "./style.scss"
import { deleteBlock, formBlock } from "./components/elements"
import { IChangeEvent } from "./components/types"
import { dragHandler, dropHandler } from "./components/functions"
import { deleteHandler, loadAnimation } from "./components/animations"


document.addEventListener("DOMContentLoaded", () => loadAnimation()) // анимация при запуске страницы

formBlock.addEventListener("dragover", (e) => dragHandler(e, "over"))
formBlock.addEventListener("dragleave", (e) => dragHandler(e, "leave"))
formBlock.addEventListener("drop", (e: DragEvent) => {
  dragHandler(e, "leave")
  dropHandler(e.dataTransfer.files) // dropHandler - функция отрисовки изображения
})

formBlock.addEventListener("change", (e: IChangeEvent) => {
  e.preventDefault()
  dropHandler(e.target.files) // dropHandler - функция отрисовки изображения
})

deleteBlock.addEventListener("click", () => deleteHandler()) // кнопка удаления