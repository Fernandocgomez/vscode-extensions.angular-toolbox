# Change Log

All notable changes to the "Angular Toolbox" extension will be documented in this file.

## [Unreleased]

### Doc

- **docs**: Updated the README to link to the changelog section on the documentation website instead of the repository file.([613fb3f](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/613fb3f66239422db2c82ade4eb061cc78196678))

### Added

- **common capabilities**: Added a context menu command to generate TypeScript type boilerplate.([fac82a4](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/fac82a4952e402edb7e36bd71804b86998aceb02))
- **common capabilities**: Added a context menu command to generate TypeScript enum boilerplate.([1ba177e](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/1ba177ebe7f79cbcab2b4a938b4b54765c611bb5))
- **common capabilities**: Added a context menu command to generate TypeScript interface boilerplate.([0680ee7](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/0680ee72142b51fddc6d294a6171fc557736b576))

## [Released]

## [0.4.0] - 2025-07-12

### Doc

- **docs**: Enhance our documentation by adding dedicated sections for contributions and our code of conduct.([61f23bd](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/63/commits/61f23bd17648356b284dd63802b4f0db1bc08fachttps://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/63/commits/61f23bd17648356b284dd63802b4f0db1bc08fac))

### Chore

- **github**: Implement a CI/CD workflow to deploy `./docs` content to AWS S3 and invalidate the CloudFront cache upon PR merges to `main`.([e1e995c](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/65/commits/e1e995cb98ee92979ad5a91a9817d1dc6b365a0d))

### Added

- **common capabilites**: Adds a context menu command to generate class boilerplate.([ce3ad54](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/67/commits/ce3ad54b908ef2a27ef4eebc2be02a1203c78610))
- **common capabilities**: Enhanced element name input handling to support multiple case formats (camelCase, kebab-case, and PascalCase):
  - Component([9f440ca](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/9f440ca35c9553a40c2a80707f449ed55ec811bb))
  - Service([fae4170](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/fae4170c69c87304e9a85594d735dae713516a26))
  - Pipe([796ad4a](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/796ad4a))
  - Directive([8cb771e](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/68/commits/8cb771ee34ec3e569f1a84e5f46f92de316ad5df))
  - Route guards([53b4a73](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/68/commits/53b4a734e41d57b16ea88627945866c8ec54b65f))

---

## [0.3.0] - 2025-06-27

### Doc

- **docs**: Scaffolded the documentation website with foundational boilerplate.([60c796b](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/52/commits/60c796b2fa44b36011897c40afe562741248eee8))

### Added

- **common capabilities**: Streamlined the schematic generation workflow by deriving the component prefix from the `fernandocgomez.angular-toolbox.prefix` workspace setting, removing the manual input prompt.([bd81820](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/54/commits/bd8182074d659e22c74cfea6ee08aad05aa51a4e))
- **package json**: Configured the display order of the Angular Toolbox submenu commands for improved discoverability.([54948fe](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/55/commits/54948fe3e885be533e8c3b017f511620d500fb6b))

---

## [0.2.0] - 2025-06-20

### Doc

**license**: Change license from custom one to MIT.([8c5e8f0](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/26/commits/8c5e8f0948f5bd630c3b9e798c71cae865b9a37b))

### Fixed

- **extension config**: Implemented error handling for scenarios involving an empty `config.json` file.([730a7f8](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/36/commits/730a7f848895a5673bb38edd837234c12184cafa))

### Changed

- **templates**: Updated the component spec template.([5fb8eb4](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/37/commits/5fb8eb49a8bb9fa5c15710989dd3eed9a4a20f8b))

### Added

- **common capabilities**: Automatically appends an export statement for generated files to an `index.ts` barrel file in the target directory. An `index.ts` file is created if not already present. This functionality is configurable via `config.json`, can be toggled, and is disabled by default (`false`).([71223ce](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/39/commits/71223ce49d119d2351f631a2a693aa1fb6eff212))
- **common capabilities**: Implemented automatic generation of a Storybook stories file subsequent to component creation. This functionality is toggleable via a configuration setting in `config.json` and is disabled by default (`false`).([60e7604](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/41/commits/60e7604014bc2087b7e121562a65cfae5cea1e97))
- **common capabilities**: Enabled Storybook stories file generation for components via a context menu action.([5d1fca9](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/42/commits/5d1fca9d2607609d4b8c99d2e7f63d9785015f0d))
- **common capabilities**: Implemented a context menu action to facilitate the generation of specification files for pre-existing Angular elements.([b1b6024](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/44/commits/b1b6024886a51b3f34fe7cb29cf6a5bc0ec7a0d5))
- **common capabilities**: Enabled the generation of Route Guards and their corresponding spec file via a context menu action.([4aab7a4](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/46/commits/4aab7a41675b8a931c25a0dd71c9fec3aafcce9b))

---

## [0.1.0] - 2025-06-13

### Added

- **common-capabilities.generate-component**: Generate component boilerplate from default or custom template. ([ed435b8](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/ed435b83da1bae23976d8d4476a1d02e53070294))
- **common-capabilities.generate-service**: Generate service boilerplate from default or custom template. ([6ac4aa1](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/6ac4aa1f9e68964283056c16ac54b14ab33c5215))
- **common-capabilities.generate-pipe**: Generate pipe boilerplate from default or custom template. ([17564b1](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/17564b1d1b51da451050aab25426ebcf08ed0e3a))
- **common-capabilities.generate-directive**: Generate directive boilerplate from default or custom template. ([96144ab](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/96144abb822db55c95c349336a71764116d8a73e))
- **test.suite.generate-service.test**: Add missing service tests ([b7ae228](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/b7ae2283313777c43474d58bc64baefb54e64224))
- **extension-config.json-base-config**: Add default configuration file and add support for custom config provided by user. ([5324fb7](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/5324fb710738b3af34c5cceec68cd94c3433b192))
- **extension-config.prefix-workspace-config**: Register prefix on user workspace config and ability to show current prefix. ([5324fb7](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/5324fb710738b3af34c5cceec68cd94c3433b192))

### Doc

- **changelog**: standardize changelog. ([1e2aa51](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/19/commits/1e2aa51ae58fc0aaa7ae0f07453ab0b3bc7f5d79))
- **readme**: Add tutorial for release features. ([7653cd9](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/21/commits/7653cd99535b5d45fdb7fd484b534c567e9dd023))
- **license**: Change license from custom one to MIT.

### Chore

- **extension metadata**: add extension icon and select final name.([91f44f6](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/22/commits/91f44f66021aba7b2fcf6650a5b5bf5e16a71588))

### Changed

- **templates**: change user custom templates and custom config folder name from ".angular-custom-templates" to ".angular-toolbox" ([6d46786](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/22/commits/6d46786b5b2e424c43b98f447037af3fc51ba606))
