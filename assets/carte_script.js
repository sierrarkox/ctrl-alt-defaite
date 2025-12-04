// Script for the "carte mentale" section
// - Looks for either `.carte_mantale` (current class) or `.carte_mentale` (possible typo)
// - Attaches simple behaviour to each .card: on click toggle its .card-overlay visibility
// - Safe: exits silently if section or cards are not present

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.carte_mantale, .carte_mentale');
  if (!section) {
    console.warn('carte_script: aucune section .carte_mantale ou .carte_mentale trouvée');
    return;
  }

  const cards = section.querySelectorAll('.card');
  if (!cards.length) {
    console.warn('carte_script: aucune .card trouvée dans la section');
    return;
  }

  // Helper to close all overlays
  function closeAll() {
    cards.forEach(c => {
      const overlay = c.querySelector('.card-overlay');
      if (overlay) {
        overlay.style.opacity = '';
        overlay.style.pointerEvents = '';
        overlay.style.transform = '';
      }
    });
  }

  // Toggle overlay on click; use data-open to track state
  cards.forEach(card => {
    const overlay = card.querySelector('.card-overlay');
    if (!overlay) return;

    // Ensure overlay is initially hidden by inline style (script-safe)
    overlay.style.transition = overlay.style.transition || 'opacity 180ms ease, transform 180ms ease';

    card.addEventListener('click', (e) => {
      // If user clicked a link inside the overlay, let it through
      if (e.target.closest('a')) return;

      const isOpen = card.getAttribute('data-open') === 'true';
      if (isOpen) {
        overlay.style.opacity = '';
        overlay.style.pointerEvents = '';
        overlay.style.transform = '';
        card.setAttribute('data-open', 'false');
      } else {
        closeAll();
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        overlay.style.transform = 'translate(-50%, -50%) scale(1)';
        card.setAttribute('data-open', 'true');
      }
    });

    // Close on escape when focused inside
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        overlay.style.opacity = '';
        overlay.style.pointerEvents = '';
        overlay.style.transform = '';
        card.setAttribute('data-open', 'false');
        card.blur();
      }
    });
  });

  // Close overlays when clicking outside the section
  document.addEventListener('click', (e) => {
    if (!section.contains(e.target)) {
      closeAll();
      cards.forEach(c => c.setAttribute('data-open', 'false'));
    }
  });
});
