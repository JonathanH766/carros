const $ = id => document.getElementById(id);
let tipo = "carro";   // aba ativa: "carro" ou "moto"
async function carregarMarcas() { opcoes($("marca"), (await Armazenamento.veiculos()).filter(v => (tipo === "moto") === (v.categoria === "Moto")).map(v => v.marca), "Marca"); }
async function setTipo(t) {   // troca de aba Carros/Motos: recarrega marcas e modelos da aba
  tipo = t; document.querySelectorAll(".abas button").forEach(b => b.classList.toggle("on", b.dataset.t === t));
  $("titulo").textContent = t === "moto" ? "Motos à venda" : "Carros à venda";
  await carregarMarcas(); await carregarModelos(); aplicarFiltros();
}
function tirar(k) { $(k).value = ""; if (k === "marca") carregarModelos().then(aplicarFiltros); else aplicarFiltros(); }   // ✕ do chip
function opcoes(sel, valores, rotulo) {
  sel.innerHTML = `<option value="">${rotulo}</option>` + [...new Set(valores)].sort().map(v => `<option>${v}</option>`).join("");
}
async function carregarModelos() {
  const m = $("marca").value;
  opcoes($("modelo"), (await Armazenamento.veiculos()).filter(v => (!m || v.marca === m) && (tipo === "moto") === (v.categoria === "Moto")).map(v => v.modelo), "Modelo");
}
async function aplicarFiltros() {
  const num = id => $(id).value === "" ? null : Number($(id).value);
  const f = {q:$("q").value.trim().toLowerCase(), marca:$("marca").value, modelo:$("modelo").value, categoria:$("categoria").value,
    cor:$("cor").value, cambio:$("cambio").value, combustivel:$("combustivel").value,
    anoMin:num("anoMin"), anoMax:num("anoMax"), precoMin:num("precoMin"), precoMax:num("precoMax"), kmMax:num("kmMax")};
  const favs = new URLSearchParams(location.search).get("favoritos") ? Armazenamento.favoritos() : null;
  const r = (await Armazenamento.veiculos()).filter(v => v.status === "ativo" &&
    (!favs || favs.includes(v.id)) && (f.categoria || (tipo === "moto") === (v.categoria === "Moto")) &&
    (!f.q || `${v.marca} ${v.modelo} ${v.categoria} ${v.cidade}`.toLowerCase().includes(f.q)) &&
    (!f.marca || v.marca === f.marca) && (!f.modelo || v.modelo === f.modelo) && (!f.categoria || v.categoria === f.categoria) &&
    (!f.cor || v.cor === f.cor) && (!f.cambio || v.cambio === f.cambio) && (!f.combustivel || v.combustivel === f.combustivel) &&
    (f.anoMin === null || v.ano >= f.anoMin) && (f.anoMax === null || v.ano <= f.anoMax) &&
    (f.precoMin === null || v.preco >= f.precoMin) && (f.precoMax === null || v.preco <= f.precoMax) &&
    (f.kmMax === null || v.km <= f.kmMax));
  const ord = {menor:(a,b)=>a.preco-b.preco, maior:(a,b)=>b.preco-a.preco, ano:(a,b)=>b.ano-a.ano, km:(a,b)=>a.km-b.km}[$("ordem").value];
  if (ord) r.sort(ord);
  $("contador").textContent = `${r.length} veículo(s) encontrado(s)`;
  const nomes = {q:"Busca", marca:"Marca", modelo:"Modelo", categoria:"Categoria", cor:"Cor", cambio:"Câmbio", combustivel:"Combustível"};   // chips dos filtros aplicados
  $("chips").innerHTML = Object.keys(nomes).filter(k => $(k).value).map(k => `<span class="chip">${$(k).value}<b onclick="tirar('${k}')">✕</b></span>`).join("");
  listarCards(r, "lista");
}
async function limparFiltros() { $("formFiltros").reset(); await carregarModelos(); await aplicarFiltros(); }
document.addEventListener("DOMContentLoaded", async () => {
  const todos = await Armazenamento.veiculos();
  await carregarMarcas();
  opcoes($("categoria"), CATEGORIAS.filter(c => c !== "Moto"), "Categoria");
  opcoes($("cor"), Object.keys(CORES), "Cor");
  opcoes($("cambio"), ["Manual","Automático","CVT","Automatizado"], "Câmbio");
  opcoes($("combustivel"), ["Flex","Gasolina","Etanol","Diesel","Elétrico","Híbrido"], "Combustível");
  await carregarModelos();
  const p = new URLSearchParams(location.search);
  ["q","marca","categoria"].forEach(k => { if (p.get(k)) $(k).value = p.get(k); });
  if (p.get("tipo") === "moto" || p.get("categoria") === "Moto") await setTipo("moto");
  $("marca").addEventListener("change", async () => { await carregarModelos(); await aplicarFiltros(); });
  $("formFiltros").addEventListener("submit", e => { e.preventDefault(); aplicarFiltros(); });
  $("formFiltros").addEventListener("change", aplicarFiltros);
  $("limpar").addEventListener("click", limparFiltros);
  await aplicarFiltros();
});
