import grid from "./grid"

import { MIN_GRID_SIZE, MAX_GRID_SIZE } from "./constants"

export default function (rootEl) {
  const form = document.createElement("form")
  form.setAttribute("id", "options-form")

  const gridSizeInput = document.createElement("input")
  gridSizeInput.setAttribute("type", "number")
  gridSizeInput.setAttribute("name", "grid-size")
  gridSizeInput.setAttribute("id", "options-grid-size-input")
  gridSizeInput.setAttribute("value", MIN_GRID_SIZE)

  const button = document.createElement("button")
  button.innerHTML = "Get Grid"

  form.appendChild(gridSizeInput)
  form.appendChild(button)

  rootEl.appendChild(form)

  document.querySelector("#options-grid-size-input").addEventListener("input", function() {
    if (this.value === 0) return 
    const gridSize = parseFloat(this.value)

    if (gridSize < MIN_GRID_SIZE) this.value = MIN_GRID_SIZE
    if (gridSize > MAX_GRID_SIZE) this.value = MAX_GRID_SIZE
  })

  document.querySelector("#options-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const gridSize = parseInt(document.querySelector("#options-grid-size-input").value)
    grid(rootEl, gridSize)
  })
}