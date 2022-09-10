// react
import { useEffect, useRef, useState } from "react"

// next
import { useRouter } from "next/router"

// mui
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"

// mui icons
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

// layout
import AppLayout from "../../../layouts"

// components
import Page from "../../../components/Page"
import TextField from "../../../components/form/TextField"
import ImageView from "../../../components/ImageView"

// config
import axios from "../../../config/axios"

// formik
import { Field, Form, Formik, FormikHelpers } from "formik"

// yup
import { number, object, string } from "yup"
import { toast } from "react-toastify"
import DeletePopup from "../../../components/DeletePopup"

const validationSchema = object({
  sku: string().required("Required"),
  name: string().required("Required"),
  description: string().optional(),
  quantity: number().required("Required"),
  price: number().required("Required"),
})

function EditProduct() {
  const theme = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [product, setProduct] = useState<any>()
  const [imageId, setImageId] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [uploading, setUploading] = useState(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)

  const initialValues = {
    sku: product?.sku ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    quantity: product?.quantity ?? 0,
  }

  useEffect(() => {
    if (router.query?.productId) {
      fetchProduct(router.query.productId as string)
    }
  }, [router.pathname])

  useEffect(() => {
    setImages(product?.images)
  }, [product])

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true)
      const res = await axios.get(`/products/${productId}`)
      setProduct(res.data)
    } catch (err) {
      console.error(err)
      toast.error("An error occurred. Please try again later")
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = async (values: typeof initialValues, actions: FormikHelpers<typeof initialValues>) => {
    try {
      setLoading(true)
      if (images.length === 0) {
        toast.error("At least one product image should be provided")
        return
      }
      const body = {
        _id: product?._id,
        sku: values.sku,
        name: values.name,
        price: values.price,
        quantity: values.quantity,
        description: values.description,
        images: images,
      }
      await axios.patch("/products", body)
      actions.resetForm()
      router.push("/products")
      toast.success("Successfully added the product")
    } catch (err) {
      console.error(err)
      toast.error("An error occurred. Please try again later")
    } finally {
      setLoading(false)
    }
  }

  const handleFileChoose = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.currentTarget.files
      if (files === null || files?.length === 0) return

      setUploading(true)
      const data = new FormData()
      let file: File
      let fileName: string
      for (let i = 0; i < files.length; i++) {
        file = files[i]
        fileName = file?.name
        data.append("image", file, fileName || "image")
      }

      const res = await axios.post("/images/upload", data)
      const imagePaths = res.data?.map((obj: any) => obj?.path)
      setImages((images) => [...images, ...imagePaths])
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleImageDelete = async () => {
    try {
      const currentImages = images
      setImages(currentImages.filter((img) => img === imageId))
      await axios.delete(`/images/${imageId.replace("http://localhost:5000/", "")}`)
      toast.success("Successfully deleted the image")
    } catch (err) {
      console.error(err)
      toast.error("An error occurred. Please try again later")
    }
  }

  return (
    <Page title="Products">
      <Typography
        variant="h5"
        fontWeight={theme.typography.fontWeightBold}
        letterSpacing={theme.spacing(0.25)}
        sx={{ display: "flex", alignItems: "center" }}
        gutterBottom
      >
        PRODUCTS{" "}
        <span style={{ display: "flex", alignItems: "center" }}>
          <KeyboardArrowRightIcon htmlColor={theme.palette.primary.main} />
          <Typography fontWeight={theme.typography.fontWeightBold} color={theme.palette.primary.main}>
            Edit product
          </Typography>
        </span>
      </Typography>
      <Box marginTop={theme.spacing(4)}>
        {product?._id && (
          <Formik initialValues={product} validationSchema={validationSchema} onSubmit={handleEditProduct}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(2) }}>
                  <Field name="sku" label="SKU" component={TextField} required={true} />
                  <Field name="name" label="Name" component={TextField} required={true} />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(2) }}>
                  <Field name="price" label="Price" component={TextField} required={true} />
                  <Field name="quantity" label="Quantity" component={TextField} required={true} />
                </Grid>
              </Grid>

              <Stack marginTop={theme.spacing(2)}>
                <Typography variant="caption">A small description about the product</Typography>
                <Field name="description" component={TextField} label="Product Description" textArea={true} />
              </Stack>
              <Stack marginTop={theme.spacing(2)}>
                <Stack direction="row" alignItems="center" gap={theme.spacing(4)}>
                  <Typography variant="subtitle1">Product Images</Typography>
                  <Button onClick={() => fileRef?.current?.click()}>Add Images</Button>
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                </Typography>
                <input ref={fileRef} type="file" style={{ display: "none" }} onChange={handleFileChoose} multiple />
                <Stack direction="row" gap={theme.spacing(2)} flexWrap="wrap" marginTop={theme.spacing(2)}>
                  {images?.map((image: string, i: number) => {
                    return (
                      <ImageView
                        key={i}
                        src={"http://localhost:5000/" + image}
                        onDelete={(src) => {
                          setOpenDeleteConfirm(true)
                          setImageId(src)
                        }}
                      />
                    )
                  })}
                </Stack>
              </Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size="1rem" color="secondary" /> : null}
                disabled={loading}
                sx={{ marginTop: theme.spacing(2) }}
              >
                {loading ? "Saving" : "Save changes"}
              </Button>
            </Form>
          </Formik>
        )}
      </Box>
      {openDeleteConfirm && (
        <DeletePopup
          open={openDeleteConfirm}
          onCancel={() => setOpenDeleteConfirm(false)}
          onDelete={() => {
            handleImageDelete()
            setOpenDeleteConfirm(false)
          }}
        />
      )}
    </Page>
  )
}

EditProduct.layout = AppLayout

export default EditProduct
