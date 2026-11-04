/* =====================================================
   painel.js — Painel do dono (adicionar/editar/excluir)
   ===================================================== */
let editandoId = null;      // null = criando novo; número = editando esse veículo
let fotos = [];             // fotos do formulário atual (texto base64); a 1ª é a principal
const $ = id => document.getElementById(id);

/* ---------- 1. LOGIN ---------- */
async function entrar() {
  if (!(await Armazenamento.login($("email").value, $("senha").value))) { alert("E-mail ou senha incorretos."); return; }
  mostrarPainel();
}
function mostrarPainel() {
  $("telaLogin").hidden = true; $("telaPainel").hidden = false;
  listar();
}

/* ---------- 2. FOTOS ---------- */
// Reduz a foto para no máx. 800px e comprime, senão o LocalStorage (~5MB) enche rápido.
function redimensionar(arquivo) {
  return new Promise(ok => {
    const leitor = new FileReader();
    leitor.onload = () => {
      const img = new Image();
      img.onload = () => {
        const esc = Math.min(1, 800 / img.width), c = document.createElement("canvas");
        c.width = img.width * esc; c.height = img.height * esc;
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        ok(c.toDataURL("image/jpeg", 0.7));
      };
      img.src = leitor.result;
    };
    leitor.readAsDataURL(arquivo);
  });
}
// Desenha as miniaturas com botões: ★ tornar principal, ✕ excluir
function mostrarPrevia() {
  $("previa").innerHTML = fotos.map((f, i) => `<div style="position:relative">
    <img src="${f}" width="110" style="border-radius:8px;${i===0?"outline:3px solid #ff5a1f":""}">
    <button type="button" onclick="fotoPrincipal(${i})">★</button><button type="button" onclick="fotoExcluir(${i})">✕</button></div>`).join("");
}
function fotoPrincipal(i) { fotos.unshift(fotos.splice(i, 1)[0]); mostrarPrevia(); }
function fotoExcluir(i) { fotos.splice(i, 1); mostrarPrevia(); }

/* ---------- 3. SALVAR (criar ou editar) ---------- */
async function salvar(e) {
  e.preventDefault();
  const antigo = editandoId ? await Armazenamento.veiculo(editandoId) : {};
  const v = { ...antigo,                       // mantém dados que o formulário não mexe
    id: editandoId || 0, status: antigo.status || "ativo", destaque: antigo.destaque || false,
    marca: $("f_marca").value.trim(), modelo: $("f_modelo").value.trim(), categoria: $("f_categoria").value,
    ano: Number($("f_ano").value), km: Number($("f_km").value), preco: Number($("f_preco").value),
    cambio: $("f_cambio").value, combustivel: $("f_combustivel").value, cor: $("f_cor").value,
    cidade: $("f_cidade").value.trim(), whatsapp: $("f_whatsapp").value.replace(/\D/g, ""),
    descricao: $("f_descricao").value.trim(), fotos: fotos, vendedor: "S&V Veículos", cc: Number($("f_cc").value) || undefined, tipo: $("f_tipo").value.trim() || undefined };
  // Validação simples
  if (v.preco <= 0 || v.km < 0 || v.ano < 1950 || v.ano > 2030) { alert("Confira ano, km e preço."); return; }
  try { v.fotos = await Promise.all(fotos.map(f => Armazenamento.enviarFoto(f))); }   // sobe as fotos (modo nuvem)
  catch (err) { alert("Erro ao enviar fotos: " + err.message); return; }
  if (await Armazenamento.salvarVeiculo(v)) { limparForm(); await listar(); alert("Veículo salvo!"); }
}

/* ---------- 4. LISTA + AÇÕES ---------- */
async function listar() {
  const l = await Armazenamento.veiculos();
  $("listaDono").innerHTML = l.map(v => `<article class="card"><img src="${imagemVeiculo(v)}" alt="">
    <div class="card-corpo"><h3>${v.marca} ${v.modelo}</h3>
    <p class="mini">${v.ano} • ${moeda(v.preco)} • <strong>${v.status}</strong></p>
    <div class="acoes" style="flex-wrap:wrap">
      <button class="btn" onclick="editar(${v.id})">Editar</button>
      <button class="btn ghost" style="border:1px solid #ccc" onclick="status(${v.id},'${v.status==="ativo"?"pausado":"ativo"}')">${v.status==="ativo"?"Pausar":"Reativar"}</button>
      <button class="btn ghost" style="border:1px solid #ccc" onclick="status(${v.id},'vendido')">Vendido</button>
      <button class="btn ghost" style="border:1px solid #ccc" onclick="excluir(${v.id})">Excluir</button>
    </div></div></article>`).join("");
}
async function editar(id) {                         // joga os dados do veículo de volta no formulário
  const v = await Armazenamento.veiculo(id); editandoId = id; fotos = [...(v.fotos || [])];
  ["marca","modelo","categoria","ano","km","preco","cambio","combustivel","cor","cidade","whatsapp"].forEach(c => $("f_" + c).value = v[c]);
  $("f_cc").value = v.cc || ""; $("f_tipo").value = v.tipo || ""; $("f_descricao").value = v.descricao || ""; $("tituloForm").textContent = "Editando: " + v.marca + " " + v.modelo;
  mostrarPrevia(); scrollTo({top: 0, behavior: "smooth"});
}
async function status(id, novo) { const v = await Armazenamento.veiculo(id); v.status = novo; await Armazenamento.salvarVeiculo(v); await listar(); }
async function excluir(id) { if (confirm("Excluir este veículo?")) { await Armazenamento.excluirVeiculo(id); await listar(); } }
function limparForm() { editandoId = null; fotos = []; $("formVeiculo").reset(); $("tituloForm").textContent = "Adicionar veículo"; mostrarPrevia(); }

/* ---------- 5. INICIALIZAÇÃO ---------- */
document.addEventListener("DOMContentLoaded", async () => {
  $("f_categoria").innerHTML = CATEGORIAS.map(c => `<option>${c}</option>`).join("");
  $("f_cor").innerHTML = Object.keys(CORES).map(c => `<option>${c}</option>`).join("");
  $("formVeiculo").addEventListener("submit", salvar);
  $("f_fotos").addEventListener("change", async e => {   // ao escolher arquivos, converte e adiciona
    for (const a of e.target.files) fotos.push(await redimensionar(a));
    e.target.value = ""; mostrarPrevia();
  });
  if (await Armazenamento.logado()) mostrarPainel();
});

/* ---------- 6. SAIR DA CONTA ---------- */
async function sair() { await Armazenamento.sair(); location.reload(); }
