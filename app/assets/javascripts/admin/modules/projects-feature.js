window.ADMIN_MODULES = window.ADMIN_MODULES || {};
window.ADMIN_MODULES.projectsFeature = function() {
  var props = {
    isEnabled: false
  };

  var els = {};

  var createChildren = function() {
    els.$projFeatChecks = $('.js-featured-checkbox').find('input[type="checkbox"]')
    console.log(els.$projFeatChecks)
    return;
  }

  var updateFeatured = function() {
    var $form = $(this.previousElementSibling);

    $form.children('input[type="text"]').val(this.checked);

    $.ajax({
      url: $form.attr('action'),
      type: 'POST',
      data: $form.serialize(),
      success: function() { window.location.reload(); }
    });

    return;
  }


  var enable = function() {
    if (props.isEnabled) return;

    els.$projFeatChecks.on('change', updateFeatured);

    props.isEnabled = true;
    return;
  }

  var disable = function() {
    if (!props.isEnabled) return;

    els.$projFeatChecks.off('change', updateFeatured);

    props.isEnabled = false;
    return;
  }

  return {
    init: function() {
      createChildren();
      enable();
      return;
    },
    enable: enable,
    disable: disable
  }
}
