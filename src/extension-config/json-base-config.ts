import {
	ExtensionConfig,
	SafeExtensionConfig,
	StylesheetsFormat,
} from '@models';
import defaultConfig from './default-config.json';
import { getUserRootPath } from '@extensionFramework';
import * as path from 'path';
import { existsSync, readFileSync } from '@fileSystem';

class ExtensionConfigService {
	readonly #config: SafeExtensionConfig = this.#getExtensionConfigFile();

	skipPrefix(): boolean {
		return this.#config.skipPrefix;
	}

	skipSpec(): boolean {
		return this.#config.skipSpec;
	}

	addToIndex(): boolean {
		return this.#config.addToIndex;
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

	componentStylesheetsFormat(): StylesheetsFormat {
		return this.#config.component.stylesheetsFormat;
	}

	componentHasGenerateStory(): boolean {
		return this.#config.component.generateStory;
	}

	isGuardClassBase(): boolean {
		return this.#config.guard.isClassBase;
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
			'.angular-toolbox',
			'config.json',
		);

		if (!existsSync(configPath)) {
			return undefined;
		}

		try {
			return JSON.parse(readFileSync(configPath));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			throw new Error('config.json is empty. ./.angular-toolbox/config.json');
		}
	}

	#toSafeExtensionConfig(config: ExtensionConfig): SafeExtensionConfig {
		return {
			skipPrefix: config?.skipPrefix ?? defaultConfig.skipPrefix,
			skipSpec: config?.skipSpec ?? defaultConfig.skipSpec,
			addToIndex: config?.addToIndex ?? defaultConfig.addToIndex,
			component: {
				inlineTemplate:
					config?.component?.inlineTemplate ??
					defaultConfig.component.inlineTemplate,
				inlineStyle:
					config?.component?.inlineStyle ?? defaultConfig.component.inlineStyle,
				withOnPushChangeDetection:
					config?.component?.withOnPushChangeDetection ??
					defaultConfig.component.withOnPushChangeDetection,
				stylesheetsFormat:
					config?.component?.stylesheetsFormat ??
					defaultConfig.component.stylesheetsFormat,
				generateStory:
					config?.component?.generateStory ??
					defaultConfig.component.generateStory,
			},
			guard: {
				isClassBase:
					config?.guard?.isClassBase ?? defaultConfig.guard.isClassBase,
			},
		};
	}
}

export const getExtensionJsonBaseConfigService = () =>
	new ExtensionConfigService();
