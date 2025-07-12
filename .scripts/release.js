const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const main = () => {
	try {
		// --- Update package.json version ---
		const packageJsonPath = path.join(__dirname, '..', 'package.json');
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

		const versionParts = packageJson.version.split('.').map(Number);

		// Determine version bump type from command line argument: major, minor, patch (default: patch)
		const bumpType = process.argv[2] || 'patch';
		if (bumpType === 'major') {
			versionParts[0]++;
			versionParts[1] = 0;
			versionParts[2] = 0;
		} else if (bumpType === 'minor') {
			versionParts[1]++;
			versionParts[2] = 0;
		} else {
			versionParts[2]++;
		}

		const newVersion = versionParts.join('.');
		packageJson.version = newVersion;
		fs.writeFileSync(
			packageJsonPath,
			JSON.stringify(packageJson, null, 2) + '\n',
		);
		console.log(`Updated package.json version to ${newVersion}`);

		// --- Install Node Dependencies ---
		console.log('Installing dependencies...');
		execSync('npm install', { stdio: 'inherit' });

		// --- Build and Package Steps ---
		console.log('\nBuilding extension...');
		execSync('npm run package', { stdio: 'inherit' });

		console.log('\nCreating VSIX file...');
		execSync('npx vsce package', { stdio: 'inherit' });

		// --- Cleanup Step ---
		console.log('\nCleaning up generated files...');

		if (fs.existsSync('./README.md')) {
			fs.unlinkSync('./README.md');
			console.log('Removed README.md');
		}

		if (fs.existsSync('./CHANGELOG.md')) {
			fs.unlinkSync('./CHANGELOG.md');
			console.log('Removed CHANGELOG.md');
		}

		if (fs.existsSync('./icon.png')) {
			fs.unlinkSync('./icon.png');
			console.log('Removed icon.png');
		}

		// --- Copy Artifact Step ---
		console.log('\nCopying VSIX artifact...');
		const files = fs.readdirSync('.');
		const vsixFile = files.find(
			file =>
				file.startsWith('gdlc-angular-toolbox-') && file.endsWith('.vsix'),
		);

		if (vsixFile) {
			const sourcePath = vsixFile;
			const destDir = path.join('.', 'docs', 'artifacts');
			const destPath = path.join(destDir, vsixFile);
			const releaseFilePath = path.join(destDir, 'releases.md');

			// Ensure the destination directory exists, create it if it doesn't
			fs.mkdirSync(destDir, { recursive: true });

			// --- Copy the file ---
			fs.copyFileSync(sourcePath, destPath);
			console.log(`Successfully copied ${sourcePath} to ${destDir}`);

			// --- Update the releases.md file ---
			const releaseFileContent = fs.readFileSync(releaseFilePath, 'utf8');
			const releaseDate = new Date().toISOString().slice(0, 10);
			const fileVersion = vsixFile.match(/(\d+\.\d+\.\d+)/)[1] ?? '';
			const vsixFileSize = fs.statSync(destPath).size;
			const newReleaseRecord = `| \`${vsixFile}\` | ${releaseDate} | [${fileVersion}](/CHANGELOG?id=_${fileVersion.replace(/\./g, '')}-${releaseDate}) | ${formatFileSize(vsixFileSize)} | <a href="/artifacts/${vsixFile}" download>Download</a> |`;

			fs.writeFileSync(
				releaseFilePath,
				releaseFileContent + '\n' + newReleaseRecord,
			);
		} else {
			console.warn('Warning: Could not find the VSIX artifact to copy.');
		}

		console.log('\nScript finished successfully.');
	} catch (error) {
		console.error(
			'\nAn error occurred during the script execution:',
			error.message,
		);

		process.exit(1);
	}
};

const formatFileSize = (bytes, decimals = 2) => {
	if (bytes === 0) {
		return '0 Bytes';
	}

	const dm = decimals < 0 ? 0 : decimals;
	const k = 1024;
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

	return `${formattedSize} ${units[i]}`;
};

main();
