
# 🌀 Kokusen Frontend - Jujutsu Kaisen Manager

Este é o frontend da aplicação **Kokusen**, desenvolvido para o gerenciamento de personagens (feiticeiros) de Jujutsu Kaisen. O projeto utiliza as tecnologias mais recentes do ecossistema React para demonstrar um CRUD moderno, performático e tipado conforme as regras de negócio do backend em Quarkus.

---

## 🚀 Tecnologias e Padrões (React 19)

Este projeto foi construído seguindo os novos padrões do **React 19** e **Next.js 15**:

* **Hook `use()`**: Utilizado para consumir as Promises da API de forma declarativa dentro dos componentes.
* **React Compiler**: Ativado para otimização automática de renderização (sem necessidade de `useMemo` ou `useCallback` manuais).
* **Suspense & Fallbacks**: Implementação de estados de carregamento nativos enquanto os dados são buscados.
* **Error Boundaries**: Tratamento de erros de conexão e de lógica de negócio da API.
* **Tailwind CSS**: Interface limpa, responsiva e com foco na legibilidade.

---

## 🛠️ Funcionalidades do CRUD

O sistema foca na entidade **Character** (Personagem) e suporta as 4 operações fundamentais:

1.  **Create (POST)**: Cadastro de personagens enviando `name`, `rank` e `clanName`.
2.  **Read (GET)**: Listagem automática com suporte a estados "vazio" e "carregando".
3.  **Update (PUT)**: Edição de personagens existentes com preenchimento automático do formulário.
4.  **Delete (DELETE)**: Remoção de registros com confirmação do usuário.
5.  **Search**: Barra de busca funcional que consome o endpoint `/search` da sua API.

---

## 📂 Estrutura de Arquivos

```text
src/
├── api.js             # Chamadas fetch para o Quarkus (Porta 8080)
├── app/
│   ├── page.js        # Dashboard principal e lógica do CRUD
│   ├── layout.js      # Estrutura global e fontes
│   └── globals.css    # Estilização Tailwind
└── components/
    ├── CharacterList.jsx  # Exibição dos cards usando o hook use()
    └── ErrorState.jsx     # Feedback visual para erros de API
````

-----

## ⚙️ Configuração e Instalação

### 1\. Requisitos

  * Node.js 18+
  * Backend **Kokusen (Quarkus)** rodando (geralmente em `http://localhost:8080`)

### 2\. Instalação

No diretório do projeto, instale as dependências:

```bash
npm install
```

### 3\. Configurar o React Compiler

No arquivo `next.config.mjs`, verifique se o compilador está ativo:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
};
export default nextConfig;
```

### 4\. Execução

```bash
npm run dev
```

Abra [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) para visualizar.

-----

## ⚠️ Observações de Integração

  * **CORS**: Certifique-se de que o Quarkus possui o filtro de CORS ativo para permitir a porta `3000`.
  * **Validações**: O formulário respeita os Ranks da sua API (`SPECIAL_GRADE`, `GRADE_1`, etc.). Se a API retornar um erro (ex: clã não encontrado), o frontend exibirá um alerta com a mensagem vinda do backend.
  * **Promises Estáveis**: No `page.js`, a Promise da lista é mantida em um estado para evitar loops de requisições, conforme exigido pelo React 19.

-----
