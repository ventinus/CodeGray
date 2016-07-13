window.ADMIN_APPLICATION = function() {
  modules = {}

  return {
    init: function() {
      for (module in window.ADMIN_MODULES) {
        modules[module] = window.ADMIN_MODULES[module]();
        modules[module].init();
      }

      return;
    }
  }
}
