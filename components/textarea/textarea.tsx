import * as React from 'react';
import { kebabCase } from 'lodash';

interface TextArea {
    label: string;
    placeholder: string;
}

function TextArea({ label, placeholder }: TextArea) {

    const name = kebabCase(label);

    return (
        <>
            <label
                htmlFor={name}>{label}</label>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder} />
        </>
    )
}

export default TextArea;
