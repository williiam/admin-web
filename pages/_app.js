import "../styles/globals.css";
import { useState, useEffect } from "react";
import Layout from "../shared/components/Layout";
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';
import { lightTheme } from "../shared/theme/lightTheme";

function MyApp({ Component, pageProps, ...appProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  const liffId = "1656917068-95aNbZ0K";

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      console.log("start liff.init()...");
      liff
        .init({ liffId: liffId })
        .then(() => {
          console.log("liff.init() done");
          setLiffObject(liff);
          console.log("liff :", liff);
        })
        .catch((error) => {
          console.log(`liff.init() failed: ${error}`);
          if (!liffId) {
            console.info(
              "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
            );
          }
          setLiffError(error.toString());
        });
    });

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;


  const getContent = () => {
    if ([`/login`].includes(appProps.router.pathname))
      return <Component {...pageProps} />;
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    };

  return (
    <ThemeProvider theme={lightTheme}>
      {getContent()}
    </ThemeProvider>
  );
}

export default MyApp;
