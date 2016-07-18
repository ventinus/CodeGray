window.addEventListener('DOMContentLoaded', function() {
  if (document.body.dataset.jsInit == 'true') {
    window.ADMIN_CODEGRAYAPP = window.ADMIN_CODEGRAYAPP || window.ADMIN_APPLICATION();
    window.ADMIN_CODEGRAYAPP.init();
  }
})
