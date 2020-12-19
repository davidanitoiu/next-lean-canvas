import { TextArea } from "components";
import { map } from "lodash";
import * as React from 'react';

interface FieldSet {
    fields: TextArea[];
    id: string;
}

function FieldSet({ id, fields, ...props }: FieldSet) {
    return (
        <fieldset
            id={id}
            className={`grid p-1 border-gray-200 dark:border-gray-700 border-2 rounded xyz-in`}
            style={{ gridTemplateRows: `repeat(${fields.length}, minmax(100px, 1fr))` }}
            {...props}
        >
            {map(fields, ({ label, placeholder }: TextArea, index) => (
                <TextArea
                    key={label}
                    label={label}
                    placeholder={placeholder}
                    first={index === 0}
                />
            ))}
        </fieldset>
    )
}

export default FieldSet;
