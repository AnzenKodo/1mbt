module.exports = function (eleventyConfig) {
  // Markdown
  const markdownItAnchor = require("markdown-it-anchor");
  eleventyConfig.setLibrary("md", require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true
  })
    .use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true })
    })
    .use(require("markdown-it-footnote"))
    .use(require("markdown-it-task-checkbox"))
    .use(require("markdown-it-sub"))
    .use(require("markdown-it-sup"))
    .use(require("markdown-it-mark"))
    .use(require("markdown-it-abbr"))
    .use(require("markdown-it-kbd"))
    .use(require("markdown-it-small"))
    .use(require("markdown-it-underline"))
    .use(require("markdown-it-ins-del"))
    .use(require("markdown-it-imsize"))
    .use(require("markdown-it-deflist"))
  );

  // An accessible emoji shortcode and filter
  eleventyConfig.addPlugin(require("eleventy-plugin-emoji"));

  // External Links to noreferrer nofollow noopener external
  eleventyConfig.addPlugin(require("@aloskutov/eleventy-plugin-external-links"));

  // Copy local page assets to permalink folder
  eleventyConfig.addPlugin(
    require('eleventy-plugin-page-assets'),
    {
      mode: "parse",
      postsMatching: "src/pages/posts/*/*.md",
    }
  );

  // Table of Content
  eleventyConfig.addPlugin(
    require('eleventy-plugin-toc'),
    {
      wrapper: "aside",
      ul: true,
      wrapperClass: 'toc'
  })

  // Open Graph, Twitter card, generic meta tags
  eleventyConfig.addPlugin(require('eleventy-plugin-metagen'));

  // Google Font
  eleventyConfig.addPlugin(require("eleventy-google-fonts"));

  // Reading Time
  eleventyConfig.addPlugin(require('eleventy-plugin-reading-time'));

  // RSS
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));

  // 404 page
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const fs = require('fs');
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
    const cleanCSS = require('clean-css');
    return new cleanCSS({}).minify(code).styles;
  });

  // HTML Minifier
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if( outputPath && outputPath.endsWith(".html") ) {
        const htmlmin = require('html-minifier');
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
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));

  // Proper date format
  eleventyConfig.addPlugin(require("eleventy-plugin-date"));

  // Watch files
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
