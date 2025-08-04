// Acessibilidade: abre/fecha menu sanduíche
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  toggle.addEventListener('click', function() {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
});

// Navbar hambúrguer: acessibilidade e responsividade
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }
});
