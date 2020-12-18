import * as React from 'react';
import { TextArea } from "components";
import { map } from "lodash";

interface FieldSet {
    fields: TextArea[];
}

function FieldSet({ fields, ...props }: FieldSet) {

    return (
        <fieldset {...props}>
            {map(fields, ({ label, placeholder }: TextArea) => (
                <TextArea
                    key={label}
                    label={label}
                    placeholder={placeholder}
                />
            ))}
        </fieldset>
    )
}

export default FieldSet;
