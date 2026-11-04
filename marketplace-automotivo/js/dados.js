// Veículos de demonstração (30). Colunas: marca, modelo, categoria, câmbio, combustível, cor, ano, km, preço, cidade
const DADOS_VEICULOS = [
["Toyota","Corolla Cross XRE","SUV","Automático","Flex","Branco",2022,34000,164900,"São Paulo"],
["Toyota","Hilux SRV","Picape","Automático","Diesel","Prata",2021,58000,239900,"Goiânia"],
["Toyota","Corolla XEi","Sedan","CVT","Flex","Preto",2020,52000,121900,"Belo Horizonte"],
["Honda","HR-V EXL","SUV","CVT","Flex","Cinza",2021,41000,138900,"Curitiba"],
["Honda","Civic Touring","Sedan","CVT","Gasolina","Branco",2019,63000,119900,"Rio de Janeiro"],
["Honda","Fit EX","Hatchback","CVT","Flex","Prata",2018,72000,69900,"Campinas"],
["Volkswagen","T-Cross Highline","SUV","Automático","Flex","Azul",2022,28000,142900,"Porto Alegre"],
["Volkswagen","Gol 1.0","Hatchback","Manual","Flex","Branco",2020,49000,49900,"Pirapora"],
["Volkswagen","Polo Track","Hatchback","Manual","Flex","Vermelho",2023,12000,76900,"Brasília"],
["Volkswagen","Saveiro Robust","Picape","Manual","Flex","Cinza",2021,45000,79900,"Montes Claros"],
["Chevrolet","Onix LT","Hatchback","Manual","Flex","Prata",2021,38000,64900,"Salvador"],
["Chevrolet","Tracker Premier","SUV","Automático","Flex","Preto",2023,15000,152900,"São Paulo"],
["Chevrolet","S10 High Country","Picape","Automático","Diesel","Branco",2020,81000,219900,"Cuiabá"],
["Chevrolet","Spin LTZ","Minivan","Automático","Flex","Cinza",2019,67000,79900,"Uberlândia"],
["Fiat","Argo Drive","Hatchback","Manual","Flex","Vermelho",2022,22000,69900,"Recife"],
["Fiat","Toro Volcano","Picape","Automático","Diesel","Azul",2021,54000,149900,"Belo Horizonte"],
["Fiat","Pulse Impetus","SUV","CVT","Flex","Branco",2023,9000,119900,"Fortaleza"],
["Fiat","Fiorino Endurance","Utilitário","Manual","Flex","Branco",2020,60000,72900,"Pirapora"],
["Ford","Ranger Limited","Picape","Automático","Diesel","Preto",2022,36000,269900,"Londrina"],
["Ford","Mustang GT","Esportivo","Automático","Gasolina","Amarelo",2018,29000,329900,"São Paulo"],
["Hyundai","Creta Ultimate","SUV","Automático","Flex","Cinza",2023,11000,157900,"Belo Horizonte"],
["Hyundai","HB20 Comfort","Hatchback","Manual","Flex","Prata",2021,43000,63900,"Goiânia"],
["Renault","Duster Iconic","SUV","CVT","Flex","Marrom",2022,26000,112900,"Curitiba"],
["Renault","Master Furgão","Van","Manual","Diesel","Branco",2019,98000,159900,"Contagem"],
["Nissan","Kicks Exclusive","SUV","CVT","Flex","Azul",2022,30000,119900,"Rio de Janeiro"],
["Jeep","Compass Limited","SUV","Automático","Flex","Verde",2021,47000,149900,"Brasília"],
["BMW","320i M Sport","Sedan","Automático","Gasolina","Preto",2021,33000,259900,"São Paulo"],
["Mercedes-Benz","C 300 Cabriolet","Conversível","Automático","Gasolina","Branco",2019,27000,339900,"São Paulo"],
["Audi","A4 Avant","Perua","Automático","Gasolina","Cinza",2020,40000,229900,"Curitiba"],
["BYD","Dolphin Plus","Hatchback","Automático","Elétrico","Azul",2024,6000,149800,"São Paulo"],
["Volkswagen","Nivus Highline","SUV","Automático","Flex","Cinza",2022,24000,129900,"Belo Horizonte"],
["Toyota","Yaris XL","Hatchback","CVT","Flex","Prata",2021,36000,89900,"Montes Claros"],
["Honda","City EXL","Sedan","CVT","Flex","Branco",2022,28000,118900,"Pirapora"],
["Mitsubishi","L200 Triton HPE","Picape","Automático","Diesel","Preto",2021,60000,229900,"Várzea da Palma"],
["Nissan","Kicks Sense","SUV","CVT","Flex","Prata",2022,31000,104900,"Pirapora"],
["Chevrolet","Cruze LTZ","Sedan","Automático","Flex","Preto",2019,70000,89900,"Brasília"],
["Fiat","Strada Freedom","Picape","Manual","Flex","Branco",2023,14000,111900,"Pirapora"],
["Renault","Sandero Zen","Hatchback","Manual","Flex","Vermelho",2022,29000,62900,"Várzea da Palma"],
["Jeep","Renegade Sport","SUV","Automático","Flex","Branco",2021,43000,99900,"Pirapora"],
["Kia","Sportage EX","SUV","Automático","Flex","Cinza",2021,38000,134900,"Belo Horizonte"],
].map((r,i)=>({id:i+1,marca:r[0],modelo:r[1],categoria:r[2],cambio:r[3],combustivel:r[4],cor:r[5],ano:r[6],km:r[7],preco:r[8],cidade:r[9],destaque:i%4===0,cc:r[10],tipo:r[11],status:"ativo",
  vendedor:"S&V Veículos",whatsapp:"5538999999999"}));

