import { OpenAPI } from './client';
import App from './App.svelte'

OpenAPI.BASE = "https://api-beta.stellarcarbon.io";

const app = new App({
  target: document.getElementById('app'),
})

export default app