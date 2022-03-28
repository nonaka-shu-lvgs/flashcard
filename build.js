const {build} = require("esbuild")

build({
    target: "es2015",
    platform: "browser",
    entryPoints: ["src/index.tsx"],
    outdir: "public",
    bundle: true,
    minify: false,
    sourcemap: true,
    watch: process.env.WATCH ? process.env.WATCH === "true" : false

}).catch(console.error)