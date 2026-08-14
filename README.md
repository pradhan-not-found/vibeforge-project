<div align="center">
  <img src="./repo/banner.png" alt="Checkpost Banner" width="100%" />
  <br />
  <img src="./repo/logo.png" alt="Checkpost Logo" width="100%" />

  <h1><img src="https://api.iconify.design/lucide/shield.svg?color=white" width="32" height="32" align="absmiddle" /> Checkpost</h1>
  
  <p><strong>A modern, enterprise-grade AI security and monitoring dashboard.</strong></p>

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
  </p>
</div>

**Checkpost** (repository: `vibeforge`) provides a comprehensive suite of tools for managing AI agents, testing Large Language Models (LLMs), and enforcing robust security policies—all wrapped in a stunning, highly responsive user interface.

## <img src="https://api.iconify.design/lucide/layout-template.svg?color=white" width="24" height="24" align="absmiddle" /> Architecture

Below is a high-level overview of the Checkpost architecture and user flow:

```mermaid
graph TD
    A([Admin / User]) -->|Authenticates| B(Checkpost Dashboard)
    
    subgraph Dashboard Views
    B -->|Monitors| C[Audit Logs & Metrics]
    B -->|Manages| D[AI Agents]
    B -->|Evaluates| E[LLM Testing]
    B -->|Enforces| F[Security Policies]
    end
    
    subgraph Backend Infrastructure
    C --> G{API Layer}
    D --> G
    E --> G
    F --> G
    end
    
    subgraph Data & Auth
    G --> H[(Firebase Auth)]
    G --> I[(Supabase / DB)]
    G --> J[External LLM APIs]
    end
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style G fill:#dfd,stroke:#333,stroke-width:2px
```

## <img src="https://api.iconify.design/lucide/sparkles.svg?color=white" width="24" height="24" align="absmiddle" /> Features

- **<img src="https://api.iconify.design/lucide/bar-chart.svg?color=white" width="20" height="20" align="absmiddle" /> Comprehensive Monitoring**: Keep track of system health with a real-time dashboard and detailed audit logs.
- **<img src="https://api.iconify.design/lucide/bot.svg?color=white" width="20" height="20" align="absmiddle" /> Asset Management**: Seamlessly orchestrate your AI agents and perform isolated tests on various LLMs directly from the platform.
- **<img src="https://api.iconify.design/lucide/shield-alert.svg?color=white" width="20" height="20" align="absmiddle" /> Advanced Security**: Define strict usage policies and monitor potential threats to ensure safe and compliant AI deployments.
- **<img src="https://api.iconify.design/lucide/palette.svg?color=white" width="20" height="20" align="absmiddle" /> Premium UI/UX**: Built with Framer Motion, Tailwind CSS 4, and Lucide Icons for a beautiful, dynamic, and glassmorphism-inspired aesthetic.
- **<img src="https://api.iconify.design/lucide/lock.svg?color=white" width="20" height="20" align="absmiddle" /> Secure Authentication**: Integrated with Firebase for secure, frictionless user authentication and session management.

## <img src="https://api.iconify.design/lucide/layers.svg?color=white" width="24" height="24" align="absmiddle" /> Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Backend & Auth**: [Firebase](https://firebase.google.com/) / [Supabase](https://supabase.com/)
- **AI Integrations**: Google Generative AI, Groq SDK

## <img src="https://api.iconify.design/lucide/rocket.svg?color=white" width="24" height="24" align="absmiddle" /> Getting Started

### Prerequisites

Make sure you have Node.js (v18 or higher) and npm/yarn/pnpm installed on your machine.

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/your-username/vibeforge.git
   cd vibeforge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Variables**:
   Create a `.env.local` file in the root directory and add your required configuration (e.g., Firebase, Supabase, LLM API keys):
   ```env
   # Add your environment variables here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## <img src="https://api.iconify.design/lucide/folder-git-2.svg?color=white" width="24" height="24" align="absmiddle" /> Project Structure

- `/src/app` - Next.js app router pages and layouts (Dashboard, Authentication, etc.)
- `/src/components` - Reusable React components (UI elements, Layouts)
- `/src/context` - React Context providers (AuthContext, DatabaseContext)
- `/src/lib` - Utility functions and third-party initializations (Firebase)

## <img src="https://api.iconify.design/lucide/file-text.svg?color=white" width="24" height="24" align="absmiddle" /> License

This project is licensed under the terms found in the [LICENSE](./LICENSE) file.
