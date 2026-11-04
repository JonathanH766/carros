/* =====================================================
   app.js — funções compartilhadas por todas as páginas
   ===================================================== */
// ---- Tema claro/escuro (lembra a escolha; senão segue o do aparelho) ----
(function () {
  let t = null; try { t = localStorage.getItem("mk_tema"); } catch (e) {}
  document.documentElement.dataset.tema = t || (matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro");
})();
function alternarTema() {
  const e = document.documentElement, t = e.dataset.tema === "escuro" ? "claro" : "escuro";
  e.dataset.tema = t; try { localStorage.setItem("mk_tema", t); } catch (x) {}
  document.getElementById("btnTema").textContent = t === "escuro" ? "☀" : "☾";
}

// ---- Utilidades ----
const moeda = n => n.toLocaleString("pt-BR", {style:"currency", currency:"BRL", maximumFractionDigits:0});
const CORES = {Branco:"#f4f4f4",Preto:"#222",Prata:"#c0c4c8",Cinza:"#7a7f85",Vermelho:"#c62828",Azul:"#1e57b8",Verde:"#2e7d4f",Marrom:"#6d4c33",Amarelo:"#f2c200"};
const CATEGORIAS = ["SUV","Hatchback","Sedan","Picape","Coupé","Conversível","Perua","Minivan","Van","Utilitário","Esportivo","Moto"];

// ---- Fotos: usa as do dono; sem fotos, gera ilustrações (3) para a galeria funcionar ----
const totalFotos = v => (v.fotos && v.fotos.length) || 3;
// Silhuetas por categoria. Fotos reais de verdade: o dono envia pelo Painel.
const FORMAS = {
  H:["M90 300V250Q90 235 110 230L170 215Q200 160 270 158H380Q430 160 465 205L520 215Q550 222 550 250V300Z","M215 205Q235 170 275 170H330V205ZM345 170H385Q415 172 440 205H345Z"],
  S:["M85 300V245Q85 230 105 226L150 214L185 150H420Q455 152 480 200L540 214Q560 222 560 250V300Z","M205 200L225 166H320V200ZM335 166H415Q440 170 460 200H335Z"],
  D:["M70 300V252Q70 238 92 233L170 218Q205 168 275 166H360Q420 168 455 210L560 222Q580 228 580 252V300Z","M215 212Q240 178 280 178H335V212ZM350 178H385Q415 182 440 212H350Z"],
  P:["M70 300V240Q70 228 90 226H250L285 160H410Q440 162 455 200L470 226H570Q580 226 580 240V300Z","M300 175H395Q415 178 428 205H300Z"]};
const TIPO_FORMA = {Hatchback:"H",SUV:"S",Sedan:"D",Picape:"P","Coupé":"D","Conversível":"D",Esportivo:"D",Perua:"S",Minivan:"S",Van:"S","Utilitário":"S"};
function imagemVeiculo(v, n = 0) {
  if (v.fotos && v.fotos.length) return v.fotos[n] || v.fotos[0];
  const c = CORES[v.cor] || "#999", fundo = ["#e4e8ee","#d5dbe5","#c6cedb"][n % 3];
  const flip = n % 2 ? "translate(640 0) scale(-1 1)" : "", zoom = n === 2 ? "translate(-120 -80) scale(1.35)" : "";
  let desenho;
  if (v.categoria === "Moto") {
    desenho = `<circle cx='170' cy='300' r='50' fill='none' stroke='#111' stroke-width='12'/><circle cx='470' cy='300' r='50' fill='none' stroke='#111' stroke-width='12'/>
    <path d='M170 300L255 232H385L470 300M455 200L470 300' stroke='#333' stroke-width='9' fill='none'/><path d='M270 228Q300 188 365 198L390 232H270Z' fill='${c}' stroke='#111' stroke-width='3'/>
    <path d='M205 224H272L266 240H198Z' fill='#111'/><rect x='290' y='242' width='72' height='38' rx='6' fill='#555'/><path d='M430 212L455 180H485' stroke='#111' stroke-width='8' fill='none'/>`;
  } else {
    const [corpo, vidro] = FORMAS[TIPO_FORMA[v.categoria] || "H"];
    desenho = `<path d='${corpo}' fill='${c}' stroke='#111' stroke-width='3'/><path d='${vidro}' fill='#bcd3e6' stroke='#111' stroke-width='2'/>
    <circle cx='190' cy='300' r='40' fill='#111'/><circle cx='190' cy='300' r='18' fill='#c9ccd1'/><circle cx='455' cy='300' r='40' fill='#111'/><circle cx='455' cy='300' r='18' fill='#c9ccd1'/>`;
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${fundo}'/><stop offset='1' stop-color='#9aa3b2'/></linearGradient></defs><rect width='640' height='400' fill='url(#g)'/><rect y='345' width='640' height='55' fill='#00000022'/><ellipse cx='320' cy='345' rx='260' ry='14' fill='#0004'/><g transform='${zoom}'><g transform='${flip}'>${desenho}</g></g><text x='320' y='42' font-family='Arial' font-size='22' text-anchor='middle' fill='#223'>${v.marca} ${v.modelo}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// ---- Fotos: 1) fotos enviadas no Painel  2) arquivo assets/img/veiculos/<marca>-<modelo>-N.jpg  3) ilustração ----
const slug = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const __v = {};   // guarda os veículos exibidos, para o onerror achar a ilustração de reserva
function fotoSrc(v, n) { return (v.fotos && v.fotos.length) ? (v.fotos[n] || v.fotos[0]) : `assets/img/veiculos/${slug(v.marca + " " + v.modelo)}-${n + 1}.jpg`; }
function imgVeiculo(v, n = 0, extra = "") {
  __v[v.id] = v;
  return `<img src="${fotoSrc(v, n)}" ${extra} loading="lazy" onerror="this.onerror=null;this.src=imagemVeiculo(__v[${v.id}],${n})">`;
}

// ---- Card de veículo (usado na home, lista e semelhantes) ----
function cardVeiculo(v) {
  return `<article class="card"><a class="foto" href="detalhes.html?id=${v.id}">
      ${imgVeiculo(v, 0, 'alt="' + v.marca + ' ' + v.modelo + '"')}<span class="contfoto">1/${totalFotos(v)}</span></a>
    <div class="card-corpo"><h3>${v.marca} ${v.modelo}</h3>
      <p class="mini">${v.ano} • ${v.km.toLocaleString("pt-BR")} km • ${v.cc ? v.cc + " cc" : v.cambio}</p>
      <p class="mini">📍 ${v.cidade}</p><p class="preco">${moeda(v.preco)}</p>
      <div class="acoes"><a class="btn" href="detalhes.html?id=${v.id}">Ver detalhes</a></div></div></article>`;
}
function listarCards(lista, alvo) { document.getElementById(alvo).innerHTML = lista.length ? lista.map(cardVeiculo).join("") : "<p>Nenhum veículo encontrado.</p>"; }

// ---- Cabeçalho e rodapé (edite menu, lojas e telefones aqui) ----
function montarLayout() {
  const t = document.documentElement.dataset.tema;
  document.getElementById("topo").innerHTML = `<div class="container barra">
    <a href="index.html"><img src="assets/img/logo.png" alt="S&V Veículos"></a>
    <nav id="menu"><a href="index.html">Início</a><a href="veiculos.html">Comprar</a><a href="veiculos.html?tipo=moto">Motos</a><a href="painel.html">Painel</a></nav>
    <button class="ic" id="btnTema" onclick="alternarTema()" aria-label="Tema">${t === "escuro" ? "☀" : "☾"}</button>
    <button class="ic" id="btnMenu" onclick="document.getElementById('menu').classList.toggle('aberto')" aria-label="Menu">☰</button></div>`;
  document.getElementById("rodape").innerHTML = `<div class="container"><div class="lojas">${LOJAS.map(l => `<div><b>${l.nome}</b>${l.end}<br>${l.tel}</div>`).join("")}</div>
    Atendimento: seg a sex 8h–18h • sáb 8h–12h<br>© 2026 S&V Veículos</div>`;
}
document.addEventListener("DOMContentLoaded", montarLayout);

// ---- Lojas + mapas do Google (edite endereços aqui; a chave fica em config.js) ----
const LOJAS = [
  {nome:"Matriz — Pirapora", end:"Av. Pio XII, 1534, Santos Dumont, Pirapora - MG", tel:"(38) 3741-2554"},
  {nome:"Filial 1 — Pirapora", end:"Av. Otávio Carneiro, 193, Santo Antônio, Pirapora - MG", tel:"(38) 3741-7713"},
  {nome:"Filial 2 — Várzea da Palma", end:"Rua Dr. Antônio Gomes Pinto Coelho, 1213, Centro, Várzea da Palma - MG", tel:"(38) 3731-1832"}];
function urlMapa(end) {   // com chave: Google Maps Embed API; sem chave: incorporação simples
  const q = encodeURIComponent(end);
  return (typeof GOOGLE_MAPS_CHAVE !== "undefined" && GOOGLE_MAPS_CHAVE)
    ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_CHAVE}&q=${q}` : `https://maps.google.com/maps?q=${q}&output=embed`;
}
function mostrarMapas(alvo) {
  document.getElementById(alvo).innerHTML = LOJAS.map(l => `<div class="card"><iframe title="${l.nome}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${urlMapa(l.end)}"></iframe>
    <div class="card-corpo"><h3>${l.nome}</h3><p class="mini">${l.end}</p><p class="mini">📞 ${l.tel}</p>
    <a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.end)}">Como chegar</a></div></div>`).join("");
}
