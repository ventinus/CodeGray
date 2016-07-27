window.MODULES = window.MODULES || {};
window.MODULES.projectLink = function() {
  var deviceDetection = window.UTILS.DeviceDetection();

  var props = {
    isEnabled: false,
    currentProject: null,
    activeIndex: -1,
    duration: 300,
    easing: 'linear',
    currentBreakpoint: deviceDetection.currentBreakpoint(),
    rowAssignments: {
      xs: 2,
      sm: 3,
      md: 4
    }
  };

  var els = {};

  var createChildren = function() {
    els.projects = document.getElementsByClassName('js-project');
    els.projectDeets = document.getElementsByClassName('js-project-deets');
    els.maxWidth = document.querySelector('.js-max-width-lg');

    return;
  }

  var onResize = function(e) {
    resizeDeets();

    var checkBP = deviceDetection.currentBreakpoint();
    if (checkBP === props.currentBreakpoint) return;

    props.currentBreakpoint = checkBP;
    assignRows();

    return
  }

  var resizeDeets = function() {
    var maxWidthMargin = els.maxWidth.getBoundingClientRect().left;
    for (var i = els.projectDeets.length - 1; i >= 0; i--) {
      var offsetLeft = els.projectDeets[i].previousSibling.getBoundingClientRect().left;
      els.projectDeets[i].style.left = -offsetLeft + maxWidthMargin + 'px';
    }

    if (props.currentProject) {
      var targetHeight = props.currentProject.children[0].offsetHeight + 10;
      props.currentProject.style.height = targetHeight + 'px';
    }

    return;
  }

  var assignRows = function() {
    for (var i = els.projects.length - 1; i >= 0; i--) {
      els.projects[i]['row'] = Math.floor(i/props.rowAssignments[props.currentBreakpoint]);
    }

    return;
  }

  var expand = function(el, duration) {
    var transitionDuration = duration || props.duration;
    el.classList.add('is-visible');
    var targetHeight = el.children[0].offsetHeight + 10;

    Velocity(el, {
      height: targetHeight,
      easing: props.easing
    }, transitionDuration);

    return;
  }

  var collapse = function(el, duration) {
    var transitionDuration = duration || props.duration;

    Velocity(el, {
      height: 0,
      easing: props.easing
    }, transitionDuration).then(function() {
      el.classList.remove('is-visible');
    });

    return;
  }

  var swapProjects = function(newProjectParent) {
    // if in same row
    if (props.currentProject.previousElementSibling.row == newProjectParent.row) {
      collapse(props.currentProject, '0s');
      props.currentProject = newProjectParent.nextSibling;
      expand(props.currentProject, '0s');

    // in different rows
    } else {
      collapse(props.currentProject);
      props.currentProject = newProjectParent.nextSibling;
      expand(props.currentProject);
    }

    return;
  }

  var onProjectClick = function(index, e) {
    // first click on a project
    if (props.activeIndex === -1) {
      props.activeIndex = index;
      props.currentProject = e.currentTarget.nextSibling;
      expand(props.currentProject);
    } else {
      // clicks the project already expanded
      if (props.activeIndex === index) {
        collapse(props.currentProject);
        props.activeIndex = -1;
        props.currentProject = null;

      // clicks a different one
      } else {
        props.activeIndex = index;
        swapProjects(e.currentTarget);
      }
    }

    return;
  }

  var enable = function() {
    if (props.isEnabled) return;

    for (var i = els.projects.length - 1; i >= 0; i--) {
      (function(index) {
        els.projects[i].addEventListener('click', onProjectClick.bind(this, index));
      })(i)
    }

    props.resizeHandler = window.UTILS.Throttle(onResize, 100);

    window.addEventListener('resize', props.resizeHandler);

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

    window.addEventListener('resize', props.resizeHandler);

    props.isEnabled = false;
    return;
  }

  return {
    init: function() {
      // props.isTouchDevice = deviceDetector.isTouchDevice();

      // if (!props.isTouchDevice) return;

      createChildren();
      resizeDeets();
      assignRows();
      enable();
      return;
    },
    enable: enable,
    disable: disable
  }
}
