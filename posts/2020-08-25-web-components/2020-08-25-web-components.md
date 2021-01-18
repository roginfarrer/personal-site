---
title: Web Components and React Components - A Comparison
slug: web-components-and-react-compared
date: '2020-08-25'
---

When I first started working with React, Web Components weren't a serious contender in the design systems space. But I can't help but notice more and more systems built with them, like [Duet](https://www.duetds.com) and [Carbon Web Components](https://github.com/carbon-design-system/carbon-web-components), to name a couple.

At Wayfair, I work on our design system's React component library, which is great since most teams are working with React! However, many teams we support also manage legacy applications that are not written in React, and unfortunately, we can't do much to support them. However, I've recently begun thinking about Web Components, considering that they could be used in virtually any web appliaction, and could be a better format for our components in terms of supporting most, if not all, teams. Not having much experience with it, I decided to dig into understanding how Web Components work and how to build them.

Like I usually do, I looked at the source code for Web Component driven libraries like the two mentioned above, and I was surprised that **literally none of them were built on the native API directly.** They all used compile-time libraries like [StencilJS][stencil] to smooth over the developer experience.

So what's so bad about the the Web Component API? I decided to find out. I started by just building a few really simple web components to understand how they work and their limitations. Let's go over how they compare to building a component with React!

If you just want to see some code, [here's a repo I used as a playground for web components.](https://github.com/roginfarrer/web-component-playground)

## Web Components or Custom Elements?

I think these two terms are often confused, but they're actually different things. Web components are custom elements, but custom elements aren't necessarily web components.

According to MDN, custom elements are:

> "A set of JavaScript APIs that allow you to define custom elements and their behaviour, which can then be used as desired in your user interface."[^1]

Here's what helped me wrap my head around what "custom" really means: you are literally creating a brand new element and API for the DOM. That means you are responsible for defining what the element's valid attributes are, and when they change, what happens, when callbacks are exposed, etc. You can leverage built-in elements, but you are still responsible for connecting the two together manually. I'll go into further detail below, but you can maybe start to see why this API can be tedious (compared to React).

**Web Components**, on the other hand, use the custom elements API, but also include two other web technologies: the [_Shadow DOM_](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), which basically keeps the custom markup hidden from the rest of the document, like an `iframe`. and [_HTML Templates_](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template), markup that is added to the DOM without rendering anything, but can be leveraged to bootstrap the markup for a custom element.

The real meat-and-potatoes of Web Components are custom elements, so I'll mostly dig into that here, and touch on the others.

## React and Web Components: Compared

First of all, building web components is extremely similar to working with React class components—surprisingly so. In case you haven't looked at a React class component in a while, here's a refresher:

```javascript
class Foo extends Component {
  // declare prop API
  static propTypes = {};
  static defaultProps = {};

  constructor() {
    super();

    this.state = {
      // Collection of mutable values
    };
  }

  componentDidMount() {
    // When component first renders
  }

  componentDidUpdate(prevProps, prevState) {
    // When component re-renders
  }

  componentWillUnmount() {
    // When component will unmount
  }

  render() {
    // Return the markup
    return <div />;
  }
}

React.render(<Foo />, document.querySelector('#app'));
```

And here's the basic outline of a Web Component. Spot the 5 differences! 😂

```javascript
class Foo extends HTMLElement {
  static get observedAttributes() {
    // Declare the attributes that should be monitored
    // and trigger the attributeChangedCallback below
    return [];
  }

  constructor() {
    super();

    // element functionality and set-up
  }

  connectedCallback() {
    // When element initially renders
  }

  disconnectedCallback() {
    // When element unmounts
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    // side effects when attributes change
  }
}

window.customElements.define('foo-component', Foo);

// Can now be used directly in HTML, e.g.,
// <div>
//   <foo-component></foo-component>
// </div>
```

Wait, how do we keep track of internal mutable values? Where do we render the markup?? Let's dig into the web component line-by-line, and discuss what's going on.

### HTMLElement

```javascript
class Foo extends HTMLElement {}
```

A Web Component (or custom element) starts by declaring a new class that extends `HTMLElement`, a global object in the browser that you can think of as a primitive for all other HTML elements. You can actually extend real HTML elements to inherit their qualities (like `HTMLParagraphElement`), but that's for another time!

### observedAttributes

```javascript
static get observedAttributes() {
  return [''];
}
```

We're already getting a taste of getters and setters! Similar to `propTypes`, in this field we define what HTML attributes our component should react to in changes. For example, if we say our component has a `type` attribute that could change after the component is rendered:

```html
<foo-component type="bar"></foo-component>
```

...we should define `'type'` in this array. We'll discuss how to react to this change in `changedAttributesCallback`.

### connectedCallback & disconnectedCallback

```javascript
connectedCallback() { }

disconnectedCallback() { }
```

These two methods draw the clearest comparison to React classes' lifecycle methods. They will most often be used for handling event listeners, fetching data, clean-up, etc.

### attributeChangedCallback

```javascript
attributeChangedCallback(attributeName, oldValue, newValue) { }
```

When one of the attributes that was declared in `observedAttributes` changes, this callback will fire with the name of that attribute and its new and old values. Pretty similar to `componentDidUpdate`! Usually this callback is used to trigger side-effects, like properties or element attributes of our component changes in reaction to attributes on the custom element changing.

For example, if our aforementioned example of `type` changed, we could use it to update the `type` attribute on a `<button>` element the Web Component rendered:

```javascript
attributeChangedCallback(attributeName, oldValue, newValue) {
  if (attributeName === 'type') {
    this.querySelector('button').setAttribute('type', newValue)
  }
}
```

### constructor

Whew, we've gone all this way without discussing state or markup! Pretty much all of this happens in the class' constructor. Since this topic requires the most detail, let's dig into an example Web Component, where we can tie all of the API together.

## Simple Button Component API

Let's say we want to create a custom button component. It should expose its click event to the application, as well as the `type`, `disabled`, and its nested content should render within the button element. In React, this is pretty straightforward:

```javascript
class FooButton extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    type: 'button',
    disabled: false,
  };

  render() {
    return (
      <button
        className="FooButton"
        type={this.props.type}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
```

In this example, nothing crazy is going on, and we don't have to use any of the lifecycle methods outlined above. We more or less just pass down the props we want to expose on the `button` element.

As we'll see, this is not as straightforward with Web Components.

### Rendering the markup

Let's talk about how we render markup with Web Components, including the attributes. Here's the API we want to accommodate:

```html
<foo-button disabled type="button">Button text</foo-button>
```

First, let's render our `button` element, and make sure that when we render text within the component, that is rendered inside the `button`.

```javascript
class FooButton extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <button>
        <slot></slot>
      </button>
    `;
  }
}
```

The class `FooButton` is itself an element, so we can simply use `this.innerHTML` to set the markup. But what is `<slot></slot>`? The [`slot`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) element is A LOT like the special `children` prop in React. When we render a `slot` element within our custom element, whatever is rendered within the custom element will be presented where the `slot` is placed. The content of the slot element is what's rendered if nothing is rendered with the custom element.

You can use multiple `slot` elements by assigning them `name` attributes, and then the implementation can distinguish slots by using the `slot` attribute. For example, let's say we have a Card component with content and a title:

```javascript
class FooComponent extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <section>
      <header>
        <slot name="title">Default Header Text</slot>
      </header>
      <slot></slot>
    </section>
    `;
  }
}
```

