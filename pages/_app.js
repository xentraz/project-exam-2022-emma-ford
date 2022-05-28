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
  };
};

// export const getServerSideProps = async (ctx) => {
//   const cookies = nookies.get(ctx)
//   let user = null;
//   let places = null;
//   const JWT = parseCookies(ctx).jwt;

//   if (cookies?.jwt) {
//     try {
//       const { data } = await axios.get('http://localhost:1337/users/me', {
//         headers: {
//           Authorization:
//             `Bearer ${cookies.jwt}`,
//           },
//       });
//       const placesData = await axios.get(placesUrl);

//       user = data;
//       places = placesData.data;

//     } catch (e) {
//       console.log(e);
//     }
//   }

//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/'
//       }
//     }
//   }

//   return {
//     props: {
//       user,
//       places,
//       JWT,
//     }
//   }
// }

export default MyApp