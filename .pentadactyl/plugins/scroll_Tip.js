
scrollTip = function(){
    var body = (content.document.compatMode == "BackCompat" ? content.document.body : content.document.documentElement);
    var bodyTopAfterScroll = body.scrollTop;
    var timeout;
    var scrollTip;

    function createTip () {
        var tip = content.document.createElement('div');

        tip.setAttribute('id'    , 'scrollTip')
        tip.setAttribute('style' , 'position: absolute; left: 0px; width: 10px; background-color: rgba(135,193,18,0.5) !important;');
        body.appendChild(tip);

        scrollTip = content.document.getElementById("scrollTip");
     }

    function updateTip() {
        if(scrollTip == null)
	    createTip();

        var bodyTopCurrent = body.scrollTop;
        var delta          = bodyTopAfterScroll - bodyTopCurrent;
        var delta_abs      = Math.abs(delta);

        scrollTip.style.height  = delta_abs + "px";
        scrollTip.style.display = "block";
        scrollTip.style.top     = (delta > 0 ? bodyTopCurrent + "px" : (body.clientHeight + bodyTopCurrent - delta_abs) + "px");
    }

    function updateScrollState () {
        bodyTopAfterScroll = body.scrollTop;
    }

    function showScrollTip() {
	updateTip();
 	if(typeof timeout != "undefined")
 	    clearTimeout(timeout);
  	timeout = setTimeout(updateScrollState, 500);
    }
    content.window.addEventListener("scroll", function() { showScrollTip(); }, false);
}
getBrowser().addEventListener("load", scrollTip, true);
