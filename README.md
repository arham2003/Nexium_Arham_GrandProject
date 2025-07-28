# PitchCraft - AI powered Pitch Writer

- The PitchCraft enables founders, students, and startup teams to quickly generate compelling pitch content using AI-powered automation. Users can craft summaries, emails, elevator pitches, and more, all within a clean and responsive web UI.

## Wireframes and PRD

- Wireframes and PRD can be accessed through `/doc` folder.
- Wireframe Figma Design can be viewed here also. [Figma Design](https://www.figma.com/design/6toenixQ994Q0kmVhbRrMZ/wireframe---ai-pitch-writer-final?node-id=0-1&t=WOQIQycO6bMs8RNc-1)

## ✨ Features

- **🎤 Elevator Pitch Generator**  
  Converts your startup description into a concise, high-impact 30-second elevator pitch. Supports tone customization.

- **📩 Investor Email Writer**  
  Drafts cold outreach emails for investors using your input. Automatically formats subject, body, and closing.

- **📊 Usage Tracking**  
  Each signed-up user gets **5 free trials per feature** every month. Usage is tracked via Supabase, MongoDB and Prisma.

- **Auth System**  
  Signup/login is fully integrated with Supabase Auth.

- **Saved Pitches**  
  Logged-in users can view and manage previously generated pitches on the **Saved Pitches** page.

- **n8n Integration**  
  Features are powered by external AI workflows via **n8n webhooks**. Payloads are dynamically sent to the webhook and parsed on return.

- **Responsive Frontend**  
  Clean, modern UI using Tailwind CSS and Next.js App Router. Built for desktop and mobile.

---

## Directory Structure:

```
grand-project/
    ├── ai/
        └── workflows/
            └── n8n_ai_pitch_craft.json
    ├── docs/
        ├── PitchCraft-PRD-Arham.pdf
        └── PitchWriter-WireFrame-Arham.png
    └── frontend/
        ├── app/
            ├── about/
                └── page.tsx
            ├── api/
                ├── generate-pitch/
                    └── route.ts
                ├── pitches/
                    └── route.ts
                ├── sample-prompts/
                    └── route.ts
                ├── usage/
                    └── route.ts
                └── users/
                    └── save/
                        └── route.ts
            ├── auth/
                ├── login/
                    └── page.tsx
                └── signup/
                    └── page.tsx
            ├── help/
                └── page.tsx
            ├── pitch/
                └── page.tsx
            ├── pricing/
                └── page.tsx
            ├── profile/
                └── page.tsx
            ├── saved-pitches/
                └── page.tsx
            ├── favicon.ico
            ├── globals.css
            ├── layout.tsx
            └── page.tsx
        ├── components/
            ├── animations/
                └── AnimatedContent/
                    └── AnimatedContent.tsx
            ├── backgrounds/
                └── Aurora/
                    └── Aurora.tsx
            ├── Carousel/
                └── Carousel.tsx
            ├── magicui/
                └── blur-fade.tsx
            ├── SpotlightCard/
                └── SpotlightCard.tsx
            ├── TextAnimations/
                ├── RotatingText/
                    └── RotatingText.tsx
                └── ShinyText/
                    └── ShinyText.tsx
            ├── ui/
            ├── ContentSection.tsx
            ├── faqs-2.tsx
            ├── footer.tsx
            ├── header.tsx
            ├── hero-section.tsx
            ├── LenisProvider.tsx
            ├── Loader.tsx
            ├── LoginComponent.tsx
            ├── PitchSection.tsx
            ├── pricing.tsx
            ├── ResumeCard.tsx
            ├── SavedPitches.tsx
            ├── SignupComponent.tsx
            └── ToastNotification.tsx
        ├── lib/
            ├── profile-data.ts
            ├── supabase-browser.ts
            └── utils.ts
        ├── prisma/
            └── schema.prisma
        ├── public/
            ├── images/
        ├── utils/
            ├── supabase/
                ├── client.ts
                ├── middleware.ts
                └── server.ts
            └── prisma.ts
        ├── .gitignore
        ├── components.json
        ├── eslint.config.mjs
        ├── jsrepo.json
        ├── middleware.ts
        ├── next.config.ts
        ├── package-lock.json
        ├── package.json
        ├── pnpm-lock.yaml
        ├── pnpm-workspace.yaml
        ├── postcss.config.mjs
        ├── README.md
        └── tsconfig.json
.pre-commit-config.yaml
cz.json
README.md
```

## 🔄 n8n Workflow

The project uses [n8n](https://n8n.io) for orchestration of AI generation tasks. On each pitch request, a POST request is made to a custom webhook with the user input.

### Payload Sample:

```json
{
  "userId": "uuid",
  "feature": "INVESTOR_EMAIL",
  "inputPrompt": "We're building a fintech tool for Gen Z...",
  "tone": "friendly"
}
```

- n8n returns a structured JSON output, which is parsed and saved via Prisma.

You can find the n8n workflow file in:

```
/ai/workflows/n8n_ai_pitch_craft.json
```

## Free Trial

Each user gets:

5 free generations per feature per month

Usage is stored in the usage table with fields like:

- elevatorCount

- investorEmailCount

- month, year

Quota is checked server-side on each pitch request. If exceeded, the user is blocked from generating more.

## Tech Stack

Frontend: Next.js App Router, Tailwind CSS, TypeScript

Backend: Node.js (API Routes), Prisma ORM

Auth & DB: Supabase (For Auth), MongoDB (For User Data)

Workflow: n8n (AI Webhooks)

## Getting Started (Local)

```
pnpm install
pnpm prisma generate
pnpm dev
```

Make sure to set your environment variables:

```
DATABASE_URL=your_postgres_url
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
N8N_WEBHOOK_URL=https://n8n.yourdomain/webhook/...
```

## License

MIT – feel free to fork, remix, and use it in your own projects.
