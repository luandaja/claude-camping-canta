const State = {
  sel:       JSON.parse(localStorage.getItem('sel') || '[]'),
  grp:       localStorage.getItem('grp') || 'zona',
  activeTab: localStorage.getItem('tab') || 'framework',

  save() {
    localStorage.setItem('sel', JSON.stringify(this.sel));
    localStorage.setItem('grp', this.grp);
    localStorage.setItem('tab', this.activeTab);
  },

  toggleSelected(id) {
    this.sel = this.sel.includes(id)
      ? this.sel.filter(x => x !== id)
      : [...this.sel, id];
    localStorage.setItem('sel', JSON.stringify(this.sel));
  },

  clearSelected() {
    this.sel = [];
    localStorage.setItem('sel', '[]');
  },

  setGroup(g) {
    this.grp = g;
    localStorage.setItem('grp', g);
  },

  setTab(t) {
    this.activeTab = t;
    localStorage.setItem('tab', t);
  }
};
