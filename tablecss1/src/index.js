
import React from 'react';
import { render } from 'react-dom';
import Demo from './custom-table';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<Demo />, rootElement);
}
