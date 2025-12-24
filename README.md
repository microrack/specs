# MICRORACK Specification - Site Branch

This branch contains the MkDocs build configuration for the MICRORACK specification website.

**⚠️ Do not edit content here directly!** Edit the source markdown files in the `master` branch instead.

## How it works

1. Content is edited in the `master` branch (bare markdown files)
2. GitHub Actions automatically syncs content to this branch
3. MkDocs builds and deploys to GitHub Pages

## Structure

```
site-branch/
├── docs/
│   ├── index.md              # ← synced from master/README.md
│   ├── CNAME
│   ├── LICENSE.md
│   ├── assets/               # Theme assets (CSS, JS, images)
│   └── specs/
│       ├── mechanical.md     # ← synced from master/mechanical/README.md
│       ├── electrical.md     # ← synced from master/electrical/README.md
│       └── *.png             # ← synced from master/mechanical/*.png, etc.
├── .github/workflows/
│   ├── sync-to-site.yml      # Syncs content from master
│   └── deploy.yml            # Builds & deploys MkDocs
├── mkdocs.yml
├── requirements.txt
└── README.md                 # This file
```

## Local Development

```bash
pip install -r requirements.txt
mkdocs serve
```

Visit http://127.0.0.1:8000

## Live Site

https://specs.microrack.org

## License

This specification is published under the [CERN Open Hardware Licence (CERN-OHL-W)](https://cern-ohl.web.cern.ch/).

Copyright © 2019-2025 MICRORACK
