// All Styles
import styles from '../styles/styles.scss';
// import styles bundle
import 'swiper/css/bundle';
// Theme Provider
import { ThemeProvider } from 'next-themes';
// Api
import { placesUrl } from '../lib/apiURL';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp