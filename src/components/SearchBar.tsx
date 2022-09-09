// mui
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"
import { grey } from "@mui/material/colors"

// mui icons
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"

function SearchBar() {
  const theme = useTheme()

  return (
    <Stack direction="row" alignItems="center" sx={{ position: "relative", flex: 2 }}>
      <TextField
        placeholder="Search for products"
        fullWidth
        sx={{ borderRadius: "50px", backgroundColor: grey[100] }}
      />
      <Button
        variant="contained"
        startIcon={<SearchOutlinedIcon />}
        sx={{ position: "absolute", right: 10, borderRadius: "50px" }}
      >
        Search
      </Button>
    </Stack>
  )
}

export default SearchBar
