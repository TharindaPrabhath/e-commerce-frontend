// mui
import { CacheProvider } from "@emotion/react"
import { ThemeProvider } from "@mui/material"

// theme
import theme from "../styles/theme"
import "../styles/globals.css"

// utils
import createEmotionCache from "../utils/createEmotionCache"
const clientSideEmotionCache = createEmotionCache()

// react-toastify
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function MyApp(props: any) {
  const {
    Component,
    pageProps: { session, ...pageProps },
    emotionCache = clientSideEmotionCache,
  } = props
  const Layout = Component.layout || (({ children }: any) => <>{children}</>)

  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer position="bottom-right" />
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}

export default MyApp
