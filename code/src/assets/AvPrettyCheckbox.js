import React from 'react';
import { AvInput } from 'availity-reactstrap-validation';

function PrettyCheckbox ({ className, shape = 'default', color, children, valid, ...props }) {
  // className contains the validation classes
  // shape and color are custom props passed through, you can use them as you wish and add more to trigger more/different things.
  // children is handy for creating the label value.
  // valid is a boolean indicating if the input is currently valid or not.
  // props contains things like the event listeners (onChange, onBlur, etc) or other props, like the type. All of these need to go onto the raw <input> so the validation can tap into the value.
  return (
    <div className={`pretty ${className} p-${shape}`}>
      <input {...props} />
      <div className={`state${color ? ` p-${color}` : ''}`}>
        <label>{children}</label>
      </div>
    </div>
  );
}

export default function AvPrettyCheckbox (props) {
  return <AvInput {...props} tag={PrettyCheckbox} type="checkbox" />;
}
