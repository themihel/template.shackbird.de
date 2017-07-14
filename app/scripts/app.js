/**
 * Smooth Scroll
 */
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}

// eslint-disable-next-line no-unused-vars
function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 50);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (var j = startY; j > stopY; j -= step) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}

/**
 * Gigs
 */
function getDaysToToday(EndDate) {
    var StartDate = new Date();

    return (Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
        Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate())) / 86400000;
}

function getTemplateForGig(days) {
    var html = '';
    if (days < 0) {
        html += '<div class="line-normal">Vor</div>';
        html += '<div class="line-big">' + Math.abs(days) + '</div>';
        html += '<div class="line-normal">Tagen</div>';
    } else if (days === 0) {
        html += '<div class="line-image"><img src="images/ShackbirdBird.png" alt="Shackbird - Bird Logo"></div>';
        html += '<div class="line-normal">Heute</div>';
    } else if (days === 1) {
        html += '<div class="line-normal">Noch</div>';
        html += '<div class="line-big">' + days + '</div>';
        html += '<div class="line-normal">Tag</div>';
    } else {
        html += '<div class="line-normal">Noch</div>';
        html += '<div class="line-big">' + days + '</div>';
        html += '<div class="line-normal">Tage</div>';
    }

    return html;
}

var gigEntries = document.querySelectorAll('.gigs-entry');

for (var i = 0; i < gigEntries.length; i++) {
    var entry = gigEntries[i];
    var date = entry.dataset.date;
    var daysBetween = getDaysToToday(new Date(date));
    var childs = entry.childNodes;
    for (var j = 0; j < childs.length; j++) {
        if (childs[j].classList == 'col-xs-3 col-sm-2 col-md-1 line-highlight') {
            childs[j].innerHTML = getTemplateForGig(daysBetween);
        }
    }
}

/**
 * Parallax
 */
if (!('ontouchstart' in window)) {
    paraxify('paraxify', {
        speed: 0.5,
        boost: 0.5
    });
}
