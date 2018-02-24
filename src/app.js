import options from "./options"

export default function () {
  console.log("App started")

  const rootEl = document.getElementById("root")
  options(rootEl)
}