/* ===== CATÁLOGO GERADO =====
   Modelos reais vendidos no Brasil (pesquisa Fenabrave 2026). Ano, km, preço, cor e cidade são EXEMPLOS.
   Motos:  "Modelo/cilindrada/Tipo"  (S=Street T=Trail N=Naked E=Esportiva C=Custom X=Scooter B=Cub A=Big Trail)
   Carros: "Modelo/Categoria/Câmbio/Combustível/Preço novo" (H,S,D,P,V | M,A,C | F,D,E,H) */
const TIPOS = {S:"Street",T:"Trail",N:"Naked",E:"Esportiva",C:"Custom",X:"Scooter",B:"Cub",A:"Big Trail"};
const MOTOS = {
 "Honda":"CG 125/125/S;CG 150/150/S;CG 160 Titan/160/S;CG 160 Fan/160/S;CG 160 Start/160/S;Biz 100/100/B;Biz 110i/110/B;Biz 125/125/B;Pop 100/100/B;Pop 110i/110/B;Bros 150/150/T;NXR 160 Bros/160/T;XRE 190/190/T;XRE 300/300/T;Sahara 300/300/T;CB 300F Twister/300/N;CB 500F/471/N;CB 500X/471/T;Hornet/600/N;CBR 500R/471/E;CBR 650R/649/E;PCX 150/150/X;PCX 160/160/X;ADV 150/150/X;ADV 160/160/X;X-ADV/745/X;Africa Twin/1084/A;Gold Wing/1833/C",
 "Yamaha":"Factor 125/125/S;Factor 150/150/S;Fazer 150/150/N;FZ15/149/N;Fazer 250/249/N;FZ25/249/N;YBR 125/125/S;Crosser 150/150/T;Lander 250/249/T;XTZ 125/125/T;XTZ 150/150/T;XTZ 250 Ténéré/249/T;NMAX 160/155/X;XMAX 250/249/X;MT-03/321/N;MT-07/689/N;MT-09/890/N;R15/155/E;R3/321/E;R6/599/E;R1/998/E;Ténéré 700/689/A",
 "Bajaj":"Dominar 160/160/S;Dominar 200/200/S;Dominar 250/248/S;Dominar 400/373/S;Pulsar N150/150/N;Pulsar N160/160/N;Pulsar NS200/200/N",
 "Royal Enfield":"Hunter 350/349/C;Classic 350/349/C;Meteor 350/349/C;Bullet 350/349/C;Himalayan 411/411/T;Himalayan 450/452/T;Scram 411/411/T;Guerrilla 450/452/N;Interceptor 650/648/C;Continental GT 650/648/C;Super Meteor 650/648/C;Shotgun 650/648/C",
 "Kawasaki":"Ninja 250/249/E;Ninja 300/296/E;Ninja 400/399/E;Ninja 500/451/E;Ninja 650/649/E;Ninja ZX-6R/636/E;Ninja ZX-10R/998/E;Z300/296/N;Z400/399/N;Z500/451/N;Z650/649/N;Z900/948/N;Z1000/1043/N;Versys 300/296/T;Versys 650/649/T;Versys 1000/1043/T;Vulcan 650/649/C;KLR 650/652/T",
 "BMW":"G 310 R/313/N;G 310 GS/313/T;F 750 GS/853/T;F 800 GS/798/T;F 850 GS/853/T;F 900 R/895/N;F 900 GS/895/T;R 1200 GS/1170/A;R 1250 GS/1254/A;R 1300 GS/1300/A;S 1000 RR/999/E;S 1000 R/999/N;M 1000 RR/999/E;R 18/1802/C",
 "Shineray":"Worker 125/125/S;Jet 125/125/B;Jet 125 SS/125/B;Phoenix 50/50/B;XY 50/50/B;SHI 175/175/T;SHI 250/250/S;Storm 200/200/S;Free 150/150/S;Urban 150/150/X",
 "Haojue":"DK 150/150/S;DK 160/160/S;DR 160/160/T;NK 150/150/N;NK 160/160/N;Master Ride 150/150/S;Lindy 125/125/B;VR 150/150/S"};
