// mui
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import dayjs from "dayjs";

function Footer() {
  const theme = useTheme();
  return (
    <Paper sx={{ textAlign: "center", padding: theme.spacing(2) }}>
      <Typography variant="subtitle2">
        {dayjs().year()} All Rights Reserved © Driflys
      </Typography>
    </Paper>
  );
}

export default Footer;
