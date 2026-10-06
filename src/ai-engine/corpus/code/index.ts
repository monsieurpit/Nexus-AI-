import { KnowledgeItem } from '../../../types';
import { CODE_JAVASCRIPT } from './javascript';
import { CODE_TYPESCRIPT } from './typescript';
import { CODE_PYTHON } from './python';
import { CODE_NODE } from './node';
import { CODE_REACT } from './react';
import { CODE_HTML } from './html';
import { CODE_CSS } from './css';
import { CODE_CPP } from './cpp';
import { CODE_C } from './c';
import { CODE_CSHARP } from './csharp';
import { CODE_JAVA } from './java';
import { CODE_GO } from './go';
import { CODE_RUST } from './rust';
import { CODE_LUA } from './lua';
import { CODE_SQL } from './sql';
import { CODE_BASH } from './bash';
import { CODE_PHP } from './php';
import { CODE_SWIFT } from './swift';
import { CODE_KOTLIN } from './kotlin';
import { CODE_RUBY } from './ruby';
import { CODE_DISCORDJS } from './discordjs';
import { CODE_DISCORDPY } from './discordpy';
import { CODE_GIT } from './git';
import { CODE_REGEX } from './regex';
import { CODE_JSON } from './json';
import { CODE_DART, CODE_POWERSHELL, CODE_R, CODE_SVELTE, CODE_VUE } from './more';
import { CODE_ALGORITHMS } from './algorithms';
import { CODE_EXTRA } from './extra';

// Every language category of the coding reference corpus (see _k.ts).
export const CODE_REFERENCE: KnowledgeItem[] = [
  ...CODE_JAVASCRIPT,
  ...CODE_TYPESCRIPT,
  ...CODE_PYTHON,
  ...CODE_NODE,
  ...CODE_REACT,
  ...CODE_HTML,
  ...CODE_CSS,
  ...CODE_CPP,
  ...CODE_C,
  ...CODE_CSHARP,
  ...CODE_JAVA,
  ...CODE_GO,
  ...CODE_RUST,
  ...CODE_LUA,
  ...CODE_SQL,
  ...CODE_BASH,
  ...CODE_PHP,
  ...CODE_SWIFT,
  ...CODE_KOTLIN,
  ...CODE_RUBY,
  ...CODE_DISCORDJS,
  ...CODE_DISCORDPY,
  ...CODE_GIT,
  ...CODE_REGEX,
  ...CODE_JSON,
  ...CODE_DART,
  ...CODE_VUE,
  ...CODE_SVELTE,
  ...CODE_R,
  ...CODE_POWERSHELL,
  ...CODE_ALGORITHMS,
  ...CODE_EXTRA,
];
