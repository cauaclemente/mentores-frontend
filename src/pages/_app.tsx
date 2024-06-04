import '@/lib/dayjs'

import { Layout } from '@/components/organisms/Global/layout'
import { AuthProvider } from '@/context/Auth/AuthContext'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { theme } from '@/styles/theme'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { deleteCookie, getCookie } from 'cookies-next'

const excludeRoutes = ['/login', '/cadastro']

const App: FC<AppProps> = ({ Component, pageProps, router }) => {
  const shouldRenderLayout = !excludeRoutes.includes(router.pathname)

  if (getCookie('dont_remember')) {
    window.addEventListener('beforeunload', () => {
      deleteCookie('@mentores-soujunior-v1:token')
      deleteCookie('dont_remember')
    })
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Sou Junior | Mentoria Online</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              name="description"
              content="Portal oficial da Sou Junior para a comunicação entre mentores e profissionais que estejam ingressando na área de tecnologia"
            />
          </Head>

          {shouldRenderLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
          <GlobalStyle />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
