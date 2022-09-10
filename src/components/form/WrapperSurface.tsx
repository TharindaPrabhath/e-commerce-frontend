// react
import { ReactNode } from "react";

// mui
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

function WrapperSurface({ children, sx }: { children: ReactNode; sx?: any }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
      }}
    >
      {children}
    </Box>
  );
}

export default WrapperSurface;
