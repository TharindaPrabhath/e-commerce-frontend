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

// config
import axios from "../../config/axios"
import { blue } from "@mui/material/colors"

function Products() {
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
              <IconButton>
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
        <SearchBar />
        <Stack direction="row" alignItems="center" gap={theme.spacing(1)}>
          <Button variant="contained">New Product</Button>
          <Button variant="outlined">
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
            id: i,
            sku: p.sku,
            name: p.name,
            image: p.images[0],
            price: p.price,
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
          // onCellClick={(e) => {
          //   const event = findEvent(e.rowNode.id as string);
          //   setSelectedEvent({
          //     ...event,
          //     type: mapEventType(event?.type, "server-client"),
          //   });
          // }}
          sx={{ marginTop: theme.spacing(4) }}
        />
      </Box>
    </Page>
  )
}

Products.layout = AppLayout

export default Products
