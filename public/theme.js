(function initTheme() {
  var storedPref = localStorage.getItem("usehooks-ts-dark-mode");
  var pref;
  try {
    if (storedPref) {
      pref = storedPref === "true" ? "dark" : "light";
    } else {
      var mql = window.matchMedia("(prefers-color-scheme: dark)");
      var prefersDarkFromMQ = mql.matches;
      pref = prefersDarkFromMQ ? "dark" : "light";
    }
    document.documentElement.className = pref;
  } catch (e) {
    document.documentElement.className = "light";
  }
})();
