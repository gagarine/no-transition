'use strict';

const CSS = `
body * {
  /*CSS transition*/
  transition: none !important;
  /*CSS animations*/
  animation: none !important;
 }
`;

let playTransition = false;
//init
toogleTransition();

browser.browserAction.onClicked.addListener(handleClick);
browser.tabs.onUpdated.addListener(handeTabUpdate)

function handleClick() {
    playTransition = !playTransition;
    toogleTransition();
}

function handeTabUpdate(tabId, changeInfo, tabInfo) {
    if (playTransition == false) {
        disableTabTransition(tabId);
    }
}

function toogleTransition() {
    if (playTransition == false) {
        disableAllTabsTransition();
        browser.browserAction.setIcon({ path: "icons/play.svg" });
        browser.browserAction.setTitle({ title: 'Restore annimations on all tabs' });
    } else {
        enableAllTabsTransition();
        browser.browserAction.setIcon({ path: "icons/pause.svg" });
        browser.browserAction.setTitle({ title: 'Pause annimations on all tabs' });
    }
}

function disableAllTabsTransition() {
    let gettingAllTabs = browser.tabs.query({});
    gettingAllTabs.then((tabs) => {
        for (let tab of tabs) {
            disableTabTransition(tab);
        }
    });
}

function disableTabTransition(tab) {
    browser.tabs.insertCSS(tab.id, { code: CSS, cssOrigin: 'user' });
}

function enableAllTabsTransition() {
    let gettingAllTabs = browser.tabs.query({});
    gettingAllTabs.then((tabs) => {
        for (let tab of tabs) {
            enableTabTransition(tab);
        }
    });
}


function enableTabTransition(tab) {
    browser.tabs.removeCSS(tab.id, { code: CSS, cssOrigin: 'user' });
}