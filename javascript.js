let lastScrollTop = 0;
const navbar = document.querySelector('.header');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // On descend → cacher la nav bar
    navbar.style.top = "-80px";
    navbar.style.opacity = "0";
  } else {
    // On remonte → réafficher la nav bar
    navbar.style.top = "20px";
    navbar.style.opacity = "1";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // éviter valeurs négatives
}, false);

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

// Attendre que tout le DOM (Document Object Model) soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cible de la checkbox et du corps de la page
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // 2. Mémorisation du Thème dans le navigateur (LocalStorage)
    
    // Récupère le thème sauvegardé, sinon utilise 'light' par défaut
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Applique le thème sauvegardé au chargement de la page
    body.setAttribute('data-theme', savedTheme);

    // Synchronise l'état du switch avec le thème sauvegardé
    if (savedTheme === 'dark') {
        themeSwitch.checked = true;
    }

    // 3. Fonction de Bascule (Toggle)
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            // Si la case est cochée (-> mode sombre)
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            // Si la case n'est pas cochée (-> mode clair)
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Affichage dynamique du texte jalon ---
    const jalonTextes = [
      document.getElementById('jalon-texte-1'),
      document.getElementById('jalon-texte-2'),
      document.getElementById('jalon-texte-3')
    ];
    const cards = [
      document.getElementById('card-accent-1'),
      document.getElementById('card-accent-2'),
      document.getElementById('card-accent-3')
    ];
    const jalonSection = document.getElementById('jalons-details');

    function updateJalonSectionVisibility() {
      const anyVisible = jalonTextes.some(txt => txt.style.display !== 'none');
      if (jalonSection) {
        jalonSection.style.display = anyVisible ? '' : 'none';
      }
      const explainSection = document.getElementById('Explain');
      if (explainSection) {
        if (!anyVisible) {
          explainSection.classList.add('sticky');
        } else {
          explainSection.classList.remove('sticky');
        }
      }
    }
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        // Si le texte est déjà visible, on le masque (toggle)
        const isVisible = jalonTextes[idx].style.display !== 'none';
        if (isVisible) {
          jalonTextes.forEach(txt => txt.style.display = 'none');
        } else {
          jalonTextes.forEach((txt, i) => {
            txt.style.display = (i === idx) ? 'block' : 'none';
          });
        }
        updateJalonSectionVisibility();
      });
    });
    // Initialiser la visibilité au chargement
    updateJalonSectionVisibility();
});

document.getElementById('submitQuiz').addEventListener('click', () => {
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;

    questions.forEach((q, index) => {
        const answer = q.dataset.answer;
        const selected = q.querySelector('input[type="radio"]:checked');
        const resultDiv = document.createElement('div');

        if(selected) {
            if(selected.value === answer){
                score++;
                resultDiv.textContent = `Question ${index+1}: ✅ Correct`;
                resultDiv.classList.add('correct');
            } else {
                resultDiv.textContent = `Question ${index+1}: ❌ Faux (Réponse: ${answer})`;
                resultDiv.classList.add('wrong');
            }
        } else {
            resultDiv.textContent = `Question ${index+1}: ❌ Non répondue (Réponse: ${answer})`;
            resultDiv.classList.add('wrong');
        }

        q.appendChild(resultDiv);
    });

    const finalResult = document.getElementById('quizResult');
    finalResult.textContent = `Votre score: ${score} / ${questions.length}`;
});