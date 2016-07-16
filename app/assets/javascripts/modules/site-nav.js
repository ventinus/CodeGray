window.MODULES = window.MODULES || {};
window.MODULES.siteNav = function() {
  var props = {
    isEnabled: false,
    homeIsVisible: false,
    currentLink: null,
    sectionOffsets: [],
    activeScrollPoint: 0,
    triggerOffset: getTriggerOffset(),
    wasNavTriggered: false,
    timeoutId: null
  };

  var els = {};
  var smoothScroll = window.UTILS.SmoothScroll();

  function getTriggerOffset() { return (window.innerHeight - 40) * 0.75; }

  var createChildren = function() {
    els.home = document.getElementById('home');
    els.homePanels = els.home.children;
    els.homeLinks = els.home.querySelectorAll('.js-home-link')
    els.nav = document.getElementsByClassName('js-main-nav')[0];
    els.navLinks = els.nav.querySelectorAll('a');
    els.highlighter = document.getElementsByClassName('js-nav-highlighter')[0];
    els.anchorLinks = document.getElementsByClassName('js-smooth-anchor');
    els.mobileNavToggle = document.getElementsByClassName('js-nav-toggle')[0];
    els.navWrapper = document.querySelector('.js-nav-wrapper');
    return;
  }

  var onNavLinkClick = function(e) {
    e.preventDefault();

    var clickedEl = e.currentTarget;

    setActiveNavItem(clickedEl);
    els.navWrapper.classList.remove('is-visible');

    if (clickedEl.hash) {
      props.wasNavTriggered = true;
      var target = document.querySelector(clickedEl.hash);
      smoothScroll.scrollTo(target);
      resetTriggeredProp();
    } else {
      els.home.classList.add('is-visible');
      document.body.classList.add('no-scroll');
      setTimeout(function(){
        document.documentElement.classList.add('no-scroll');
      }, 500)
    }

    return;
  }

  var onToggleClick = function(e) {
    var action = els.navWrapper.classList.contains('is-visible') ? 'remove' : 'add';
    els.navWrapper.classList[action]('is-visible');
    return;
  }

  var onAnchorLinkClick = function(e) {
    e.preventDefault();
    var target = document.querySelector(e.currentTarget.hash);
    smoothScroll.scrollTo(target);
    return;
  }

  var onHomeLinkClick = function(e) {
    e.preventDefault();

    els.navWrapper.classList.remove('is-visible');
    props.wasNavTriggered = true;
    var correspondingNavLink = null;
    for (var i = els.navLinks.length - 1; i >= 0; i--) {
      if (els.navLinks[i].hash === e.currentTarget.hash) {
        correspondingNavLink = els.navLinks[i];
        i = 0;
      }
    }

    setActiveNavItem(correspondingNavLink)

    var target = document.querySelector(e.currentTarget.hash);
    smoothScroll.scrollTo(target);
    els.home.classList.remove('is-visible');
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
    resetTriggeredProp();
    return;
  }

  var resetTriggeredProp = function() {
    setTimeout(function() {
      props.wasNavTriggered = false;
    }, 500)
    return
  }


  var onScroll = function(e) {
    if (props.wasNavTriggered) return;

    getActiveSection();
    setActiveNavItem();

    return;
  }

  var onResize = function(e) {
    clearTimeout(props.timeoutId);
    removeHomeElsTransition();
    props.triggerOffset = getTriggerOffset();
    measureOffsets();
    setActiveNavItem();
    return;
  }

  var removeHomeElsTransition = function() {
    for (var i = els.homePanels.length - 1; i >= 0; i--) {
      els.homePanels[i].classList.add('no-transition');
    }

    props.timeoutId = setTimeout(function() {
      for (var i = els.homePanels.length - 1; i >= 0; i--) {
        els.homePanels[i].classList.remove('no-transition');
      }
    }, 800)
    return;
  }


  var measureOffsets = function() {
    var newOffsets = [];
    for (var i = els.navLinks.length - 1; i >= 0; i--) {
      if (els.navLinks[i].hash) {
        var section = document.querySelector(els.navLinks[i].hash);
        newOffsets.push(smoothScroll.getElPageOffset(section) - props.triggerOffset);
      }
    }
    props.sectionOffsets = newOffsets.reverse();
  }

  var getActiveSection = function() {
    var currentScroll = smoothScroll.getCurrentScroll();

    if (props.activeScrollPoint === 0) {
      if (currentScroll >= props.sectionOffsets[props.activeScrollPoint + 1]) {
        props.activeScrollPoint++;
      }
    } else if (props.activeScrollPoint === props.sectionOffsets.length - 1) {
      if (currentScroll < props.sectionOffsets[props.activeScrollPoint]) {
        props.activeScrollPoint--;
      }
    } else {
      if (currentScroll >= props.sectionOffsets[props.activeScrollPoint + 1]) {
        props.activeScrollPoint++;
      } else if (currentScroll < props.sectionOffsets[props.activeScrollPoint]) {
        props.activeScrollPoint--;
      }
    }

    if (props.currentLink) props.currentLink.classList.remove('is-active');
    props.currentLink = els.navLinks[props.activeScrollPoint + 1];

    return
  }

  var setActiveNavItem = function(newEl) {
    if (newEl) {
      props.currentLink.classList.remove('is-active');
      props.currentLink = newEl;
    }

    props.currentLink.classList.add('is-active');
    els.highlighter.style.left = props.currentLink.offsetLeft + 'px';
    els.highlighter.style.top = props.currentLink.offsetTop + 'px';
    els.highlighter.style.width = props.currentLink.offsetWidth + 'px';

    return;
  }

  var enable = function() {
    if (props.isEnabled) return;

    for (var i = els.navLinks.length - 1; i >= 0; i--) {
      els.navLinks[i].addEventListener('click', onNavLinkClick);
    }

    for (var i = els.homeLinks.length - 1; i >= 0; i--) {
      els.homeLinks[i].addEventListener('click', onHomeLinkClick);
    }

    for (var i = els.anchorLinks.length - 1; i >= 0; i--) {
      els.anchorLinks[i].addEventListener('click', onAnchorLinkClick);
    }

    els.mobileNavToggle.addEventListener('click', onToggleClick);

    props.resizeHandler = window.UTILS.Throttle(onResize, 100)
    props.scrollHandler = window.UTILS.Throttle(onScroll, 100)

    window.addEventListener('resize', props.resizeHandler);
    window.addEventListener('scroll', props.scrollHandler);

    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');

    props.isEnabled = true;
    return;
  }

  var disable = function() {
    if (!props.isEnabled) return;

    for (var i = els.navLinks.length - 1; i >= 0; i--) {
      els.navLinks[i].removeEventListener('click', onNavLinkClick);
    }

    for (var i = els.homeLinks.length - 1; i >= 0; i--) {
      els.homeLinks[i].removeEventListener('click', onHomeLinkClick);
    }

    for (var i = els.anchorLinks.length - 1; i >= 0; i--) {
      els.anchorLinks[i].removeEventListener('click', onAnchorLinkClick);
    }

    els.mobileNavToggle.removeEventListener('click', onToggleClick);

    window.removeEventListener('resize', props.resizeHandler);
    window.removeEventListener('scroll', props.scrollHandler);

    props.isEnabled = false;
    return;
  }

  return {
    init: function() {
      createChildren();
      measureOffsets();
      getActiveSection();
      setActiveNavItem();
      enable();
      return;
    },
    enable: enable,
    disable: disable
  }
}
