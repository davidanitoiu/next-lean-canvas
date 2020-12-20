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
        <div className={`p-2 ${first ? "" : "mt-2"}`}>
            <label><strong>{label}</strong>
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={"resize-none w-full h-5/6 bg-gray-100 dark:bg-gray-700 rounded py-1 px-2 mt-2 placeholder-gray-700 dark:placeholder-gray-100"}
                />
            </label>
        </div>
    )
}

export default TextArea;
