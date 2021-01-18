---
title: Download Photos of You from Facebook
slug: fb-photos-youre-tagged-in
date: '2019-02-04'
---

Downloading your data off Facebook is super easy, but one thing I noticed is that it doesn't download the photos you're tagged in. I was super let down by this since it's the PRIMARY data I want from the site. In case you don't know, when you download your data from Facebook using the export tool, the only media you get is the media you uploaded. I find this silly, since if you uploaded it, you probably have the original files somewhere else! But not the ones you're tagged in.

Since I was deleting my Facebook account (more on that later), I really wanted to have my own copy of the photos I was tagged in. There's no easy "Download" button to click, unfortunately, but that doesn't mean it isn't possible, especially if you get crafty.

## Get all the photos of you on one page

To do this, I largely followed [this guide](https://gnmerritt.net/deletefacebook/2018/04/03/fb-photos-of-me/), but I found that it wasn't always clear (misses some of the helpful tips in the comments). This post recommends using the link [https://www.facebook.com/search/YOUR-ID-NUM-HERE/photos-of/intersect](https://www.facebook.com/search/YOUR_ID_NUM_HERE/photos-of/intersect) to see all the photos you're tagged in, and that's what I used. (There might be another page to get these photos, but I'm not sure.)

As you see, you'll need to get your unique Facebook ID number:

1.  Go to your [profile page](https://www.facebook.com/me).
2.  Find the browser option `View Source` to get a long page of the code that makes up the page. On a Mac, you can hit `Option + Cmd + U`.
3.  Press `Ctrl + F` (Windows) or `Cmd + F` (Mac) and type **fb://**. The number following this is your Facebook ID, and you can use that in the URL above.

Once you hit that URL, you should see a page that has all of the photos you're tagged in!

_Make sure you continue scrolling until all of the photos are loaded on the page._

## Grab the direct URL to each photo

Now that every photo is loaded, scroll back to the top and click on the first photo in the grid, which will pop-up the image spotlight. While the image is still open, open the browser console in `Developer Tools`. You can do this on the Mac by hitting `Option + Cmd + I`. That will open a side pane in your window. Click on the `Console` tab.

Now, you might get a big red warning about running strange JavaScript in the console. Don't worry, nothing below will do anything malicious, and in fact, I'll do my best to explain what each line does. Besides, I'm advocating to get off Facebook here 😝.

Alright, now for the fun part! Copy and paste the code below into the Console, and hit Enter.

```js
let interval;
const photos = [];
interval = setInterval(() => {
  photos.push(
    document.querySelector('._2-sx').firstElementChild.getAttribute('src')
  );
  document.querySelector('a.next').click();
}, 3000);
```

What does this do? It creates a loop that will collect the direct URL for each image, then will progress to the next image, collect that URL, and so on. It spends 3 seconds on each photo, since any less time seems to cause the loop to stall and break.

Now, this isn't perfect: sometimes it will get stuck on a photo, which I think is due to the fact that it can't find the "next arrow" to click or something. When that happens, stop the loop by entering this into the console:

```js
clearInterval(interval);
```

Then close out of the current image you're on, and open the image _following_ the one the loop got stuck on. Once there, copy and paste the below into the console, and hit Enter again:

```js
interval = setInterval(() => {
  photos.push(
    document.querySelector('._2-sx').firstElementChild.getAttribute('src')
  );
  document.querySelector('a.next').click();
}, 3000);
```

This just restarts the loop! And hopefully it will continue trucking on. You might find you have to restart the loop a couple times (at least I did).

As this runs, you won't see anything happen other than the spotlight progressing from image to image. But that's okay! In the background, each URL is being collected into an array, which in this case is basically a collection or list of the URLs, which we'll use to export all of these URLs to download.

## Once the loop stops

Once the loops stops, type the word `photos` into the console, and hit Enter. If everything went okay, you'll get a long result of URLs! We'll use these URLs to quickly download each image. To get them out of the console easily, run the below in the Console, which will spit out each URL onto its own line:

```js
const uniquePhotos = [...new Set(photos)];
uniquePhotos.forEach(photo => console.log(photo));
```

The above just filters the array down to only the unique URLs (when the loop got stuck above, it probably continually collected the same URL over and over again), then just spits out each URL on a new line. Now copy and paste the result into a new `.txt` file.

Almost there! Now that we have the link to every file, we'll run a script to download them all onto your local drive.

## Download the files!

At this point, you should have a `.txt` file with the direct link to every photo you're tagged in. Open the Terminal application.

```bash
# Go to your Pictures folder
cd ~/Pictures
# Make a new folder for your FB photos
mkdir fb-photos
# Go into the new folder
cd fb-photos
# ...And download! Place the path to your file inside the brackets below
cat <path to your file here> | sed -E 's/VM[[:digit:]]+:[[:digit:]]+ //' | xargs -n1 -P4 wget
```

Eh, voila! You should see the `fb-photos` directory fill up with files. If you get an error like `xargs: wget: No such file or directory`, then enter `brew install wget`, and try again. If You don't have Homebrew installed, then you'll need to install that first.

All of the photos might not be recognized by the operating system as a photo: to fix this, you can rename each file individually. Or, you can enter the following into the terminal:

```bash
# Install the rename utility
brew install rename
# Rename the files to look like photos!
rename 's/\?_nc_cat.*//g' *
```

That's it! Facebook doesn't keep a super high resolution for the photos unfortunately, but this should yield the same results as downloading each photo individually.

---

## Why am I doing this?

I deleted my Facebook account! I've been off Facebook (via deactivation only) since sometime last summer (~7 months), and in light of the recent Facebook privacy scandals, I just wanted off. In the time that I've been off, I haven't missed it one bit. The only downside is that I no longer get Facebook event invites, but if they are important enough, my friends will tell me!
