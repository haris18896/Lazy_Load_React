# Lazy Load

## `React Lazy Load Image Component`
`https://www.npmjs.com/package/react-lazy-load-image-component`

```
npm i react-lazy-load-image-component
```
### `LazyLoadImage usage`
```jsx
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
 
const MyImage = ({ image }) => (
  <div>
    <LazyLoadImage
      alt={image.alt}
      height={image.height}
      src={image.src} // use normal <img> attributes as props
      width={image.width} />
    <span>{image.caption}</span>
  </div>
);
 
export default MyImage;
```
#### `LazyLoadImage effects`
`LazyLoadImage` includes several effects ready to be used, they are useful to add visual candy to your application, but are completely optional in case you don't need them or want to implement you own effect.
```jsx
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
 
const MyImage = ({ image }) => (
  <LazyLoadImage
    alt={image.alt}
    effect="blur"
    src={image.src} />
);
```
1. blur: renders a blurred image based on placeholderSrc and transitions to a non-blurred one when the image specified in the src is loaded.
2. black-and-white: renders a black and white image based on placeholderSrc and transitions to a colorful image when the image specified in the src is loaded.
3. opacity: renders a blank space and transitions to full opacity when the image is loaded.

## `LazyLoadComponent usage`
```jsx
import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { ArticleContent, ArticleComments } from 'my-app';
 
const Article = ({ articleId }) => (
  <div>
    <ArticleContent id={articleId} />
    <LazyLoadComponent>
      <ArticleComments id={articleId} />
    </LazyLoadComponent>
  </div>
);
 
export default Article;
```
#### `Using trackWindowScroll HOC to improve performance`
When you have many elements to lazy load in the same page, you might get poor performance because each one is listening to the scroll/resize events. In that case, it's better to wrap the deepest common parent of those components with a HOC to track those events `(trackWindowScroll)`.

For example, if we have an App which renders a Gallery, we would wrap the Gallery component with the HOC.

You must set the prop scrollPosition to the lazy load components. This way, they will know the scroll/resize events are tracked by a parent component and will not subscribe to them.

```jsx
import React from 'react';
import { LazyLoadImage, trackWindowScroll }
  from 'react-lazy-load-image-component';
 
const Gallery = ({ images, scrollPosition }) => (
  <div>
    {images.map((image) =>
      <LazyLoadImage
        key={image.key}
        alt={image.alt}
        height={image.height}
        // Make sure to pass down the scrollPosition,
        // this will be used by the component to know
        // whether it must track the scroll position or not
        scrollPosition={scrollPosition}
        src={image.src}
        width={image.width} />
    )}
  </div>
);
// Wrap Gallery with trackWindowScroll HOC so it receives
// a scrollPosition prop to pass down to the images
export default trackWindowScroll(Gallery);
```
#### `When to use visibleByDefault?`

The prop `visibleByDefault` makes the LazyLoadImage to behave like a normal <img>. Why is it useful, then?

Imagine you are going to lazy-load an image you have already loaded in the same page. In that case, there is no need to lazy-load it because it's already stored in the cache of the user's browser. You can directly display it.

```jsx
import React from 'react';
import { LazyLoadImage, trackWindowScroll }
  from 'react-lazy-load-image-component';
 
const Gallery = ({ images, scrollPosition }) => (
  <div>
    // We are loading landscape.jpg here
    <img src="/landscape.jpg" alt="Beautiful landscape" />
    {images.map((image) =>
      <LazyLoadImage
        key={image.key}
        alt={image.alt}
        scrollPosition={scrollPosition}
        src={image.src}
        // If the image we are creating here has the same src than before,
        // we can directly display it with no need to lazy-load.
        visibleByDefault={image.src === '/landscape.jpg'} />
    )}
  </div>
);
 
export default trackWindowScroll(Gallery);
```




---
---
# React Documentation.

### `Before`
```js
import logo from './logo.svg';
```
now we are going to use `React.lazy()` we can import our components using `React.lazy()` like below.
### `after`
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```
`React.lazy` takes a function that must call a dynamic `import()`. This must return a Promise which resolves to a module with a default export containing a React component.

The `lazy` component should then be rendered inside a `Suspense component`, which allows us to show some `fallback` content (such as a loading indicator) while we’re waiting for the lazy component to load.

```jsx
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
The `fallback prop` accepts any `React elements` that you want to `render` while waiting for the component to load. You can place the `Suspense` component anywhere above the `lazy component`. You can even wrap `multiple lazy components` with a single Suspense component.

```jsx
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

* `React.lazy()` is not working with `server-side rendering` for that we will have to use `loadable`

```jsx
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  )
}
```
---
---
## `Error boundaries`

If the other module fails to load (for example, due to network failure), it will trigger an error. You can handle these errors to show a nice user experience and manage recovery with Error Boundaries `https://reactjs.org/docs/error-boundaries.html`. Once you’ve created your Error Boundary, you can use it anywhere above your lazy components to display an error state when there’s a network error.

```jsx
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```
---
---

## `Route-based code splitting`
Deciding where in your app to introduce code splitting can be a bit tricky. You want to make sure you choose places that will split bundles evenly, but won’t disrupt the user experience.

A good place to start is with routes. Most people on the web are used to page transitions taking some amount of time to load. You also tend to be re-rendering the entire page at once so your users are unlikely to be interacting with other elements on the page at the same time.

Here’s an example of how to setup route-based code splitting into your app using libraries like `React Router` with `React.lazy`.

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```
---
---
## `Named Exports`

React.lazy currently only supports default exports. If the module you want to import uses named exports, you can create an intermediate module that reexports it as the default. This ensures that tree shaking keeps working and that you don’t pull in unused components.

```jsx
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
```
```jsx
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```





