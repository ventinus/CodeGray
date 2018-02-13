window.ADMIN_MODULES = window.ADMIN_MODULES || {};
window.ADMIN_MODULES.projectsSort = function() {
  var props = {
    isEnabled: false
  };

  var els = {};

  var createChildren = function() {
    els.$projectsSort = $('.js-sortable-projects')
  }

  var updatePositions = function(count) {
    if (count <= 0) return;

    var $form = $('.js-project-sort-form').eq(count - 1);
    $form.find('#project_featured_position').val(count);
    $form.prev().text(count);

    $.ajax({
      url: $form.attr('action'),
      type: 'POST',
      data: $form.serialize(),
      success: function() { console.log('success'); }
    });

    updatePositions(count - 1);
  }

  var initSortable = function() {
    els.$projectsSort.sortable({
      opacity: 0.6,
      cursor: "move",
      axis: 'y',
      cursorAt: {
        top: 15
      },
      // handle: '.handle'
      update: updatePositions.bind(this, $('.js-project-sort-form').length)
    })
  }

  var enable = function() {
    if (props.isEnabled) return;

    props.isEnabled = true;
  }

  var disable = function() {
    if (!props.isEnabled) return;

    props.isEnabled = false;
  }

  return {
    init: function() {
      createChildren();
      initSortable();
      enable();
    },
    enable: enable,
    disable: disable
  }
}
