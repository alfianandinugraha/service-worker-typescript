"use strict";
if ('serviceWorker' in navigator) {
    window.addEventListener("load", function () {
        navigator
            .serviceWorker
            .register("../sw.js")
            .then(function () { return console.log("registration success !"); })["catch"](function () { return console.error("registration failed !"); });
    });
}
else {
    console.error("Service worker not support");
}
