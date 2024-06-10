import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1></h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

import { defineConfig } from 'vite'

export default defineConfig({
  root: 'public', // Setzt den Root-Ordner auf 'public'
  server: {
    port: 5173 // oder einen anderen Port, wenn Sie diesen verwenden
  },
  build: {
    outDir: 'dist',
  },
  publicDir: 'public', // Statische Dateien
});


setupCounter(document.querySelector('#counter'))
