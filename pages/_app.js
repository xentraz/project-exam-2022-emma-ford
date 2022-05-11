// All Styles
import styles from '../styles/styles.scss';
// import styles bundle
import 'swiper/css/bundle';
// Theme Provider
import { ThemeProvider } from 'next-themes';
// Date Ranfe Picker
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// Api
import { apiURL } from '../lib/apiURL';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

// function redirectUser(ctx, location) {
//   if(ctx.req) {
//     ctx.res.writeHead(302, 
//       { 
//       Location: location, 
//       'Content-Type': 'text/html; charset=utf-8',
//     });
//     ctx.res.end();
//   } else {
//     Router.push(location);
//   }
// }

// MyApp.getInitialProps = async ({Component, ctx}) => {
//   let pageProps = {}
//   const jwt = parseCookies(ctx).jwt

//   const res = await fetch(`${publicRuntimeConfig.API_URL}/navigations`)
//   const navigation = await res.json()

//   if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx)
//   }

//   if (!jwt) {
//       if (ctx.pathname === "/payed-articles") {
//           redirectUser(ctx, "/login");
//       }
//   }

//   return {
//       pageProps,
//       navigation
//   }
// }


 