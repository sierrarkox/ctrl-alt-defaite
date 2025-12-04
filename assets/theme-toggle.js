/*
 Robust theme toggle script
  - Works with a button (#theme-toggle or .theme-toggle) or an input checkbox
  - Persists choice to localStorage
  - Respects system preference if no stored preference
  - Does not assume any CSS changes to the switch
*/
(function () {
  const KEY = 'theme';

  // Find the toggle element: prefer id, then class, then input with name
  const toggle = document.querySelector('#theme-toggle, .theme-toggle, input[name="theme-toggle"], input#theme-toggle');
  if (!toggle) return;

  const isInput = toggle.tagName.toLowerCase() === 'input' && (toggle.type === 'checkbox' || toggle.type === 'radio');

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem(KEY);
  const initial = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
  }

  function updateUI() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isInput) {
      toggle.checked = isDark;
    }
    if (toggle.tagName.toLowerCase() === 'button') {
      toggle.setAttribute('aria-pressed', String(isDark));
      // Keep visual label minimal; page CSS controls appearance
      try { toggle.textContent = isDark ? '🌙' : '☀️'; } catch (e) { /* ignore */ }
      toggle.setAttribute('aria-label', isDark ? 'Mode sombre (activé)' : 'Mode clair (activé)');
    }
  }

  updateUI();

  if (isInput) {
    toggle.addEventListener('change', function () {
      const next = toggle.checked ? 'dark' : 'light';
      setTheme(next);
      updateUI();
    });
  } else {
    toggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      updateUI();
    });
  }

  // If user hasn't chosen, respond to system changes
  if (!stored && window.matchMedia) {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        const autoTheme = e.matches ? 'dark' : 'light';
        if (!localStorage.getItem(KEY)) {
          setTheme(autoTheme);
          updateUI();
        }
      });
    } catch (e) {
      // Older browsers: fallback to no listener
    }
  }
})();

