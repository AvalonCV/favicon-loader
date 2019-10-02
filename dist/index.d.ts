import { loader } from 'webpack';
import favicons from 'favicons';
export interface FaviconLoaderOptions {
    context?: object;
    emitFile?: true;
    namePrefix?: string;
    outputPath?: string;
    faviconConfiguration?: Partial<favicons.Configuration>;
}
declare const loader: loader.Loader;
export default loader;
export declare const raw = true;
