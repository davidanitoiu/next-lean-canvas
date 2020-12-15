import { render } from '@testing-library/react';
import * as React from 'react';
import TextArea from './textarea';

const setup = () => {
    const { container } = render(<TextArea label="label" placeholder="placeholder" />);

    const label = container.querySelector('label');
    const textarea = container.querySelector('textarea');

    return {
        label,
        textarea
    }
}

describe('Homepage', () => {
    it('should render a label and textarea', () => {
        const { label, textarea } = setup();

        expect(label).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();
    });
})