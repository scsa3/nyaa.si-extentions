// ==UserScript==
// @name            temp3
// @include         /temp3\.html/
// @version         0.0.1
// ==/UserScript==
console.log('temp3 user js');
window.onmessage = function (e) {
    window.top.postMessage(
        {
            "id": e.data,
            "url": window.location.href
        },
        '*'
    );
};