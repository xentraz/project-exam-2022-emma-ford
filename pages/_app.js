// All Styles
import styles from '../styles/styles.scss';
// import styles bundle
import 'swiper/css/bundle';
// Theme Provider
import { ThemeProvider } from 'next-themes';
// Date Ranfe Picker
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
 