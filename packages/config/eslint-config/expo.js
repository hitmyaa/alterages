/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['./base.js', 'expo', 'prettier'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
  },
};
