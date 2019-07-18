// ==UserScript==
// @name            Image Delinker for subeike.nyaa.si
// @description     Link to image
// @match           *://localhost:63343/*
// @match           *://subeike.nyaa.si/*
// @version         0.0.1
// ==/UserScript==
for (const e of document.links) {
    if (e.innerText.match(/\.jpg|jpeg|png&/)) {
        console.log(e.href);
        e.insertAdjacentHTML('afterend', '<br><img src="' + e.innerText + '">');
    }
}
