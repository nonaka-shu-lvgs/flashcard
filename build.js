const {build} = require("esbuild")

build({
    target: "es2015",
    platform: "browser",
    entryPoints: ["src/index.tsx"],
    outdir: "docs",
    bundle: true,
    minify: false,
    sourcemap: true,
    watch: process.env.WATCH ? process.env.WATCH === "true" : false

}).catch(console.error)