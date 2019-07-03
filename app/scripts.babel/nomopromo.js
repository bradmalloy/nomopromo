'use strict';

console.log('nomopromo is removing non-video cards...');

var premiereWithButton = '//yt-formatted-string[contains(text(),"Set reminder")]';
var pwbParents = 5;
var premiereWithText = '//span[contains(text(),"Premiere")]';
var pwtParents = 6;


tryRemoveCards(premiereWithButton, pwbParents);
tryRemoveCards(premiereWithText, pwtParents);

function tryRemoveCards(xpath, numParents) {
    var stop = false;
    var buttons = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    while (!stop) {
        if (buttons.invalidIteratorState) {
            console.debug('Page changed, trying again.');
            buttons = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        }
        var button = buttons.iterateNext();
        if (!button) {
            stop = true;
            break;
        }
        removeParentAtNum(button, 0, numParents);
    }
}

function removeParentAtNum(element, num, stopAt) {
    if (num == stopAt + 1) {
        console.log('Killng a Youtube non-video card.');
        element.remove();
        return; 
    } else {
        console.debug('tracing parents... current element:');
        console.debug(element);
        removeParentAtNum(element.parentElement, num + 1, stopAt);
    }
}