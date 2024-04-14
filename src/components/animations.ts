import { deleteBlock, formBlock, formContainer, mainTitle, outputColors, outputImg } from "./elements"

export const hardShowFormContainer = () => (formContainer.style.display = "grid")
export const visualShowFormContainer = () => formContainer.classList.add("load-animation")

export const visualHideOutput = () => {
  deleteBlock.classList.remove("load-animation") // визуальное скрытие кнопки удаления
  outputImg.classList.remove("load-animation") // визуальное скрытие изображения
  const outputColorsItems = document.querySelectorAll(".container .output_colors .color-block")
  outputColorsItems.forEach((item) => item.classList.remove("load-animation")) // визуальное скрытие цветовых блоков
}

export const hardHideOutput = () => {
  outputImg.innerHTML = "" // жесткое скрытие изображения
  outputColors.innerHTML = "" // жесткое скрытие цветовых блоков
  deleteBlock.style.display = "none" // жесткое скрытие кнопки удаления
}

export const deleteHandler = () => {
  visualHideOutput()
  hardShowFormContainer()
  formBlock.value = "" // reset input

  const clear_animation_time = setTimeout(() => {
    visualShowFormContainer()
    hardHideOutput()

    clearTimeout(clear_animation_time)
  }, 400)
}

export const loadAnimation = () => {
  const anim_time = setTimeout(() => {
    formContainer.classList.add("load-animation")
    mainTitle.classList.add("load-animation")
    clearTimeout(anim_time)
  }, 400)
}
