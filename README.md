# Portfolio — souravamseekar.com

Personal portfolio (Next.js). **Writing and desk live in a separate app.**

| Surface | Repo | Domain |
|---------|------|--------|
| Portfolio (this) | `martisouravamseekar-portfolio` | `souravamseekar.com` |
| Engineering publication | [`engineering-blog`](https://github.com/SVamseekar/engineering-blog) | `blog.souravamseekar.com` |
| Editorial desk | same as publication | `desk.souravamseekar.com` |
| Content OS | `social-poster` | publishes into `engineering-blog` |

- Nav “Blog” → `https://blog.souravamseekar.com`
- Apex `/blog` and `/blog/*` → **308** permanent redirect to the blog subdomain (see `src/middleware.ts`)

## Dev

```bash
npm install
npm run dev
```

## Env

Portfolio-only; no `DESK_*` or post content required here.
