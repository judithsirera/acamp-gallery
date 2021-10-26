import React from 'react';

export const ArrowLeft = ({ width = 16, height = 16 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      xmlns='http://www.w3.org/2000/svg'
      style={{ transform: 'rotate(180deg)' }}>
      <path
        d='m6.5 5.5 3 3-3 3'
        stroke='#050709'
        fill='none'
        fill-rule='evenodd'
        stroke-linecap='round'
      />
    </svg>
  );
};

export const ArrowRight = ({ width = 16, height = 16 }) => {
  return (
    <svg width={width} height={height} viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='m6.5 5.5 3 3-3 3'
        stroke='#050709'
        fill='none'
        fill-rule='evenodd'
        stroke-linecap='round'
      />
    </svg>
  );
};
