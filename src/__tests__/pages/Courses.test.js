import React from "react";
import { render } from '@testing-library/react';
import Courses from "../../pages/Courses";

describe('<Courses/>', () => {
    test('Obteniendo el objeto Courses', () => {
        const object = render( <Courses /> );
        expect(object).toMatchObject(object);
    });
});