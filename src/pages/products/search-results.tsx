// react
import { useEffect, useState } from "react"

// next
import { useRouter } from "next/router"

// mui
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import { grey } from "@mui/material/colors"
import { useTheme } from "@mui/material/styles"

// mui icons
import StarOutlinedIcon from "@mui/icons-material/StarOutlined"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

// layout
import AppLayout from "../../layouts"

// components
import Page from "../../components/Page"
import SearchBar from "../../components/SearchBar"

// config
import axios from "../../config/axios"

function SearchResults() {
  const theme = useTheme()
  const router = useRouter()

  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [selectedProductId, setSelectedProductId] = useState("")

  useEffect(() => {
    if (router.query.q) {
      setQuery(router.query.q as string)
      handleSearch(router.query.q as string)
    }
  }, [router.pathname])

  const handleSearch = async (query: string) => {
    try {
      setLoading(true)
      const res = await axios.get(`/products/search?q=${query}`)
      setProducts(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page title="Products">
      <Typography
        variant="h5"
        fontWeight={theme.typography.fontWeightBold}
        letterSpacing={theme.spacing(0.25)}
        gutterBottom
      >
        PRODUCTS
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={theme.spacing(16)}
        marginTop={theme.spacing(2)}
      >
        <SearchBar onSubmit={(query) => router.push(`/products/search-results?q=${query}`)} />
        <Stack direction="row" alignItems="center" gap={theme.spacing(1)}>
          <Button
            variant="contained"
            onClick={() => {
              router.push("/products/add-product")
            }}
          >
            New Product
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              router.push("/products/favorites")
            }}
          >
            <StarOutlinedIcon />
          </Button>
        </Stack>
      </Stack>

      <Box marginTop={theme.spacing(4)}>
        <Typography
          marginBottom={theme.spacing(4)}
          variant="h6"
          color={grey[500]}
        >{`${products.length} results found for "${query}"`}</Typography>
        <Box sx={{ maxWidth: 900, margin: "0 auto" }}>
          <Stack gap={theme.spacing(2)} sx={{ width: "100%", bgcolor: "background.paper" }}>
            {products.map((product, i) => {
              return (
                <Box key={i}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={theme.spacing(2)}
                  >
                    <Stack direction="column">
                      <Typography color="primary" variant="subtitle1" gutterBottom>
                        {product?.sku}
                      </Typography>
                      <Typography fontWeight={theme.typography.fontWeightBold} gutterBottom>
                        {product?.name}
                      </Typography>
                      <Typography color={grey[500]} variant="subtitle2">
                        {product?.description}
                      </Typography>
                    </Stack>
                    <IconButton color="primary" size="large">
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Stack>
                  <Divider variant="fullWidth" component="div" />
                </Box>
              )
            })}
          </Stack>
        </Box>
      </Box>
    </Page>
  )
}

SearchResults.layout = AppLayout

export default SearchResults
