import React from "react";
import { render } from '@testing-library/react';
import Home from "../../pages/Home";

describe('<Home/>', () => {
    test('Obteniendo el objeto Home', () => {
        const object = render( <Home /> );
        expect(object).toMatchObject(object);
    });
});