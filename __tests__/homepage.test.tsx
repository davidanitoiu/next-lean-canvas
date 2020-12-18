import { render } from '@testing-library/react';
import * as React from 'react';
import Homepage from '../pages/index';

const setup = () => {
    const { container } = render(<Homepage />);

    const form = container.querySelector('form') as HTMLFormElement;

    return {
        form
    }
}

describe('Homepage', () => {
    it('should render a form', () => {
        const { form } = setup();

        expect(form).toBeInTheDocument();
    });

    it('should have 9 fieldsets', () => {
        const { form } = setup();

        const formDefaultValues = {
            "customer-segments": "",
            "early-adopters": "",
            "problem": "",
            "existing-alternatives": "",
            "revenue-streams": "",
            "solution": "",
            "unique-value-proposition": "",
            "high-level-concept": "",
            "channels": "",
            "key-metrics": "",
            "cost-structure": "",
            "unfair-advantage": ""
          }

        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        
        expect(formValues).toStrictEqual(formDefaultValues);
    })
})