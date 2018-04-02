(function (doc, win) {
  var UA = navigator.userAgent,
    isAndroid = /android|adr/gi.test(UA),
    isIos = /iphone|ipod|ipad/gi.test(UA);
  var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function () {
      if(document.activeElement.tagName.toLocaleLowerCase()=='input' || document.activeElement.tagName.toLocaleLowerCase()=='textarea') return
      var min=docEl.clientWidth-docEl.clientHeight;
      var clientWidth = min<=0?docEl.clientWidth:docEl.clientHeight

      var maxwidth = docEl.dataset.mw || 750;
      var dpr = isIos ? Math.min(win.devicePixelRatio, 2) : 1
      // var dpr=parseInt(win.devicePixelRatio)
      if (!clientWidth) return;
      if (clientWidth * dpr > maxwidth) {
          clientWidth = maxwidth/dpr;
      }
      if(isAndroid || isIos){
        console.log(1)
        docEl.style.fontSize = parseInt(100 * (clientWidth / 750)) + 'px';
      }else{
        docEl.style.fontSize='60px'
      }
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

