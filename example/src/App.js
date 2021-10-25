import logo from './logo.svg';
import './App.css';
import GallerySlider from '@judsirera/slider-gallery';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <GallerySlider images={Array.from(Array(5), () => 'https://via.placeholder.com/300x200')} />
      </header>
    </div>
  );
}

export default App;
