import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const ROOT_PATH = path.resolve(dirname, '../../');

export const SRC_PATH = path.resolve(ROOT_PATH, 'src');
