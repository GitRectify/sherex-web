
# 🌐 Sherex Web (React/Next.js) Setup Guide

> ⚠️ This guide is for running **Sherex as a web application** using React or Next.js (not React Native).

---

## ✅ Prerequisites

Ensure your development environment includes:

* **Node.js** > v18+
* **npm** or **Yarn**
* **Git**
* (Optional) **Next.js CLI** if using Next:

  ```bash
  npm install
  ```

---

## 📦 Core Dependencies

The web version of Sherex uses:

* [`axios`](https://www.npmjs.com/package/axios) — For API requests
* [`dotenv`](https://www.npmjs.com/package/dotenv) — For managing environment variables
* [`prop-types`](https://www.npmjs.com/package/prop-types) — Type-checking React components
* [`react-router-dom`](https://reactrouter.com/en/main) — For page routing (React)
* [`next/router`](https://nextjs.org/docs/api-reference/next/router) — For routing (Next.js)
* [`react-intl`](https://formatjs.io/docs/getting-started/installation/) — For localization (web alternative to `react-native-localization`)

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-org/sherex-web.git
cd sherex-web
```

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_PROJECT_ID=your-project-id
```

Use `process.env.NEXT_PUBLIC_*` in your code to access them.

### 4. Run Development Server

#### For React (Vite or CRA):

```bash
yarn start
# or vite
```

#### For Next.js:

```bash
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 📦 Building for Production

### React:

```bash
yarn build && yarn preview
```

### Next.js:

```bash
yarn build
yarn start
```

---

## ✅ Recommended Project Structure

```
sherex-web/
│
├── public/             # Static assets
├── src/
│   ├── components/     # Shared React components
│   ├── pages/          # Pages (Next.js or React Router)
│   ├── hooks/          # Custom hooks
│   ├── services/       # API logic (e.g., axios)
│   ├── locales/        # Localization files
│   └── App.tsx / page.tsx
├── .env.local
├── next.config.js / vite.config.js
└── package.json
```

---

## 🧪 Testing & Debugging

* Add support for tools like:

  * `Jest` or `Vitest`
  * `React Testing Library`
  * `ESLint` + `Prettier` for formatting and linting

---
