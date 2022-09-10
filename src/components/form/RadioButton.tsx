// react
import React from "react";

// mui
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

// formik
import { FieldProps, getIn } from "formik";

const RadioButton: React.FC<
  FieldProps & { label: string; options: { value: string; label: string }[] }
> = ({ field, form, label, options, ...props }) => {
  const error =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormControl variant="outlined" error={!!error}>
      <InputLabel id="RadioButton">{label}</InputLabel>
      <RadioGroup row aria-labelledby="event-duration" {...field} {...props}>
        {options?.map((option, i) => {
          return (
            <FormControlLabel
              key={i}
              value={option.value}
              control={<Radio size="small" />}
              label={option.label}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default RadioButton;
