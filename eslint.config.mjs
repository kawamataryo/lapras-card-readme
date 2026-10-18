import github from 'eslint-plugin-github'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  {ignores: ['dist/**', 'lib/**', 'node_modules/**']},
  ...[github.getFlatConfigs().recommended].flat().map(config => ({
    ...config,
    files: ['src/**/*.ts']
  })),
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {project: './tsconfig.json'},
      globals: {Buffer: 'readonly', process: 'readonly', fetch: 'readonly'}
    },
    plugins: {'@typescript-eslint': tsPlugin},
    rules: {
      "i18n-text/no-en": "off",
      "eslint-comments/no-use": "off",
      "import/no-namespace": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                  "accessibility": "no-public"
            }
      ],
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/explicit-function-return-type": [
            "error",
            {
                  "allowExpressions": true
            }
      ],
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-extraneous-class": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/prefer-for-of": "warn",
      "@typescript-eslint/prefer-function-type": "warn",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "semi": "off",
      "@typescript-eslint/unbound-method": "error",
      "github/filenames-match-regex": "off"
}
  }
]
