import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 排除某些文件或文件夹
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.includes('.py')) {
            return '';  // 这将导致该文件不被打包
          }
          return assetInfo.name;
        },
      },
    },
  },
});