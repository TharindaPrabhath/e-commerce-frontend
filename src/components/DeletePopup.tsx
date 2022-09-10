// next
import Image from "next/image"

// mui
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"

// icons
import CloseIcon from "@mui/icons-material/Close"
import AlertIcon from "../../public/alert.svg"

interface Props {
  open: boolean
  onDelete: () => void
  onCancel: () => void
}

function DeletePopup({ open, onCancel, onDelete }: Props) {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <IconButton
          aria-label="close"
          onClick={onCancel}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          marginTop: theme.spacing(1),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: theme.spacing(1),
          padding: theme.spacing(4),
        }}
      >
        <Image src={AlertIcon} alt="Exclamation mark" width={40} height={40} objectFit="contain" />
        <Typography textAlign="center" variant="h5" fontWeight={theme.typography.fontWeightBold} gutterBottom>
          ARE YOU SURE?
        </Typography>
        <Typography id="alert-dialog-description" textAlign="center">
          You will not be able to undo this action if you proceed!
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: theme.spacing(1),
          padding: theme.spacing(2, 0, 4, 0),
        }}
      >
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeletePopup
