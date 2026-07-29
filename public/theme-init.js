(function () {
  try {
    var stored = window.localStorage.getItem("vantix-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "light";

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
})();
