import { TextArea } from "components";
import { kebabCase, map } from "lodash";
import * as React from 'react';

interface FieldSet {
    onChange: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
    fields: {
        label: string,
        placeholder: string
    }[];
    id: string;
    values: {
        [key: string]: string;
    };
}

function FieldSet({ id, fields, onChange, values, ...props }: FieldSet) {
    return (
            <section
                className={`${id} grid p-1 border-gray-200 dark:border-gray-700 border-2 rounded xyz-in`}
                style={{ gridTemplateRows: `repeat(${fields.length}, minmax(100px, 1fr))` }}
                {...props}
            >
                {map(fields, ({ label, placeholder }: TextArea, index) => (
                    <TextArea
                        key={label}
                        label={label}
                        placeholder={placeholder}
                        first={index === 0}
                        onChange={onChange}
                        value={values[kebabCase(label)]}
                    />
                ))}
            </section>
    )
}

export default FieldSet;
