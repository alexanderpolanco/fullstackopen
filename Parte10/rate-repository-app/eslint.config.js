// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  // 1. Configuración base de Expo (React, Hooks, TS, Core)
  expoConfig,

  // 2. Personalización de reglas y entorno
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Asegura que cubra todos tus archivos
    rules: {
      "semi": ["error", "always"],    // Requisito de Full Stack Open
      "react/prop-types": "off",       // Innecesario con TypeScript
      "no-unused-vars": "warn",        // Menos estricto durante el desarrollo
      "react/react-in-jsx-scope": "off" // No es necesario en versiones modernas de React
    },
  },

  // 3. Archivos a ignorar
  {
    ignores: [
      'dist/*',
      'node_modules/*',
      '.expo/*',
      'babel.config.js',
      'metro.config.js'
    ],
  },
]);