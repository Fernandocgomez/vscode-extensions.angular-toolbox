import { ExtensionConfig, SafeExtensionConfig } from '@models';
import defaultConfig from './default-config.json';
import { getUserRootPath } from '@extensionFramework';
import * as path from 'path';
import { existsSync } from '@fileSystem';

class ExtensionConfigService {
	readonly #config: SafeExtensionConfig = this.#getExtensionConfigFile();

	static #instance: ExtensionConfigService;

	private constructor() {}

	static getInstance(): ExtensionConfigService {
		if (!ExtensionConfigService.#instance) {
			ExtensionConfigService.#instance = new ExtensionConfigService();
		}

		return ExtensionConfigService.#instance;
	}

	skipComponentSpec(): boolean {
		return this.#config.component.skipSpec;
	}

	componentHasInlineTemplate(): boolean {
		return this.#config.component.inlineTemplate;
	}

	componentHasInlineStyle(): boolean {
		return this.#config.component.inlineStyle;
	}

	componentHasOnPushChangeDetection(): boolean {
		return this.#config.component.withOnPushChangeDetection;
	}

	skipServiceSpec(): boolean {
		return this.#config.service.skipSpec;
	}

	skipDirectiveSpec(): boolean {
		return this.#config.directive.skipSpec;
	}

	skipPipeSpec(): boolean {
		return this.#config.pipe.skipSpec;
	}

	#getExtensionConfigFile(): SafeExtensionConfig {
		const userExtensionConfig = this.#getUserExtensionConfigFile();

		if (!userExtensionConfig) {
			return defaultConfig;
		}

		return this.#toSafeExtensionConfig(userExtensionConfig);
	}

	#getUserExtensionConfigFile(): ExtensionConfig | undefined {
		const configPath = path.join(
			getUserRootPath(),
			'.angular-custom-templates',
			'config.json',
		);

		if (!existsSync(configPath)) {
			return undefined;
		}

		return require(configPath);
	}

	#toSafeExtensionConfig(config: ExtensionConfig): SafeExtensionConfig {
		return {
			component: {
				skipSpec:
					config.component?.skipSpec ?? defaultConfig.component.skipSpec,
				inlineTemplate:
					config.component?.inlineTemplate ??
					defaultConfig.component.inlineTemplate,
				inlineStyle:
					config.component?.inlineStyle ?? defaultConfig.component.inlineStyle,
				withOnPushChangeDetection:
					config.component?.withOnPushChangeDetection ??
					defaultConfig.component.withOnPushChangeDetection,
			},
			service: {
				skipSpec: config.service?.skipSpec ?? defaultConfig.service.skipSpec,
			},
			directive: {
				skipSpec:
					config.directive?.skipSpec ?? defaultConfig.directive.skipSpec,
			},
			pipe: {
				skipSpec: config.pipe?.skipSpec ?? defaultConfig.pipe.skipSpec,
			},
		};
	}
}

export const getExtensionConfigService = () =>
	ExtensionConfigService.getInstance();
