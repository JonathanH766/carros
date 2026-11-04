# AutoMercado (HTML + CSS + JS puro)
1. Abra a pasta no VS Code. 2. Instale a extensão **Live Server** (Ritwick Dey). 3. Clique com o botão direito em `index.html` > *Open with Live Server*.
- Filtros: página **Comprar** (marca, modelo, ano, preço, km, cor, câmbio, combustível, categoria, ordenação).
- Dados: `js/dados.js` (30 veículos) e LocalStorage via `js/armazenamento.js`.
- Publicar: arraste a pasta em app.netlify.com/drop, ou envie por FTP para `public_html`.
- Limitação: LocalStorage é local de cada navegador, não é banco compartilhado. Para Supabase, altere só `armazenamento.js`.

## Painel do dono
Abra `painel.html` (senha em `js/painel.js`, constante `SENHA`). Ali ele adiciona, edita, pausa, marca como vendido e exclui veículos, com fotos.
⚠ Os dados ficam no LocalStorage do navegador de quem cadastrou: os visitantes NÃO veem os carros novos. Para o site real é obrigatório ligar um banco (Supabase) — troque só o `armazenamento.js`.

## Ligar o Supabase (modo nuvem)
1. supabase.com > novo projeto. 2. SQL Editor: cole e rode `supabase.sql`. 3. Authentication > Users: crie o usuário do dono (e desative novos cadastros). 4. Cole a URL e a chave anon em `js/config.js`. Pronto: sem preencher, o site roda em modo local.

## Mapas das lojas
Sem configurar nada o mapa já aparece. Para usar a API oficial: Google Cloud > ativar *Maps Embed API* > criar chave > colar em `GOOGLE_MAPS_CHAVE` (`js/config.js`) e restringir ao seu domínio.

## Fotos dos veículos
Coloque as fotos em `assets/img/veiculos/` com o nome do modelo (veja `LEIA-ME.txt` lá dentro): `honda-cg-160-titan-1.jpg`, `-2.jpg`, `-3.jpg`. Sem arquivo, o site mostra uma ilustração. Veículos cadastrados no Painel usam as fotos enviadas no próprio cadastro.
