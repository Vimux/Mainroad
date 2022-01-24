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

Browse this FAQ page to find a collection of answers to frequently asked questions that have not been covered elsewhere
in the documentation.

<!--more-->

The answers have been categorized into two groups. Those are answers to general questions without any lines of code, and
those are answers to technical questions with code snippets, step-by-step instructions, etc.

## General questions

### Do I need to have some prior experience before proceed with Mainroad theme?

**Yes.** We expect that you already have prior experience with Hugo, at least.
[Our docs section]({{< ref "/docs/_index.md" >}} "Mainroad theme documentation") is for intermediate users and
developers, not novice users with zero or minimal experience. Still, all documentation pages would be helpful even if
you don't have such experience. Just don't expect all your typical questions answered here.

### Do I need to use the extended version of Hugo?

**No.** Mainroad theme intentionally does not use any features of the extended version. As such, the extended version of
Hugo is not required (but applicable).

### Is there a list of all possible configuration options?

**Configuration:**

* See [All Configuration Settings](https://gohugo.io/getting-started/configuration/#all-configuration-settings) section
for the full list of Hugo-defined variables with their default value.
* See [Mainroad config.toml example](https://github.com/Vimux/Mainroad#configtoml-example) for the full list of
Mainroad-specific variables.

**Front Matter:**

* See [Front Matter Variables](https://gohugo.io/content-management/front-matter#front-matter-variables) section for the
list of Hugo-defined Front Matter variables.
* See [Mainroad Front Matter example](https://github.com/Vimux/Mainroad#front-matter-example) section for the list of
Mainroad-specific Front Matter variables.

### What if I have more questions? May I should create an issue?

**We don't provide free personal technical support.** As stated in
[CONTRIBUTING](https://github.com/Vimux/Mainroad/blob/master/CONTRIBUTING.md), please do not use the issue tracker for
personal support. This includes any reports like “how to do this or that”; “everything broken, help me”; “I changed
something, it doesn't work anymore”; “It's not a personal issue, I just want to ask how X or Y works”; “I forked your
theme, then something broken, fix this immediately” and so on. **The issue tracker is the preferred channel for bug
reports, feature requests, and discussions that comply with our contributing rules**, nothing more. All other issues
would be closed and marked as invalid.

## Technical questions

**I wanted to get the `favicon.ico` and `apple-touch-icon.png` to match my `hightlightColor`, what should I do?**

There is no way to do this on the fly with Hugo, but you may use two one-liners below with some preparations:

1. Copy:
    * `./themes/mainroad/favicon.ico` to `./static/favicon.ico`
    * `./themes/mainroad/apple-touch-icon.png` to `./static/apple-touch-icon.png`
1. Replace the color in variable to your preferred at the beginning of both scripts. Beware, you should use full
six-digit Hex triplet notation (e.g., `#E22D30`) to make it work properly.

Go to the root of your project directory in the terminal and execute this two commands accordingly.

```
a=#E22D30;a=\\x${a:5:2}\\x${a:3:2}\\x${a:1:2};for i in 98 274 578;do printf $a|dd of=static/favicon.ico bs=1 seek=$i conv=notrunc;done
```

```
a=#E22D30;a=$(echo 504C54452A2A2A${a:1:6}|sed -e 's/../\\x&/g');printf $a|gzip|tail -c8|od -tx4 -N4 -An|xargs|sed -e 's/../\\x&/g'|printf $a$(cat -)|dd of=static/apple-touch-icon.png bs=1 seek=37 conv=notrunc
```

[Edit this page on GitHub](https://github.com/vimux/mainroad/blob/master/exampleSite/content/docs/faq.md)
