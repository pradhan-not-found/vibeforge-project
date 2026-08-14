<div align="center">
  <img src="./repo/adamas.png" height="100" style="margin: 0 15px;" align="absmiddle" />
  <img src="./repo/gamelimals.png" height="130" style="margin: 0 15px;" align="absmiddle" />
  <img src="./repo/cycoders.png" height="100" style="margin: 0 15px;" align="absmiddle" />

  <br />
  <br />

  <img src="./repo/banner.png" alt="Checkpost Banner" width="100%" />
  
  <br />
  <br />

  <h1><img src="./repo/checkpost-icon.png" height="40" align="absmiddle" /> Checkpost</h1>
  
  <p><strong>A modern, enterprise-grade AI security and monitoring dashboard.</strong></p>
</div>

**Checkpost** (repository: `vibeforge`) provides a comprehensive suite of tools for managing AI agents, testing Large Language Models (LLMs), and enforcing robust security policies—all wrapped in a stunning, highly responsive user interface.

## <img src="https://api.iconify.design/lucide/layout-template.svg?color=white" width="24" height="24" align="absmiddle" /> Architecture

Below is a high-level overview of the Checkpost architecture and user flow:

```mermaid
flowchart TD
    %% Define sleek, dark-mode friendly professional classes
    classDef default fill:#0f172a,stroke:#334155,stroke-width:1px,color:#e2e8f0
    classDef highlight fill:#38bdf8,stroke:#0284c7,stroke-width:2px,color:#0f172a,font-weight:bold
    classDef core fill:#1e293b,stroke:#475569,stroke-width:2px,color:#f8fafc
    classDef database fill:#020617,stroke:#6366f1,stroke-width:2px,color:#c7d2fe

    A((Admin User)):::highlight -->|Authenticates| B[Checkpost Client]:::core
    
    subgraph Frontend Features
        direction LR
        B --> C[Audit & Monitoring]
        B --> D[Threat Policies]
        B --> E[Agent Management]
        B --> F[LLM Testing]
    end
    
    subgraph Backend Services
        C -.-> G{API Layer}:::core
        D -.-> G
        E -.-> G
        F -.-> G
    end
    
    subgraph Infrastructure
        G ==> H[(Firebase Auth)]:::database
        G ==> I[(Supabase SQL)]:::database
        G ==> J[[External LLMs]]:::database
    end

    %% Link styles
    linkStyle default stroke:#64748b,stroke-width:2px,fill:none
```

## <img src="https://api.iconify.design/lucide/sparkles.svg?color=white" width="24" height="24" align="absmiddle" /> Features

| Feature | Description |
| :--- | :--- |
| **<img src="https://api.iconify.design/lucide/bar-chart.svg?color=white" width="20" height="20" align="absmiddle" /> Comprehensive Monitoring** | Keep track of system health with a real-time dashboard and detailed audit logs. |
| **<img src="https://api.iconify.design/lucide/bot.svg?color=white" width="20" height="20" align="absmiddle" /> Asset Management** | Seamlessly orchestrate your AI agents and perform isolated tests on various LLMs directly from the platform. |
| **<img src="https://api.iconify.design/lucide/shield-alert.svg?color=white" width="20" height="20" align="absmiddle" /> Advanced Security** | Define strict usage policies and monitor potential threats to ensure safe and compliant AI deployments. |
| **<img src="https://api.iconify.design/lucide/palette.svg?color=white" width="20" height="20" align="absmiddle" /> Premium UI/UX** | Built with Framer Motion, Tailwind CSS 4, and Lucide Icons for a beautiful, dynamic, and glassmorphism-inspired aesthetic. |
| **<img src="https://api.iconify.design/lucide/lock.svg?color=white" width="20" height="20" align="absmiddle" /> Secure Authentication** | Integrated with Firebase for secure, frictionless user authentication and session management. |

## <img src="https://api.iconify.design/lucide/layers.svg?color=white" width="24" height="24" align="absmiddle" /> Tech Stack

| Technology | Logo | Technology | Logo |
| :--- | :--- | :--- | :--- |
| **Next.js** | <img src="./repo/icons/nextjs.jpeg" width="32" style="border-radius:6px;" /> | **Framer Motion** | <img src="./repo/icons/framer.jpeg" width="32" style="border-radius:6px;" /> |
| **TypeScript** | <img src="./repo/icons/typescript.png" width="32" style="border-radius:6px;" /> | **Firebase** | <img src="./repo/icons/firebase.png" width="32" style="border-radius:6px;" /> |
| **React** | <img src="./repo/icons/react.png" width="32" style="border-radius:6px;" /> | **Supabase** | <img src="./repo/icons/supabase.jpeg" width="32" style="border-radius:6px;" /> |
| **Tailwind CSS** | <img src="./repo/icons/tailwindcss.jpeg" width="32" style="border-radius:6px;" /> | **Vercel** | <img src="./repo/icons/vercel.png" width="32" style="border-radius:6px;" /> |

## <img src="https://api.iconify.design/lucide/folder-git-2.svg?color=white" width="24" height="24" align="absmiddle" /> Project Structure

- `/src/app` - Next.js app router pages and layouts (Dashboard, Authentication, etc.)
- `/src/components` - Reusable React components (UI elements, Layouts)
- `/src/context` - React Context providers (AuthContext, DatabaseContext)
- `/src/lib` - Utility functions and third-party initializations (Firebase)

## <img src="https://api.iconify.design/lucide/users.svg?color=white" width="24" height="24" align="absmiddle" /> Team

| Photo | Name | Role |
| :---: | :--- | :--- |
| <img src="./public/teams/souradeeppradhan.png" width="60" style="border-radius: 50%; aspect-ratio: 1/1; object-fit: cover;" /> | **Souradeep Pradhan** | Full Stack Developer |
| <img src="./public/teams/anirudhhadas.png" width="60" style="border-radius: 50%; aspect-ratio: 1/1; object-fit: cover;" /> | **Aniruddha Das** | Full Stack Developer |
| <img src="./public/teams/sattwikdas.png" width="60" style="border-radius: 50%; aspect-ratio: 1/1; object-fit: cover;" /> | **Sattwik Das** | Full Stack Developer |

---

## <img src="https://api.iconify.design/lucide/file-text.svg?color=white" width="24" height="24" align="absmiddle" /> License

This project is licensed under the terms found in the [LICENSE](./LICENSE) file (Apache-2.0).

---

<p align="center">Made with ❤️ for devs by devs — <b>Fantastic 4</b></p>
