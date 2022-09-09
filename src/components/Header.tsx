// react
import { useState } from "react"

// next
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

// mui
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import Popper from "@mui/material/Popper"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import List from "@mui/material/List"
import ListButton from "@mui/material/ListItemButton"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import { useTheme } from "@mui/material/styles"
import { green, grey, red, yellow } from "@mui/material/colors"

// icons
import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"

import { SidebarGroups } from "./Sidebar"
import { common } from "../data"

function Header({ shrinkSidebar }: { shrinkSidebar: boolean }) {
  const theme = useTheme()
  const [openSidebar, setOpenSidebar] = useState(false)
  const [avatarPopperAnchor, setAvatarPopperAnchor] = useState<null | HTMLElement>(null)

  const renderSidebar = SidebarGroups.map((group, index) => {
    return (
      <Box key={index}>
        {!group.title && (
          <Typography
            sx={{
              marginLeft: theme.spacing(2),
              fontWeight: theme.typography.fontWeightBold,
              fontSize: theme.typography.fontSize,
            }}
          >
            {group.title}
          </Typography>
        )}
        <List>
          {group.tabs.map((tab, index) => {
            return (
              <Link key={index} href={tab.to}>
                <a>
                  <ListButton
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: theme.spacing(2),
                      textAlign: "center",
                    }}
                  >
                    <tab.icon sx={{ margin: "0" }} />
                    <Typography>{tab.title}</Typography>
                  </ListButton>
                </a>
              </Link>
            )
          })}
        </List>
      </Box>
    )
  })

  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.primary.contrastText,
        color: theme.palette.secondary.main,
        height: 65,
        [theme.breakpoints.up("md")]: {
          width: `calc(100% - ${shrinkSidebar ? "6" : "18"}em)`,
        },
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: { xs: "flex", md: "none", lg: "none" },
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setOpenSidebar(true)}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="top"
            open={openSidebar}
            onClose={() => setOpenSidebar(false)}
            sx={{ [theme.breakpoints.up("md")]: { display: "none" } }}
          >
            <Button color="error" onClick={() => setOpenSidebar(false)}>
              <CloseIcon />
            </Button>
            {renderSidebar}
          </Drawer>

          <Image src={common.logo} alt="Logo favicon" width={30} height={30} objectFit="contain" />
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" gap={theme.spacing(2)}>
          <Button
            sx={{
              textAlign: "start",
              color: theme.palette.secondary.main,
              [theme.breakpoints.down("sm")]: { display: "none" },
            }}
            onClick={(e) => {
              setAvatarPopperAnchor(avatarPopperAnchor ? null : e.currentTarget)
            }}
          >
            <Avatar
              // src={user?.image}
              alt="profile avatar"
              sx={{
                width: 40,
                height: 40,
                marginRight: theme.spacing(1),
              }}
            />
            <Box>
              <Typography sx={{ fontWeight: theme.typography.fontWeightBold }}>Sample Name</Typography>
              <Typography
                color={grey[700]}
                sx={{
                  fontSize: theme.typography.subtitle2,
                }}
              >
                Admin
              </Typography>
            </Box>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
