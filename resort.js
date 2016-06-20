var RE_NUM = /\d+/;

// From http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
function loadXMLDoc(url) {
    var xmlhttp;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if(xmlhttp.status == 200){
            var parser = new DOMParser();
            var doc = parser.parseFromString(xmlhttp.responseText, "text/html");
           }
           else if(xmlhttp.status == 400) {
              alert('There was an error 400')
           }
           else {
               alert('something else other than 200 was returned')
           }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// From https://github.com/coolaj86/knuth-shuffle/blob/master/index.js
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function getNextPageLink() {
  return document.getElementsByClassName('morelink')[0].href;
}

function extractScore(el) {
  try {
    var scoreString = el.getElementsByClassName('score')[0].innerHTML;
    return parseInt(scoreString.match(RE_NUM)[0], 10);
  } catch (e) {
    console.log(e); // Probably the scoreless posts (hiring)
    return 0;
  }
}

function getHNLinks(doc) {
  var links = [];
  var itemTable = doc.getElementsByClassName('itemlist')[0];
  var items = Array.prototype.slice.call(itemTable.getElementsByClassName('athing'));
  items.forEach(function(el) {
    var score = extractScore(el.nextSibling);

    links.push({
      el: el,
      next: el.nextSibling,
      score: score
    });
  });
  return links;
}

var linksPage1 = getHNLinks(document);

var nextPage = getNextPageLink();
loadXMLDoc(nextPage);

// var ls = document.getElementsByClassName('tr');
