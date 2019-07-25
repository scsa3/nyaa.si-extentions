// ==UserScript==
// @name        ImageFork
// @description Just browsing images!
// @namespace   https://github.com/plsankar1996/ImageFork
// @homepage    https://github.com/plsankar1996/ImageFork
// @author      plsankar1996
// @version     4.1
// @downloadURL https://github.com/plsankar1996/ImageFork/raw/master/ImageFork.user.js
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// @grant       GM_setClipboard
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @include     *://dailyimages.xyz/*.html
// @include     *://shaggyimg.pro/*
// @include     *://www.imgfile.net/*
// @include     *://www.imgsky.net/*
// @include     *://imgtorrnt.in/*
// @include     *://imgclick.net/*
// @include     *://imgbaron.com/*.html
// @include     *://imagetwist.com/*
// @include     *://imgur.com/*
// @include     *://jerking.empornium.ph/image/*
// @include     *://picpicture.com/image/*
// @include     *://lookimg.com/image/*
// @include     *://imgmak.com/image/*
// @include     *://imgbbb.com/image/*
// @include     *://extraimages.net/image/*
// @include     *://bustyimg.top/image/*
// @include     *://storepic.com/image/*
// @include     *//extraimage.net/image/*
// @include     *://xxxhost.me/viewer.php?file=*
// @include     *://123poze.3x.ro/viewer.php?file=*
// @include     *://freeimghosting.co.uk/viewer.php?file=*
// @include     *://www.uploadking.biz/show.php/*
// @include     *://hostpix.de/show.php*
// @include     *://foto.xhost.lv/show*
// @include     *://www.imgshots.com/show/*
// @run-at      document-start
// @include     *://www.imagepearl.com/*
// @include     *://picbaron.com/*
// @include     *://imgmercy.com/*
// @include     *://avenuexxx.com/archives/*
// @include     *://imggold.org/*
// @include     *://imgchili.net/*
// @include     *://imgskull.*
// @include     *://imghall.com/?v=*
// @include     *://imgking.xyz/*
// @include     *://imgazure.com/*
// @include     *://*.imghost.top/*
// @include     *://imgsmarts.info/*
// @include     *://imgspice.com/*
// @include     *://*.imgspice.com/*
// @include     *://www.imagebam.com/*
// @include     *://trans.firm.in/*
// @include     *://imguur.pictures/*
// @include     *://imgsee.net/*
// @include     *://imggmi.com/full/*
// @include     *://subefotos.com/*
// @include     *your-pictures.net/p*
// @include     *://www.turboimagehost.com/p/*
// @include     *://1pic.org/view/*.html
// @include     *://imagescanner.cc/images/*.html
// @include     *://*.imagevenue.com/img.php?*
// @include     *dumppix.com/viewer*
// @include     *://www.imagestime.*/imageshow.php/*
// @include     *://www.imagesnake.*/show*
// @include     *://www.freebunker.*/show*
// @include     *://www.imagefruit.*/show*
// @include     *://www.imgcarry.*/show*
// @include     *://www.pornbus.*/show*
// @include     *://fotoo.*/show*
// @include     */img-*.html
// @include     */imgs-*.html
// @include     */imgv-*.html
// @include     */share-*.html
// @include     */site/v/*
// ==/UserScript==