We can distinguish what content goes where by using `slot` attributes.

```html
<foo-component>
  <p>This text will the card content.</p>
  <h3 slot="title">And this will be the title!</h3>
</foo-component>
```

### Supporting attributes

Up to this point, it looks like web components and React components have a lot of similarities. We can use `slot` elements in place of React's `children` API. Unlike React, we must explicitly support updating our component when attributes are added or changed, and this involves a better understanding of classes in JavaScript and DOM manipulation than you might be used to in React. For example, it's common to set attributes directly on an element:

```javascript
document.querySelector('button').disabled = true;
```

This would find the `<button>` element in the DOM, set its disabled property to true, and disable interaction with the element as we would expect. With custom elements, we must explicitly define `disabled` as an _accessor property_, meaning it can be both _read_ and _written_. With classes, we use "getters" and "setters". Let's expose these properties on our component:

```javascript
class FooButton extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <button>
        <slot></slot>
      </button>
    `;
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get type() {
    return this.getAttribute('type');
  }

  set disabled(disabled) {
    const isDisabled = Boolean(disabled);
    if (isDisabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  set type(type) {
    this.setAttribute('type', type);
  }
}
```

Whew, that's a lot! And this is just two attributes! We would need to define these getters and setters for every attribute that can be manipulated on the element. And we also just reached a big hitch—just because the custom element's attributes can be read and written, this doesn't mean that the `<button>` our component renders will inherit those attributes! We must explicitly update this element ourselves. We can do this by leveraging the `observedAttributes` and `changedAttributesCallback` methods. Here's how we might set that up, with the getters and setters omitted for readability:

```javascript
class FooButton extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'type'];
  }

  constructor() {
    super();

    this.innerHTML = `
      <button>
        <slot></slot>
      </button>
    `;

    this.button = this.querySelector('button');
  }

  changedAttributesCallback(name, oldValue, newValue) {
    // Apply the attributes of the custom element onto
    // our button element
    this.button[name] = this[name];

    // Apply any side effects that should occur
    // as a result of attributes changing
    if (this.disabled) {
      this.button.setAttribute('aria-disabled', 'true');
    } else {
      this.button.removeAttribute('aria-disabled');
    }
  }
}
```

In summary, in order to support attributes in a similar fashion to a React component with Web Components or custom elements, we must do the following:

1. Define setters and getters for each attribute that makes the properties readable and writable.
2. Monitor for their changes by defining them in `observedAttributes`.
3. Update the markup of our component via `changedAttributesCallback`.

Now our button Web Component supports custom attributes and can accept "children" to change its text content. Now it's time to expose its click callback!

### Exposing event callbacks

Let's say we want our FooButton component to have a 'click' event like a regular `<button>` element. For example:

```javascript
document
  .querySelector('foo-button')
  .addEventListener('click', () => alert('clicked!'));
