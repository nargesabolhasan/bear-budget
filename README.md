<div align="center">

<img src="public/favicon.svg" alt="Bear Budget logo — personal finance, budget tracker, and expense tracker" width="120" height="120" />

# Bear Budget

**Open-source personal finance app, budget tracker, and expense tracker** built with Next.js.

Track income, expenses, savings, debts, and credits. Create tags and monthly budgets. Works in **English** and **Persian (Farsi)** with **Gregorian** and **Jalali** calendars.

[Features](#features) · [Install](#installation) · [Usage](#usage) · [Tech stack](#tech-stack)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-installable-9ab973)](#install-as-an-app-pwa)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20FA-blue)](#features)

</div>

## What is Bear Budget?

**Bear Budget** is a lightweight **personal budget tracker** and **expense manager** you can run locally in the browser. It helps you:

- Log **income**, **expenses**, **savings**, **credit**, and **debt**
- Group money with custom **tags** (name, icon, color, and type)
- Set **monthly budgets** per tag and see remaining vs spent
- View a **financial summary** for the current month
- Switch **light / dark** theme, **English / Persian**, and **Gregorian / Jalali** calendar
- Print a monthly summary
- Install it as a **Progressive Web App (PWA)**

Your transactions, tags, and budgets are stored in the browser (`localStorage`). Login only saves a display name in a cookie — there is no cloud account or extra `.env` setup.

## Features

| Area | What you get |
| --- | --- |
| **Transactions** | Add, edit, delete, search, and filter. Group by type or tag. Settle credit/debt. |
| **Tags** | Custom categories with icon, color, and type (income, expense, save, credit, debt). |
| **Budgets** | Monthly limits per tag, with remaining / spent / overflow. |
| **Dashboard** | Income, outgoing, savings, remaining, plus carry-over from last month. |
| **Calendar** | Gregorian or Jalali (Shamsi / Persian calendar). |
| **Language** | English and Persian (Farsi) with RTL layout. |
| **Theme** | Light and dark mode. |
| **Print** | Printable monthly financial summary. |
| **PWA** | Add to home screen and use like a mobile app. |

## Installation

### Prerequisites

- **Node.js 22** or later ([download](https://nodejs.org/))
- **Yarn** (this repo uses `yarn.lock`)

Install Yarn if you do not have it:

```bash
npm install -g yarn
```

### 1. Clone the repository

```bash
git clone https://github.com/nargesabolhasan/bear-budget.git
cd bear-budget
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start the development server

```bash
yarn dev
```

### 4. Open the app

Go to [http://localhost:3000](http://localhost:3000).

On first visit you will see the login screen. Enter a **name** (used as your display name) and continue. You can then create tags, add transactions, and set budgets.

No environment variables are required.

## Usage

Typical first-time flow:

1. **Log in** with your name.
2. **Create tags** (for example: Salary, Groceries, Rent) with a type, icon, and color.
3. **Add transactions** — amount, tag, date, and optional description.
4. **Create budgets** for the month so you can see remaining vs spent.
5. Check the **home dashboard** for income, outgoing, savings, and remaining.
6. Open **Settings** to change language, theme, calendar, name, or print a summary.

### Available scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the Next.js dev server (Turbopack) |
| `yarn build` | Create a production build |
| `yarn start` | Run the production server (`yarn build` first) |
| `yarn lint` | Run ESLint |
| `yarn format` | Format files with Prettier |
| `yarn format:check` | Check formatting without writing |

### Production build

```bash
yarn build
yarn start
```

Then open [http://localhost:3000](http://localhost:3000).

### Install as an app (PWA)

In a supporting browser (Chrome, Edge, Safari on iOS):

1. Open Bear Budget.
2. Use **Install app** / **Add to Home Screen**.
3. Launch it like a native app (standalone window, home-screen icon).

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [MUI](https://mui.com/), [Tailwind CSS 4](https://tailwindcss.com/) |
| State | [Zustand](https://github.com/pmndrs/zustand) (persisted in the browser) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) |
| i18n | [i18next](https://www.i18next.com/) (English & Persian) |
| Dates | [react-multi-date-picker](https://github.com/shahabyazdi/react-multi-date-picker) (Gregorian & Jalali) |
| Language | TypeScript |

## Project structure

```text
bear-budget/
├── app/                 # Next.js App Router pages and API routes
├── components/          # UI (atoms, molecules, feature screens)
├── store/               # Zustand stores (transactions, tags, budgets)
├── i18n/                # English and Persian translations
├── hooks/               # Calendar, filters, summaries
├── theme/               # Light/dark theme and RTL
└── public/              # Icons, PWA manifest, images
```

## Contributing

Issues and pull requests are welcome.

1. Fork the repo and create a branch.
2. Run `yarn install` then `yarn dev`.
3. Keep changes focused. Run `yarn lint` before you open a PR.

CI on `main` runs `yarn lint` and `yarn build` (Node.js 22).

## GitHub topics

Suggested repository topics for discovery:

`budget-tracker` `expense-tracker` `personal-finance` `nextjs` `typescript` `pwa` `i18n` `persian` `jalali` `tailwindcss` `zustand` `react`

---

Made for people who want a simple, private **budget tracker** in the browser — in English or Persian.
