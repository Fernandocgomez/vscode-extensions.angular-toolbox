# Change Log

All notable changes to the "Angular Toolbox" extension will be documented in this file.

## [Unreleased]

### Documentation

**license**: Change license from custom one to MIT.([8c5e8f0](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/26/commits/8c5e8f0948f5bd630c3b9e798c71cae865b9a37b))

### Fixed

**extension config**: Implemented error handling for scenarios involving an empty `config.json` file.([730a7f8](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/36/commits/730a7f848895a5673bb38edd837234c12184cafa))

### Changed

**templates**: Updated the component spec template.([5fb8eb4](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/37/commits/5fb8eb49a8bb9fa5c15710989dd3eed9a4a20f8b))

### Added

**common capabilities**: Automatically appends an export statement for generated files to an `index.ts` barrel file in the target directory. An `index.ts` file is created if not already present. This functionality is configurable via `config.json`, can be toggled, and is disabled by default (`false`).([71223ce](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/39/commits/71223ce49d119d2351f631a2a693aa1fb6eff212))

**common capabilities**: Implemented automatic generation of a Storybook stories file subsequent to component creation. This functionality is toggleable via a configuration setting in `config.json` and is disabled by default (`false`).([60e7604](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/41/commits/60e7604014bc2087b7e121562a65cfae5cea1e97))

## [Released]

## [0.1.0] - 2025-06-13

### Added

- **common-capabilities.generate-component**: Generate component boilerplate from default or custom template. ([ed435b8](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/ed435b83da1bae23976d8d4476a1d02e53070294))
- **common-capabilities.generate-service**: Generate service boilerplate from default or custom template. ([6ac4aa1](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/6ac4aa1f9e68964283056c16ac54b14ab33c5215))
- **common-capabilities.generate-pipe**: Generate pipe boilerplate from default or custom template. ([17564b1](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/17564b1d1b51da451050aab25426ebcf08ed0e3a))
- **common-capabilities.generate-directive**: Generate directive boilerplate from default or custom template. ([96144ab](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/96144abb822db55c95c349336a71764116d8a73e))
- **test.suite.generate-service.test**: Add missing service tests ([b7ae228](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/b7ae2283313777c43474d58bc64baefb54e64224))
- **extension-config.json-base-config**: Add default configuration file and add support for custom config provided by user. ([5324fb7](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/5324fb710738b3af34c5cceec68cd94c3433b192))
- **extension-config.prefix-workspace-config**: Register prefix on user workspace config and ability to show current prefix. ([5324fb7](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/commit/5324fb710738b3af34c5cceec68cd94c3433b192))

### Documentation

- **changelog**: standardize changelog. ([1e2aa51](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/19/commits/1e2aa51ae58fc0aaa7ae0f07453ab0b3bc7f5d79))
- **readme**: Add tutorial for release features. ([7653cd9](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/21/commits/7653cd99535b5d45fdb7fd484b534c567e9dd023))
- **license**: Change license from custom one to MIT.

### Chore

- **extension metadata**: add extension icon and select final name.([91f44f6](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/22/commits/91f44f66021aba7b2fcf6650a5b5bf5e16a71588))

### Changes

- **templates**: change user custom templates and custom config folder name from ".angular-custom-templates" to ".angular-toolbox" ([6d46786](https://github.com/Fernandocgomez/vscode-extensions.angular-toolbox/pull/22/commits/6d46786b5b2e424c43b98f447037af3fc51ba606))
