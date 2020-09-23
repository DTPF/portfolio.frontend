import React from "react";
import { render } from '@testing-library/react';
import Error404 from "../../pages/Error404";

describe('<Error404/>', () => {
    test('Obteniendo el objeto Error404', () => {
        const object = render( <Error404 /> );
        expect(object).toMatchObject(object);
    });
});