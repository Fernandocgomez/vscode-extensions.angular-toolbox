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

	componentStylesheetsFormat(): StylesheetsFormat {
		return this.#config.component.stylesheetsFormat;
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

		return JSON.parse(readFileSync(configPath));
	}

	#toSafeExtensionConfig(config: ExtensionConfig): SafeExtensionConfig {
		return {
			component: {
				skipSpec:
					config?.component?.skipSpec ?? defaultConfig.component.skipSpec,
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
			},
			service: {
				skipSpec: config?.service?.skipSpec ?? defaultConfig.service.skipSpec,
			},
			directive: {
				skipSpec:
					config?.directive?.skipSpec ?? defaultConfig.directive.skipSpec,
			},
			pipe: {
				skipSpec: config?.pipe?.skipSpec ?? defaultConfig.pipe.skipSpec,
			},
		};
	}
}

export const getExtensionConfigService = () => new ExtensionConfigService();
