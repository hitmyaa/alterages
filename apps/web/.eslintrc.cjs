module.exports = {
  root: true,
  extends: ['@alterages/eslint-config/next.js'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
