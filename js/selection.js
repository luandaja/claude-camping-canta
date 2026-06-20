function toggleSel(id) {
  State.toggleSelected(id);
  updateSelUI();
}

function clearSel() {
  State.clearSelected();
  updateSelUI();
  if (State.activeTab === 'ruta') renderRuta();
}

function updateSelUI() {
  const n = State.sel.length;
  document.getElementById('rbadge').textContent = n;
  document.getElementById('clrbtn').classList.toggle('vis', n > 0);
  document.querySelectorAll('.ac[data-id]').forEach(el => {
    const id = el.dataset.id;
    const on = State.sel.includes(id);
    el.classList.toggle('sel', on);
    const b = el.querySelector('.acsel');
    if (b) b.textContent = on ? '✓' : '＋';
  });
}

function togDet(id) {
  document.getElementById('ac-' + id).classList.toggle('dopen');
}
