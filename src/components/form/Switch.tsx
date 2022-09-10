// react
import React from "react";

// mui
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiSwitch from "@mui/material/Switch";

// formik
import { FieldProps, getIn } from "formik";

const Switch: React.FC<
  FieldProps & {
    label: string;
    options: { value: string; label: string }[];
    labelPlacement: "start" | "end" | "top" | "bottom";
  }
> = ({ field, form, label, options, labelPlacement = "end", ...props }) => {
  const error =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormControlLabel
      control={<MuiSwitch color="primary" />}
      label={label}
      labelPlacement={labelPlacement}
      {...field}
      {...props}
    />
  );
};

export default Switch;
