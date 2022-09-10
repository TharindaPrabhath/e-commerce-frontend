// mui
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import { grey } from "@mui/material/colors"

// mui icons
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"

// formik
import { Field, Form, Formik } from "formik"

// components
import TextField from "./form/TextField"

interface Props {
  onSubmit: (products: string) => void
}

function SearchBar({ onSubmit }: Props) {
  const handleSearch = async (values: any) => {
    if (!values.query) return
    onSubmit(values.query)
  }

  return (
    <Box sx={{ flex: 2 }}>
      <Formik initialValues={{ query: "" }} onSubmit={handleSearch}>
        <Form>
          <Stack direction="row" alignItems="center" sx={{ position: "relative" }}>
            <Field
              name="query"
              placeholder="Search for products"
              component={TextField}
              sx={{
                borderRadius: "50px",
                backgroundColor: grey[100],
              }}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchOutlinedIcon />}
              sx={{ position: "absolute", right: 10, borderRadius: "50px" }}
            >
              Search
            </Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  )
}

export default SearchBar
