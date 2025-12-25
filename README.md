# MICRORACK Specification - Site Branch

This branch contains the MkDocs build configuration for the MICRORACK specification website.

**⚠️ Do not edit content here directly!** Edit the source markdown files in the `master` branch instead.

## How it works

1. Content is edited in the `master` branch (README.md files in subdirectories)
2. When site branch is pushed, GitHub Actions copies content from master
3. MkDocs builds and deploys to GitHub Pages

## Structure

### Master Branch
```
master/
├── README.md                 # Main specification page
├── LICENSE.md
├── electrical/
│   ├── README.md            # Electrical specs
│   └── *.png                # Diagrams
└── mechanical/
    ├── README.md            # Mechanical specs
    └── *.png                # Diagrams
```

### Site Branch (this branch)
```
site/
├── docs/
│   ├── CNAME
│   ├── assets/              # Theme assets (CSS, JS)
│   └── specs/               # ← Content copied during build
│       ├── electrical/      # ← from master/electrical/
│       └── mechanical/      # ← from master/mechanical/
├── .github/workflows/
│   └── deploy.yml           # Builds & deploys MkDocs
├── mkdocs.yml               # MkDocs configuration
├── requirements.txt
└── README.md                # This file
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
