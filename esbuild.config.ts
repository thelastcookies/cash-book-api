import { build } from 'esbuild';

build({
  entryPoints: ['./src/app.ts'],
  bundle: true,
  platform: 'node',
  minify: true,
  outdir: './dist',
  target: 'es2020',
  loader: { '.wasm': 'file' },
  publicPath: '/public',
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
