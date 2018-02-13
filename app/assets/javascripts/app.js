window.APPLICATION = function() {
  modules = {}

  return {
    init: function() {
      for (module in window.MODULES) {
        modules[module] = window.MODULES[module]();
        modules[module].init();
      }

      return;
    }
  }
}
