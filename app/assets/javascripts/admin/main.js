document.addEventListener('page:change', function() {
  window.ADMIN_CODEGRAYAPP = window.ADMIN_CODEGRAYAPP || window.ADMIN_APPLICATION();
  window.ADMIN_CODEGRAYAPP.init();
})
