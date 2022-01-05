---
tags: hello
---

## Hello


You can also use words, to fit your writing style more closely[^note].

asdfasdfsdfa asdfads;fasdfk

1. First list item
   1. First nested list item
	   1. Second nested list item George Washington
		 1. list
		 - yo bro

- John Adams
- Thomas Jefferson
- 739
- https://github.com/octo-org/octo-repo/issues/740
- Add delight to the experience when all tasks are complete :tada:

		Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].


[^1]: My reference.
[^2]: Every new line should be prefixed with 2 spaces.
  This allows you to have a footnote with multiple lines.

## How the home

[^note]:
    Named footnotes will still render with numbers instead of the text but allow easier identification and linking.
    This footnote also has been made with a different syntax using 4 spaces for new lines.

~~Eleventy~~ `(also known as 11ty)` is a [static site generator (SSG)](https://ssg.com) for websites. It was launched in 2017 by Zach Leatherman as a JavaScript-based alternative to Jekyll, one of the first mainstream SSGs, which is written in Ruby. Eleventy has gained a reputation as one of the most flexible and performant options for building static websites, leading to steadily rising adoption rates in the Jamstack ecosystem.

> It’s important to note that Eleventy is not a JavaScript framework, and it does not include any client-side JavaScript. It takes template files specified in HTML, Markdown, or your choice of templating language, and outputs a complete, static website ready to be deployed to a web server of your choice.

While most other SSGs are restricted to just one templating language, Eleventy supports multiple templating languages, such as HTML, Liquid, Markdown, Nunjucks, Handlebars, moustache, EJS, Haml, Pug, etc., and you can even combine them in the same project. This flexibility is one of the things that makes Eleventy stand out from its competition.

*In* **this** ***tutorial***, you’ll develop a static website from scratch with Eleventy and deploy it to DigitalOcean’s App Platform for free.

- [x] hello

|   Markdown   | Rendered HTML |
|--------------|---------------|
|    *Italic*  | *Italic*      | \
|              |               |
|    - Item 1  | - Item 1      | \
|    - Item 2  | - Item 2      |
|    ```python | ```python       \
|    .1 + .2   | .1 + .2         \
|    ```       | ```           |

```html
<!DOCTYPE html>
<html>
<head>
	...
	<link href="https://{{cdn}}/prism@v1.x/themes/prism.css" rel="stylesheet" />
</head>
<body>
	...
	<script src="https://{{cdn}}/prism@v1.x/components/prism-core.min.js"></script>
	<script src="https://{{cdn}}/prism@v1.x/plugins/autoloader/prism-autoloader.min.js"></script>
</body>
</html>
```
