document.addEventListener('page:change', function() {
  window.CODEGRAYAPP = window.CODEGRAYAPP || window.APPLICATION();
  window.CODEGRAYAPP.init();
})
