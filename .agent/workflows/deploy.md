---
description: Deploy all changes to GitHub (triggers Vercel auto-deploy)
---

// turbo-all

## Steps

1. Stage all changes
```bash
cd "/Users/ofekstrogo/Library/Mobile Documents/com~apple~CloudDocs/Cyber Policy In Organization" && git add .
```

2. Commit with a descriptive message
```bash
cd "/Users/ofekstrogo/Library/Mobile Documents/com~apple~CloudDocs/Cyber Policy In Organization" && git commit -m "Update: $(date '+%Y-%m-%d %H:%M')"
```

3. Push to GitHub (triggers Vercel deployment)
```bash
cd "/Users/ofekstrogo/Library/Mobile Documents/com~apple~CloudDocs/Cyber Policy In Organization" && git push
```
