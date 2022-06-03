(function initTheme() {
  var theme = localStorage.getItem("usehooks-ts-dark-mode") || "light";
  if (theme === "dark") {
    document.querySelector("html").classList.add("dark");
  }
})();
