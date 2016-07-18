window.ADMIN_MODULES = window.ADMIN_MODULES || {};
window.ADMIN_MODULES.projectsSort = function() {
  var props = {
    isEnabled: false
  };

  var els = {};

  var createChildren = function() {
    els.$projectsSort = $('.js-sortable-projects')
    return;
  }

  var getPositions = function() {

    return;
  }

  var initSortable = function() {
    els.$projectsSort.sortable({
      opacity: 0.6,
      cursor: "move",
      axis: 'y',
      cursorAt: {
        top: 60
      },
      // handle: '.handle'
      update: getPositions
    })

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
      createChildren();
      initSortable();
      enable();
      return;
    },
    enable: enable,
    disable: disable
  }
}
