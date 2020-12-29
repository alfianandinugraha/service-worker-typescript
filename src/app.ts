if ('serviceWorker' in navigator) {
  window.addEventListener("load", () => {
    navigator
      .serviceWorker
      .register("/service-worker-typescript/sw.js")
      .then(() => console.log("registration success !"))
      .catch(() => console.error("registration failed !"))
  })
} else {
  console.error("Service worker not support")
}