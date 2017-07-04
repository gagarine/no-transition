'use strict';

const CSS = `
* {
  /*CSS transition*/
  -o-transition-property: none !important;
  -moz-transition-property: none !important;
  -ms-transition-property: none !important;
  -webkit-transition-property: none !important;
  transition-property: none !important;
  /*CSS animations*/
  -webkit-animation: none !important;
  -moz-animation: none !important;
  -o-animation: none !important;
  -ms-animation: none !important;
  animation: none !important;
 }
`;

let playTransition = false;
//init
toogleTransition();

browser.browserAction.onClicked.addListener(handleClick);
browser.tabs.onUpdated.addListener(handeTabUpdate)

function handleClick(){
  console.log('---clik---');
  playTransition = !playTransition;
  toogleTransition();
}

function handeTabUpdate(tabId, changeInfo, tabInfo){
  if(playTransition == false){
    disableTabTransition(tabId);
  }
}

function toogleTransition(){
    if(playTransition == false) {
    disableAllTabsTransition();
    browser.browserAction.setIcon({path: "icons/play.svg"});
  } else{
    enableAllTabsTransition();
    browser.browserAction.setIcon({path: "icons/pause.svg"});
  }
}

function disableAllTabsTransition(){
  console.log('---disableAllTabsTransition---');
  var gettingAllTabs = browser.tabs.query({});
  gettingAllTabs.then((tabs) => {
    for (let tab of tabs) {
      disableTabTransition(tab);
    }
  });
}

function disableTabTransition(tab){
  browser.tabs.insertCSS(tab.id, {code: CSS});
}

function enableAllTabsTransition(){
  console.log('---disableAllTabsTransition---');
  var gettingAllTabs = browser.tabs.query({});
  gettingAllTabs.then((tabs) => {
    for (let tab of tabs) {
      enableTabTransition(tab, {code: CSS});
    }
  });
}


function enableTabTransition(tab){
  browser.tabs.removeCSS(tab.id, {code: CSS});
}