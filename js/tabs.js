function showTab(t) {
  document.querySelectorAll('.pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.getElementById('pane-' + t).classList.add('active');
  document.querySelector(`.tab[data-tab="${t}"]`).classList.add('active');
  State.setTab(t);
  if (t === 'ruta') renderRuta();
}
