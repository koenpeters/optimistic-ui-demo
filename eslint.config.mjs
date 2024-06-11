import vueEslintParser from "vue-eslint-parser";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: vueEslintParser,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "max-len": [
        "error",
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignorePattern: ".* class=.*", // long tailwind classes
        },
      ],
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
        },
      ],
      "vue/multi-word-component-names": 0,
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
