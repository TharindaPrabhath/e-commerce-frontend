// react
import React from "react";

// mui
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";

// formik
import { FieldProps, getIn } from "formik";

const Select: React.FC<
  FieldProps & { label: string; options: string[]; onScroll?: (e: any) => void }
> = ({ field, form, label, options, onScroll, ...props }) => {
  const error =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormControl variant="outlined" error={!!error}>
      <InputLabel id="select">{label}</InputLabel>
      <MuiSelect
        labelId="select"
        color="primary"
        variant="outlined"
        label={label}
        fullWidth
        {...field}
        {...props}
        MenuProps={{
          PaperProps: {
            onScroll: onScroll,
            sx: {
              maxHeight: 300,
            },
          },
        }}
      >
        {options?.map((option, index) => {
          return (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </MuiSelect>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default Select;
