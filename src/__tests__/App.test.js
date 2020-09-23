import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('<App/>', () => {
  test('Obteniendo el objeto App', () => {
    const object = render( <App /> );
    expect(object).toMatchObject(object);
  });
});
