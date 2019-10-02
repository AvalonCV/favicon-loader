import webkit_compiler from './compiler';
import requireFromString from 'require-from-string';

interface TestData {
	html: string;
	files: string[];
}

export const getWebpackTestData = async (filename: string, options = {}): Promise<null | TestData> => {
	return new Promise(async resolve => {
		const result = await webkit_compiler(filename, options);
		const modules = result.stats.toJson().modules;

		let output = modules && modules[0] ? modules[0].source : null;

		if (output) {
			resolve({
				html: requireFromString(output.replace(/__webpack_public_path__/g, `''`)) as string,
				files: result.files
			});
		} else {
			resolve(null);
		}
	});
};

interface TestImage {
	additional_description?: string;
	input_file: string;
	expected_files: string[];
}

export const test_images: TestImage[] = [
	{
		additional_description: '',
		input_file: 'favicon.png',
		expected_files: []
	}
];

jest.setTimeout(80000);

describe('A nice webpack loader for images', () => {
	test_images.forEach(element => {
		test(`should load ${element.input_file.split('.').pop()} files ${element.additional_description ||
			''}`, async () => {
			const test_data = await getWebpackTestData('./images/' + element.input_file);

			// if (test_data) {
			// 	let match: RegExpExecArray | null;
			// 	while ((match = /href="(.*?)"/g.exec(test_data.html)) !== null) {
			// 		console.log('match', match[0]);
			// 	}
			// }

			expect(test_data && test_data.html).toBe(
				'<link rel="shortcut icon" href="/favicon.6e6bc.ico"> <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.d2f4b.png"> <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.0c01c.png"> '
			);
		});
	});
});
