import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import LazyImageComponent from "./LazyImageComponent";

const Global = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-align: center;
  }
`;

const Grid = styled.div`
  display: grid;
  padding: 16px;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

function LazyComponent() {
  return (
    <div className="App">
      <Global />
      <h1>Random Images</h1>
      <Grid>
        {[...Array(50).keys()].map(i => (
          <LazyImageComponent
            key={i}
            src={`https://picsum.photos/1000/1000?random=${i}`}
            alt={`Random image ${i}`}
          />
        ))}
      </Grid>
    </div>
  );
}

export default LazyComponent;