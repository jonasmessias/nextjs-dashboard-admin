# 📊 Dashboard Admin

> A modern full-stack admin panel featuring JWT authentication, user management, and analytics dashboards.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)

## 🚀 About the Project

This is a robust **full-stack dashboard** built with **Next.js 15** and **React 19**. It provides a complete solution for administrative tasks, featuring secure authentication, role-based access control, and interactive data visualization.

### Key Features

- 🔐 **Secure Authentication** - JWT-based login system with OTP support and session management.
- 👥 **User Management** - Complete CRUD with role-based permissions (Admin, Business, Client).
- 📈 **Analytics Dashboards** - Interactive charts and KPIs using Recharts.
- 🎯 **Business Logic** - Management modules for Campaigns, Businesses, and Clients.
- ⚡ **High Performance** - Built with Server Components, React Query, and optimized lazy loading.
- 🎨 **Modern UI** - Responsive design using Radix UI and Tailwind CSS.

## 🛠️ Tech Stack

- **Core:** Next.js 15.3 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4.1, Radix UI
- **State & Data:** TanStack Query, Axios
- **Forms & Validation:** React Hook Form, Zod
- **Visualizations:** Recharts, TanStack Table
- **Utils:** date-fns, Sonner (Toasts)

## 📦 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/jonasmessias/nextjs-dashboard-admin
# Enter directory
cd nextjs-dashboard-admin

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
