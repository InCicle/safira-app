import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      federation({
        name: 'safira-frontend',
        filename: 'navbar.js',
        exposes: {
          './App': './src/App.tsx',
        },
        shared: [
          'react',
          'axios',
          'luxon',
          'moment',
          'push.js',
          'i18next',
          'crypto-js',
          'react-dom',
          'react-modal',
          '@mui/material',
          'react-i18next',
          '@emotion/react',
          'react-toastify',
          '@emotion/styled',
          'socket.io-client',
          'react-router-dom',
          '@aws-sdk/client-s3',
          '@tanstack/react-query',
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.', 'src'),
        '@components': path.resolve(__dirname, '.', 'src/components'),
      },
    },
    server: {
      port: parseInt(env.PORT),
    },
    preview: {
      port: parseInt(env.PORT),
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: '[name]-[hash][extname]',
          chunkFileNames: '[name]-[hash].js',
          entryFileNames: '[name].js',
        },
      },
      assetsDir: '',
    },
  };
});