```

In React, we could just expose the `onClick` prop on the button element within our component. Not so for Web Components!

Similar to regular attributes, we must handle exposing the click event on the component, and also wiring up the event to the `<button>` element it renders.

```javascript
class FooButton extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <button>
        <slot></slot>
      </button>
    `;

    this.button = this.querySelector('button');
  }

  connectedCallback() {
    this.button.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.onClick);
  }

  onChange = e => {
    // Prevent click event from bubbling to the custom element itself
    e.stopPropagation();
    // Define our custom event
    const event = new CustomEvent('click', {
      bubbles: true,
      composed: true,
    });
    // Fire the event!
    this.dispatchEvent(event);
  };
}
```

Woah, custom events! This was my biggest surprise when setting up a Web Component. In React, you can forward a function prop to an element's native event callback (e.g., `onClick`). With Web Components, you must define your own custom events in order to control how and when they're called. Since we want our custom event to be called when the `<button>` is clicked, we create and clean-up the event listener in `connectedCallback` and `disconnectedCallback`, respectively.

Note that this **does not** add support for applying a function to the `onclick` attribute of the custom element. That gets even weirder, and I'm not going to dive into that in this article.

## Step it up with the shadow DOM

We pretty much have everything in our Web Component working! But we can take it one step further with encapsulation, meaning that the component's markup is insulated by direct manipulation from the outside.

