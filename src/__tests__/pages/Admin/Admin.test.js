import React from "react";
import { render } from '@testing-library/react';
import Admin from "../../../pages/Admin";

describe('<Admin/>', () => {
    test('Obteniendo el objeto Admin', () => {
        const object = render( <Admin /> );
        expect(object).toMatchObject(object);
    });
});