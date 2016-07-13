window.UTILS = window.UTILS || {};
window.UTILS.DeviceDetection = function() {
  var isTouchDevice = function() {
    if ('ontouchstart' in window) {
      return true;
    }

    return false;
  }


  return {
    isTouchDevice: isTouchDevice
  }
}
