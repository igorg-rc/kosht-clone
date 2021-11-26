import { ScaleLoader, BeatLoader } from "react-spinners"
import { makeStyles } from "@material-ui/styles"
import { Typography } from "@material-ui/core"
import { Trans } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  main: {
    textAlign: 'center',
    margin: '0 auto'
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 16,
    fontFamily: 'Gilroy, sans-serif'
  },
  pageTitle: {
    color: theme.palette.text.primary,
    fontSize: 30,
    fontWeight: 700,
    fontFamily: 'Gilroy, sans-serif'
  }
}))

export const SpinnerLoadPage = ({ loadingStatus }) => {
  const styles = useStyles()
  return <div className={styles.main}>
    <Typography component="h1" className={styles.pageTitle}>
      <Trans i18nKey="loading.loadingStatus">Loading...</Trans>
    </Typography>
    <BeatLoader 
      loading={loadingStatus} 
      size={15}
      height={50}
      width={5}
      radius={0}
      margin={5}
      color={'#2E3A59'}
      className="page-loading-spinner" 
    />
  </div>
}

export const SpinnerContent = ({ loadingStatus }) => {
  const styles = useStyles()
  return <div className={styles.main}>
    <ScaleLoader 
      loading={loadingStatus} 
      height={50}
      width={5}
      radius={0}
      margin={5}
      color={'#2E3A59'}
      className="page-loading-spinner" 
    />
    <Typography component="h3" className={styles.title}>
      <Trans i18nKey="loading.loadingStatus">Loading...</Trans>
    </Typography>
  </div>
}