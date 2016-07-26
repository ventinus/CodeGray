window.MODULES = window.MODULES || {};
window.MODULES.projectLink = function() {
  var props = {
    isEnabled: false,
    currentProject: null,
    activeIndex: -1
  };

  var els = {};

  var createChildren = function() {
    els.projects = document.getElementsByClassName('js-project');

    return;
  }

  var onProjectClick = function(index, e) {
    if (props.activeIndex !== -1) {
      props.currentProject.style.height = '';
      props.currentProject.classList.remove('is-visible');

      if (index === props.activeIndex) {
        props.activeIndex = -1;
        props.currentProject = null;
        return;
      }
    }

    props.activeIndex = index;
    props.currentProject = e.currentTarget.nextSibling;

    var targetHeight = props.currentProject.children[0].offsetHeight + 10;
    props.currentProject.classList.add('is-visible');
    props.currentProject.style.height = targetHeight + 'px';

    return;
  }

  var enable = function() {
    if (props.isEnabled) return;

    for (var i = els.projects.length - 1; i >= 0; i--) {
      (function(index) {
        els.projects[i].addEventListener('click', onProjectClick.bind(this, index));
      })(i)
    }

    props.isEnabled = true;
    return;
  }

  var disable = function() {
    if (!props.isEnabled) return;

    for (var i = els.projects.length - 1; i >= 0; i--) {
      (function(index) {
        els.projects[i].removeEventListener('click', onProjectClick.bind(this, index));
      })(i)
    }

    props.isEnabled = false;
    return;
  }

  return {
    init: function() {
      // props.isTouchDevice = deviceDetector.isTouchDevice();

      // if (!props.isTouchDevice) return;

      createChildren();
      enable();
      return;
    },
    enable: enable,
    disable: disable
  }
}
