window.ADMIN_MODULES = window.ADMIN_MODULES || {};
window.ADMIN_MODULES.nav = function() {
  var props = {
    isEnabled: false
  };

  var els = {};


  var createChildren = function() {
    els.navLinks = document.querySelector('.js-nav').querySelectorAll('a');
    return;
  }

  var setActiveNavItem = function() {
    currentPage = document.body.dataset.jsClass.match(/\-(.*?)\_/)[1];

    for (var i = els.navLinks.length - 1; i >= 0; i--) {
      if (els.navLinks[i].textContent.toLowerCase() === currentPage) {
        els.navLinks[i].classList.add('is-active');
        props.currentActiveIndex = i;
        i = 0;
      }
    }

    return;
  }

  var enable = function() {
    if (props.isEnabled) return;

    props.isEnabled = true;
    return;
  }

  var disable = function() {
    if (!props.isEnabled) return;

    props.isEnabled = false;
    return;
  }

  return {
    init: function() {
      console.log('nav init')
      createChildren();
      setActiveNavItem();
      enable();
      return;
    },
    enable: enable,
    disable: disable
  }
}
