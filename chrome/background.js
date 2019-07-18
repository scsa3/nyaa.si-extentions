chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({color: '#3aa757'}, function () {
        console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'sukebei.nyaa.si'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


function titleQueryCode() {
    const cssSelector = '.panel-title';
    const title = document.querySelector(cssSelector).innerHTML;
    return title.match(/[a-z]{2,5}-?[0-9]{3}/i)
}


chrome.pageAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(
        tab.id,
        {
            code: '(' + titleQueryCode + ')();'
        },
        (results) => {
            const dvdID = String(results).replace('-', '');
            const url = 'https://www.dmm.co.jp/mono/dvd/-/detail/=/cid=' + dvdID;
            chrome.tabs.create({'url': url});
            // alert(typeof results);
        });
});
