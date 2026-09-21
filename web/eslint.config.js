import { basename } from 'node:path';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

/**
 * The Vinculum invariants of the web game, as lint rules (web/CLAUDE.md, "The walls").
 * When an iteration establishes a new invariant, the rule lands in the same iteration and is
 * proven RED on a scratch file before the commit.
 */

/** House rule D8: a class lives in the file that carries its name; `index.ts` barrels do not exist. */
const vinculum = {
  rules: {
    'file-is-class-name': {
      meta: {
        type: 'problem',
        schema: [],
        messages: {
          mismatch: "Class '{{name}}' must live in '{{name}}.ts' (file = class name, one class per file).",
          barrel: "No 'index.ts' barrels: import the file that owns the thing.",
        },
      },
      create(context) {
        const file = basename(context.filename).replace(/\.ts$/, '');
        return {
          Program(node) {
            if (file === 'index') context.report({ node, messageId: 'barrel' });
          },
          ClassDeclaration(node) {
            const name = node.id?.name;
            if (name !== undefined && name !== file) {
              context.report({ node, messageId: 'mismatch', data: { name } });
            }
          },
        };
      },
    },
  },
};

const NO_RAW_HTML = [
  {
    selector: 'MemberExpression[property.name=/^(innerHTML|outerHTML)$/]',
    message: 'No innerHTML/outerHTML: render through lit-html (text is escaped, nodes survive).',
  },
  {
    selector: 'MemberExpression[computed=true][property.value=/^(innerHTML|outerHTML)$/]',
    message: 'No innerHTML/outerHTML: render through lit-html (text is escaped, nodes survive).',
  },
  {
    selector: "CallExpression[callee.property.name='insertAdjacentHTML']",
    message: 'No insertAdjacentHTML: render through lit-html.',
  },
  { selector: 'ExportAllDeclaration', message: 'No barrels: export names from the file that owns them.' },
];

const NO_UNSAFE_LIT = [
  { name: 'lit-html/directives/unsafe-html.js', message: 'unsafeHTML is innerHTML by another name.' },
  { name: 'lit-html/directives/unsafe-svg.js', message: 'unsafeSVG is innerHTML by another name.' },
];

const NO_PARENT_IMPORTS = {
  regex: '^\\.\\./',
  message:
    "Cross-folder imports use the package aliases ('#engine/…', '#ui/…'); './' is for the same folder.",
};

export default defineConfig(
  globalIgnores(['dist/', 'coverage/', '.vitest/', 'test-results/', 'playwright-report/', 'blob-report/']),
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { vinculum },
    rules: {
      'vinculum/file-is-class-name': 'error',
      'max-classes-per-file': ['error', 1],
      'no-restricted-syntax': ['error', ...NO_RAW_HTML],
      'no-restricted-imports': ['error', { paths: NO_UNSAFE_LIT, patterns: [NO_PARENT_IMPORTS] }],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    // Wall 2 of the engine boundary (wall 1 is tsconfig.engine.json: no DOM lib, composite file list).
    files: ['src/engine/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^(?!\\./|#engine/)',
              message:
                "The engine imports only the engine: './…' or '#engine/…'. No ui, platform, content, DOM or packages.",
            },
          ],
        },
      ],
      'no-restricted-properties': [
        'error',
        { object: 'Math', property: 'random', message: 'The engine is deterministic: draw from a Seed.' },
        { object: 'Date', property: 'now', message: 'The engine has no clock: time is an input.' },
        { object: 'performance', property: 'now', message: 'The engine has no clock: time is an input.' },
      ],
      'no-restricted-syntax': [
        'error',
        ...NO_RAW_HTML,
        {
          selector: "NewExpression[callee.name='Date']",
          message: 'The engine has no clock: time is an input.',
        },
      ],
    },
  },
  { files: ['**/*.js'], extends: [tseslint.configs.disableTypeChecked] },
);
