if ('serviceWorker' in navigator) {
  window.addEventListener("load", () => {
    navigator
      .serviceWorker
      .register("../sw.js")
      .then(() => console.log("registration success !"))
      .catch(() => console.error("registration failed !"))
  })
} else {
  console.error("Service worker not support")
}