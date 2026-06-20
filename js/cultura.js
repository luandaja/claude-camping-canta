function renderCultura() {
  const el = document.getElementById('cult-content');
  let html = '';

  PLACES.filter(p => p.hist || p.leg || p.plato).forEach((p, i) => {
    let inner = '';
    if (p.plato) inner += `<div class="plbox"><div class="pbe">${p.plato.e}</div><div><div class="pbn">Plato bandera: ${p.plato.n}</div><div class="pbd">${p.plato.d}</div></div></div>`;
    if (p.hist)  inner += `<div class="lsec"><div class="lshd" style="background:var(--v)">📚 Históricamente preciso</div><div class="lsbody"><p>${p.hist}</p>${p.src ? `<p class="src">Fuente: ${p.src}</p>` : ''}</div></div>`;
    if (p.leg)   inner += `<div class="lsec"><div class="lshd" style="background:var(--d)">🌙 Leyendas y mitos</div><div class="lsbody"><p>${p.leg}</p></div></div>`;
    if (p.why)   inner += `<div class="lsec"><div class="lshd" style="background:var(--a)">💡 Por qué vale la pena</div><div class="lsbody"><p>${p.why}</p></div></div>`;

    const gemBadge = p.gem ? ' <span style="background:var(--d2);color:var(--d);font-size:10px;padding:1px 7px;border-radius:5px;font-weight:700;margin-left:4px">💎 HIDDEN GEM</span>' : '';
    const mapsLink = p.maps ? ` · <a href="${p.maps}" target="_blank" onclick="event.stopPropagation()" style="color:var(--a);font-weight:600">📍 Maps</a>` : '';

    html += `<div class="lc${i === 0 ? ' open' : ''}" id="lc-${p.id}">
<div class="lh" onclick="document.getElementById('lc-${p.id}').classList.toggle('open')">
  <div class="lhi">${p.icon}</div>
  <div class="lht"><h3>${p.name}${gemBadge}</h3><p>${p.sub}${mapsLink}</p></div>
  <div class="lhv">▼</div>
</div>
<div class="lb">${inner}</div></div>`;
  });

  el.innerHTML = html;
}