const CARROS_EXTRA = {
 "Volkswagen":"Tera Highline/S/A/F/146000;T-Cross Sense/S/A/F/135000;Polo Highline/H/A/F/115000;Virtus Highline/D/A/F/118000;Taos Highline/S/A/F/190000;Amarok Extreme/P/A/D/315000;Tiguan Allspace/S/A/F/260000",
 "Fiat":"Mobi Like/H/M/F/68000;Argo Trekking/H/M/F/82000;Cronos Drive/D/C/F/92000;Fastback Audace/S/C/F/135000;Strada Volcano/P/C/F/118000;Toro Freedom/P/A/D/165000;Titano Ranch/P/A/D/230000;Ducato Furgão/V/M/D/230000",
 "Chevrolet":"Onix Plus Premier/D/A/F/105000;Montana LTZ/P/A/F/135000;Equinox Premier/S/A/F/245000;Trailblazer High Country/S/A/D/330000",
 "Hyundai":"HB20 Platinum/H/A/F/98000;HB20S Platinum/D/A/F/100000;Tucson GLS/S/A/F/180000;Creta Platinum/S/A/F/165000",
 "Toyota":"Yaris Cross XRX Hybrid/S/C/H/190000;Corolla Cross Hybrid/S/C/H/190000;SW4 Diamond/S/A/D/395000;Yaris Sedan XLS/D/C/F/105000;RAV4 Hybrid/S/C/H/320000",
 "Honda":"WR-V EXL/S/C/F/130000;HR-V Advanced/S/C/F/195000",
 "Renault":"Kwid Intense/H/M/F/68000;Oroch Outsider/P/A/F/115000;Kardian Evolution/S/C/F/130000",
 "Jeep":"Commander Limited/S/A/D/265000;Avenger Summit/S/A/F/180000",
 "Nissan":"Versa Exclusive/D/C/F/125000;Frontier PRO4X/P/A/D/320000",
 "Peugeot":"208 GT/H/A/F/125000;2008 GT/S/A/F/170000",
 "Citroën":"C3 Shine/H/M/F/85000;Basalt Turbo/S/C/F/110000",
 "Ford":"Ranger Storm/P/A/D/330000;Maverick Lariat/P/A/H/270000;Bronco Sport/S/A/F/285000",
 "BYD":"Dolphin Mini/H/A/E/115000;Song Plus/S/A/H/230000;Song Pro/S/A/H/190000;Seal/D/A/E/290000",
 "Mitsubishi":"Pajero Sport HPE/S/A/D/340000;Eclipse Cross HPE/S/C/F/220000"};

let semente = 7;   // sorteio repetível: o site sempre gera os mesmos exemplos
function sorteio(n) { semente = (semente * 9301 + 49297) % 233280; return Math.floor(semente / 233280 * n); }
const PALETA = ["Branco","Preto","Prata","Cinza","Vermelho","Azul","Verde"];
const CIDADES = ["Pirapora","Pirapora","Várzea da Palma","Buritizeiro","Montes Claros","Belo Horizonte","Brasília"];
function novoVeiculo(extra, ano, idade, preco, km) {
  return {id: DADOS_VEICULOS.length + 1, ano, km, preco: Math.round(preco * (1 - 0.06 * idade) / 100) * 100,
    cor: PALETA[sorteio(PALETA.length)], cidade: CIDADES[sorteio(CIDADES.length)], destaque: false, status: "ativo",
    vendedor: "S&V Veículos", whatsapp: "5538999999999", ...extra};
}
for (const [marca, lista] of Object.entries(MOTOS)) for (const item of lista.split(";")) {
  const [modelo, cc, t] = item.split("/"), ano = 2018 + sorteio(8), idade = 2026 - ano;
  const fator = {BMW:1.5, Kawasaki:1.2, "Royal Enfield":1.1}[marca] || 1, base = (cc <= 60 ? 7000 : 7000 + cc * 60) * fator;
  DADOS_VEICULOS.push(novoVeiculo({marca, modelo, categoria:"Moto", cambio: t === "X" ? "Automático" : "Manual",
    combustivel: (marca === "Honda" || marca === "Yamaha") && cc <= 300 ? "Flex" : "Gasolina", cc: Number(cc), tipo: TIPOS[t]},
    ano, idade, base, idade * (4000 + sorteio(6000))));
}
const CAT = {H:"Hatchback",S:"SUV",D:"Sedan",P:"Picape",V:"Van"}, CAMB = {M:"Manual",A:"Automático",C:"CVT"}, COMB = {F:"Flex",D:"Diesel",E:"Elétrico",H:"Híbrido"};
for (const [marca, lista] of Object.entries(CARROS_EXTRA)) for (const item of lista.split(";")) {
  const [modelo, c, cb, co, preco] = item.split("/"), ano = 2019 + sorteio(7), idade = 2026 - ano;
  DADOS_VEICULOS.push(novoVeiculo({marca, modelo, categoria:CAT[c], cambio:CAMB[cb], combustivel:COMB[co]},
    ano, idade, Number(preco), idade * (8000 + sorteio(8000)) + 3000));
}
