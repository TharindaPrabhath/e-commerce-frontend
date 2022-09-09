// mui
import { CacheProvider } from "@emotion/react"
import { ThemeProvider } from "@mui/material"

// theme
import theme from "../styles/theme"
import "../styles/globals.css"

// utils
import createEmotionCache from "../utils/createEmotionCache"
const clientSideEmotionCache = createEmotionCache()

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
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}

export default MyApp
