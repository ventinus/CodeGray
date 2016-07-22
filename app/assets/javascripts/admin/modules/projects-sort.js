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
    return;
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
