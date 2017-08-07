'use strict';

const CSS = `
body * {
  /*CSS transition*/
  transition: none !important;
  /*CSS animations*/
  animation-delay: 0ms !important;
  animation-duration: 0ms !important;
 }
`;

let playTransition = false;
//init
toogleTransition();

browser.browserAction.onClicked.addListener(handleClick);
browser.webNavigation.onCommitted.addListener(handeTabUpdate)


function handleClick() {
    playTransition = !playTransition;
    toogleTransition();
}

function handeTabUpdate(details) {
	// @todo use details.frameId to inject in the specific updated frame
    if (playTransition === false) {
        disableTabTransition(details.tabId);
    }
}

function toogleTransition() {
    if (playTransition === false) {
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
    browser.tabs.query({}).then((tabs) => {
        for (let tab of tabs) {
            disableTabTransition(tab);
        }
    });
}

function disableTabTransition(tab) {
    browser.tabs.insertCSS(tab.id, { code: CSS, cssOrigin: 'user', allFrames: true });
}

function enableAllTabsTransition() {
    browser.tabs.query({}).then((tabs) => {
        for (let tab of tabs) {	
            enableTabTransition(tab);
        }
    });
}


function enableTabTransition(tab) {
    browser.tabs.removeCSS(tab.id, { code: CSS, cssOrigin: 'user', allFrames: true });
}
