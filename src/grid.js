import union from "./union_find/union"
import connected from "./union_find/connected"

export default function (rootEl, gridSize) {
  const oldGrid = document.getElementById("grid")
  if (oldGrid) oldGrid.remove()

  const grid = document.createElement("div")
  grid.setAttribute("id", "grid")
  grid.setAttribute("class", "grid")

  const blocksCount = gridSize*gridSize
  
  let row
  for (let i=0; i < blocksCount; i++) {
    if (i === 0) row = document.createElement("div")

    const block = document.createElement("div")    
    block.setAttribute("class", "block closed")
    block.setAttribute("data-open", false)
    block.innerHTML = i

    row.appendChild(block)

    if ((i == blocksCount - 1) || ((i % gridSize === (gridSize - 1))) && i !== 0) {
      grid.appendChild(row)
      row = document.createElement("div")
    }
  }
  rootEl.appendChild(grid)

  const ids = []
  const sz = []
  const openIds = []

  for (let i = 0; i < blocksCount + 2; i++) {
    ids[i] = i
    sz[i] = 1
  }

  const topSideId = blocksCount - 1
  const bottomSideId = blocksCount - 2

  document.querySelectorAll("#grid .block").forEach( (el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault()

      if (this.getAttribute("data-open") === "true") return

      this.classList.remove("closed")
      this.classList.add("open")
      this.setAttribute("data-open", true)

      const id = parseInt(this.innerHTML)

      if (id < gridSize) union(id, topSideId, ids, sz)
      if ((blocksCount - id) < gridSize) union(id, bottomSideId, ids, sz)

      let leftId, rigthId, topId, bottomId

      if ((id % gridSize) > 0) leftId = id - 1
      if ((id % gridSize) < gridSize-1) rigthId = id + 1
      if (id >= gridSize) topId = id - gridSize
      if ((blocksCount - id) > gridSize) bottomId = id + gridSize

      if (leftId && (openIds.indexOf(leftId) !== -1)) union(id, leftId, ids, sz)
      if (rigthId && (openIds.indexOf(rigthId) !== -1)) union(id, rigthId, ids, sz)
      if (topId && (openIds.indexOf(topId) !== -1)) union(id, topId, ids, sz)
      if (bottomId && (openIds.indexOf(bottomId) !== -1)) union(id, bottomId, ids, sz)

      openIds.push(id)

      const blocks = document.querySelectorAll("#grid .block")
      for (var i = 0; i < blocks.length; i++) {
        const blockId = parseInt(blocks[i].textContent)
        if ((openIds.indexOf(blockId) !== -1) && connected(blockId, topSideId, ids)) blocks[i].classList.add("full")
      }

      if (connected(topSideId, bottomSideId, ids) && !document.getElementById("percolate-label")) {
        const label = document.createElement("div")
        label.setAttribute("id", "percolate-label")
        label.innerHTML = "<h2>Grid Percolates!</h2>"
        grid.appendChild(label)
      }
    })
  })



}