import { AppProps } from 'next/app'
// import '../firebase-config'
import '../index.scss'
import css from './_app.module.scss'
import { Header } from '../components/Header'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={css.container}>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default App
