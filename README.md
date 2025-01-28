# DASA Frontend

Uma aplicação React moderna para gerenciamento de produtos e categorias, construída com TypeScript, Material UI e Vite.

## 🚀 Tecnologias

- React 18
- TypeScript
- Material UI
- Styled Components
- React Router DOM
- Axios
- Zod (validação)
- React Number Format
- Redux Toolkit

## 📋 Funcionalidades

- Gerenciamento de produtos
  - Listagem
  - Criação
  - Edição
  - Exclusão
  - Validação de campos
  - Formatação de valores monetários
  
- Gerenciamento de categorias
  - Listagem
  - Criação
  - Edição
  - Exclusão
  - Validação de campos

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências
npm install
3. Execute o projeto
npm run dev

## 🔧 Configuração

O projeto espera uma API rodando em `http://localhost:3000`. Você pode alterar a URL base da API no arquivo `src/services/api.ts`.

## 📦 Estrutura do Projeto
src/
├── components/ # Componentes reutilizáveis
├── constants/ # Constantes da aplicação
├── hooks/ # Hooks customizados
├── pages/ # Páginas da aplicação
├── services/ # Serviços de API
├── styles/ # Estilos globais e temas
├── types/ # Tipos TypeScript
└── schemas/ # Schemas de validação Zod

## 🧪 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a build de produção
- `npm run lint`: Executa o linter
- `npm run preview`: Visualiza a build de produção localmente

## 🎨 Temas

A aplicação utiliza o Material UI para componentes base e Styled Components para estilização customizada. O tema pode ser configurado em:

- `src/App.tsx` (tema Material UI)
- `src/styles/theme/index.ts` (tema Styled Components)

## 📄 Licença

Este projeto está sob a licença MIT.