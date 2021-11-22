import MenuIcon from '@material-ui/icons/Menu'
import { useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useTheme} from "@material-ui/styles"
import { LeftMenu } from './LeftMenu'
import { makeStyles } from "@material-ui/styles"
import CloseIcon from '@material-ui/icons/Close'
import { 
  TextField, 
  useMediaQuery, 
  AppBar,
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Modal, 
  Backdrop, 
  InputAdornment,
  Fade,
  Grid,
  IconButton
} from "@material-ui/core"
import searchIcon from '../../files/images/UI/search.png'
import { Trans, useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
      paddingBottom: 10
    },
  },
  appBar: {
    background: '#F9F9FB',
    height: '100px',
    display: 'flex',
    alignItems: 'center'
  },
  appBarMobile: {
    background: '#F9F9FB',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20
  },
  toolbar: {
    top: 18,
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toolbarMobileTop: {
    marginBottom: 5,
  },
  toolbarMobileBottom: {
    marginTop: 5
  },
  brandLink: {
    // height: 30,
    margin: 0,
    padding: '16px 0',
    // width: 66,
    fontWeight: 700,
    fontSize: 14,
    fontFamily: 'Gilroy',
    fontWeight: 800,
    borderRadius: 6,
    background: '#2E3A59',
    color: "#fff", 
    '&:hover': {
      background: '#2E3A59'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '5px 0px',
      margin: '0 auto 0 3px',
      top: 2
    }
  },
  brandPhrase: {
    fontFamily: 'Gilroy, sans-serif',
    fontWeight: 800,
    fontSize: 18,
    lineHeight: '180%',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  search: {
    height: '37px',
    width: '100px',
    borderRadius: '8px',
    '&:hover': {
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: 'auto',
      width: 'auto',
    },
    [theme.breakpoints.up('xs') && theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      textAlign: 'right',
      left: 50
    }
  },
  searchInput: {
    padding: 0,
    margin: 0,
    color: 'red',
    border: '1px solid #fff',
    [theme.breakpoints.down('xs')]:{
      display: 'none'
    }
  },
  noBorder: {
    border: 'none'
  },
  endAdornment: {
    marginRight: 0,
    paddingRight: 0
  },
  searchBtn: {
    minWidth: 35,
    borderRadius: 8,
    textTransform: 'none',
    fontSize: 12,
    padding: '6px 20px',
    fontFamily: 'Gilroy, sans-serif',
    fontWeight: 'bold',
    background: '#5669FF', 
    '&:hover': {
      background: '#5669FF'
    }
  },
  mobileBtn: {
    fontSize: 30,
    color: theme.palette.text.primary,
    minWidth: 0,
    '&:hover': {
      cursor: 'pointer'
    },
  },
  modalMenu: {
    display: 'flex',
    alignItems: 'space-between',
    justifyContent: 'flex-start',
    background: '#fff',
    width: '100vw'
  },
  fade: {
    background: '#fff'
  },
  paperMenu: {
    // height: '100vh',
    width: '100vw',
    backgroundColor: "#fff",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalSearch: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%'
  },
  paperSearch: {
    width: '100vw',
    paddingBottom: '20px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mobileSearch: {
    textAlign: 'center',
  },
  closeBtn: {
    color: '#2E3A59',
    fontWeight: 'bold',
    fontSize: 30
  },
  searchIcon: {
    width: 19
  }
}))

