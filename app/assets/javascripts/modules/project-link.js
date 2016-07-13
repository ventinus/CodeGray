window.MODULES = window.MODULES || {};
window.MODULES.projectLink = function() {
  var props = {
    isEnabled: false,
    isTouchDevice: false,
    lastIndex: -1
  };

  var els = {};
  var deviceDetector = window.UTILS.DeviceDetection();

  var createChildren = function() {
    els.projectLinks = document.getElementsByClassName('js-project-link');

    return;
  }

  var onProjectLinkTouch = function(index, e) {
    if (e.currentTarget.beenClicked && props.lastIndex === index) {
      return
    }

    e.preventDefault();

    // set the clicked prop of the last el
    if (index > -1) {
      els.projectLinks[index].beenClicked = false;
    }

    props.lastIndex = index;
    e.currentTarget.beenClicked = true;

    return;
  }

  var enable = function() {
    if (props.isEnabled || !props.isTouchDevice) return;

    for (var i = els.projectLinks.length - 1; i >= 0; i--) {
      (function(index) {
        els.projectLinks[i].addEventListener('touchend', onProjectLinkTouch.bind(this, index));
      })(i)
      els.projectLinks[i]['beenClicked'] = false;
    }

    props.isEnabled = true;
    return;
  }

  var disable = function() {
    if (!props.isEnabled || !props.isTouchDevice) return;

    for (var i = els.projectLinks.length - 1; i >= 0; i--) {
      (function(index) {
        els.projectLinks[i].removeEventListener('touchend', onProjectLinkTouch.bind(this, index));
      })(i)
      els.projectLinks[i]['beenClicked'] = null;
    }

    props.isEnabled = false;
    return;
  }

  return {
    init: function() {
      props.isTouchDevice = deviceDetector.isTouchDevice();

      if (!props.isTouchDevice) return;

      createChildren();
      enable();
      return;
    },
    enable: enable,
    disable: disable
  }
}
