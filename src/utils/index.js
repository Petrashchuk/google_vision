import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const filesPath = resolve(__dirname, '../../files');

export const ImgPath = resolve(__dirname,'../../img')

