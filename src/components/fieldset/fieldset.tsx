import * as React from 'react';
import { TextArea } from "components";
import { map } from "lodash";

interface FieldSet {
    fields: TextArea[];
    id?: string;
}

function FieldSet({ fields, ...props }: FieldSet) {

    return (
        <fieldset {...props} className={"grid p-1 border-gray-200 border-2"} style={{ gridTemplateRows: `repeat(${fields.length}, minmax(100px, 1fr))`}}>
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
