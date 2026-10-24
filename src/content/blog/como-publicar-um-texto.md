---
title: Como publicar um texto neste site
description: Rascunho de exemplo. Enquanto draft for true, este texto não entra no site.
pubDate: 2026-10-24
draft: true
---

Este arquivo é um rascunho de exemplo. Ele existe para mostrar a coleção do blog e **não é publicado**: `draft: true` fica de fora do build.

Para publicar um texto:

1. Copie este arquivo dentro de `src/content/blog/`.
2. Ajuste `title`, `description` e `pubDate`.
3. Escreva o corpo em Markdown.
4. Remova a linha `draft` ou defina `draft: false`.
5. Rode `npm run build` ou envie o commit para `main`.

O post passa a aparecer em `/blog`. Uma versão em inglês pode morar numa pasta como `src/content/blog/en/` quando você criar essa rota.
