# Lazy Loading Images.


native lazy loading is only supported in Chromium-based browsers and Firefox. so for wider browsers support, we’re going to do lazy loading using `react-lazyload`, and `styled-components` for styling.

```
npm install --save react-lazyload styled-components
npm i react-lazy-load-image-component
```

## `1. Create LazyImage component`
We’ll use this component when we want to lazy-load images.

The `LazyImage` component contains `ImageWrapper, Placeholder, LazyLoad, and StyledImage`. Anything inside `LazyLoad` would not load until it appears on the `viewport`, that’s why we put `StyledImage` inside it.

`Placeholder` is just an empty div with animation to indicate the image is still loading. When the image finally loaded then we call `removePlaceholder` to remove Placeholder from the DOM. I use `refs` to do that instead of updating the state to prevent unnecessary re-rendering. 

You can create `shimmer` or put `spinner` inside the `Placeholder`, but I just made it simple here with `animated background`. Set the `Placeholder` size the same as the image size so the transition will be smoother. 

You might wanna use react-lazyload placeholder prop to put Placeholder like this:

```jsx
<LazyLoad placeholder={<Placeholder />}>
  ...
</LazyLoad>
```
But when I tried that, the Placeholder would instantly disappear when it reaches the viewport as I scroll the page even though the image is still not fully loaded, hence I put it outside and manage it with onLoad and onError events.


```jsx
// src/components/LazyImages/LazyImageComponent.jsx
import React, { useRef } from 'react';
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";


const LazyImageComponent = ({ src, alt }) => {

    const refPlaceholder = useRef();

    const removePlaceholder = () => {
        refPlaceholder.current.remove();
    }

    return (
        <ImageWrapper>
            <PlaceHolder
            ref={refPlaceholder}
            >
                <LazyLoad>
                    <StyledImages
                        onLoad={removePlaceholder}
                        onError={removePlaceholder}
                        src={src}
                        alt={alt}
                     />
                </LazyLoad>
            </PlaceHolder>
        </ImageWrapper>
    );
};

LazyImageComponent.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

export default LazyImageComponent;



const ImageWrapper = styled.div `
    position: relative;
    width: 100%;
    height: 50vw;
`
const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
`;

const PlaceHolder = styled.div `
position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    animation: ${loadingAnimation} 1s infinite;
`

const StyledImages = styled.img `
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`
```

```jsx
// src/components/LazyImages/LazyComponent.jsx
import React from 'react';
import styled, { createGlobalStyle} from "styled-components";
import LazyImageComponent from './LazyImageComponent';

function LazyComponent() {
    return (
        <div>
            <Global />
            <h1>Lazy Loaded Images</h1>
            <Grid>
                {[...Array(50).keys()].map(i => (
                    <LazyImageComponent
                    key={i}
                    src={`https://picsum.photos/1000/1000?random=${i}`}
                    alt={`Random Image ${i}`} />
                ))}
            </Grid>
        </div>
    )
}

export default LazyComponent;

const Global = createGlobalStyle `
    body{
        margin: 0;
        padding: 0;
        box-boxSizing: border-box;
        test-align: center;
    }
`;

const Grid = styled.div `
    display: grid;
    padding: 16px;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
`
```