import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from "@rollup/plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
    },
    plugins: [typescript(), nodeResolve()],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/creator.global.js",
      format: "iife",
      name: "BuildingCreator",
    },
    plugins: [typescript(), nodeResolve(), terser()],
  },
];
