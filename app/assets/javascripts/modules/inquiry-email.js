window.MODULES = window.MODULES || {};
window.MODULES.inquiryEmail = function() {
  var props = {
    isEnabled: false
  };

  var els = {};

  var createChildren = function() {
    els.form = document.querySelector('.js-contact-form');
    els.successMessage = document.querySelector('.js-contact-form-success');
    return;
  }

  var onSubmit = function(e) {
    e.preventDefault();

    var data = new FormData(els.form);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '/inquiries', true);

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
          onSuccess();
        } else if (xmlhttp.status == 400) {
          console.log(xmlhttp.status);
        } else {
          onSuccess();
          onError();
        }
      }
    }

    xmlhttp.send(data);
  }

  var onSuccess = function(e) {
    els.form.style.opacity = 0;
    els.successMessage.style.display = 'block';

    setTimeout(function() {
      els.form.parentElement.removeChild(els.form);
      els.successMessage.style.opacity = 1;
    }, 350)
    return;
  }

  var onError = function(e) {
    console.log('error');
    return;
  }


  var enable = function() {
    if (props.isEnabled) return;

    els.form.addEventListener('submit', onSubmit)
    props.isEnabled = true;
    return;
  }

  var disable = function() {
    if (!props.isEnabled) return;

    els.form.removeEventListener('submit', onSubmit)

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
