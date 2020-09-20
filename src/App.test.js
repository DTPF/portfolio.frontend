import React from 'react';
import ReactDOM from "react-dom";
import { render } from '@testing-library/react';
import App from './App';
import Home from './pages/Home';
import MainTitle from "./components/Web/MainTitle";

// test('mi name in footer layout basic', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/David Thomas Pizarro Frick/);
//   expect(linkElement).toBeInTheDocument();
// });
describe('Contenedor', () => {
  it('ejemplo', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('home', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('title_home', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MainTitle />, div);
    ReactDOM.unmountComponentAtNode(div);
    console.log(div);
  });
});

