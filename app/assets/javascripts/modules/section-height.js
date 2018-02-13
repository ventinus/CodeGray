window.MODULES = window.MODULES || {};
window.MODULES.sectionHeight = function() {
  var props = {
    isEnabled: false
  }
  var els = {}

  var createChildren = function() {
    els.sections = document.getElementsByClassName('js-full-section');
  }

  var resizeSections = function() {
    var windowHeight = window.innerWidth < 580 ? window.innerHeight + 'px' : window.innerHeight - 40 + 'px';

    for (var i = els.sections.length - 1; i >= 0; i--) {
      els.sections[i].style.minHeight = windowHeight;
    }
  }

  var enable = function() {
    if (props.isEnabled) return;

    props.resizeListener = window.UTILS.Debounce(resizeSections, 200, false)

    window.addEventListener('resize', resizeSections);

    props.isEnabled = true;
  }

  var disable = function() {
    if (!props.isEnabled) return;

    window.removeEventListener('resize', resizeSections);

    props.isEnabled = false;
  }

  return {
    init: function() {
      createChildren();
      resizeSections();
      enable();
      return;
    },
    enable: enable,
    disable: disable
  }
}
