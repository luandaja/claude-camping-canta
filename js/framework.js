function setGroup(g, btn) {
  State.setGroup(g);
  document.querySelectorAll('.gbtn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  renderFW();
}

function renderFW() {
  let html = '';

  if (State.grp === 'zona') {
    const zones = {};
    PLACES.forEach(p => {
      if (!zones[p.zone]) zones[p.zone] = {n: p.zname, items: []};
      zones[p.zone].items.push(p);
    });
    Object.entries(zones).forEach(([z, v]) => {
      html += zoneSection(v.n, ZONE_DIST[z], v.items);
    });

  } else if (State.grp === 'tipo') {
    const tmap = {cult:'🏛 Cultura',nat:'🌿 Naturaleza',food:'🍽 Gastronomía',hike:'🥾 Trekking',foto:'📸 Foto',camp:'🏕 Camping'};
    Object.entries(tmap).forEach(([t, lbl]) => {
      const items = PLACES.filter(p => p.types.includes(t));
      if (items.length) html += zoneSection(lbl, '', items);
    });

  } else {
    const smap = {mañana:'☀️ Mañana',mediodía:'🌤 Mediodía',tarde:'🌅 Tarde',noche:'🌙 Llegada / noche'};
    Object.entries(smap).forEach(([s, lbl]) => {
      const items = PLACES.filter(p => p.slot === s);
      if (items.length) html += zoneSection(lbl, '', items);
    });
  }

  html += `<div class="tip r" style="margin-top:16px"><div class="ti">⚠️</div><div><strong>Altitud:</strong> A partir de 3,500 msnm puede aparecer soroche. Sube despacio, hidrátate y lleva mate de coca.</div></div>`;
  document.getElementById('fw-content').innerHTML = html;
  updateSelUI();
}
