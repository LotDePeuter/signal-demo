/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  bracketSpacing: true,
  trailingComma: 'es5',
  bracketSameLine: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  quoteProps: 'as-needed',
  overrides: [
    {
      files: ['*.component.html', '*.container.html'],
      options: { parser: 'angular', trailingComma: 'none', htmlWhitespaceSensitivity: 'ignore' },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
