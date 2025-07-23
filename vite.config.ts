import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { dependencies } from './package.json';
// import federation from '@originjs/vite-plugin-federation';
import { federation } from '@module-federation/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDevelopment = env.VITE_APP_ENV === 'development';

  const developmentPlugins = [
    visualizer({
      filename: 'stats.html',
      open: true,
      emitFile: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ];

  return {
    plugins: [
      react(),
      federation({
        manifest: true,
        name: 'safira-frontend',
        filename: 'navbar.js',
        exposes: {
          './locales': './src/i18n/index.ts',
          './Header': './src/pages/Header/index.tsx',
        },
        shared: {
          react: {
            requiredVersion: dependencies.react,
            singleton: true,
          },
          'react-dom': {
            requiredVersion: dependencies['react-dom'],
            singleton: true,
          },
          'react-router-dom': {
            requiredVersion: dependencies['react-router-dom'],
            singleton: true,
          },
          '@tanstack/react-query': {
            requiredVersion: dependencies['@tanstack/react-query'],
            singleton: true,
          },
          'react-i18next': {
            requiredVersion: dependencies['react-i18next'],
          },
          i18next: {
            requiredVersion: dependencies['i18next'],
          },
        },
      }),
      // federation({
      //   name: 'safira-frontend',
      //   filename: 'navbar.js',
      //   exposes: {
      //     './Header': './src/pages/Header/index.tsx',
      //   },
      //   shared: [
      //     'react',
      //     'axios',
      //     'luxon',
      //     'moment',
      //     'push.js',
      //     'i18next',
      //     'crypto-js',
      //     'react-dom',
      //     'react-modal',
      //     '@mui/material',
      //     'react-i18next',
      //     '@emotion/react',
      //     'react-toastify',
      //     '@emotion/styled',
      //     'socket.io-client',
      //     'react-router-dom',
      //     '@aws-sdk/client-s3',
      //     '@tanstack/react-query',
      //   ],
      // }),
      ...(isDevelopment ? developmentPlugins : []),
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
