import root from "./root"

export default function (i, j, ids) {
  return root(i, ids) === root(j, ids)
}