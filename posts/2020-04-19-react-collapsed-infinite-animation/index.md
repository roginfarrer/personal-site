---
title: DOM measurements, box-sizing, and padding with React Collapsed
slug: dom-measurements-padding-react-collapsed
date: "2020-04-25"
---

One of the longest standing bugs I've encountered with [`useCollapse`](https://github.com/roginfarrer/react-collapsed) is a never-ending expanding animation when there's padding applied to the collapsed element.

`useCollapse` is a custom hook for creating accessible, animated collapse components.

I've exhausted countless hours on this one edge case bug, where if padding is applied to the collapse element, the animation will just never end: it keeps growing!

<iframe
     src="https://codesandbox.io/embed/react-collapsed-infinite-animation-bug-5gwfw?fontsize=14&hidenavigation=1&theme=dark"
     style="height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-collapsed infinite animation bug"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

What's going on here? Well, it has to do with how the hook attempts to accommodate content changes within the collapse element. When the transition ends, we do a check to make sure that the height of the element matches the height we set the element to animate to before the transition began:

```javascript
// Abbreviated to keep it concise

const handleTransitionEnd = () => {
  // The height comparisons below are a final check before completing the transition
  // Sometimes this callback is run even though we've already begun transitioning the other direction
  // The conditions give us the opportunity to bail out, which will prevent the collapsed content from flashing on the screen
  if (isOpen) {
    const height = getElementHeight(el);
    if (height === styles.height) {
      // just reset style overrides
      setStyles({});
    } else {
      // If the heights don't match, this could be due the height of the content changing mid-transition
      // If that's the case, re-trigger the animation to animate to the new height
      setStyles((oldStyles) => ({ ...oldStyles, height }));
    }
  }
};
```

At the end of the animation, we measure the element again, and compare the element's height to the height we animated to: `height === styles.height`. If they're not identical, we set the height to the element's current height, hoping to eventually reach a point where the element's dimensions stop fluctuating and settle.

When the collapse element does not have vertical padding applied, this solution works pretty well, and the animation will reliably settle. However, when vertical padding is applied, we get the bouncing accordion in the sandbox above, as the function compares over and over again the current element's height and the height it intended to animate to.

In the hours spent debugging this, I considered a number of variables. Was `scrollHeight` the incorrect way to be measuring height? Was `clientHeight` or `offsetHeight` more appropriate? (I concluded no, `scrollHeight` should in fact be accounting for the element's true dimensions, including padding.)

Did I need to explicitly account for padding in the measurement? One peculiarity I was finding was that at that moment in the transition lifecycle, `offsetHeight` produced the number closest to the actual height of the element, and `clientHeight` and `offsetHeight` were actually returning not the height of the element, but _just_ the padding! So maybe I needed to add the two together?

```javascript
const handleTransitionEnd = () => {
  if (isOpen) {
    const height = el.current.scrollHeight + el.current.clientHeight;
    if (height !== styles.height) {
      setStyles((oldStyles) => ({ ...oldStyles, height }));
    }
  }
};
```

This also never worked, and the infinite animation continued.

I then also considered that using the `onTransitionEnd` callback was flawed. While `onTransitionEnd` seemed like the perfect lifecycle hook for detecting when the transition ended (surprise!), maybe it would be better to use a `setTimeout` given the duration of the animation. I tried refactoring useCollapse with `setTimeout`, and that just caused more compromises and challenges.

After hours and hours of fiddling with DOM measurement calculations, through refactors of the utility from component to hook, I'd just about given up. I'd added a "gotcha" section to the repo's documentation, and had added an error that would throw in runtime if the developer applied padding to the collapse element. I thought the fix didn't exist.

## `border-box`, to the rescue!

Later on, when I was rewriting demos for v3 of `useCollapse`, I came across a tiny style bug when using a `<div>` element for the collapse toggle button (to show it can still be accessible without a `<button>` element.) Lo and behold, making a `div` resemeble a `button` element is actually a little tricky, and I noticed a weird spacing issue, that when I set a fixed width on the toggle button, the `button` element complied, but the `div` did not! Aha, I said to myself: the issue was the element not having `box-sizing: border-box`. And, of course, it was, and the `div` element did then actually respect the width I had provided.

And then, a lightbulb went off!

![Andy for parks and rec looking excited](/images/andy.gif)

It was `box-sizing`! I quickly added `box-sizing: border-box` to the collapse element, and poof! the bug was gone!

How did a single line of CSS fix this JavaScript conundrum? Let's dive into why this change was significant.

## `content-box` vs `border-box`

First of all, what is [`box-sizing`](https://devdocs.io/css/box-sizing)? This property determines how the browser will calculate the total width and height of an element. The default value for `box-sizing` is `content-box`, which constrains the measurement to _only_ the element's content, not accounting for its `padding` or `border`. `border-box`, in contrast, _includes_ that `padding` and `border`.

Because it's a CSS property, you might assume that this only affects other CSS properties. But it actually changes how the browser will measure the element in JavaScript.

Let's take a look at how that manifests:

<iframe
     src="https://codesandbox.io/embed/measuring-height-border-box-1ymee?fontsize=14&hidenavigation=1&theme=dark"
     style="height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Measuring height, border-box"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Above, we measure the height of two elements in the same manner. Both have padding, and only one has the `box-sizing` value changed from `content-box` (the browser default) to `border-box`. When we measure the height of element with `content-box`, we get 100, which is the height we explicitly set on the element, and does not include the padding. The element with `border-box` yields 120, which is both the height we set on the element, and includes the padding (10 on the top and bottom: 100 + 10 + 10 = 120).

Going back to `useCollapse`, now when the transition ends and we calculate the height of the element, we're now actually measuring the true total height of the element and its content, so we get an accurate comparison, and the animation will finally end!

Here's `useCollapse` today with padding applied to the element:

<iframe
     src="https://codesandbox.io/embed/inspiring-poitras-fzc16?fontsize=14&hidenavigation=1&theme=dark"
     style="height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="inspiring-poitras-fzc16"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
     ></iframe>

You'll notice that something still doesn't look so hot with that animation...

<img src="/images/usecollapse-padding-glitch.gif" alt="collapse jankiness" />

This is a problem that I think has no solution. When an element has a fixed height of 0, but still has padding, that padding will still be visible, even with `overflow: hidden`.

<figure><img src="/images/usecollapse-height-padding.png" alt="Collapse element still has height if padding is applied to it" />
<figcaption>Padding artificially expands the element's height. `height: 0; overflow: hidden; padding: 20px`</figcaption>
</figure>

So when the collapse animation ends, we will get that flash.

But at least the animation will end!
