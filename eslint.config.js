import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default defineConfig([
    {
        name: 'app/files-to-lint',
        files: ['**/*.{js,mjs,jsx,vue}'],
    },

    globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

    {
        languageOptions: {
            globals: {
                ...globals.browser,
                "player": "writable",
                "Events": "writable",
                "achievements": "writable",
                "GAME_EVENTS": "readonly",
                "Decimal": "readonly"
            },
        },
    },

    js.configs.recommended,
    ...pluginVue.configs['flat/essential'],
])
