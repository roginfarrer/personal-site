---
slug: hide-facebook-news-feed
title: "Hide Facebook's News Feed (And Other Annoyances)"
date: "2014-12-15"
draft: true
---

<h4 class="subhead">How to eliminate Facebook's news feed for good.</h4>

I’m not a big fan of Facebook, but because so much of my social life and connections operate through their service, I don’t really feel like I can quit it.

Still, I really hate how distracting it can be. We've all gone down the never-ending vortex that is the news feed.

In an effort to minimize Facebook in as much of my life as possible, I’ve taken some decidedly simple steps: I’ve deleted the Facebook app from all of my mobile devices, and if I really need to get away from it, I block _m.facebook.com_ from Safari using iOS Restrictions. (I can disable it easily, but the obstacle of doing so can be enough to keep me off the site.) Doing this still allows me to use the Messenger app, which is all I need on the go.

Then there’s the desktop, which isn’t so simple. I still need a way to see my notifications and people’s profiles, but all that other stuff can go. Fortunately, I’ve found a way to do just that.

<figure class="imgbleed"><img src="http://cdn.roginfarrer.com/quiet-facebook.png" /><figcaption>Where'd the news feed go?? :)</figcaption></figure>

The first thing I eliminated was the news feed, which I accomplished by using Max Friedrich’s [Quiet Facebook](https://github.com/maxfriedrich/quiet-facebook), a custom stylesheet that cleanly removes the news feed from the web page.

That satisfied for me for a while, but then I started finding other elements on the page to distract me, like TRENDING NEWS (ugh). So I made an addition to the stylesheet to block out Trending News and Suggested Pages/Groups.

[Download my updated stylesheet here.](https://github.com/roginfarrer/quiet-facebook)

It’s super easy to set up. Download it to you desktop and unzip the folder. Then open Preferences in Safari, navigate to the Advanced tab, and in the Style sheet dropdown, select `quiet-facebook.css`. Boom. It’s gone.

Huzzah! A minimalist Facebook experience.
