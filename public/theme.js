(function initTheme() {
  var storedPref = localStorage.getItem("usehooks-ts-dark-mode");
  if (storedPref) {
    var pref = storedPref === "true" ? "dark" : "light";
    document.querySelector("html").classList.add(pref);
  } else {
    var mql = window.matchMedia("(prefers-color-scheme: dark)");
    var prefersDarkFromMQ = mql.matches;
    var pref = prefersDarkFromMQ ? "dark" : "light";
    document.querySelector("html").classList.add(pref);
  }
})();
