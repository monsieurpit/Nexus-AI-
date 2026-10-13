// The Observatory page (observatory.html next to this file), read once when the engine starts.
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const OBSERVATORY_PAGE = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'observatory.html'), 'utf8');
