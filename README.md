# Mainroad

**Mainroad** is a responsive, simple, clean and content-focused [Hugo](https://gohugo.io/) theme based on the [MH Magazine lite](https://wordpress.org/themes/mh-magazine-lite/) WordPress theme by [MH Themes](https://www.mhthemes.com/).

**[Demo (Fast update)](https://hugothemes.gitlab.io/mainroad/)** | [Standart Demo](https://themes.gohugo.io/theme/mainroad/)

![screenshot](https://github.com/Vimux/mainroad/blob/master/images/screenshot.png)

**Features:**

+ Hugo internal templates (Open Graph, Twitter Cards, Disqus, Google Analytics)
+ Responsive menu
+ Secondary menus
+ SVG icons
+ Theme options (Sidebar position, Author Box, Post Navigation) available through config.toml file parameters
+ Table of Contents
+ MathJax

**Browser support:**

+ **Desktop:** IE10+, Chrome, Firefox, Safari
+ **Mobile:** Android browser (on Android 4.4+), Safari (on iOS 7+), Google Chrome, Opera mini

Other browsers (like Opera on Blink engine) are also supported, but not tested. Support for older versions of Internet Explorer (IE9 and below) ended.

## Installation

In your Hugo site `themes` directory, run:

```
$ git clone https://github.com/vimux/mainroad
```

Next, open `config.toml` in the base of the Hugo site and ensure the theme option is set to `mainroad`:

```
theme = "mainroad"
```

For more information read the official [setup guide](https://gohugo.io/themes/installing-and-using-themes/) of Hugo.

## Configuration

### Config.toml example

```toml
baseurl = "/"
title = "Mainroad"
languageCode = "en-us"
paginate = "10" # Number of posts per page
theme = "mainroad"
disqusShortname = "" # Enable comments by entering your Disqus shortname
googleAnalytics = "" # Enable Google Analytics by entering your tracking id

[Author] # Used in authorbox
  name = "John Doe"
  bio = "John Doe's true identity is unknown. Maybe he is a successful blogger or writer. Nobody knows it."
  avatar = "img/avatar.png"

[Params]
  subtitle = "Just another site" # Subtitle of your site. Used in site header
  description = "John Doe's Personal blog about everything" # Site description. Used in meta description
  #copyright = "John Doe" # copyright holder, otherwise will use site title
  opengraph = true # Enable OpenGraph if true
  twitter_cards = true # Enable Twitter Cards if true
  readmore = false # Show "Read more" button in list if true
  authorbox = true # Show authorbox at bottom of pages if true
  toc = true # Enable Table of Contents
  post_navigation = true # Show post navigation at bottom of pages if true
  # post_meta = ["date", "categories"] # Order of post meta information. Use ["none"] to turn off completely.
  postSections = ["post"] # the section pages to show on home page and the "Recent articles" widget
  #postSections = ["blog", "news"] # alternative that shows more than one section's pages
  #dateformat = "2006-01-02" # change the format of dates
  #mathjax = true # Enable MathJax
  #mathjaxPath = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js" # Specify MathJax path
  #mathjaxConfig = "TeX-AMS-MML_HTMLorMML" # Specify MathJax config

[Params.sidebar]
  home = "right" # Configure layout for home page
  list = "left"  # Configure layout for list pages
  single = false # Configure layout for single pages
  # Enable widgets in given order
  widgets = ["search", "recent", "categories", "taglist", "social"]

[Params.widgets]
  recent_num = 5 # Set the number of articles in the "Recent articles" widget
  tags_counter = false # Enable counter for each tag in "Tags" widget (disabled by default)

[Params.widgets.social]
  # Enable parts of social widget
  facebook = "username"
  twitter = "username"
  linkedin = "username"
  telegram = "username"
  github = "username"
  gitlab = "username"
  bitbucket = "username"
  email = "example@example.com"
  google_plus = "profileid"
```

### Front Matter example

```yaml
---
title: "Example article title"
date: "2017-08-21"
description: "Example article description"
thumbnail: "img/placeholder.jpg" # Optional, thumbnail
lead: "Example lead - highlighted near the title"
disable_comments: false # Optional, disable Disqus comments if true
authorbox: true # Optional, enable authorbox for specific post
toc: true # Optional, enable Table of Contents for specific post
mathjax: true # Optional, enable MathJax for specific post
categories:
  - "Category 1"
  - "Category 2"
tags:
  - "Test"
  - "Another test"
menu: main # Optional, add page to a menu. Options: main, side, footer
---
```

For more information about front matter variables read [Hugo Front Matter](https://gohugo.io/themes/installing-and-using-themes/) from Hugo official documentation.

### Sidebar

**Mainroad** comes with a configurable sidebar that can be on the left, on the right, or disabled. The default layout can be specified in the `[Params.sidebar]` section of the configuration. The position can be specified for home, list and single pages individually. Use the keys `home`, `list` and `single` with values `"left"`, `"right"` or `false`. The layout can be configured per page, by setting the `sidebar` parameter with one of the same values in the page's front matter.

The sidebar consists of multiple widgets. Widgets can be enabled individually using the `widgets` key with a list of widget names as value. You can add your own widgets, by placing a template under `layouts/partials/widgets/<name>.html`. The list of widgets can be overwritten from a page's front matter.

Some widget respect optional configuration. Have a look at the `[Params.widgets]` and `[Params.widgets.social]` sections in the example configuration above.

### Menus

**Mainroad** supports multiple menus. The `main` menu is fully responsive and displayed right under the site header. The secondary menus `side` and `footer` are displayed in a sidebar widget and the page footer. In order to add a page to a menu, add a `menu = <menu>` parameter to the pages frontmatter. You can also add a page to many menus by providing a list, e.g. `menu = [main, side, footer]`. Don't forget to enable the `sidemenu` widget in the widget configuration if you want to use the `side` menu.

**Sidenote:** Please keep in mind that Mainroad menus don't support nested items (submenus).

## Contributing

Have you found a bug or got an idea for a new feature? Feel free to use the [issue tracker](https://github.com/Vimux/mainroad/issues) to let me know. Or make directly a [pull request](https://github.com/Vimux/mainroad/pulls), but please respect the following [contributing guide](CONTRIBUTING.md).

## License

This theme is released under the [GPLv2 license](https://github.com/Vimux/mainroad/blob/master/LICENSE.md).
