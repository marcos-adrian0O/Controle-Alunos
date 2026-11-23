# Controle de Alunos

Painel e chamada rápida de alunos por horário (presença, faltas, reposições, vendas).
Site estático (HTML + JS) com dados compartilhados no **Firebase Firestore** e login por e-mail/senha.

## Estrutura
- `index.html` – o sistema inteiro
- `firebase-config.js` – suas chaves do Firebase (você preenche)
- `firebase-adapter.js` – liga o app ao Firebase e mostra a tela de login
- `firestore.rules` – regras de segurança (só usuários logados)
- `vercel.json` – cabeçalhos de segurança

Sem configurar o Firebase, o app funciona em **modo local** (dados só naquele navegador).

## 1. Firebase (gratuito)
1. Acesse https://console.firebase.google.com e crie um projeto.
2. **Build > Firestore Database > Criar banco** (modo produção, região `southamerica-east1`).
3. Aba **Regras**: cole o conteúdo de `firestore.rules` e publique.
4. **Build > Authentication > Começar > E-mail/senha > Ativar**.
5. Aba **Users > Adicionar usuário**: crie um login para cada pessoa que vai usar.
6. Em Authentication > Configurações > Ações do usuário, desative a criação de contas (sign-up) para ninguém se cadastrar sozinho.
7. **Configurações do projeto > Seus apps > Web (`</>`)**: registre o app e copie o `firebaseConfig` para `firebase-config.js`.

## 2. GitHub
```bash
git init
git add .
git commit -m "Controle de Alunos"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/controle-alunos.git
git push -u origin main
```

## 3. Vercel
1. https://vercel.com > **Add New > Project** > importe o repositório.
2. Framework: **Other**. Não precisa de build command nem output directory.
3. **Deploy**. Cada `git push` publica de novo automaticamente.
4. No Firebase: Authentication > Configurações > **Domínios autorizados** > adicione o domínio `*.vercel.app` do seu projeto.

## Importar dados antigos
Se você já lançou dados no modo local, abra o app no mesmo navegador, vá em Preencher > Ajustes e use "Importar para os dados compartilhados".
