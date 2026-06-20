function saveCL(cb) {
  cb.closest('.ci').classList.toggle('done', cb.checked);
  const state = {};
  document.querySelectorAll('.ci').forEach((el, i) => {
    const c = el.querySelector('input[type=checkbox]');
    if (c) state[i] = c.checked;
  });
  localStorage.setItem('cl', JSON.stringify(state));
}

function loadCL() {
  const s = JSON.parse(localStorage.getItem('cl') || '{}');
  document.querySelectorAll('.ci').forEach((el, i) => {
    const c = el.querySelector('input[type=checkbox]');
    if (c && s[i]) { c.checked = true; el.classList.add('done'); }
  });
}
