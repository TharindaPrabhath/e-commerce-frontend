// next
import Image from "next/image"

// mui
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"

import CloseIcon from "@mui/icons-material/Close"

interface ImageViewProps {
  src: string
  onDelete: (src: string) => void
}

function ImageView({ src, onDelete }: ImageViewProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        size="small"
        color="error"
        sx={{ position: "absolute", zIndex: 50, right: 5, top: 5 }}
        onClick={() => onDelete(src)}
      >
        <CloseIcon />
      </IconButton>
      <Image src={src} alt="Image" width={150} height={150} objectFit="contain" />
    </Box>
  )
}

export default ImageView
