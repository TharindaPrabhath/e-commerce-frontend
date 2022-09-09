import React from "react"

// next
import Head from "next/head"

// mui
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"

interface PageProps {
  children: React.ReactNode
  title: string
}

function Page({ children, title }: PageProps) {
  const theme = useTheme()

  return (
    <Box sx={{ padding: theme.spacing(4, 2), minHeight: "100vh" }}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </Box>
  )
}

export default Page
