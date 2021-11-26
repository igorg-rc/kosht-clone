import { Container, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Header } from "../UI/Header";
import { LeftMenu } from "./LeftMenu";
import { RightMenu } from "./RightMenu";
import { useRouteMatch } from "react-router-dom";
import { SectionTitle } from "./Title";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { SpinnerLoadPage } from "./SpinnerContent";

const useStyles = makeStyles((theme) => ({
  main: {
    background: "#FFFFFF",
    boxShadow: "0px 8px 25px rgba(83, 89, 144, 0.07)",
    borderRadius: "6px",
    padding: "5px 0",
  },
  leftMenuGrid: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  contentGrid: {
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      // marginTop: -30
    },
  },
}));

const LangSwitcher = (props) => {
  const { handleLanguageChange, primaryLang, secondaryLang, load } = props;
  const styles = useStyles();
  const { t } = useTranslation();

  return load ? null : (
    <section
      className={styles.main}
      style={{ margin: "30px 0", padding: "20px 20px" }}
    >
      <SectionTitle title={t("leftMenu.about")} />
      <div id="lang-switcher" style={{ textAlign: "left", padding: "10px 0" }}>
        <button onClick={() => handleLanguageChange(primaryLang)}>UA</button>
        <button onClick={() => handleLanguageChange(secondaryLang)}>EN</button>
      </div>
    </section>
  );
};


export const Layout = ({ children }) => {
  const { i18n } = useTranslation();
  const styles = useStyles();
  const theme = useTheme();
  const match = useRouteMatch();
  const isLargerSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isSmallerMD = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const firstLocale = !localStorage.getItem("locale") && "ua"
  const [defaultLocale, setDefaultLocale] = useState(firstLocale)
  // const isLargerXS = useMediaQuery(theme.breakpoints.up("xs"))
  // const isSmallerSM = useMediaQuery(theme.breakpoints.down("sm"))

  const changeLang = lang => {

    if (localStorage.getItem("locale") === lang || firstLocale === lang) {
      return;
    }

    
    // if (lang == "ua") {
      //   // setTimeout( async () => await i18n.changeLanguage(lang), 3000);
      //   return;
      // }
      setLoader(true);
      // setLoading(true);

      window.location.reload()
      localStorage.setItem("locale", lang);
      i18n.changeLanguage(lang);
    // setLoading(false);
    setLoader(false);
  };

  useEffect(() => {
    setTimeout(() => setLoader(false), 2000);
  }, []);

  return (
    <>
      {loading
        ? // <div style={{ height: "100vh" }}>
          //   <h1 style={{ paddingTop: "40vh" }}>LOADING!</h1>
          // </div>
          null
        : // <div style={{ zIndex: 8 }}>
          //   <Header className={styles.header} />
          // </div>
          null}
      {/* <div className={styles.content}>
        <Container className={styles.mainContainer}>
          <Grid container spacing={3}>
            <Grid item md={3} lg={3} className={styles.leftMenuGrid}>
              <LeftMenu />
            </Grid>
            <Grid item sm={12} md={9} lg={6} className={styles.contentGrid}>
              {children}
            </Grid>
            <Grid item sm={12} md={false} lg={3} className={styles.rightMenuGrid}>
              <RightMenu />
            </Grid> 
          </Grid>
        </Container>
      </div> */}

      {isSmallerMD && isLargerSM ? (
        <div className={styles.content}>
          <div style={{ height: "100vh" }}>
            <h1 style={{ paddingTop: "40vh" }}>LOADING!</h1>
          </div>
          <Container className={styles.mainContainer}>
            <Grid container spacing={3}>
              <Grid item md={4} className={styles.leftMenuGrid}>
                <LeftMenu />
                <RightMenu />
              </Grid>
              <Grid item md={8} className={styles.contentGrid}>
                {children}
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : loading ? (
        <h1>LOADING</h1>
      ) : (
        //=========== primary layout - big screen ============ //
        <>
          {/* <h1 style={{ paddingTop: "30vh" }}>LOADING!</h1> */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100vh",
              zIndex: loader ? 15 : 10,
              background: "#F8F8F8",
              display: loader ? "block" : "none",
            }}
          >
            <div style={{ paddingTop: "40vh" }}>
              <SpinnerLoadPage />
            </div>
          </div>
          <div
            className={styles.content}
            style={{ zIndex: 12, position: "relative", display: loader && "none" }}
          >
            <Header className={styles.header} />
            <Container className={styles.mainContainer}>
              <Grid container spacing={3}>
                <Grid item md={3} lg={3} className={styles.leftMenuGrid}>
                  <LeftMenu />

                  <LangSwitcher
                    primaryLang="ua"
                    secondaryLang="en"
                    handleLanguageChange={changeLang}
                    load={loading}
                    style={{ display: loader || loading ? 'none' : 'block' }}
                  />
                </Grid>
                <Grid item sm={12} md={9} lg={6} className={styles.contentGrid}>
                  {children}
                </Grid>
                <Grid
                  item
                  sm={12}
                  md={false}
                  lg={3}
                  className={styles.rightMenuGrid}
                >
                  <RightMenu />
                </Grid>
              </Grid>
            </Container>
          </div>
        </>
      )}
    </>
  );
};
