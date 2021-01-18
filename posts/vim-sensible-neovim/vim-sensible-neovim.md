---
title: vim-sensible and Neovim
slug: sensible-neovim
date: '2020-08-25'
tags: vim
draft: true
---

I was cleaning up my [Neovim config files](https://github.com/roginfarrer/dotfiles) as I periodically do, and I found a handful of "sensible defaults" that I had copied from others' dotfiles long ago. Being one to eagerly eliminate redundant code, and especially skeptical of code thats intentions are unclear to me, I started consulting the Neovim help manual. Much to my delight, I discovered I had about a dozen lines in my config that merely reaffirmed the default settings. Bye, unnecessary code!

Speaking of sensible defaults, a very popular plugin recommended to newcomers to Vim is [vim-sensible][vim-sensible], which establishes "a universal set of defaults that (hopefully) everyone can agree on." One of Vim's most loved qualities is its backwards compatabilities with its predecessor vi and versions decades old. That said, that means it also ships with settings in 2020 that make you scratch your head. Why would syntax highlighting be disabled by default?? vim-sensible is "one step above `'nocompatible'` mode", establishing a set of defaults that makes sense in the modern era of text editing.

But what of Neovim? Should new users of Neovim adopt vim-sensible? Does Neovim need to be "reset"?

From my perspective, the answer is **no**, vim-sensible is _mostly_ redundant. (I'll address the "mostly" part in a second). You'll be happy to hear that most of the defaults established in vim-sensible are corroborated by Neovim. If you're curious, here's a (almost) comprehensive summary of the settings defined by vim-sensible and its setting in Neovim defaults.

## vim-sensible & Neovim defaults compared

- ✅ = Neovim and vim-sensible are aligned
- ❌ = Neovim and vim-sensible differ
- ❗ = Neovim and vim-sensible differ, but in a very subtle way

| Rule                         | Neovim | Notes                                                           |
| ---------------------------- | ------ | --------------------------------------------------------------- |
| `filetype`                   | ✅     |
| `plugin`                     | ✅     |
| `indent`                     | ✅     |
| `syntax`                     | ✅     |
| `autoindent`                 | ✅     |
| `autoread`                   | ✅     |
| `backspace=indent,eol,start` | ✅     |
| `incsearch`                  | ✅     |
| `laststatus=2`               | ✅     |
| `ttimeout`                   | ✅     |
| `ruler`                      | ✅     |
| `wildmenu`                   | ✅     |
| `encoding=utf-8`             | ✅     |                                                                 |
| `tabpagemax=50`              | ✅     |                                                                 |
| `t_Co=16`                    | ✅     | Neovim doesn't need this setting                                |
| `ttimeoutlen=100`            | ❌     | Neovim defaults to 50                                           |
| `scrolloff=1`                | ❌     | Neovim defaults to 0                                            |
| `sidescrolloff=5`            | ❌     | Neovim defaults to 0                                            |
| `display+=lastline`          | ❗     | Neovim defaults to display=lastline,msgsep                      |
| `listchars`                  | ❗     | vim-sensible and Neovim depart from the vi defaults differently |
| `formatoptions+=j`           | ❗     | Neovim: formatoptions=tcqj                                      |
| `history=1000`               | ❗     | Neovim defaults to 10000                                        |
| `sessionoptions-=options`    | ❗     | Neovim deprecated sessionoptions                                |
| `viewoptions-=options`       | ❗     | Neovim deprecated viewoptions                                   |

As you can see, most of what we think are the most critical options to enable by default (syntax highlighting, filetype detection, etc) are made the defaults in Neovim. vim-sensible and Neovim start to diverge on more nuanced settings, that arguably aren't relevant to most newcomers of Vim.

## Does Neovim need a "neovim-sensible"?

Unlike Vim, I think a total newcomer to Neovim could get started and be mostly happy with the defaults, and for anything that they encounter they don't like, they can Google a solution for it. That said, here are a few settings that most folks will _probably_ add to their config at some point:

```vim
" Allows you to change buffers even if the current on has unsaved changes
set hidden

" Intuit the indentation of new lines when creating them
set smartindent

" Return to last edit position when opening files
" It's some magic I picked up somewhere, no idea how it works
" or what alternatives are out there
au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif

" Who wants .swap files??
set noswapfile

" Enable mouse support
set mouse=a

" Turn persistent undo on
" means that you can undo even when you close a buffer/VIM
set undodir=~/.vim_runtime/temp_dirs/undodir
set undofile
```
