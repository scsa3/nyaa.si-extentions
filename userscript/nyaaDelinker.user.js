// ==UserScript==
// @name            NYAA delinker
// @description     Make link to image or iframe in sukebei.nyaa.si page. This script depend on ImageFork. Address is https://github.com/plsankar1996/ImageFork
// @include         /sukebei\.nyaa\.si/
// @include         /\.jpg/
// @version         1.0.0
// ==/UserScript==

if (/\.jpg/.test(window.location.href)) {
    window.onmessage = function (e) {
        childSender(e);
    };
} else {
    // do something when receive message
    window.onmessage = function (e) {
        iframeToImg(e);
    };
    // link to iframe
    let links = document.querySelectorAll("#torrent-description > p > a");
    var ifCounter = 0;
    for (let target of links) {
        let newElement = Object();
        if (/.jpg$/.test(target.href) && !/imagetwist/.test(target.href)) {
            newElement = createImg(target);
        } else {
            newElement = createIframe(target);
        }
        target.parentElement.insertBefore(newElement, target);
    }
}

function createImg(target) {
    let img = document.createElement("img");
    img.src = target.href;
    return img;
}

function createIframe(target) {
    let iframe = document.createElement("iframe");
    ifCounter = ifCounter + 1;
    iframe.id = 'iframe' + ifCounter;
    iframe.src = target.href;
    iframe.style.width = '1024px';
    iframe.style.height = '768px';
    iframe.onload = async function () {
        await sleep(1000);
        iframe.contentWindow.postMessage(iframe.id, '*');
    };
    return iframe;
}

function childSender(e) {
    window.top.postMessage(
        {
            "id": e.data,
            "url": window.location.href
        },
        '*'
    );
}

function iframeToImg(e) {
    let img = document.createElement("img");
    img.src = e.data.url;
    let iframe = document.getElementById(e.data.id);
    iframe.parentNode.replaceChild(img, iframe);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}