import Page from "../components/Page"

// mui
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

// layout
import AppLayout from "../layouts"

const Home = () => {
  return (
    <Page title="Dashboard">
      <Typography>E-Commerce</Typography>
    </Page>
  )
}

Home.layout = AppLayout

export default Home
