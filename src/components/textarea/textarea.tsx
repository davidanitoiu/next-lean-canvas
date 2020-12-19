import * as React from 'react';
import { kebabCase } from 'lodash';

interface TextArea {
    label: string;
    placeholder: string;
    first?: boolean;
}

function TextArea({ label, placeholder, first }: TextArea) {

    const name = kebabCase(label);

    return (
        <div className={`grid grid-rows-textarea ${first ? "" : "mt-2"}`}>
            <label
                htmlFor={name}><strong>{label}</strong></label>
            <textarea
                name={name}
                placeholder={placeholder}
                defaultValue=""
                className={"resize-none w-full"}
            />
        </div>
    )
}

export default TextArea;
