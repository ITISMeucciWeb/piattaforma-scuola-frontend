import {defineConfig, UserConfig} from 'vite'
import * as path from "path";
import Components from 'unplugin-vue-components/vite';
import {createVuePlugin} from "vite-plugin-vue2";
import {VuetifyResolver} from "unplugin-vue-components/resolvers";
import eslintPlugin from "vite-plugin-eslint";
import viteCompression from 'vite-plugin-compression';
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
    return {
        base: '/',
        resolve: {
            extensions: ['.ts', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
            alias: [
                {
                    find: '@/',
                    replacement: `${path.resolve(__dirname, './src')}/`,
                },
                {
                    find: 'src/',
                    replacement: `${path.resolve(__dirname, './src')}/`,
                },
            ],
        },
        plugins: [
            EnvironmentPlugin({
                "VUE_APP_SCHOOL_NAME": "ITIS Meucci",
                "VUE_API_URL": "http://localhost:3000",
                "VUE_API_WS_URL": "ws://localhost:3000",
            }, { defineOn: 'import.meta.env' }),
            // Vue2
            // https://github.com/underfin/vite-plugin-vue2
            createVuePlugin({
                target: 'esnext',
            }),
            // unplugin-vue-components
            // https://github.com/antfu/unplugin-vue-components
            Components({
                dts: false,
                // auto import for directives
                directives: false,
                // resolvers for custom components
                resolvers: [
                    // Vuetify
                    VuetifyResolver(),
                ],
            }),
            eslintPlugin({
                fix: true,
            }),
            // compress assets
            // https://github.com/vbenjs/vite-plugin-compression
            viteCompression(),
        ],
        server:{
            open: false,
            port: 3001,
            hmr: {
                port: 3001,
            }
        }
    };
});
