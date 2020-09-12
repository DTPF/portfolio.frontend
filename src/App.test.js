import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('mi name in footer layout basic', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/David Thomas Pizarro Frick/);
  expect(linkElement).toBeInTheDocument();
});

