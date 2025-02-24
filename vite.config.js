import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from "node:path";
/** 절대경로 설정을 위해 설치한 라이브러리 */
// import tsconfigPaths from "vite-tsconfig-paths";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            { find: '@page', replacement: path.resolve(__dirname, 'src/pages') },
            { find: '@layout', replacement: path.resolve(__dirname, 'src/layout') },
            { find: '@router', replacement: path.resolve(__dirname, 'src/router') },
            { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
            { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
            { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
        ]
    }
});
