import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        // 'nspell'/'dictionary-pl' back src/ai-engine/polishSpellCheck.ts's Polish quality gate,
        // which is only ever exercised by real server-side Ollama generation (never in the
        // browser — see the comment at the top of that file). dictionary-pl's own module uses
        // top-level await internally, which the browser build's target list (chrome87 etc.)
        // doesn't support, breaking the production build over a dependency the client never
        // actually runs. Marking both external stops Vite from bundling/transforming them for the
        // client target at all; polishSpellCheck.ts's dynamic import of them only ever resolves
        // server-side (esbuild's Node bundle for server.ts, which isn't subject to this).
        external: ['nspell', 'dictionary-pl'],
      },
    },
  };
});
