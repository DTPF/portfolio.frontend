import React from "react";
import { render } from '@testing-library/react';
import Contact from "../../pages/Contact";

describe('<Contact/>', () => {
    test('Obteniendo el objeto Contact', () => {
        const object = render( <Contact /> );
        expect(object).toMatchObject(object);
    });
});