module.exports = {
  extends: [
    'eslint:recommended',
    'standard'
  ],
  plugins: [
    'import'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  overrides: [
    {
      files: [
        '**/*.ts',
        '**/*.tsx'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'standard-with-typescript'
      ],
      plugins: [
        '@typescript-eslint/eslint-plugin'
      ],
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/indent': [
          'error',
          2,
          {
            ignoredNodes: [
              'PropertyDefinition[decorators]',
              'TSUnionType',
              'TSTypeParameterInstantiation',
              'TSIntersectionType',
              'FunctionExpression[params]:has(Identifier[decorators])'
            ]
          }
        ],
        '@typescript-eslint/no-unused-vars': [1, { vars: 'all', args: 'after-used', ignoreRestSiblings: true, argsIgnorePattern: '^_|^e$', varsIgnorePattern: '^_|^e$' }],
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/comma-dangle': ['error', 'always-multiline']
      }
    }
  ]
}
