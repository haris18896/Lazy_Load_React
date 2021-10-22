import React, { Suspense } from 'react';
import './App.css';


const lazyLoadComponent = React.lazy(() => import('./components/LazyLoad/LazyLoad.jsx'))

function App() {
  return (
    <div className="app">
        <Suspense fallback={<div>Loading...</div>}>
          <lazyLoadComponent />
        </Suspense>
    </div>
  );
}

export default App;
