import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      federation({
        name: 'safira-frontend', // Name of the microfrontend
        filename: 'navbar.js', // Filename for the exposed module
        exposes: {
          './App': './src/App.tsx', // Expose the App component
          './contexts/AuthContext': './src/contexts/Auth/Provider.tsx',
          './contexts/Profile': './src/contexts/Profile/Provider.tsx',
          './contexts/Permissions': './src/contexts/Permissions/Provider.tsx',
        },
        shared: [
          'react',
          'react-dom',
          '@mui/material',
          'axios',
          'react-router-dom',
          '@aws-sdk/client-s3',
          '@emotion/react',
          '@emotion/styled',
          '@mui/icons-material',
          '@tanstack/react-query',
          'crypto-js',
          'i18next',
          'luxon',
          'moment',
          'push.js',
          'react-i18next',
          'react-modal',
          'react-toastify',
          'react-waypoint',
          'socket.io-client',
        ], // Shared dependencies
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
