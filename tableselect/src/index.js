
import React from 'react';
import { render } from 'react-dom';
import Demo from './EnhancedTable';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<Demo />, rootElement);
}
