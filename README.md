# Physica Platform

**A modern, modular learning platform for exploring physics concepts built with Astro.**

![astro](https://img.shields.io/badge/built%20with-Astro-FF5D01?logo=astro)&nbsp;![typescript](https://img.shields.io/badge/language-TypeScript-blue)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Introduction

Physica Platform is an open-source educational website featuring interactive physics calculators, articles, and tutorials. Powered by Astro, it delivers fast performance and a modular architecture that makes it easy to add new calculators and content.

## Features

- Collection of physics calculators (kinematics, dynamics, projectile motion, circular motion, etc.)
- Blog powered by MDX for rich formatting
- SEO-friendly sitemap and RSS feed
- Responsive design with custom themes for each calculator
- Unit conversion utilities and helper functions

## Tech Stack

- **Framework:** [Astro](https://astro.build)
- **Language:** TypeScript & MDX
- **Styling:** CSS Modules and global styles
- **Testing:** Vitest & Testing Library
- **Icons:** astro-icon + Material Design Icons JSON

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/AlejandroIMP/physica-platform.git
cd physica-platform

# Install dependencies
npm install
``` 

### Running Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Building for Production

```bash
# Generate a production build
npm run build

# Preview the output
npm run preview
```

## Testing

Unit and integration tests are written with Vitest. To run the full suite:

```bash
npm test
```

Or run a specific group:

```bash
npm run test:ts        # Run TypeScript tests
npm run test:tiros     # Run projectile motion tests
```

## Folder Structure

```text
├── public/                Static assets (images, fonts, favicon)
├── src/
│   ├── components/        Reusable Astro & UI components
│   ├── content/           Blog posts and MDX files
│   ├── constants/         Shared constants and config
│   ├── layout/            Page layouts and templates
│   ├── pages/             Route-driven pages
│   ├── styles/            CSS files and themes
│   ├── types/             TypeScript type declarations
│   └── utils/             Helper functions and unit converters
├── astro.config.mjs       Astro configuration
├── tsconfig.json          TypeScript configuration
├── package.json           Dependencies and scripts
└── vitest.config.ts       Test runner configuration
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes. Make sure to update tests and documentation where applicable.

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

- Based on the [Bear Blog](https://github.com/HermanMartinus/bearblog) theme
- Built with Astro and the Astro community integrations

---
*Happy learning!*
