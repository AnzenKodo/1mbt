module.exports = function (eleventyConfig) {
	// Markdown
	const markdownItAnchor = require('markdown-it-anchor')
	eleventyConfig.setLibrary(
		'md',
		require('markdown-it')({
			html: true,
			breaks: true,
			linkify: true
		})
			.use(markdownItAnchor, {
				permalink: markdownItAnchor.permalink.headerLink()
			})
			.use(require('markdown-it-footnote'))
			.use(require('markdown-it-task-checkbox'))
			.use(require('markdown-it-sub'))
			.use(require('markdown-it-sup'))
			.use(require('markdown-it-mark'))
			.use(require('markdown-it-abbr'))
			.use(require('markdown-it-kbd'))
			.use(require('markdown-it-small'))
			.use(require('markdown-it-underline'))
			.use(require('markdown-it-ins-del'))
			.use(require('markdown-it-imsize'))
			.use(require('markdown-it-deflist'))
			.use(require('markdown-it-attrs'))
	)

	// WebMentions
	eleventyConfig.addPlugin(
		require('@chrisburnell/eleventy-cache-webmentions'),
		{
			domain: 'https://ionote.vercel.app' // This is required!
		}
	)
	// An accessible emoji shortcode and filter
	eleventyConfig.addPlugin(require('eleventy-plugin-emoji'))

	// External Links to noreferrer nofollow noopener external
	eleventyConfig.addPlugin(require('@aloskutov/eleventy-plugin-external-links'))

	// Copy local page assets to permalink folder
	eleventyConfig.addPlugin(require('eleventy-plugin-page-assets'), {
		mode: 'parse',
		postsMatching: 'src/_pages/posts/*/*.md'
	})

	// Table of Content
	eleventyConfig.addPlugin(require('eleventy-plugin-toc'), {
		wrapper: 'aside',
		ul: true,
		wrapperClass: 'toc'
	})

	// Open Graph, Twitter card, generic meta tags
	eleventyConfig.addPlugin(require('eleventy-plugin-metagen'))

	// Google Font
	eleventyConfig.addPlugin(require('eleventy-google-fonts'))

	// Reading Time
	eleventyConfig.addShortcode('readingTime', text => {
		// Get entire post content element
		const wordCount = `${text}`.match(/\b[-?(\w+)]+\b/gi).length
		// Calculate time in munites based on average reading time
		const timeInMinutes = wordCount / 225
		// Validation as we don't want it to show 0 if time is under 30 seconds
		const output = timeInMinutes <= 0.5 ? 1 : Math.round(timeInMinutes)

		return String(`${output}` + 'min')
	})

	// RSS
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'))

	// 404 page
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready(error, bs) {
				bs.addMiddleware('*', (request, res) => {
					const fs = require('fs')
					const content404 = fs.readFileSync('_site/404.html')
					// Add 404 http status code in request header.
					res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' })
					// Provides the 404 content without redirect.
					res.write(content404)
					res.end()
				})
			}
		}
	})

	// CSS Minifier
	eleventyConfig.addFilter('cssmin', code => {
		const cleanCSS = require('clean-css')
		return new cleanCSS({}).minify(code).styles
	})

	// HTML Minifier
	eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
		if (outputPath && outputPath.endsWith('.html')) {
			const htmlmin = require('html-minifier')
			const minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			})
			return minified
		}

		return content
	})

	// Syntax Highlight
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))

	// Proper date format
	eleventyConfig.addPlugin(require('eleventy-plugin-date'))

	// Watch files
	eleventyConfig.addWatchTarget('./src/_static')
	eleventyConfig.addPassthroughCopy({ './src/_static': '/' })

	// Tags
	eleventyConfig.setDataDeepMerge(true)
	// Filters unimportant tags
	function filterTagList(tags) {
		return (tags || []).filter(
			tag => !['all', 'nav', 'post', 'posts', 'feeds'].includes(tag)
		)
	}

	eleventyConfig.addFilter('filterTagList', filterTagList)
	// Create an array of all tags
	eleventyConfig.addCollection('tagList', collection => {
		const tagSet = new Set()
		for (const item of collection.getAll()) {
			for (const tag of item.data.tags || []) {
				tagSet.add(tag)
			}
		}

		return filterTagList([...tagSet])
	})

	return {
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		templateFormats: ['md', 'njk', 'html', 'liquid'],
		dir: {
			input: 'src/_pages',
			includes: '../../src/_includes',
			data: '../../src/_static',
			output: '_site',
			layout: 'base.njk'
		}
	}
}