var $ = window.jQuery,
    href = window.location.href,
    host = window.location.hostname,
    observer = new MutationObserver(onDOMChange),
    myObj = {
        urlRedirects: [{
            find: /(\/imgs-)/gi,
            replace: "/imgv-"
        }, {
            find: /\/i\?v=/gi,
            replace: "/images/"
        }, {
            find: /(iceimg|pixsense)\.net\/site\/v\//gi,
            replace: "imgfile.net/site/v/"
        }, {
            find: /(.*)(imgtorrnt\.in\/view\.php\?id=)(.*)/gi,
            replace: "https://i.imgur.com/$3.jpg"
        }, {
            find: /(123poze\.3x\.ro|xxxhost\.me)(\/viewer.php\?file=)/gi,
            replace: "$1/files/"
        }, {
            find: /(freeimghosting\.co\.uk)(\/viewer.php\?file=)/gi,
            replace: "$1/images/"
        }],
        imgReplaces: [{
            find: /(\?fb)/gmi,
            replace: ''
        }, {
            find: /(\.md\.|\.th\.)/gmi,
            replace: '.'
        }, {
            find: /\/small\//gmi,
            replace: '/big/'
        }, {
            find: /thumb/gmi,
            replace: 'image'
        }, {
            find: /p.jpeg/gmi,
            replace: '.jpeg'
        }],
        elemtntsToDeal: [
            'script:contains("soDaBug")',
            'a[href*="imgtorrnt.in/view.php?id="]:eq(1)',
            'meta[property*="og:image"]:not(meta[content*="logo"])',
            'img[src*="' + host + '/uploads/big/"]',
            'img[src*="' + host + '/upload/big/"]',
            'img[src*="' + host + '/uploads/small/"]',
            'img[src*="' + host + '/upload/small/"]',
            'img[src*="' + host + '/img/"]',
            'img[src*="' + host + '/images/"]',
            'img[src*="' + host + '/images/20"]',
            'img[src*="' + host + '/files/"]',
            'img[src*="' + host + '/wp-content/uploads/"]',
            'a.btn-download',
            'img#img_obj',
            '#uImage',
            'a.lightbox',
            'img#boring',
            'img#iimg',
            '#full_image',
            'img#myImg',
            '.centred',
            '.centred_resized',
            '#show_image',
            '.code_image',
            '#thepic',
            'img#image',
            'a:has(img#myUniqueImg)',
            'img.image-responsive',
            ".pic",
            'input[type=submit][value*="continue"]',
            'input[type=submit][value*="Continue"]',
            'form input[type=submit][value*="continue"]',
            'form input[type=submit][value*="Continue"]',
            '#continuetoimage form input[type=submit]'
        ],
        elemtntsToRemove: 'script:not(script:contains("soDaBug")), noscript, iframe, frame, link, style, video, ' +
            'div[class*="login"] form, div[id*="login"] form, input[type=submit][value*="Rate"], ' +
            '#popup, div[class*="ads"], div[id*="ads"], div[class*="overlay"], ' +
            'header, #header, .header, img[src*="logo"], .brand, .menu, #menu, .logo, #logo, .navbar, .sidenav, nav, .nav, #nav, ' +
            'ul, li, textarea, ' +
            'footer, div[id*="footer"], div[class*="footer"]'
    };

if (href.lastIndexOf(host) + host.length - href.length == -1 ||
    document.title.indexOf("Attention Required") != -1 ||
    document.title.indexOf("Just a moment") != -1) {

    return false;

} else if (document.images.length == 1 && document.images[0].src == window.location.href) {

    return false;

} else {

    document.title = `ImageFork - ${host.toUpperCase()}`;

    var newhref = null;

    for (var i = myObj.urlRedirects.length - 1; i >= 0; i--) {
        if (myObj.urlRedirects[i].find.test(href)) {
            newhref = href.replace(myObj.urlRedirects[i].find, myObj.urlRedirects[i].replace);
            break;
        }
    }

    if (newhref) {
        stopWindow();
        window.location.href = newhref;
    } else {
        observer.observe(document, {
            childList: !0,
            subtree: !0
        });
        document.addEventListener('beforeload', beforeload, true);
        window.addEventListener('beforescriptexecute', beforescriptexecute, true);
    }
}

function onDOMChange(mutations) {

    cleanDOM();

    var a = 0;

    mutations.forEach(function (mutation) {
        a += mutation.addedNodes.length;
    });

    if (a == 0) {
        return;
    }

    for (var i = myObj.elemtntsToDeal.length - 1; i >= 0; i--) {
        var el = $(myObj.elemtntsToDeal[i]);
        if (el.length) {
            if (el.is('img')) {
                openImage(makeImageBigger(el.attr('src')));
            } else if (el.is('a')) {
                openImage(makeImageBigger(el.attr('href')));
            } else if (el.is('input')) {
                stopWindow();
                el.click();
            } else if (el.is('meta')) {
                openImage(makeImageBigger(el.attr('content')));
            } else if (el.is('script:contains("soDaBug")')) {
                openImage(makeImageBigger(el.text().replace(/(?:.*)(?:\.src =\ ")(.*)(?:\"\;)(?:.*)/gims, "$1")));
            } else {
                continue;
            }
            break;
        }
    }
}

function makeImageBigger(url) {
    for (var i = myObj.imgReplaces.length - 1; i >= 0; i--) {
        if (myObj.imgReplaces[i].find.test(url)) {
            url = url.replace(myObj.imgReplaces[i].find, myObj.imgReplaces[i].replace);
            break;
        }
    }
    return url;
}

function openImage(url) {
    stopWindow();
    window.location.href = url;
}

function stopWindow() {
    document.removeEventListener('beforeload', beforeload);
    window.removeEventListener('beforescriptexecute', beforescriptexecute);
    observer.disconnect();
    window.stop();
}

function cleanDOM() {
    $(myObj.elemtntsToRemove).remove();
}

function beforeload(e) {
    cleanDOM();
}

function beforescriptexecute(e) {
    e.stopPropagation();
    e.preventDefault();
    $(e.target).remove();
    cleanDOM();
}

function qS(query) {
    return document.querySelector(query);
}
