import { render } from '@testing-library/react';
import * as React from 'react';
import Fieldset from './fieldset';

const setup = () => {
    const fields = [
        {
            label: "label1",
            placeholder: "placeholder1"
        },
        {
            label: "label2",
            placeholder: "placeholder2"
        }
    ]
    const { container } = render(<Fieldset fields={fields} />);

    const fieldset = container.querySelector('fieldset') as HTMLFieldSetElement;
    const labels = fieldset.querySelectorAll('label');
    const textareas = fieldset.querySelectorAll('textarea');

    return {
        fieldset,
        labels,
        textareas
    }
}

describe('Homepage', () => {
    it('should render a label and textarea', () => {
        const { fieldset, labels, textareas } = setup();

        expect(fieldset).toBeInTheDocument();

        expect(labels).toHaveLength(2);
        expect(labels[0]).toHaveTextContent('label1');
        expect(labels[1]).toHaveTextContent('label2');
        
        expect(textareas).toHaveLength(2);
        expect(textareas[0]).toHaveProperty('placeholder','placeholder1');
        expect(textareas[1]).toHaveProperty('placeholder','placeholder2');
    });
})