import { kebabCase } from 'lodash';
import * as React from 'react';

interface TextArea {
    label: string;
    placeholder: string;
    onChange: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
    value: string;
    first?: boolean;
}

function TextArea({ label, placeholder, first, onChange, value }: TextArea) {

    const name = kebabCase(label);

    return (
        <div className={`grid grid-rows-textarea p-2 ${first ? "" : "mt-2"}`}>
            <label
                htmlFor={name}><strong>{label}</strong></label>
            <textarea
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={"resize-none w-full bg-gray-100 dark:bg-gray-700 rounded py-1 px-2 mt-2 placeholder-gray-700 dark:placeholder-gray-100"}
            />
        </div>
    )
}

export default TextArea;
