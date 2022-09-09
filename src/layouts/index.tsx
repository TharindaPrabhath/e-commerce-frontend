// react
import { ReactNode, useState } from "react"

// mui
import { styled } from "@mui/material/styles"

// components
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

function AppLayout({ children }: { children: ReactNode }) {
  const [shrinkSidebar, setShrinkSidebar] = useState(false)
  const RootStyle = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
  })

  const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: 65,
    [theme.breakpoints.up("md")]: {
      marginLeft: shrinkSidebar ? "6em" : "18em",
    },
  }))

  return (
    <RootStyle>
      <Header shrinkSidebar={shrinkSidebar} />
      <Sidebar shrink={shrinkSidebar} onShrink={() => setShrinkSidebar(!shrinkSidebar)} />
      <MainStyle>
        {children}
        <Footer />
      </MainStyle>
    </RootStyle>
  )
}

export default AppLayout
