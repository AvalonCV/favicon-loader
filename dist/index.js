"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loader_utils_1 = require("loader-utils");
const favicons_1 = __importDefault(require("favicons"));
const loader = function (content) {
    if (typeof content === 'string') {
        throw new Error('This is a raw loader - content should not be a string');
    }
    else {
        this.cacheable && this.cacheable(true);
        this.addDependency(this.resourcePath);
        const options = loader_utils_1.getOptions(this) || {};
        const { emitFile = true, context, faviconConfiguration } = options;
        const callback = this.async();
        const favicon_configuration = Object.assign(Object.assign({ path: options.outputPath }, (faviconConfiguration || {})), { icons: Object.assign({ android: false, appleIcon: false, appleStartup: false, coast: false, firefox: false, yandex: false, windows: false }, ((faviconConfiguration && faviconConfiguration.icons) || {})) });
        favicons_1.default(content, favicon_configuration)
            .then(response => {
            const complete_html = response.html.reduce((result, current_html) => {
                return result + '' + current_html.replace(/(.*?href=)(.*)/, `$1' + __webpack_public_path__ + '$2 `);
            }, '');
            let result = `module.exports = '${complete_html}';`;
            response.images.forEach(image => {
                const file_hash = loader_utils_1.interpolateName(this, '[hash:5]', {
                    context: context || this.rootContext || this.context,
                    content: image.contents
                });
                const tmp_filename = image.name.split('.');
                tmp_filename.splice(-1, 0, file_hash);
                const hashed_filename = tmp_filename.join('.');
                result = result.replace(image.name, hashed_filename);
                emitFile && this.emitFile((options.outputPath || '') + hashed_filename, image.contents, null);
            });
            callback && callback(null, result);
        })
            .catch(error => {
            console.error('error', error);
            callback && callback(error);
        });
    }
};
exports.default = loader;
exports.raw = true;
//# sourceMappingURL=index.js.map