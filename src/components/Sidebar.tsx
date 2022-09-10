import { useState } from "react"

// next
import Image from "next/image"
import { useRouter } from "next/router"

// mui
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import Drawer from "@mui/material/Drawer"
import ListItemButton from "@mui/material/ListItemButton"
import Tooltip from "@mui/material/Tooltip"
import { useTheme } from "@mui/material/styles"
import { grey } from "@mui/material/colors"

// mui-icons
import SpeedIcon from "@mui/icons-material/Speed"
import MenuIcon from "@mui/icons-material/Menu"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import SellOutlinedIcon from "@mui/icons-material/SellOutlined"

import { common } from "../data"

export const SidebarGroups = [
  // {
  //   title: "",
  //   tabs: [
  //     {
  //       title: "Dashboard",
  //       icon: SpeedIcon,
  //       to: "/",
  //     },
  //   ],
  // },
  {
    title: "",
    tabs: [
      {
        title: "Products",
        icon: SellOutlinedIcon,
        to: "/products",
      },
      {
        title: "Favorites",
        icon: StarBorderIcon,
        to: "/products/favorites",
      },
    ],
  },
]

function Sidebar({ shrink, onShrink }: { shrink: boolean; onShrink: () => void }) {
  const theme = useTheme()
  const router = useRouter()

  const renderSidebarTabs = SidebarGroups.map((group, index) => {
    return (
      <Box key={index} sx={{ paddingTop: theme.spacing(4) }}>
        {!group.title && (
          <Typography
            textAlign={shrink ? "center" : "start"}
            sx={{
              marginLeft: shrink ? theme.spacing(0) : theme.spacing(2),
              fontWeight: theme.typography.fontWeightBold,
              fontSize: shrink ? theme.typography.fontSize * 0.7 : theme.typography.fontSize,
            }}
          >
            {group.title}
          </Typography>
        )}
        <List>
          {group.tabs.map((tab, index) => {
            return (
              <Tooltip key={index} title={tab.title}>
                <ListItemButton
                  sx={{
                    display: "flex",
                    flexDirection: shrink ? "column" : "row",
                    alignItems: "center",
                    gap: theme.spacing(2),
                    textAlign: "center",
                  }}
                  onClick={() => {
                    router.push(tab.to)
                  }}
                >
                  <tab.icon sx={{ margin: shrink ? "0 auto" : "0" }} />
                  {!shrink && <Typography>{tab.title}</Typography>}
                </ListItemButton>
              </Tooltip>
            )
          })}
        </List>
      </Box>
    )
  })

  return (
    <Drawer open variant="persistent" sx={{ [theme.breakpoints.down("md")]: { display: "none" } }}>
      <Box
        sx={{
          padding: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(3),
          width: shrink ? "6em" : "18em",
        }}
      >
        {/* brand */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {!shrink && <Image src={common.logo} alt="logo" width={100} height={50} objectFit="contain" />}
          <IconButton sx={{ margin: shrink ? "0 auto" : "0" }} onClick={onShrink}>
            <MenuIcon htmlColor={grey[200]} />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          {!shrink && (
            <>
              <Typography color={grey[200]} sx={{ fontWeight: theme.typography.fontWeightBold }}>
                Sample Name
              </Typography>
              <Typography
                color={grey[500]}
                sx={{
                  fontSize: theme.typography.subtitle2,
                }}
              >
                admin@ecommerce.com
              </Typography>
            </>
          )}
        </Box>

        <Avatar
          // src={user?.image}
          alt="profile avatar"
          sx={{
            width: 60,
            height: 60,
            margin: "0 auto",
            marginBottom: theme.spacing(-4),
            border: `4px solid ${grey[100]}`,
            zIndex: 1,
          }}
        />
      </Box>

      {renderSidebarTabs}
    </Drawer>
  )
}

export default Sidebar
