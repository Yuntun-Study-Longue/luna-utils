export const loadJs = function (src, callback) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.setAttribute("src", src);
    script.onload = callback; 
    script.crossOrigin = "anonymous";
    head.appendChild(script);
}