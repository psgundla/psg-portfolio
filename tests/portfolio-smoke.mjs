import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom", optimizeDeps: { noDiscovery: true } });
try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const html = renderToStaticMarkup(React.createElement(App));
  for (const anchor of ["main", "about", "journey-contact"]) assert.ok(html.includes(`id="${anchor}"`), `Missing anchor: ${anchor}`);
  assert.ok(html.includes("From bioinformatics to computational oncology."), "Journey heading missing");
  assert.ok(!html.includes("Month and year advance") && !html.includes(">Journey<"), "Removed journey labels remain");
  assert.ok(html.includes(">Pranav Swaroop Gundla</span>") && !html.includes("Journey portfolio</span>"), "Footer label incorrect");
  assert.ok(html.includes('aria-label="Open navigation"') && html.includes('href="#about"'), "Journey navigation missing");
  assert.ok(!html.includes('id="work"') && !html.includes('id="life"') && !html.includes('id="social"'), "Main portfolio sections remain");
  const head = await readFile("index.html", "utf8");
  assert.ok(head.includes("Journey — Pranav Swaroop Gundla"), "Journey metadata missing");
  for (const file of ["public/favicon.ico", "public/brand/psg-final/psg-white.svg", "public/brand/psg-final/psg-black.svg"]) await access(file);
  console.log("Journey portfolio smoke passed.");
} finally {
  await server.close();
}
