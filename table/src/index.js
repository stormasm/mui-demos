
import React from 'react';
import { render } from 'react-dom';
import Demo from './demo-github';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<Demo />, rootElement);
}
