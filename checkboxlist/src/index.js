
import React from 'react';
import { render } from 'react-dom';
//import Demo from './CheckboxList';
import Demo from './CheckboxList-gh';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<Demo />, rootElement);
}
