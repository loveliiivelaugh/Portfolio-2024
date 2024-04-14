# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Requirements

- Node.js
- [Bun](https://www.bun.dev/)
- [Vite](https://vitejs.dev/)
- [Ollama](https://www.ollama.com/)
- [PrivateGPT](https://www.privategpt.com/)

## Dependencies

- [@emotion/react](https://www.npmjs.com/package/@emotion/react) - A library for styling in JS
- [@emotion/styled](https://www.npmjs.com/package/@emotion/styled) - A library for creating styled components
- [@fontsource/roboto](https://www.npmjs.com/package/@fontsource/roboto) - A font family for roboto
- [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) - Material Design icons for React
- [@mui/material](https://www.npmjs.com/package/@mui/material) - A library of UI components for React
- [@mui/styled-engine-sc](https://www.npmjs.com/package/@mui/styled-engine-sc) - A styled components engine for Material-UI
- [@tensorflow-models/blazeface](https://www.npmjs.com/package/@tensorflow-models/blazeface) - A model for face detection
- [@tensorflow-models/coco-ssd](https://www.npmjs.com/package/@tensorflow-models/coco-ssd) - A model for object detection
- [@tensorflow-models/mobilenet](https://www.npmjs.com/package/@tensorflow-models/mobilenet) - A model for image classification
- [@tensorflow/tfjs](https://www.npmjs.com/package/@tensorflow/tfjs) - A library for machine learning
- [axios](https://www.npmjs.com/package/axios) - A library for making HTTP requests
- [framer-motion](https://www.npmjs.com/package/framer-motion) - A library for creating motion animations
- [moment](https://www.npmjs.com/package/moment) - A library for parsing, validating, manipulating, and formatting dates
- [react](https://www.npmjs.com/package/react) - A library for building user interfaces
- [react-dom](https://www.npmjs.com/package/react-dom) - A library for rendering React components to the DOM
- [react-lazy-load-image-component](https://www.npmjs.com/package/react-lazy-load-image-component) - A library for lazy loading images
- [react-markdown](https://www.npmjs.com/package/react-markdown) - A library for rendering Markdown to React
- [react-pdf](https://www.npmjs.com/package/react-pdf) - A library for rendering PDFs in React
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - A library for routing in React
- [react-syntax-highlighter](https://www.npmjs.com/package/react-syntax-highlighter) - A library for syntax highlighting
- [react-webcam](https://www.npmjs.com/package/react-webcam) - A library for capturing images from a webcam
- [rehype-katex](https://www.npmjs.com/package/rehype-katex) - A plugin for rendering LaTeX math
- [remark-math](https://www.npmjs.com/package/remark-math) - A plugin for rendering LaTeX math in Markdown
- [styled-components](https://www.npmjs.com/package/styled-components) - A library for styling in JS
- [zustand](https://www.npmjs.com/package/zustand) - A state management library

## Dev Dependencies

- [@types/react](https://www.npmjs.com/package/@types/react) - Type definitions for React
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) - Type definitions for React DOM
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) - ESLint TypeScript plugin
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - ESLint TypeScript parser
- [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) - Vite plugin for React
