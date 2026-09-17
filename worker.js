const NOME_CACHE = 'analisador-corrida-v1';

// Arquivos que ficam salvos no celular
const ARQUIVOS_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icone-192.png',
  './icone-512.png'
];

// Instalar e guardar arquivos
self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(NOME_CACHE)
      .then((cache) => cache.addAll(ARQUIVOS_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Usar salvo se não tiver internet
self.addEventListener('fetch', (evento) => {
  evento.respondWith(
    caches.match(evento.request)
      .then((respostaSalva) => {
        return respostaSalva || fetch(evento.request);
      })
  );
});

// Atualizar automaticamente
self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((nomes) => {
      return Promise.all(
        nomes.filter((nome) => nome !== NOME_CACHE)
             .map((nome) => caches.delete(nome))
      );
    })
  );
});
