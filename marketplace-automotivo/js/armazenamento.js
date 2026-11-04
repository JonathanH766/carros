/* =====================================================
   armazenamento.js — ÚNICO arquivo que acessa os dados.
   Modo NUVEM (Supabase) se config.js estiver preenchido;
   senão modo LOCAL (LocalStorage, só demonstração).
   Todas as funções de dados são async: use "await".
   ===================================================== */
const NUVEM = typeof supabase !== "undefined" && typeof SUPABASE_URL !== "undefined" && !SUPABASE_URL.includes("COLE");
const db = NUVEM ? supabase.createClient(SUPABASE_URL, SUPABASE_CHAVE) : null;
const SENHA_LOCAL = "admin123";   // só vale no modo local (demonstração)

const Armazenamento = {
  // ---- LocalStorage com tratamento de erro (usado no modo local e nos favoritos) ----
  ler(chave, padrao) {
    try { const v = localStorage.getItem(chave); return v ? JSON.parse(v) : padrao; }
    catch (e) { console.error("Erro ao ler", chave, e); return padrao; }
  },
  gravar(chave, valor) {
    try { localStorage.setItem(chave, JSON.stringify(valor)); return true; }
    catch (e) { alert("Não foi possível salvar (armazenamento cheio?)."); return false; }
  },

  // ---- VEÍCULOS ----
  async veiculos() {
    if (NUVEM) {
      const { data, error } = await db.from("veiculos").select("*").order("id", { ascending: false });
      if (error) { console.error(error); return []; }
      return data;
    }
    let lista = this.ler("mk_veiculos", null);
    if (!lista) { lista = DADOS_VEICULOS; this.gravar("mk_veiculos", lista); }
    return lista;
  },
  async veiculo(id) {
    if (NUVEM) {
      const { data } = await db.from("veiculos").select("*").eq("id", Number(id)).maybeSingle();
      return data || undefined;
    }
    return (await this.veiculos()).find(v => v.id === Number(id));
  },
  async salvarVeiculo(v) {
    if (NUVEM) {
      const dados = { ...v }; delete dados.criado_em;
      if (!dados.id) delete dados.id;              // id novo: o banco cria sozinho
      const { error } = await db.from("veiculos").upsert(dados);
      if (error) { alert("Erro ao salvar: " + error.message); return false; }
      return true;
    }
    const l = await this.veiculos(), i = l.findIndex(x => x.id === v.id);
    if (i >= 0) l[i] = v; else { v.id = Math.max(0, ...l.map(x => x.id)) + 1; l.push(v); }
    return this.gravar("mk_veiculos", l);
  },
  async excluirVeiculo(id) {
    if (NUVEM) return !(await db.from("veiculos").delete().eq("id", Number(id))).error;
    return this.gravar("mk_veiculos", (await this.veiculos()).filter(v => v.id !== Number(id)));
  },

  // ---- FOTOS: na nuvem sobe o arquivo e devolve o endereço; no local mantém o base64 ----
  async enviarFoto(f) {
    if (!NUVEM || !f.startsWith("data:")) return f;   // já é um endereço: não reenvia
    const blob = await (await fetch(f)).blob();
    const nome = Date.now() + "-" + Math.random().toString(36).slice(2) + ".jpg";
    const { error } = await db.storage.from("fotos").upload(nome, blob, { contentType: "image/jpeg" });
    if (error) throw error;
    return db.storage.from("fotos").getPublicUrl(nome).data.publicUrl;
  },

  // ---- LOGIN DO DONO ----
  async login(email, senha) {
    if (NUVEM) return !(await db.auth.signInWithPassword({ email, password: senha })).error;
    if (senha !== SENHA_LOCAL) return false;
    sessionStorage.setItem("mk_logado", "1"); return true;
  },
  async logado() {
    if (NUVEM) return !!(await db.auth.getSession()).data.session;
    return !!sessionStorage.getItem("mk_logado");
  },

  async sair() { if (NUVEM) await db.auth.signOut(); sessionStorage.removeItem("mk_logado"); },

  // ---- FAVORITOS: ficam sempre no navegador de cada visitante ----
  favoritos() { return this.ler("mk_favoritos", []); },
  alternarFavorito(id) {
    let f = this.favoritos();
    f = f.includes(id) ? f.filter(x => x !== id) : [...f, id];
    this.gravar("mk_favoritos", f); return f.includes(id);
  }
};
