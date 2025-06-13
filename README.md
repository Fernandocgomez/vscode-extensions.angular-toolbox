# Angular Toolbox for VS Code 🧰

**Your essential toolkit for building Angular applications faster and with greater consistency.**

Stop juggling terminal commands and project style guides. **Angular Toolbox** provides a seamless, integrated experience within VS Code to generate schematics, manage configurations, and enforce team-wide standards. It's the multi-tool you'll wonder how you ever coded without.

![A GIF showing the right-click context menu workflow in action.](https://www.angulartoolbox.com/generate-component-with-right-click.gif)

## Why Choose Angular Toolbox? 🤔

In a collaborative environment, consistency is everything. In solo projects, speed is paramount. Angular Toolbox is built to deliver both. It replaces the repetitive, error-prone cycle of command-line generation with a powerful, intuitive UI.

- **🚀 Accelerate Your Workflow:** Scaffold components, services, pipes, and directives in seconds, directly from the editor's context menu. No more context switching or memorizing CLI flags.
- **🤝 Enforce Project Consistency:** Use custom EJS templates to ensure every new file adheres to your team's architecture and coding standards. Eliminate style drift before it starts.
- **⚙️ Simplify Configuration:** Manage your project's component prefix and extension settings through a straightforward configuration file, keeping your setup clear and version-controlled.

---

## Features

### ⚡ Right-Click Schematics Generator

Our powerful and user-friendly generator is available right where you need it—in the folder context menu.

- **Components:** Scaffold components with options for custom templates.
- **Services:** Generate service boilerplate instantly.
- **Pipes:** Create new pipes using your predefined templates.
- **Directives:** Scaffold directives with a single click.

### 🗂️ Customizable EJS Templates

Take full control of your code generation. Angular Toolbox uses **EJS templating** to let you define precisely how every file is scaffolded.

To override the default templates, simply create a `.angular-toolbox` folder in your project's root. Inside this folder, add your custom `.ejs` files. The extension will automatically use your templates instead of the defaults.

### 🛠️ Centralized Configuration Management

Take control of your workspace with a simple `config.json` file.

- **Define Base Configuration:** Set up extension-wide settings that can be shared across your team.
- **Manage Component Prefix:** View and manage your project's component prefix directly from your workspace settings, ensuring all new components are correctly named.

---

## ✅ Requirements

Before you begin, please ensure your project meets the following requirements:

- **Angular v14** or higher.
- The extension works best when following the official **Angular file structure and naming conventions**.
- We recommend adhering to the [**Angular Style Guide**](https://angular.dev/style-guide#introduction).

---

## Getting Started 🏁

Getting started with **Angular Toolbox** is as simple as a right-click.

1.  Install the extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/).
2.  Open your Angular project and navigate to the Explorer view.
3.  **Right-click** on any folder where you want to generate a new file.
4.  In the context menu, hover over **"Angular Toolbox"** and select what you want to create (e.g., `Generate Component`).
5.  Enter a name, press Enter, and you're done! Your new files are instantly created right where you need them.

### How to Use Custom Templates

1.  Create a folder named `.angular-toolbox` in the root of your project.
2.  Add your custom template files (e.g., `component.ejs`, `service.spec.ejs`).
3.  The next time you generate a schematic, Angular Toolbox will use your custom templates. It's that simple!

---

## 📚 Full Documentation & Tutorials

For a complete guide, including detailed tutorials, advanced configuration options, and tips for creating your own EJS templates, please visit our full documentation website.

**[➡️ Explore the Documentation](https://www.angulartoolbox.com/)**

---

## What's New? 📣

We're always improving! Check out our [CHANGELOG.md](CHANGELOG.md) to see the latest updates.

---

## Found an Issue or Have a Suggestion? 💡

This tool is for the community. If you encounter a bug or have an idea for a new feature, please don't hesitate to [open an issue](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/issues) on our GitHub page.
