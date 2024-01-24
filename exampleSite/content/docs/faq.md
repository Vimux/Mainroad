---
title: Frequently asked questions (FAQ)
description: Browse this FAQ page to find answers to frequently asked questions that have not been covered elsewhere in
  the documentation.
date: 2022-01-24T14:00:00.000Z
authorbox: false
sidebar: false
pager: false
weight: 3
menu:
  main:
    name: FAQ
---

Browse this FAQ page to find answers to frequently asked questions that have not been covered elsewhere
in the documentation.

<!--more-->

The answers have been categorized into two groups:

1. Answers to general questions without any lines of code.
2. Answers to technical questions with code snippets, step-by-step instructions, etc.

## General questions

### Do I need to have prior experience before proceeding with the Mainroad theme?

**Yes.** You'll need to be familiar with Hugo before proceeding.
[Our docs section]({{< ref "/docs/_index.md" >}} "Mainroad theme documentation") is intended for intermediate to
advanced users and developers. Our documentation may still be helpful to users with minimal experience, but are not
comprehensive.

### Do I need to use the extended version of Hugo?

**No.** Mainroad theme intentionally does not use any features of the extended version. As such, the extended version of
Hugo is not required (but applicable).

### Is there a list of all possible configuration options?

**Configuration:**

* See [All Configuration Settings](https://gohugo.io/getting-started/configuration/#all-configuration-settings)
for the full list of Hugo-defined variables with their default values.
* See [Mainroad config.toml example](https://github.com/Vimux/Mainroad#configtoml-example) for the full list of
Mainroad-specific variables.

**Front Matter:**

* See [Front Matter Variables](https://gohugo.io/content-management/front-matter#front-matter-variables) for the
list of Hugo-defined Front Matter variables.
* See [Mainroad Front Matter example](https://github.com/Vimux/Mainroad#front-matter-example) for the list of
Mainroad-specific Front Matter variables.

### What if I have more questions? Should I create an issue?

**We don't provide personal technical support.** As stated in our
[contributing guidelines](https://github.com/Vimux/Mainroad/blob/master/CONTRIBUTING.md), please do not use the issue
tracker for personal support. This includes reports like: “How do I do this", “Everything is broken; help me”, “I
changed something, and it doesn't work anymore”, “It's not a personal issue, but I just want to ask how X or Y works”,
“I forked your theme, then something broke; fix this immediately”, and so on.

**The issue tracker should only be used for bug reports, feature requests, and discussions that comply with our
contributing rules**. All other issues will be closed and marked as invalid.

## Technical questions

### I want to get the `favicon.ico` and `apple-touch-icon.png` to match my `hightlightColor`. What should I do?

There is no way to do this on the fly with Hugo, but you can use the one-liners below with some preparations:

1. Copy:
    * `./themes/mainroad/static/favicon.ico` to `./static/favicon.ico`
    * `./themes/mainroad/static/apple-touch-icon.png` to `./static/apple-touch-icon.png`
1. At the beginning of each script, replace the color in the variable with your preferred color. You must use
six-digit hex triplet notation (e.g., `#E22D30`) to make it work properly.

Go to the root of your project directory in the terminal and execute these two commands accordingly.

```
a=#E22D30;a=\\x${a:5:2}\\x${a:3:2}\\x${a:1:2};for i in 98 274 578;do printf $a|dd of=static/favicon.ico bs=1 seek=$i conv=notrunc;done
```

```
a=#E22D30;a=$(echo 504C54452A2A2A${a:1:6}|sed -e 's/../\\x&/g');printf $a|gzip|tail -c8|od -tx4 -N4 -An|xargs|sed -e 's/../\\x&/g'|printf $a$(cat -)|dd of=static/apple-touch-icon.png bs=1 seek=37 conv=notrunc
```

### I want to use Google Programmable Search Engine as a site search engine. Is it possible?

**Yes, it is possible to use [Google PSE (CSE)](https://developers.google.com/custom-search/docs/overview) as a site
search engine.**

1. Create a new search engine with [Google PSE](https://programmablesearchengine.google.com/about/). Google account
required.

1. Add a new layout.

    Create file `./layouts/search/index.html` with the following content:

    ```
    {{ define "main" }}
    <script async src="https://cse.google.com/cse.js?cx=YOUR_PSE_ENGINE_ID"></script>
    <div class="gcse-search"></div>
    {{ end }}
    ```

    Don't forget to paste your Google PSE ID.

1. Add search page by creating file `./content/search.md` with the following content:

    ```
    ---
    title: Search
    authorbox: false
    sidebar: false
    pager: false
    ---
    ```

1. Optional. If you use the search widget, don't forget to change the search box parameters:

    ```toml
    [Params.widgets.search]
      url = "/search/"
      input.name = false
      input.pre = ""
    ```

Google PSE (CSE) should work when it's done. Look and feel will be far from perfect, but you have to solve this problem
with [Google PSE Control Panel](https://programmablesearchengine.google.com/controlpanel/all) and additional CSS.

[Edit this page on GitHub](https://github.com/vimux/mainroad/blob/master/exampleSite/content/docs/faq.md)
