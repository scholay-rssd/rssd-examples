# RSSD Demo

A theme unit test for the shared publication engine. One fixed fixture
publication (`fixtures.mjs`) is rendered once per Theme variant (`variants.mjs`)
by the real `buildSiteRelease`, Theme registry and display modules — no parallel
renderer. The catalogue (`catalogue.mjs`) lists every structure and the page that
shows it; add an entry whenever a Theme gains a reusable structure.

```bash
npm run demo:build            # all variants → .local/demo/
npm run demo:build -- demo-docs   # one variant
npm run demo:preview          # build, then serve the catalogue at http://127.0.0.1:4174/
```

Each variant is served on its own loopback port (4175+) because Theme pages use
root-relative URLs. The academic variant keeps its renderer's fixed origin in
canonical URLs; it is still only served locally. Fixture images are generated
PNGs; nothing is downloaded, and nothing here is ever deployed.

## Independent build

Run `npm run build` with Node.js 24+. The build fetches the exact public core
commit in `compatibility.json`, assembles its pinned public dependencies under
`.local/`, and overlays this repository. No private checkout or account is
required. Artifacts remain under `.local/`; this command does not deploy.
