// react
import React from "react";

// mui
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// formik
import { FieldProps, getIn } from "formik";

const CheckBox: React.FC<FieldProps & { label: string; sx: any }> = ({
  field,
  form,
  label,
  sx,
  ...props
}) => {
  const error =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormControlLabel
      control={<Checkbox size="small" {...field} {...props} sx={sx} />}
      label={label}
    />
  );
};

export default CheckBox;
