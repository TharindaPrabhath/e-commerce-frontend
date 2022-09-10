import Page from "../components/Page"

// mui
import Typography from "@mui/material/Typography"

// layout
import AppLayout from "../layouts"
import { GetServerSidePropsContext } from "next"

const Home = () => {
  return (
    <Page title="Dashboard">
      <Typography>E-Commerce</Typography>
    </Page>
  )
}

Home.layout = AppLayout

export default Home

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: "/products",
      permanent: false,
    },
  }
}
