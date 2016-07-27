// TODO: rewrite with Velocity
window.UTILS = window.UTILS || {};
window.UTILS.SmoothScroll = function() {
  var props = {
    easing: 'ease-in-out',
    duration: 300
  };

  var deviceDetection = window.UTILS.DeviceDetection();

  var currentYPosition = function() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }

  var elmYPosition = function(el) {
    var y = el.offsetTop;
    var node = el;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }
    return y;
  }

  var scrollTo = function(el) {
    Velocity(el, 'scroll', {
      duration: props.duration,
      easing: props.easing,
      offset: deviceDetection.isMobileWidth() ? 0 : -46,
      mobileHA: false
    })
  }

  return {
    getCurrentScroll: currentYPosition,
    getElPageOffset: elmYPosition,
    scrollTo: scrollTo
  }
}