I mentioned earlier that Web Components technically also encompass the Shadow DOM, and that's one feature that React components don't offer out of the box. By rendering our markup in the Shadow DOM, it's a bit like rendering in an iframe: it's not accessible from the rest of the document, meaning everything our component renders is truly encapsulated (and the API is strictly on the custom element). Our FooButton component doesn't use the Shadow DOM yet, but we can change that with a few lines:

```javascript
class FooButton extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <button>
        <slot></slot>
      </button>
    `;
    this.button = shadowRoot.querySelector('button');
  }
}
```

Now when referencing the DOM of the web component, use `this.shadowRoot` instead of just `this`.

## The Final Component

Here it is in one code snippet, in all its glory!

```javascript
class FooButton extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `<button><slot></slot></button>`;
    this.button = shadowRoot.querySelector('button');
  }

  static get observedAttributes() {
    return ['type', 'disabled'];
  }

  connectedCallback() {
    this.button.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.onClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Forward any attribute changes to the button element
    this.button[name] = this[name];
  }

  get type() {
    return this.getAttribute('type');
  }

  set type(type) {
    this.setAttribute('type', type);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(disabled) {
    const isDisabled = Boolean(disabled);
    if (isDisabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  onClick = e => {
    e.stopPropagation();
    const event = new CustomEvent('click', {
      composed: true,
      bubbles: true,
    });
    this.dispatchEvent(event);
  };
}

customElements.define('foo-button', FooButton);
```

## My Takeaways

**I now understand a bit more how much React handles all of the render updates and event management.** I always _knew_ that React manages this stuff for me, but it's a fun good exercise to try and manage it yourself! Makes you appreciate it more. Web Components require a lot of boilerplate for reacting and updating the DOM when attributes change

**Web Components get you really familiar with ES6 Class syntax and the DOM.** I definitely had to get more acquainated with browser and newer JavaScript features than I had before, like classes (therefore getters/setters), the shadow DOM, and more.

## Smoothing out the DX with lit-html, lit-element, Haunted, Stencil, and more

It's now super plain to me why all of these libraries exist to smooth out the development experience of Web Components. The most easiest to recommend is [lit-html](https://github.com/Polymer/lit-html), which adds a React-like simplicity to rendering, updating when attributes change as they should. [lit-element](https://github.com/Polymer/lit-element) takes this a step further by providing a wrapped `HTMLElement` class to extend, integrating lit-html, managaing the updating of properties and attributes, rendering into the shadow DOM, and optimizing styles.

If you really want to get React-like, [Haunted](https://github.com/matthewp/haunted) is a full-feature implementation of React hooks into Web Components. No more classes! My mind is totally blown with this one.

```html
<html lang="en">
  <my-counter></my-counter>

  <script type="module">
    import {html} from 'https://unpkg.com/lit-html/lit-html.js';
    import {component, useState} from 'https://unpkg.com/haunted/haunted.js';

    function Counter() {
      const [count, setCount] = useState(0);

      return html`
        <div id="count">${count}</div>
        <button type="button" @click=${() => setCount(count + 1)}>
          Increment
        </button>
      `;
    }

    customElements.define('my-counter', component(Counter));
  </script>
</html>
```

And last but not least, likely the most popular toolkit, [Stencil][stencil] provides a whole toolchain for not only authoring the Web Components, but also for compiling outputs compatible with most popular JS frameworks, like React, Vue, and more.

## Reference and Web Component Learning Material

- [Web Components on MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [WebComponents.dev](https://webcomponents.dev/) — super neat web IDE with templates for more than a dozen Web Component libraries!
- [An Introduction to Web Components](https://css-tricks.com/an-introduction-to-web-components) from CSS Tricks.
- [Custom Elements That Work Anywhere](https://robdodson.me/interoperable-custom-elements/) by Rob Dodson
- [Custom Element Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices) from Google
- [Line-by-line breakdown of a basic custom element](https://developers.google.com/web/fundamentals/web-components/examples/howto-checkbox) from Google

[^1]: https://developer.mozilla.org/en-US/docs/Web/Web_Components

[stencil]: https://stenciljs.com
