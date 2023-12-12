# Mainroad

**Mainroad** is a responsive, simple, clean and content-focused [Hugo](https://gohugo.io/) theme based on the
[MH Magazine lite](https://wordpress.org/themes/mh-magazine-lite/) theme.

**[Demo](https://mainroad-demo.netlify.app/)** • **[Docs](https://mainroad-demo.netlify.app/docs/)**

![screenshot](https://raw.githubusercontent.com/Vimux/Mainroad/master/images/screenshot.png)

**Features:**

+ Responsive design
+ Main & secondary menus
+ Widgetized sidebar
+ Translations. Over 15 languages and counting
+ Configurable theme settings (sidebar position, author box, post navigation, highlight color) via `config.toml`
+ Hugo internal templates (Open Graph, Schema, Twitter Cards, Disqus, Google Analytics)
+ Wide cross-browser compatibility
  + *Desktop: IE11+, Chrome, Firefox, Safari*
  + *Mobile: Android browser (on Android 4.4+), Safari (on iOS 7+), Google Chrome, Opera mini*
+ Custom Google Fonts support, MathJax, Table of Contents, SVG icons and much more…

## Installation

*Before starting, please be sure that you have
[installed Hugo](https://gohugo.io/getting-started/quick-start/#step-1-install-hugo) and
[created a new site](https://gohugo.io/getting-started/quick-start/#step-2-create-a-new-site). After that, you are ready
to install **Mainroad**.*

From your project's root directory, run:

```
git clone https://github.com/vimux/mainroad.git themes/mainroad
```

Or, if you don't plan to make any significant changes but want to track and update the theme, you can add it as a git
submodule via the following command:

```
git submodule add https://github.com/vimux/mainroad.git themes/mainroad
```

Next, open `config.toml` in the base of the Hugo site and ensure the theme option is set to `mainroad`:

```
theme = "mainroad"
```

## Configuration

### Config.toml example

```toml
baseurl = "/"
title = "Mainroad"
languageCode = "en-us"
paginate = "10" # Number of posts per page
theme = "mainroad"
disqusShortname = "" # DEPRECATED! Use .Services.Disqus.Shortname
googleAnalytics = "" # DEPRECATED! Use .Services.googleAnalytics.ID

[services.disqus]
  shortname = "" # Enable Disqus by entering your Disqus shortname
[services.googleAnalytics]
  ID = "" # Enable Google Analytics by entering your tracking ID

[Author] # Used in authorbox
  name = "John Doe"
  bio = "John Doe's true identity is unknown. Maybe he is a successful blogger or writer. Nobody knows it."
  avatar = "img/avatar.png"

[Params]
  description = "John Doe's Personal blog about everything" # Site description. Used in meta description
  copyright = "John Doe" # Footer copyright holder, otherwise will use site title
  opengraph = true # Enable OpenGraph if true
  schema = true # Enable Schema
  twitter_cards = true # Enable Twitter Cards if true
  readmore = false # Show "Read more" button in list if true
  authorbox = true # Show authorbox at bottom of pages if true
  toc = true # Enable Table of Contents
  pager = true # Show pager navigation (prev/next links) at the bottom of pages if true
  post_meta = ["author", "date", "categories", "translations"] # Order of post meta information
  mainSections = ["post", "blog", "news"] # Specify section pages to show on home page and the "Recent articles" widget
  dateformat = "2006-01-02" # Change the format of dates
  mathjax = true # Enable MathJax
  mathjaxPath = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js" # Specify MathJax path
  mathjaxConfig = "TeX-AMS-MML_HTMLorMML" # Specify MathJax config
  googleFontsLink = "https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700" # Load Google Fonts
  customCSS = ["css/custom.css"] # Include custom CSS files
  customJS = ["js/custom.js"] # Include custom JS files

  # DEPRECATED PARAMS
  subtitle = "" # Deprecated in favor of .Site.Params.logo.subtitle
  highlightColor = "" # Deprecated in favor of .Site.Params.style.vars.highlightColor

[Params.style.vars]
  highlightColor = "#e22d30" # Override highlight color

  # Override font-family sets
  # Take care of different quotes OR escaping symbols in these params if necessary
  fontFamilyPrimary = "'Open Sans', Helvetica, Arial, sans-serif"
  # Secondary font-family set responsible for pre, code, kbd, and samp tags font
  fontFamilySecondary = "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"

[Params.logo]
  image = "img/placeholder.png" # Logo image. Path relative to "static"
  title = "Mainroad" # Logo title, otherwise will use site title
  subtitle = "Just another site" # Logo subtitle

[Params.thumbnail]
  visibility = ["list", "post"] # Control thumbnail visibility

[Params.sidebar]
  home = "right" # Configure layout for home page
  list = "left"  # Configure layout for list pages
  single = false # Configure layout for single pages
  # Enable widgets in given order
  widgets = ["search", "recent", "categories", "taglist", "social", "languages"]

[Params.widgets]
  recent_num = 5 # Set the number of articles in the "Recent articles" widget
  categories_counter = false # Enable counter for each category in "Categories" widget
  tags_counter = false # Enable counter for each tag in "Tags" widget

[Params.widgets.social]
  cached = false # activate cache if true
  # Enable parts of social widget
  facebook = "username"
  twitter = "username"
  instagram = "username"
  linkedin = "username"
  telegram = "username"
  github = "username"
  gitlab = "username"
  bitbucket = "username"
  email = "example@example.com"

# Custom social links
[[Params.widgets.social.custom]]
  title = "Youtube"
  url = "https://youtube.com/user/username"
  icon = "youtube.svg" # Optional. Path relative to "layouts/partials"
  rel = "noopener noreferrer" # Set to false to remove the rel attribute

[[Params.widgets.social.custom]]
  title = "My Home Page"
  url = "https://example.com"

[Params.widgets.search]
  cached = false # activate cache if true
  url = "https://google.com/search"
  [Params.widgets.search.input]
    name = "sitesearch"
    pre = ""
```

**Do not copy example config as-is**. Use only those parameters that you need.

For more information about all available standard configuration settings, please read
[All Hugo Configuration Settings](https://gohugo.io/getting-started/configuration/#all-configuration-settings).

### Front Matter example

```yaml
---
# Common-Defined params
title: "Example article title"
date: "2017-08-21"
description: "Example article description"
categories:
  - "Category 1"
  - "Category 2"
tags:
  - "Test"
  - "Another test"
menu: main # Optional, add page to a menu. Options: main, side, footer

# Theme-Defined params
thumbnail: "img/placeholder.png" # Thumbnail image
lead: "Example lead - highlighted near the title" # Lead text
comments: false # Enable Disqus comments for specific page
authorbox: true # Enable authorbox for specific page
pager: true # Enable pager navigation (prev/next) for specific page
toc: true # Enable Table of Contents for specific page
mathjax: true # Enable MathJax for specific page
sidebar: "right" # Enable sidebar (on the right side) per page
widgets: # Enable sidebar widgets in given order per page
  - "search"
  - "recent"
  - "taglist"
---
```

For more information about all available standard front matter variables, please read
[Hugo Front Matter](https://gohugo.io/content-management/front-matter).

## Contributing

Have you found a bug or got an idea for a new feature? Feel free to use the
[issue tracker](https://github.com/Vimux/mainroad/issues) to let me know. Or make directly a
[pull request](https://github.com/Vimux/mainroad/pulls), but please respect the following
[contributing guide](https://github.com/Vimux/mainroad/blob/master/CONTRIBUTING.md).

## License

This theme is released under the [GPLv2 license](https://github.com/Vimux/mainroad/blob/master/LICENSE.md).
