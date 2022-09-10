// react
import React from "react"

// formik
import { FieldProps, getIn } from "formik"

// mui
import MuiTextField from "@mui/material/TextField"

const TextField: React.FC<
  FieldProps & {
    textArea?: boolean
    required?: boolean
    type?: string
    sx?: any
  }
> = ({ field, form, textArea, required, type, sx, ...props }) => {
  const error = getIn(form.touched, field.name) && getIn(form.errors, field.name)

  return (
    <MuiTextField
      variant="outlined"
      color="primary"
      type={!type ? "text" : type}
      required={required}
      error={!!error}
      helperText={error}
      multiline={textArea}
      rows={textArea ? 5 : 1}
      sx={sx}
      {...field}
      {...props}
    />
  )
}

export default TextField
