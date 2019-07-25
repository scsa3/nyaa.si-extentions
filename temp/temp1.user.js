// ==UserScript==
// @name            temp1
// @include         /temp\.html/
// @version         0.0.1
// ==/UserScript==
window.onmessage = function (e) {
    console.log('parent got: ' + e.data);
};
let re = /.jpg$/;
console.log('temp1 user js');
let links = document.querySelectorAll("#torrent-description > p > a");
let ifCounter = 0;
for (let target of links) {
    if (re.test(target.href)) {
        let img = document.createElement("img");
        img.src = target.href;
        target.parentElement.insertBefore(img, target);
    } else {
        ifCounter = ifCounter + 1;
        let iframe = document.createElement("iframe");
        iframe.src = target.href;
        iframe.id = 'iframe' + ifCounter;
        iframe.style.width = '1024px';
        iframe.style.height = '768px';
        iframe.onload = async function () {
            await sleep(200);
            iframe.contentWindow.postMessage(iframe.id, '*');
        };

        target.parentElement.insertBefore(iframe, target);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}