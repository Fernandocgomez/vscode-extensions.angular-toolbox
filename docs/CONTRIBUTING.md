# How to contribute to Angular Toolbox for VS Code 🧰

First off, thank you for considering contributing to Angular Toolbox! It's people like you that make this project a great tool for the community. We are really glad you are here and we need volunteers to help this project become the number one Angular extension for VS Code, free for all.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## Getting Started

Contributions are made to this repo via Issues and Pull Requests (PRs).

- **Issues**: Used to report bugs, request features, or discuss potential changes before implementing them.
- **Pull Requests**: For submitting changes to the codebase.

## Code of Conduct

This project and everyone participating in it is governed by the
[Angular Toolbox Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are
expected to uphold this code. Please report unacceptable behavior to [fernandocgomez@live.com](mailto:fernandocgomez@live.com).

## How Can I Contribute?

### Reporting Bugs

This is a great way to contribute. Before reporting a bug, please check the existing [issues](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/issues?q=is%3Aissue+is%3Aopen+label%3Abug) to see if someone has already reported it.

If you can't find an open issue addressing the problem, please [open a new one](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/issues/new/choose). Be sure to choose the **Bug Report** template and fill out the required information. This will help us to quickly identify and fix the problem.

### Suggesting Enhancements

If you have an idea for a new feature or an improvement to an existing one, we'd love to hear about it! Please [open a new issue](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/issues/new/choose) and select the **Feature Request** template. Providing a detailed description will help us understand your suggestion and discuss a plan for implementation.

### Your First Code Contribution

Ready to contribute some code? Here’s how to set up your environment and submit a pull request.

#### Development Setup

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork locally:
    ```bash
    git clone https://github.com/YOUR_USERNAME/vscode-extensions.angular-toolbox.git
    ```
3.  **Navigate** to the project directory:
    ```bash
    cd vscode-extensions.angular-toolbox
    ```
4.  **Install** dependencies:
    ```bash
    npm install
    ```
5.  **Open** the project in VS Code.
6.  Press `F5` to **run** the extension in a new Extension Development Host window.

#### Pull Request Process

1.  **Create a new branch** from the `main` branch. Please use a descriptive name that follows our conventions.

    **Branch Naming Conventions:**
    - `added/<feature-name>`: for new features (e.g., `added/add-module-template`)
    - `changed/<feature-name>`: for changes to existing features (e.g., `changed/update-component-logic`)
    - `chore/<chore-name>`: for miscellaneous changes (e.g., `chore/upgrade-dependencies-ejs`)
    - `fixed/<issue-or-description>`: for bug fixes (e.g., `fixed/42-path-error`)
    - `security/<vulnerability-description>`: for security fixes.
    - `doc/<topic>`: for documentation (e.g., `doc/update-contributing-guide`)
    - `test/<component-or-feature>`: for adding tests (e.g., `test/component-generation`)
    - `refactor/<component-name>`: for code refactoring.

    ```bash
    git checkout -b added/my-awesome-feature
    ```

2.  **Make your changes**. Write clean, readable code and add comments where necessary.

3.  **Commit your changes**. We follow a convention for commit messages that helps us automate changelogs and releases. Please use one of the following types in your commit message:

    **Commit Types:**
    - `added`: For new features.
    - `changed`: For changes in existing functionality.
    - `deprecated`: For soon-to-be removed features.
    - `removed`: For now removed features.
    - `fixed`: For any bug fixes.
    - `security`: In case of vulnerabilities.
    - `doc`: For documentation-only changes.
    - `test`: For adding missing tests or correcting existing tests.
    - `refactor`: A code change that neither fixes a bug nor adds a feature.
    - `chore`: For miscellaneous changes like updating dependencies or pipeline configurations.

    The commit message format should be `type(scope): subject`.
    - The `scope` (between parenthesis) describes the module or part of the extension being changed. Examples include `templates`, `common-capabilities`, `extension-config`, or `root` for files in the project's root directory.

    Example:
    ```bash
    git commit -m "added(templates): add route guard template"
    git commit -m "fixed(extension config): resolve path issue on Windows"
    git commit -m "doc(docs): clarify commit scope conventions"
    ```

4.  **Push your branch** to your fork on GitHub:
    ```bash
    git push origin added/my-awesome-feature
    ```

5.  **Open a Pull Request** (PR) to the `main` branch of the original `Fernandocgomez/vscode-extensions.angular-toolbox` repository.

6.  In your PR description, provide a clear explanation of the changes. If your PR fixes an existing issue, please reference it using `Closes #issue-number`.

7.  We will review your PR, provide feedback, and merge it once it's ready. Thank you for your contribution!

## A Note on the README file

The main `README.md` file is the front door to our project. When adding a new feature or changing existing functionality, please consider if the `README.md` needs to be updated as well. This could include new screenshots, updated feature lists, or changes to installation and usage instructions. Keeping the README clear and up-to-date is crucial for our users.
