import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Gallery } from './features/gallery/Gallery';
import { AddToGallery } from './features/gallery/AddToGallery';
import { Parent } from './features/gallery/Parent';

function App() {
  return (
    <div >
        {/* <Counter /> */}
       {/* <Parent/> */}
       <Gallery/>
       {/* <AddToGallery /> */}
    </div>
  );
}

export default App;
