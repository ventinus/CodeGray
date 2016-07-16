window.MODULES = window.MODULES || {};
window.MODULES.inquiryEmail = function() {
  var props = {
    isEnabled: false
  };

  var els = {};
  var fields = {};

  var emailField = function(field, value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value)) {
      createError(field, 'must be an email address.');
      return false;
    }

    return true;
  }

  var requiredField = function(field, value) {
    if (value == "" || value == null) {
      createError(field, "field can't be blank.");
      return false;
    }

    return true;
  }

  var fieldValidationMapping = {
    'email': emailField,
    'name': requiredField,
    'message': requiredField
  }

  var createChildren = function() {
    els.form = document.querySelector('.js-contact-form');
    els.submitBtn = els.form.querySelector('input[type="submit"]');
    els.successMessage = document.querySelector('.js-contact-form-success');

    fields.email = els.form.querySelector('#inquiry_email');
    fields.name = els.form.querySelector('#inquiry_name');
    fields.message = els.form.querySelector('#inquiry_message');
    return;
  }

  var onSubmit = function(e) {
    e.preventDefault();
    els.submitBtn.disabled = true;

    removePreviousErrors();

    var isValid = validateForm();

    if (!isValid) {
      els.submitBtn.disabled = false;
      return;
    }

    sendData();
    return;
  }

  var createError = function(field, message) {
    var errorEl = document.createElement('p');
    errorEl.classList.add('contact-form__error','type--10','font-open-sans','font-open-sans--bold');
    errorEl.innerText = message;
    fields[field].parentElement.appendChild(errorEl);

    return;
  }

  var validateForm = function() {
    var isValid = true;
    for (field in fields) {
      var value = fieldValidationMapping[field](field, fields[field].value);
      if (!value) {
        isValid = value;
      }
    }

    return isValid;
  }

  var removePreviousErrors = function() {
    var errors = els.form.querySelectorAll('.contact-form__error');

    for (var i = errors.length - 1; i >= 0; i--) {
      errors[i].parentElement.removeChild(errors[i]);
    }

    return;
  }

  var sendData = function() {
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

    var data = new FormData(els.form);
    xmlhttp.send(data);
    return;
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
