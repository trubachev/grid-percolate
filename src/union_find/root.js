export default function (i, ids) {
  while (ids[i] != i) {
    ids[i] = ids[ids[i]]
    i = ids[i]
  }
  return i
}