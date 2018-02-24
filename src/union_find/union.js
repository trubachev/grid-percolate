import root from "./root"

export default function (p, q, ids, sz) {
  let i = root(p, ids)
  let j = root(q, ids)
  if (i === j) return
  if (sz[i] < sz[j]) {
    ids[i] = j
    sz[j] += sz[i]
  } else {
    ids[j] = i
    sz[i] += sz[j]
  }
}