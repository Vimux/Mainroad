---
title: Getting started
description: This article helps you get started with the Mainroad theme, including installation and minimal
  configuration.
lead: This article helps you get started with the Mainroad theme, including installation and minimal configuration.
date: 2022-01-24T14:00:00.000Z
tags:
  - "Installation"
authorbox: false
sidebar: false
pager: false
weight: 1
menu: main
---

Welcome to the Mainroad theme documentation. This quick guide has been written for intermediate and advanced users who
are interested in getting started with the Mainroad theme, including installation and minimal configuration. To fully
understand the rest of this guide, you need to be familiar with the main concepts of the [Hugo](https://gohugo.io/)
static site generator.

<!--more-->

## Installation

To begin with **Mainroad** theme, you should have
[**Hugo** (version 0.48 or later) installed](https://gohugo.io/getting-started/quick-start/#step-1-install-hugo) and
[create a new site](https://gohugo.io/getting-started/quick-start/#step-2-create-a-new-site). For comprehensive Hugo
installation guide, please visit [Hugo Documentation](https://gohugo.io/getting-started/installing/). After that, you
are ready to install Mainroad theme.

There are a few options to install a theme in Hugo. This can be done via git submodule, git clone, Hugo modules, or even
by downloading the archive and manually copying the files. Use what you know and what works best for you. Three
installation options are described below.

### Option A: `git submodule`

*Additional requirements: git*

If you don't plan to make any significant changes but want to track and update the theme, you can add it as a [git
submodule](https://git-scm.com/docs/git-submodule) by running the following command from the root directory of your Hugo
site:

```sh
git submodule add https://github.com/vimux/mainroad.git themes/mainroad
```

**Note:**
[Netlify expects git submodule](https://docs.netlify.com/configure-builds/common-configurations/hugo/#hugo-themes)
instead of git clone.

### Option B: `git clone`

*Additional requirements: git*

Run this [git clone](https://git-scm.com/docs/git-clone) command from the root of your Hugo site:

```sh
git clone https://github.com/vimux/mainroad.git themes/mainroad
```

### Option C: Manual install

If you do not want to use git for some reason, you can manually
**[download ZIP](https://github.com/vimux/mainroad/archive/master.zip)** and extract it into the `themes/mainroad`
within your Hugo site.

---

### Activate theme

No matter what option do you choose above, don't forget to edit `theme` param of the site configuration `config.toml`:

```toml
theme = "mainroad"
```

Done. Build the site via `hugo` command or make it available on a local server via `hugo server` to check it out.

## Minimal configuration

**We don't recommend copying [example config](https://github.com/vimux/mainroad#configtoml-example) as-is.**
Mainroad theme contains required defaults, so you don't need to add all of configuration parameters to run the
theme for the first time without errors from Hugo. Make sure that you edit the `theme` param inside the config file
and check that theme works. Only then start to add theme-specific parameters that you really need.
[Customization page]({{< relref "/docs/customization.md" >}} "Mainroad theme customization") describes common settings
that you may want to change and our [demo config](https://github.com/vimux/mainroad/blob/master/exampleSite/config.toml)
could help with configuration too.

[Edit this page on GitHub](https://github.com/vimux/mainroad/blob/master/exampleSite/content/docs/getting-started.md)
