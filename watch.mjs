import * as esbuild from 'esbuild';
import {options} from "./options.mjs";

let ctx = await esbuild.context(options);

await ctx.watch();
let { host, port } = await ctx.serve({
    servedir: 'public'
});
console.log(`Running on ${host}:${port}`);