export const Header = () => {
  const styles = useStyles()
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [query, setQuery] = useState("")
  const history = useHistory()
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.down('xs'))
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const searchInputRef = useRef()
  const { i18n } = useTranslation()

  const onSearchChange = query => setQuery(query)
  const handleMenuOpen    = () => setOpenMenu(true)
  const handleMenuClose   = () => setOpenMenu(false)
  const handleSearchClose = () => setOpenSearch(false)

  const handleSearch = () => {
    query ? history.push(`/search/${query}`) : history.push(`/`)
    setQuery("")
  }

  return <> { 
    !isXS 
    ? 
    <div className={styles.root}>
      <AppBar position="static" elevation={0} className={styles.appBar}>
        <Container className={styles.mainContainer}>
          <Toolbar className={styles.toolbar}>
            <Grid container spacing={3}>
              <Grid item sm={2} lg={3} >
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button 
                    id="brand-link" 
                    variant="contained" 
                    onClick={() => history.push("/")} 
                    className={styles.brandLink}
                    ><Trans i18nKey="header.brandBtn">Kosht</Trans>
                  </Button>
                </div>
              </Grid>
              <Grid item sm={10} lg={9} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography 
                    variant="h1" 
                    component="h1" 
                    className={styles.brandPhrase}
                    ><Trans i18nKey="header.brandPhrase">We talk about personal finances</Trans>
                  </Typography>
                  <div className={styles.search}>
                    <TextField 
                      variant="outlined"
                      placeholder={<Trans i18nKey="header.searchPlaceholder">Find</Trans>} 
                      inputProps={{ 
                        style: { 
                          margin: '0 2px', 
                          color: 'red',
                          fontSize: 12, 
                          padding: '10px 0', 
                          width: '300px', 
                          fontFamily: 'Gilroy',
                          fontWeight: 400, 
                          lineHeight: '1.5px', 
                          color: '#000000',
                          borderRadius: '8px', 
                          backgroundColor: '#FFFFFF',
                          '&::placeholder': {
                            color: '#B3B3B3'
                          }
                        } 
                      }}
                      onChange={e => onSearchChange(e.target.value)}
                      value={query}
                      ref={searchInputRef}
                      InputProps={{
                        className: styles.searchInput,
                        startAdornment: (
                          <InputAdornment style={{ margin: '0 5px 0 10px', padding: 0 }}>
                            <img src={searchIcon} className={styles.searchIcon} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button 
                              id="search-menu-button" 
                              variant="contained" 
                              color="primary" 
                              className={styles.searchBtn}
                              onClick={handleSearch}
                              ><Trans i18nKey="header.searchBtn">Search</Trans>
                            </Button>
                          </InputAdornment>
                        ),
                        classes: { 
                          notchedOutline:styles.noBorder
                        }
                      }}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div> 
    : 
    <div className={styles.root}>
      <AppBar position="static" elevation={0} className={styles.appBarMobile}>
        <Container>
          <div>
          <Toolbar className={[styles.toolbar, styles.toolbarMobileTop].concat(",")}>
            <Button variant="contained" color="primary" onClick={() => history.push("/")} className={styles.brandLink}>
              Кошт
            </Button>
            <MenuIcon className={styles.mobileBtn} onClick={handleMenuOpen} />
          </Toolbar>
        </div>
        <div style={{ margin: isMd ? '15px 0' : 0 }}>
          <Toolbar>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <TextField  
                  variant="outlined" 
                  placeholder="Пошук" 
                  fullWidth
                  inputProps={{ style: { margin: 0, fontSize: '12px', padding: '10px 0' } }}
                  onChange={e => onSearchChange(e.target.value)}
                  value={query}
                  ref={searchInputRef}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment style={{ marginRight: 5, padding: 0 }}>
                        <img src={searchIcon} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment style={{ marginRight: 0, padding: 0 }}>
                        <Button 
                          id="search-menu-button" 
                          variant="contained" 
                          color="primary" 
                          className={styles.searchBtn}
                          onClick={handleSearch}
                        >
                          Знайти
                        </Button>
                      </InputAdornment>
                    ),
                    classes: {
                      adornedEnd: styles.endAdornment,
                      notchedOutline: styles.noBorder
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </div>
          <Modal
            aria-labelledby="menu-modal-title"
            aria-describedby="menu-modal-description"
            className={styles.modalMenu}
            open={openMenu}
            onClose={handleMenuClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
          >
            <Fade in={openMenu} onClick={handleMenuClose}>
              <div className={styles.paperMenu}>
                <IconButton 
                  style={{ padding: '2px', margin: 0, left: '95%' }}
                  onClick={handleMenuClose}
                > 
                  <CloseIcon className={styles.closeBtn} />
                </IconButton>
                <LeftMenu />
              </div>
            </Fade>
          </Modal>
          <Modal
            aria-labelledby="search-modal-title"
            aria-describedby="search-modal-description"
            className={styles.modalSearch}
            open={openSearch}
            onClose={handleSearchClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
          >
            <Fade in={openSearch}>
              <div className={styles.paperSearch}>
                <div className={styles.mobileSearch}>
                  <TextField 
                    variant="outlined" 
                    placeholder="Пошук" 
                    inputProps={{ style: { padding: '7.5px', margin: '0 2px', width: '60vw'  } }}
                    value={query}
                    onChange={e => onSearchChange(e.target.value)}
                  />
                  <Button 
                    id="search-menu-button" 
                    variant="contained" 
                    color="primary" 
                    className={styles.searchBtn}
                    onClick={handleSearch}
                    >
                    Знайти
                  </Button>
                </div>
              </div>
            </Fade>
          </Modal>
        </Container>
      </AppBar>
    </div> 
    }
  </>
}