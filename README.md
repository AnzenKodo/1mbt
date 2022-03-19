# 1MB Template for [11y(Eleventy)](https://11ty.dev)
11ty starter template for Blog without client-side JavaScript. Minimal & very easy to set-up.

## Features
- Markdown & Nunjucks templates
- Multiple feeds
	- RSS
	- Atom
	- JSON
- Search
- Sitemap
- Reading Time counter
- CSS & HTML minify
- Syntax Highlighting
- Tags
- WebMentions
- Google fonts

## Getting started
- Fork this repo, click on **"Use this template"** button or clone this repo.
	```bash
	git clone https://github.com/AnzenKodo/1mbt my-blog-name
	# Navigate to the directory
	cd my-blog-name
	```
- Install dependencies
	```bash
	npm i
	```

## Editing 1MBT
You can change Name, Colors, and Fonts of the website by just editing the
[manifest.json](src/_static/manifest.json) file.

### Editing manifest.json
| Name          | Use                                         | Required |
|---------------|---------------------------------------------|----------|
| `name`        | Changes website name                        | Yes      |
| `start_url`   | Enter the website root location             | Yes      |
| `description` | Description for search engines               |          |
| `author`      | Your social media username (mainly twitter) |          |
| `email`       | For comments & feed                         |          |
| `portfolio`   | Your portfolio URL if you have              |          |
| `lang`        | ISO language codes                          | Yes      |
| `repository`  | Repository URL                              |          |
| `theme_color` | Website brand color in HEX format           | Yes      |
| `font_color`  | Website font color in HEX format            | Yes      |
| `font`        | Enter Google font name                      |          |

### Files editing
```bash
1mbt
├── .github
│   └── workflows
│       └── publish.yml # Workflow for Github Pages
└── src
    ├── _includes         # Templates
    │   ├── base.njk
    │   ├── footer.njk    # <footer> of website
    │   ├── header.njk    # <header> of website
    │   ├── head.njk      # <head> of website
    │   ├── postmeta.njk  # Posts metadata
    │   ├── post.njk      # Posts template
    │   └── postslist.njk # Posts list
    ├── _pages
    │   ├── _pages.json # Folder pages format data
    │   ├── 404.md      # 'Page not found' page
    │   ├── feed            # Feed page feeds
    │   │   ├── atom.njk    # Atom feed
    │   │   ├── json.njk    # JSON feed
    │   │   ├── rss.njk     # RSS feed
    │   │   ├── sitemap.njk # Sitemap data
    │   │   └── feed.json   # Folder pages format data
    │   ├── index.md
    │   ├── nav	              # <nav> bar pages
    │   │   ├── about.md      # About page
    │   │   ├── feeds.njk     # All feed list
    │   │   ├── search.njk    # Search page
    │   │   ├── tagslist.njk
    │   │   ├── tags.njk      # Posts tags list
    │   │   └── nav.json      # Folder format data
    │   └── posts
    │       ├── posts.json
    │       └── This-is-something
    │           └── index.njk
    └── _static           # Static assets
        ├── favicon.svg   # Website favicon
        ├── manifest.json # Configuration & website manifest file
        └── styles        # Style files
            ├── prism.css # <code> block syntax highlighting
            └── style.css # Default stylesheet
```
### Deploy

#### [GitHub Pages](https://pages.github.com)
- Enable Actions
  - Go to your Repository on GitHub then go to **Settings** -> **Actions** -> **General**
  - Click on **Allow all actions and reusable workflows**
- Enable Pages
  - Go to your Repository on GitHub then go to **Settings** -> **Pages**
  - In **Source** section on **Branch** select ***gh-pages*** then click **Save**

#### [Vercel](https://vercel.com) & [Netlify](https://netlify.com)
Clone this repository on own GitHub account and deploy to Vercel & Netlify:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FAnzenKodo%2F1mbt)
[![Netlify Deploy button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/AnzenKodo/1mbt)
### Demo
Checkout demo website on -> [anzenkodo.github.io/1mbt](https://anzenkodo.github.io/1mbt)

or

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/AnzenKodo/1mbt)
## Related
Checkout [11ty.dev/docs/starter](https://www.11ty.dev/docs/starter/) for similar projects

## Resources
- [Eleventy Documentation](https://www.11ty.dev/docs)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks)
- [MDN](https://developer.mozilla.org) - For JavaScript, HTML & CSS documentation.
