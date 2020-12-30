import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from '@rollup/plugin-json'
/** @type {import('rollup').RollupOptions} */
const config = {
  input: "index.js",
  plugins: [
    json(),
    builtins({ crypto: true }),
    resolve({
      rootDir: __dirname,
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
      preferBuiltins: false,
      dedupe: [],
      mainFields: ["module", "jsnext", "jsnext:main", "browser", "main"],
    }),
    commonjs({
      extensions: [".js", ".cjs"],
      dynamicRequireTargets: "crypto",
    }),
    globals(),
  ],
  output: {
    file: "bundle.js",
    format: "es",
  },
};

module.exports = config;
