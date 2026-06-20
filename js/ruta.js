function renderRuta() {
  const el    = document.getElementById('ruta-content');
  const items = PLACES.filter(p => State.sel.includes(p.id));

  if (!items.length) {
    el.innerHTML = `<div class="empty"><div class="big">🗺️</div><p>Tu ruta está vacía</p><small>En <strong>Framework</strong>, pulsa <strong>＋</strong> en cada card para añadir paradas.</small></div>`;
    return;
  }

  const total = items.reduce((s, p) => s + p.mins, 0);
  const h = Math.floor(total / 60), m = total % 60;
  const dur = h ? `${h}h${m ? ' ' + m + 'min' : ''}` : `${m}min`;

  const sat = items.filter(p => p.day === 'sat' || p.day === 'both').sort((a, b) => SLOT_ORDER[a.slot] - SLOT_ORDER[b.slot]);
  const sun = items.filter(p => p.day === 'sun' || p.day === 'both').sort((a, b) => SLOT_ORDER[a.slot] - SLOT_ORDER[b.slot]);

  const mapsUrl = stops => {
    if (!stops.length) return null;
    const pts = ['Lima+Peru', ...stops.map(p => encodeURIComponent(p.name + ' Canta Lima Peru')), 'Lima+Peru'];
    return 'https://www.google.com/maps/dir/' + pts.join('/');
  };

  const stopRow = p => `<div class="rstop"><div class="rsi">${p.icon}</div><div class="rsinfo"><div class="rsn">${p.name}</div><div class="rsm">${p.sub}</div></div><span class="rst">${p.dur}</span>${p.maps ? `<a class="rsmap" href="${p.maps}" target="_blank">📍</a>` : ''}<button class="rsdel" onclick="toggleSel('${p.id}');renderRuta()" title="Quitar">✕</button></div>`;

  let html = `<div class="rsumm">
  <div class="si"><div class="sn">${items.length}</div><div class="sl">Paradas</div></div>
  <div class="si"><div class="sn">${dur}</div><div class="sl">Tiempo activo</div></div>
  <div class="si"><div class="sn">${sat.length}</div><div class="sl">Sábado</div></div>
  <div class="si"><div class="sn">${sun.length}</div><div class="sl">Domingo</div></div>
  <button class="rbtn outline" style="margin-left:auto" onclick="clearSel();renderRuta()">✕ Limpiar</button>
</div>`;

  if (sat.length) {
    const u = mapsUrl(sat);
    html += `<div class="zh"><div class="zl"></div><div class="zt">🟢 Sábado</div><div class="zl"></div></div>`;
    if (u) html += `<div class="rbtns"><a class="rbtn g" href="${u}" target="_blank">📍 Abrir ruta sábado en Maps</a></div>`;
    html += sat.map(stopRow).join('');
  }
  if (sun.length) {
    const u = mapsUrl(sun);
    html += `<div class="zh" style="margin-top:16px"><div class="zl"></div><div class="zt">🔵 Domingo</div><div class="zl"></div></div>`;
    if (u) html += `<div class="rbtns"><a class="rbtn b" href="${u}" target="_blank">📍 Abrir ruta domingo en Maps</a></div>`;
    html += sun.map(stopRow).join('');
  }

  html += `<div class="tip" style="margin-top:14px"><div class="ti">💡</div><div>Selección guardada automáticamente. Vuelve al Framework para editar.</div></div>`;
  el.innerHTML = html;
}
