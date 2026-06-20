renderFW();
renderCultura();
loadCL();

document.querySelectorAll('.gbtn').forEach(b => {
  if (b.dataset.g === State.grp) b.classList.add('on');
});

showTab(State.activeTab);
