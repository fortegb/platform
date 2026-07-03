(() => {
  const el = document.getElementById('portal-build-meta');
  const script = document.currentScript;
  if (!el || !script) return;

  const boardUrl = 'https://github.com/orgs/fortegb/projects/1';

  fetch(new URL('build-info.json', script.src))
    .then((r) => (r.ok ? r.json() : null))
    .then((info) => {
      if (!info) return;
      const when = new Date(info.date).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        dateStyle: 'short',
        timeStyle: 'short',
      });
      el.innerHTML =
        `Atualizado ${when} · <a href="${info.url}" target="_blank" rel="noopener">${info.hash}</a> · <a href="${boardUrl}" target="_blank" rel="noopener">Board GitHub</a>`;
    })
    .catch(() => {});
})();
