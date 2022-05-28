// All Styles
import styles from '../styles/styles.scss';
// import styles bundle
import 'swiper/css/bundle';
// Theme Provider
import { ThemeProvider } from 'next-themes';
// Api
import { placesUrl } from '../lib/apiURL';
// Nookies
import nookies, { parseCookies, destroyCookie, setCookie } from 'nookies';

function MyApp({ Component, pageProps, jwt }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx, res }) => {
  let pageProps = {};
  const jwt = parseCookies(ctx).jwt;

  if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
  }

  if (!jwt) {
    if (
        ctx.pathname.includes("/Edit") ||
        ctx.pathname.includes("/Admin")
    ) {
        if (ctx.req && ctx.res && ctx.res.writeHead && ctx.res.end) {
            ctx.res.writeHead(302, {
                Location: "/LoginPage",
                "Content-Type": "text/html; charset=utf-8",
            });
            ctx.res.end();

            return {};
        }
    }
  }

  pageProps.jwt = jwt;

  return {
      pageProps,
      jwt,
  };
};

export default MyApp