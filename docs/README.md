# Angular Toolbox for VS Code 🧰

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Your essential toolkit for building Angular applications faster and with greater consistency.**

Stop juggling terminal commands and project style guides. **Angular Toolbox** provides a seamless, integrated experience within VS Code to generate schematics, manage configurations, and enforce team-wide standards. It's the multi-tool you'll wonder how you ever coded without.

![A GIF showing the right-click context menu workflow in action.](https://www.angulartoolbox.com/generate-component-with-right-click.gif)

## Why Choose Angular Toolbox? 🤔

In a collaborative environment, consistency is everything. In solo projects, speed is paramount. Angular Toolbox is built to deliver both. It replaces the repetitive, error-prone cycle of command-line generation with a powerful, intuitive UI.

- **🚀 Accelerate Your Workflow:** Scaffold components, services, pipes, directives, and guards in seconds, directly from the editor's context menu. No more context switching or memorizing CLI flags.
- **🤝 Enforce Project Consistency:** Use custom EJS templates to ensure every new file adheres to your team's architecture and coding standards. Eliminate style drift before it starts.
- **⚙️ Simplify Configuration:** Manage your project's component prefix and extension settings through a straightforward configuration file, keeping your setup clear and version-controlled.

---

## Features

### ⚡ Right-Click Generation

Our powerful and user-friendly generator is available right where you need it—in the folder context menu.

- **Generate Schematics from Scratch:**
  - Components
  - Services
  - Pipes
  - Directives
  - Route Guards
- **Act on Existing Files:**
  - Generate **specification files** (`.spec.ts`) for existing Angular elements.
  - Generate **Storybook stories files** (`.stories.ts`) for existing components.

### 🤖 Advanced Automation (Opt-in)

Supercharge your workflow with powerful automation, disabled by default and easily enabled in your `config.json`.

- **Automatic Storybook Generation:** When enabled, the extension will automatically generate a Storybook stories file every time you create a new component.
- **Automatic Barrel File Management:** When enabled, the extension automatically appends an export statement for newly generated files to an `index.ts` barrel file in the target directory. If `index.ts` doesn't exist, it will be created for you.

### 🗂️ Customizable EJS Templates

Take full control of your code generation. Angular Toolbox uses **EJS templating** to let you define precisely how every file is scaffolded.

To override the default templates, simply create a `.angular-toolbox` folder in your project's root. Inside this folder, add your custom `.ejs` files. The extension will automatically use your templates instead of the defaults.

### 🛠️ Centralized Configuration Management

Take control of your workspace with a simple `config.json` file.

- **Define Base Configuration:** Set up extension-wide settings that can be shared across your team.
- **Manage Component Prefix:** View and manage your project's component prefix directly from your workspace settings.
- **Toggle Automation:** Easily enable or disable automatic Storybook generation and barrel file updates to fit your project's needs.

---

## ✅ Requirements

Before you begin, please ensure your project meets the following requirements:

- **Angular v14** or higher.
- The extension works best when following the official **Angular file structure and naming conventions**.
- We recommend adhering to the [**Angular Style Guide**](https://angular.dev/style-guide#introduction).

---

## What's New? 📣

We're always improving! Check out our [CHANGELOG.md](CHANGELOG.md) to see the latest updates.

---

## Found an Issue or Have a Suggestion? 💡

This tool is for the community. If you encounter a bug or have an idea for a new feature, please don't hesitate to [open an issue](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/issues) on our GitHub page.
