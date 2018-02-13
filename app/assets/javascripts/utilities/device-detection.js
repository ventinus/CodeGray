window.UTILS = window.UTILS || {};
window.UTILS.DeviceDetection = function() {
  var props = {
    sm: 580,
    md: 768
  };

  var isTouchDevice = function() {
    if ('ontouchstart' in window) {
      return true;
    }

    return false;
  }

  var isMobileWidth = function() {
    if (window.innerWidth < 580) return true;
    return false;
  }

  var currentBreakpoint = function() {
    return window.innerWidth < props.sm ? 'xs' : (window.innerWidth < props.md ? 'sm' : 'md');
  }


  return {
    isTouchDevice: isTouchDevice,
    isMobileWidth: isMobileWidth,
    currentBreakpoint: currentBreakpoint
  }
}
