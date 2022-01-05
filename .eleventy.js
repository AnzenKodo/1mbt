const CleanCSS = require('clean-css');
const htmlmin = require('html-minifier');
const fs = require('fs');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginDate = require("eleventy-plugin-date");
const readingTime = require('eleventy-plugin-reading-time');
const eleventyGoogleFonts = require("eleventy-google-fonts");
const metagen = require('eleventy-plugin-metagen');
const img2picture = require("eleventy-plugin-img2picture");
const markdownIt = require("markdown-it");
const markdownItAnchor = require('markdown-it-anchor')
const pluginTOC = require('eleventy-plugin-toc')
const markdownItFootnote = require("markdown-it-footnote");
const markdownItCheckbox = require('markdown-it-task-checkbox');

module.exports = function (eleventyConfig) {
  // Markdown
  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
    // Head Anchor
    .use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true })
    })
    // Footnote
    .use(markdownItFootnote)
    // Check box
    .use(markdownItCheckbox)
  );

  eleventyConfig.addPlugin(pluginTOC, {
    wrapper: "aside",
    ul: true,
    wrapperClass: 'toc'
  })

  // eleventyConfig.addPlugin(img2picture, {
  //   urlPath: "public/img",
  // })

  // Open Graph, Twitter card, generic meta tags
  eleventyConfig.addPlugin(metagen);

  // Google Font
  eleventyConfig.addPlugin(eleventyGoogleFonts);

  // Reading Time
  eleventyConfig.addPlugin(readingTime);

  // RSS
  eleventyConfig.addPlugin(pluginRss);

  // 404 page
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const content_404 = fs.readFileSync('public/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  // CSS Minifier
  eleventyConfig.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // HTML Minifier
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if( outputPath && outputPath.endsWith(".html") ) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }
      return content;
    });

  // Syntax Highlight
  eleventyConfig.addPlugin(syntaxHighlight);

  // Watch file
  eleventyConfig.addWatchTarget('./src/_static');
  eleventyConfig.addPassthroughCopy({ "./src/_static": "/" });

  // Tags
  eleventyConfig.setDataDeepMerge(true);
  // Filters unimportant tags
  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts", "feeds"].indexOf(tag) === -1);
  }
  eleventyConfig.addFilter("filterTagList", filterTagList);
  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    return filterTagList([...tagSet]);
  });

  // Proper date format
  eleventyConfig.addPlugin(pluginDate);

  return {
    markdownTemplateEngine: "njk",
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],
    dir: {
      input: 'src/pages',
      includes: '../../src/_includes',
      data: '../../src/_static',
      output: 'public',
      pathPrefix: '/posts/',
      layout: 'base.njk',
    },
  };
};
