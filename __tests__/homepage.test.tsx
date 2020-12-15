import { render } from '@testing-library/react';
import * as React from 'react';
import Homepage from '../pages/index';

const setup = () => {
    const { getByText, container } = render(<Homepage />);

    const header = getByText(/Welcome/);
    const grid = container.querySelector('#grid');
    const footer = container.querySelector('footer');;

    return {
        header,
        grid,
        footer
    }
}

describe('Homepage', () => {
    it('should render a title, a grid and a footer', () => {
        const { header, grid, footer } = setup();

        expect(header).toBeInTheDocument();
        expect(grid).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
    })
})