# Portfolio Website

Iori Kawano's portfolio website built with Next.js, featuring bilingual support (English/Japanese) and a modern, accessible design system.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog page
│   ├── experiment/        # Experiment page
│   └── work/              # Work case studies
├── components/            # Reusable React components
├── src/
│   ├── compositions/      # Layout components (Header, Footer)
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utilities and helpers
├── messages/              # next-intl translation files
│   ├── en.json           # English translations
│   └── jp.json           # Japanese translations
├── i18n/                  # next-intl configuration
├── docs/                  # Project documentation
└── public/                # Static assets
```

## 🛠️ Tech Stack

- **Next.js 14** (App Router) - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **next-intl** - Internationalization (EN/JP)
- **shadcn/ui** - UI component library
- **Vercel** - Deployment platform

## 🌐 Internationalization

This portfolio supports bilingual content (English/Japanese) using `next-intl`. 

- Translation files: `messages/en.json` and `messages/jp.json`
- Language switcher in header
- Automatic locale detection via middleware

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup instructions
- [next-intl Migration](./docs/next-intl-migration.md) - Migration guide
- [Design System](./docs/architecture/design-system.md) - Design system documentation
- [Typography Guide](./docs/TYPOGRAPHY_GUIDE.md) - Typography guidelines

## 🎨 Design System

The project follows a structured design system with:

- **Typography**: Helvetica Neue (headings), Noto Sans JP (Japanese body), Space Mono (tags)
- **Spacing**: Tailwind's default 8pt scale
- **Colors**: Grayscale + primary accent (#007aff)
- **Responsive**: Mobile-first approach

See `docs/architecture/design-system.md` for details.

## 🚢 Deployment

The site is deployed on Vercel. Push to `main` branch triggers automatic deployment.

## 📝 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Key Features

- ✅ Bilingual support (EN/JP)
- ✅ Responsive design
- ✅ Accessible (WCAG compliant)
- ✅ SEO optimized
- ✅ Fast performance (Lighthouse scores)

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

Private project - All rights reserved
