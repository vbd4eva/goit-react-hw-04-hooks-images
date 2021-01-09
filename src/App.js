import { useState } from 'react';

import ImageGallery from './components/ImageGallery/ImageGallery'
import Searchbar from './components/Searchbar/Searchbar'

export default function App() {

  const [submitedSearchQuery, setSubmitedSearchQuery] = useState('');

  return (
    <>
      <div className="App">
        <Searchbar onSubmit={setSubmitedSearchQuery} />

           {
             submitedSearchQuery
             &&
             <ImageGallery searchQuery={submitedSearchQuery}/>
           }
      </div>
    </>
  );
}