(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  function current() {
    return root.getAttribute('data-theme') || 'light';
  }

  function apply(theme, persist) {
    root.setAttribute('data-theme', theme);
    button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) {}
    }
  }

  button.addEventListener('click', function () {
    apply(current() === 'dark' ? 'light' : 'dark', true);
  });

  // Reflect the current theme on the button without locking the OS preference.
  apply(current(), false);
})();
