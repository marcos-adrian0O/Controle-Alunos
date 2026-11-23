/* Faz o app falar com o Firebase usando a mesma interface que ele já usava
   (window.claude.use('db') -> collection/doc/onSnapshot/set/delete).
   Se o Firebase não estiver configurado, devolve null e o app usa o modo local (localStorage). */
(function () {
  'use strict';
  const cfg = window.FIREBASE_CONFIG || {};
  const ok = cfg.apiKey && !/^COLE/.test(cfg.apiKey) && window.firebase;

  function loginScreen(auth) {
    return new Promise(resolve => {
      const ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;z-index:100;display:grid;place-items:center;background:var(--bg,#eef2f7);padding:16px;font-family:var(--font-ui,system-ui)';
      ov.innerHTML = '<form style="width:min(360px,100%);display:flex;flex-direction:column;gap:12px;padding:24px;background:var(--surface,#fff);border:1px solid var(--line,#e1e6ef);border-radius:16px;box-shadow:var(--shadow)">' +
        '<h2 style="margin:0;font-family:var(--font-display,inherit)">Controle de Alunos</h2>' +
        '<p style="margin:0;color:var(--muted,#5b6a7e)">Entre para acessar os lançamentos.</p>' +
        '<input name="e" type="email" autocomplete="username" placeholder="E-mail" required class="textin" style="width:100%">' +
        '<input name="s" type="password" autocomplete="current-password" placeholder="Senha" required class="textin" style="width:100%">' +
        '<p class="err" style="margin:0;color:var(--bad,#c9342f);min-height:1.2em;font-size:13px"></p>' +
        '<button class="btn primary big" type="submit">Entrar</button></form>';
      document.body.appendChild(ov);
      const f = ov.querySelector('form'), err = ov.querySelector('.err');
      f.addEventListener('submit', async ev => {
        ev.preventDefault(); err.textContent = '';
        try { await auth.signInWithEmailAndPassword(f.e.value.trim(), f.s.value); ov.remove(); resolve(); }
        catch (e) { err.textContent = /too-many/.test(e.code) ? 'Muitas tentativas. Aguarde um pouco.' : 'E-mail ou senha incorretos.'; }
      });
    });
  }

  function logoutButton(auth) {
    const place = () => {
      const box = document.querySelector('.topright');
      if (!box || document.getElementById('btnSair')) return !!box;
      const b = document.createElement('button');
      b.id = 'btnSair'; b.type = 'button'; b.className = 'btn'; b.textContent = 'Sair';
      b.addEventListener('click', () => auth.signOut().then(() => location.reload()));
      box.appendChild(b); return true;
    };
    if (!place()) document.addEventListener('DOMContentLoaded', place);
  }

  window.claude = {
    use: async function (name) {
      if (name !== 'db' || !ok) return null;
      firebase.initializeApp(cfg);
      const auth = firebase.auth();
      const user = await new Promise(res => { const un = auth.onAuthStateChanged(u => { un(); res(u); }); });
      if (!user) await loginScreen(auth);
      logoutButton(auth);
      return firebase.firestore();
    }
  };
})();
