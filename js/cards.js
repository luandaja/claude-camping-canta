function tyTag(t) {
  return `<span class="ty ${t}">${TYPE_LABELS[t] || t}</span>`;
}

function detailPanel(p) {
  let inner = '';
  if (p.why)   inner += `<div class="dpsec"><div class="dplbl w">💡 Por qué vale</div><div class="dptxt">${p.why}</div></div>`;
  if (p.hist)  inner += `<div class="dpsec"><div class="dplbl h">📚 Historia</div><div class="dptxt">${p.hist}${p.src ? `<br><span style="font-size:10px;color:#aaa;font-style:italic">Fuente: ${p.src}</span>` : ''}</div></div>`;
  if (p.leg)   inner += `<div class="dpsec"><div class="dplbl l">🌙 Leyenda</div><div class="dptxt">${p.leg}</div></div>`;
  if (p.plato) inner += `<div class="dpsec"><div class="dplbl p">🍽️ Plato bandera</div><div class="dpplato"><div class="dpe">${p.plato.e}</div><div><div class="dpn">${p.plato.n}</div><div class="dpd">${p.plato.d}</div></div></div></div>`;
  return `<button class="dtoggle" onclick="togDet('${p.id}')"><span>📖 Historia · leyenda · plato</span><span class="dchev">▼</span></button><div class="dpanel">${inner}</div>`;
}

function cardHTML(p) {
  const on = State.sel.includes(p.id);

  const bdgs = [];
  if (p.reco) bdgs.push('<span class="bdg r">⭐ Reco</span>');
  if (p.gem)  bdgs.push('<span class="bdg g">💎 Gem</span>');
  if (p.trek) bdgs.push(`<span class="bdg danger">🥾 ${p.trek}</span>`);
  if (!p.trek && !p.reco && !p.gem && p.id === 'notrk') bdgs.push('<span class="bdg ok">✅ Sin trekking</span>');

  const hasDetail = p.hist || p.leg || p.why || p.plato;
  const det = hasDetail ? detailPanel(p) : '';
  const mb  = p.maps ? `<a class="mbtn" href="${p.maps}" target="_blank">📍 Maps</a>` : '';

  const cls = ['ac',
    p.gem ? 'gem-c' : p.reco ? 'reco' : '',
    p.types.includes('food') && !p.gem ? 'food-c' : '',
    p.id === 'notrk' ? 'notrk' : '',
    on ? 'sel' : ''
  ].filter(Boolean).join(' ');

  return `<div class="${cls}" id="ac-${p.id}" data-id="${p.id}">
<div class="ac-hdr">
<div class="act"><div class="aci">${p.icon}</div><div class="acm"><div class="acn">${p.name}</div><div class="acs">${p.sub}</div></div><button class="acsel" onclick="toggleSel('${p.id}')">${on ? '✓' : '＋'}</button></div>
<div class="acd">${p.desc}</div>
<div class="acf"><span class="tt">⏱ ${p.dur}</span>${p.types.map(tyTag).join('')}${bdgs.join('')}${mb}</div>
</div>${det}</div>`;
}

function zoneSection(title, dist, cards) {
  return `<div class="zh"><div class="zl"></div><div class="zt">${title}</div>${dist ? `<div class="zd">${dist}</div>` : ''}<div class="zl"></div></div><div class="grid">${cards.map(cardHTML).join('')}</div>`;
}
