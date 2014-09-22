group.options.add(["scrolltime", "jj"],
    "The time, in milliseconds, in which to smooth scroll to a new position",
    "number", 20);
group.options.add(["scrollsteps", "kk"],
    "The number of steps to in which to smooth scroll to a new position",
    "number", 5,
    { validator: function (value) value > 0 });
function smoothScroll(elem, x, y) {
    let time = options["scrolltime"];
    let steps = options["scrollsteps"];
    if (elem.dactylScrollTimer)
        elem.dactylScrollTimer.cancel();
    x = elem.dactylScrollDestX = Math.min(x, elem.scrollWidth  - elem.clientWidth);
    y = elem.dactylScrollDestY = Math.min(y, elem.scrollHeight - elem.clientHeight);
    let [startX, startY] = [elem.scrollLeft, elem.scrollTop];
    let n = 0;
    (function next() {
        if (n++ === steps) {
            elem.scrollLeft = x;
            elem.scrollTop  = y;
            delete elem.dactylScrollDestX;
            delete elem.dactylScrollDestY;
        }
        else {
            elem.scrollLeft = startX + (x - startX) / steps * n;
            elem.scrollTop  = startY + (y - startY) / steps * n;
            elem.dactylScrollTimer = util.timeout(next, time / steps);
        }
    }).call(this);
}

var onUnload = overlay.overlayObject(Buffer, {
    scrollTo: function scrollTo(elem, left, top) {
        smoothScroll(elem,
                     left == null ? elem.scrollLeft : left,
                     top == null  ? elem.scrollTop  : top);
    }
});