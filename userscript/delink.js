for (const e of document.links) {
    if (e.innerText.match(/\.jpg|jpeg|png&/)) {
        console.log(e.href);
        e.insertAdjacentHTML('afterend', '<br><img src="' + e.innerText + '">');
    }
}

