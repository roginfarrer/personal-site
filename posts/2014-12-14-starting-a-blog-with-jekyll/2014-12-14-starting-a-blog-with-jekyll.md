---
slug: starting-a-blog-with-jeyll
date: '2014-12-14'
title: 'Starting A Blog with Jekyll (When You Have No Idea What You’re Doing)'
---

Last week I rebuilt this site on [Jekyll](http://jekyllrb.com), and it’s freaking awesome.

I’ve heard the name Jekyll tossed around on the interwebs for a while now, but I never completely understood how it worked. When I pulled up their homepage, I immediately closed the page with just a hint that I would have to use Terminal.

But the truth is, Jekyll isn’t all that complicated, once you break it down into its parts. It took me a whole day to figure it out, port over my css and html, and configure it for live deployment. But that was because I had about 10 tabs open each telling me what to do.

So for all you non-programmers interested in Jekyll, this is for you.

**But first!** I want to reiterate that I’m no programmer. I’m only somewhat familiar with Javascript and PHP. I can’t tell you how the engine behind Jekyll works. But, I can get you up in running in laymen’s terms.

[Here we go!](http://youtu.be/k900hqBNc14)

## What we’re doing

Okay, so there’s many ways to build a Jekyll website. This process will all depend on where you want to host your site and how you like to work with your stylesheets. So to clarify, here’s what I’m going to explain:

1.  How to install Jekyll to a local directory
2.  How to incorporate [Compass](http://compass-style.org) and [SASS](http://sass-lang.com) into the workflow
3.  Setting up [Github Pages](http://github.com) hosting
4.  Configuring [Github for Mac](https://mac.github.com) to easily deploy your local repository.
5.  Setting up [Amazon S3](http://s3.amazonaws.com) and Cloudfront for a quick and dirty CDN.

Whew! Okay, now we can start.

## What you need to know first

Let’s first define Jekyll in it’s simplest terms: **Jekyll is “a simple, blog aware, static site generator.”**

If you’re a casual designer/web coder like me, you’re somewhat familiar with this generation concept. In Wordpress, for example, themes include a `header.php`, `index.php`, and a `footer.php`. When you visit your webpage, Wordpress then merges all these files together, the PHP generating HTML that is spit out to your browser.

Jekyll works in a similar way. _Except there’s no PHP._ Instead of calling the header with something like `<?php get_header(); ?>`, we will use Liquid tags, which look like this: `{ % include header.html % }`.

So now we understand two portions of the Jekyll directory. We have a `_layouts` folder that holds are page templates (i.e., posts, pages, homepage, and more). We also have an `_includes` folder for modules we use across every page, like the HTML head, header, and footer.

We also have a `_posts` folder for our blog posts, a `_sass` folder for our not-yet-synthesized SCSS files, and a `css` folder for our synthesized CSS files.

**HOLD!** If you’re not already familiar with the SASS language, I highly suggest you read through their website. It’s pretty easy to pickup, and it makes organizing your styles _way easier_ than with plain CSS.

We also have a `_config.yml` file which we’ll use later to configure our site’s “settings.” (I use quotations because that’s not _really_ what it’s called, but it’s easier to understand that way.)

And finally, there’s a `_site` folder that functions similarly to a `public_html` folder. It’s where Jekyll synthesizes our static site. We’ll leave this folder alone so Jekyll can do it’s thing without us getting in the way.

## Setting up the local directory

Navigate to where you want your Jekyll installation to live, and create a folder for the project. I’ll call it `jekyll` for simplicity’s sake.

Now open up Terminal. It’s time to install Jekyll and some of the tools we need.

### Install Jekyll

In Terminal, enter these lines to create a Jekyll installation:

```bash
$ cd /your/folder/location/jekyll
$ sudo gem install jekyll
$ jekyll new .
```

With this we navigated to the folder that we want to install jekyll into, we installed Jekyll (`sudo` to bypass permission errors), and created a new Jekyll repository in our folder. At this point, Jekyll has built a skeleton directory in the folder. I encourage you to stop at this point and poke around and get familiar with the file structure.

### Installing Compass and Sass

This one took me a while to figure out, because when you install Compass and create a build, it adds its own SASS and stylesheet folders. It took me a little while to figure out how to configure Compass to find my Sass files and then synthesize them into the right folder. So I’ll break it down.

```bash
sudo gem install sass
sudo gem install compass
compass create
```

Okay, so at this point Compass has added three folders: `config.rb`, `sass` (as distinct from `_sass`), and `stylesheets`. It’s now time to decide how you want to organize your assets. I decided to keep the structure from the Jekyll installation, so I deleted `sass` and `stylesheets`. Then open `config.rb` in a text editor.

```yaml
# Change line 6 to:

css_dir = "css"

# Change line 7 to:

sass_dir = "\_sass"
```

Compass should now do its job correctly.

### Now for \_config.yml

In this file, you configure a lot of the major variables for your site, like its URL path, name, description, directory, etc. There’s a bunch of things you can do here, but to get you started, here’s what I use:

```yaml
source: .
destination: ./\_site
includes: ./\_includes

markdown: kramdown
permalink: /:title.html

name: RoginFarrer.com
base_url: ''
url: http://roginfarrer.com
description: 'A blog covering Tech news, design, productivity, health, and the arts by Rogin Farrer.'
root_desc: 'RoginFarrer.com — Tech, Design, and Theater'

exclude: ['README.markdown', 'config.rb']
include: ['.htaccess']

paginate: 10
```

Be sure to change the variables like `name` to your own!

### Local repository complete!

We’ve now got our local directory up and running! When you’re ready to open your site locally, open your terminal to a new window.

```bash
$ cd /your/folder/location/jekyll
$ jekyll serve -w
```

Terminal will start running Jekyll! It will also spit out a local web address like `http://127.0.0.1:4000/` which you can enter to your browser. BAM! There’s your site!

Then to get compass running, type in the usual command:

```
$ compass watch
```

That’s it! You’re good to go with your local repository.

## Setting up GitHub Pages

Conveniently, GitHub offers users one free website that lives at `http://yourusername.github.io. We’re going to set up our new Jekyll repository there.

We’re also going to need GitHub for Mac. If you’re like me, you are probably pretty confused by the interface. No worries! We’ll get through it.

In the upper left, click on the plus to add a new repository. Because we’ve already set up our Jekyll directory, highlight “Add” at the top locate the folder. Then hit ‘Create Repository.’

<figure>
<img class="center" src="http://cdn.roginfarrer.com/Screen-Shot-2014-12-14-00-19-05.png" />
</figure>

Now we have to make our first ‘commit,’ which is essentially our first sync to the GitHub servers. In the ‘Summary’ box, type something like “Initial commit,” and then hit ‘Commit & Sync’ in the upper right.

Another dialogue box comes up, and now we’ll have to name the repository. Enter `yourusername.github.io`. Then hit ‘Push Repository.’

## Success!

And there you are! You’ve got a new Jekyll site published on the web. For more on how to publish posts and pages, I highly recommend you check out [Jekyll’s own documentation](http://jekyllrb.com/docs/). They’re thorough and pretty helpful.

## Why Jekyll?

Now that we’ve got our Jekyll site up and running, let’s talk about the advantages of Jekyll over conventional blogging platforms. While a flat-file structure lacks any kind of user interface or WYSIWYG editor, in return we benefit from the flexibility and ease of development.

### Easy deployment

While Wordpress is a powerful platform in its own right, modifying your theme files is tedious and disorganized. As someone who is constantly making tweaks to my site’s source files, I’d have to jump through many hoops to do so in Wordpress. To try any changes locally, I’d have to make sure I had an updated directory on my computer, make my changes, then use FTP to overwrite the files on my host’s server. If I wanted to make changes directly to my live site, I’d either have to use Wordpress’s clunky file editor or edit through the FTP client.

In this case, I’d have numerous versions of my theme all over my drive, and could never be sure of which version was which.

Jekyll keeps your local directory and the deployed directory in sync. I can use my local directory to easily and quickly make changes, and with a click of a button, it can be synced to my deployed repository. Easy-peasy.

### Flexibility

I can’t tell you how many hours I have lost trying to create custom post types for Wordpress. The task involves creating new templates, adding custom fields to the post editor, and making additions to `functions.php`. Not being a programmer, it was incredibly frustrating.

With Jekyll, custom post types are a breeze. They only require a new template in the `_layouts` folder. The ability to create your own liquid tags in a posts Front Matter make link posts really easy.

Front Matter also makes adding meta content to a page super easy. The way I have my homepage now, I like to publish a truncated post summary with links to the full page. Doing this on Wordpress can involve plugins, adding input fields to the post editor, and other headaches. But with Front Matter, I only need to add another line for `summary`, which i can reference in my `index.html` with a liquid tag, like `{{ page.summary }}`.

## There’s a lot more to like

I’ve only scratched the surface on what Jekyll can do, and I’m still discovering, too. I just set up Pygments as my syntax highlighter, for instance. (If a tutorial for that sounds interesting, let me know.) While Jekyll can look a little scary, it’s really a lot of fun and easy to learn. Hope this helps anyone getting started!
