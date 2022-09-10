// react
import { useEffect, useState } from "react"

// next
import Image from "next/image"
import { useRouter } from "next/router"

// mui
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Box from "@mui/material/Box"
import { blue } from "@mui/material/colors"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useTheme } from "@mui/material/styles"

// mui icons
import StarOutlinedIcon from "@mui/icons-material/StarOutlined"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

// layout
import AppLayout from "../../layouts"

// components
import Page from "../../components/Page"
import SearchBar from "../../components/SearchBar"
import DeletePopup from "../../components/DeletePopup"

// config
import axios from "../../config/axios"

function Favorites() {
  const theme = useTheme()
  const router = useRouter()

  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [pageNo, setPageNo] = useState(0)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [selectedProductId, setSelectedProductId] = useState("")
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const columns: GridColDef[] = [
    {
      field: "sku",
      headerName: "SKU",
      width: 100,
      editable: false,
      headerClassName: "header",
    },
    {
      field: "image",
      headerName: "Image",
      width: 180,
      editable: false,
      headerClassName: "header",
      renderCell: (params) => {
        return <Image src={params.row.image} alt="product image" width={160} height={160} objectFit="contain" />
      },
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 250,
      editable: false,
      headerClassName: "header",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      editable: false,
      headerClassName: "header",
    },
    {
      field: "actions",
      headerName: "",
      type: "actions",
      width: 200,
      editable: false,
      headerClassName: "header",
      renderCell: (params) => {
        return (
          <Stack direction="row" gap={1}>
            <Tooltip title="Delete">
              <IconButton onClick={() => setOpenDeleteConfirm(true)}>
                <DeleteIcon color="primary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
              <IconButton>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Favorite">
              <IconButton>
                <StarOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      },
    },
  ]

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/products")
      setProducts(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`/products/${selectedProductId}`)
    } catch (err) {
      console.error(err)
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
        FAVOURITE PRODUCTS
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

      <Box
        sx={{
          "& .header": {
            color: blue[900],
          },
        }}
      >
        <DataGrid
          rows={products.map((p, i) => ({
            id: p._id,
            sku: p.sku,
            name: p.name,
            image: "http://localhost:5000/" + p.images[0],
            price: "$" + p.price,
            quantity: p.quantity,
          }))}
          columns={columns}
          loading={loading}
          pagination
          paginationMode="server"
          page={pageNo - 1}
          pageSize={itemsPerPage}
          rowCount={products.length}
          onPageChange={(n) => setPageNo(n + 1)}
          onPageSizeChange={(n) => setItemsPerPage(n)}
          rowsPerPageOptions={[5, 20, 50]}
          disableSelectionOnClick
          rowHeight={150}
          autoHeight
          onCellClick={(e) => {
            setSelectedProductId(e.rowNode.id as string)
          }}
          sx={{ marginTop: theme.spacing(4), border: "none !important" }}
        />
      </Box>
      {openDeleteConfirm && (
        <DeletePopup
          open={openDeleteConfirm}
          onDelete={() => {
            handleDeleteProduct()
            setOpenDeleteConfirm(false)
          }}
          onCancel={() => {
            setOpenDeleteConfirm(false)
          }}
        />
      )}
    </Page>
  )
}

Favorites.layout = AppLayout

export default Favorites
