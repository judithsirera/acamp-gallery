import './App.css';
import GallerySlider from '@judsirera/slider-gallery';
import { useState } from 'react';
import { getImage } from './utils';

const InputField = ({ label, ...inputProps }) => {
  return (
    <div className='input-field'>
      <label className='input-field-label'>{label}</label>
      <input min={0} {...inputProps} />
    </div>
  );
};

const DropdownField = ({ label, opts, selected, ...dropdownProps }) => {
  return (
    <div className='input-field'>
      <label className='input-field-label'>{label}</label>
      <select {...dropdownProps}>
        {opts.map((opt) => (
          <option value={opt} selected={selected === opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

const CONTAIN_OPTIONS = [
  GallerySlider.CONTAIN,
  GallerySlider.CONTAIN_ACTIVE_IMAGE,
  GallerySlider.CONTAIN_OFF
];

const App = () => {
  const [images, setImages] = useState(5);
  const [sideColumns, setSideColumns] = useState(2);
  const [columnGutter, setColumnGutter] = useState(20);
  const [columnWidth, setColumnWidth] = useState(75);
  const [height, setHeight] = useState(460);
  const [containImage, setContainImage] = useState(GallerySlider.CONTAIN_OFF);
  const [activeOnHover, setActiveOnHover] = useState(false);
  const [navigation, setNavigation] = useState(true);

  return (
    <div className='app'>
      <h1>Slider Gallery</h1>
      <h3>An interactive gallery</h3>
      <p>
        By{' '}
        <a href='http://judithsirera.com/' target='_blank' rel='noreferrer'>
          Judith Sirera
        </a>{' '}
        at{' '}
        <a href='https://acamp.com/' target='_blank' rel='noreferrer'>
          Acamp
        </a>
      </p>
      <GallerySlider
        images={Array.from(Array(images), (_, index) => getImage(index))}
        height={height}
        columnGutter={columnGutter}
        columnWidth={columnWidth}
        sideColumns={sideColumns}
        containImage={containImage}
        activeOnHover={activeOnHover}
        navigation={navigation}
        className='gallery-slider'
      />
      <div className='input-container'>
        <h3>Customize your gallery</h3>
        <InputField
          label='Number of images'
          type='number'
          value={images}
          min={1}
          onChange={(event) => setImages(parseInt(event.target.value))}
        />
        <InputField
          label='Side Columns'
          type='number'
          value={sideColumns}
          max={5}
          onChange={(event) => setSideColumns(parseInt(event.target.value))}
        />
        <InputField
          label='Column Gutter'
          type='number'
          step={5}
          value={columnGutter}
          onChange={(event) => setColumnGutter(parseInt(event.target.value))}
        />
        <InputField
          label='Column Width'
          type='number'
          value={columnWidth}
          step={5}
          onChange={(event) => setColumnWidth(parseInt(event.target.value))}
        />
        <InputField
          label='Height'
          type='number'
          value={height}
          step={20}
          onChange={(event) => setHeight(parseInt(event.target.value))}
        />
        <DropdownField
          label='Contain Image'
          opts={CONTAIN_OPTIONS}
          selected={containImage}
          onChange={(event) => {
            setContainImage(CONTAIN_OPTIONS[event.target.selectedIndex]);
          }}
        />
        <InputField
          label='Active on hover'
          type='checkbox'
          checked={activeOnHover}
          onChange={() => setActiveOnHover(!activeOnHover)}
        />
        <InputField
          label='Navigation'
          type='checkbox'
          checked={navigation}
          onChange={() => setNavigation(!navigation)}
        />
        {navigation && (
          <>
            <h4>Navigation parameters</h4>
            <InputField
              label='Show navigation when one image or less'
              type='checkbox'
              checked={navigation?.showWhenOneImageOrLess}
              onChange={() =>
                setNavigation({ showWhenOneImageOrLess: !navigation?.showWhenOneImageOrLess })
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
