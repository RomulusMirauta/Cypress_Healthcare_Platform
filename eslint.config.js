export default [
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      // Add your rules here, e.g.:
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];