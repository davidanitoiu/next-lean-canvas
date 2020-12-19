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
                name={name}
                placeholder={placeholder}
                defaultValue=""
            />
        </>
    )
}

export default TextArea;
