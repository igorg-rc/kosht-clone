import { useEffect, useState } from "react"
import { makeStyles, useTheme } from "@material-ui/styles"
import { NavLink } from "react-router-dom"
import { List, ListItem, Typography, TextField, useMediaQuery, InputAdornment } from "@material-ui/core"
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { create_subscriber, get_categories, get_contacts, get_tags, HOST_URL } from "../../api/api"
import { SectionTitle } from "./Title"
import { Trans, useTranslation } from "react-i18next"
// import { changeLanguage } from "i18next"

const useStyles = makeStyles(theme => ({
  main: {
    background: '#FFFFFF',
    boxShadow: '0px 8px 25px rgba(83, 89, 144, 0.07)',
    borderRadius: '6px',
    padding: '5px 0'
  },
  tagList: {
  },
  categoryListItem: {
    padding: 0,
    borderRadius: 6,
    color: '#2E3A59',
    '&:hover': {
      color: theme.palette.primary.main,
      background: theme.palette.text.secondary,
    }
  },
  tagListItem: {
    padding: 0,
    borderRadius: 6,
  },
  liCircle: {
    fontSize: 12,
    marginRight: '5px',
    verticalAlign: 'text-bottom'
  },
  liLattice: {
    marginRight: 2,
    marginLeft: 12,
    fontWeight: 500,
    fontSize: 14,
    // margin: '0 15px 0 24px'
  },
  tagLink: {
    padding: '10px',
    color: '#2E3A59',
    width: '100%',
    borderRadius: '5px',
    fontSize: 14,
    fontFamily: 'Gilroy, sans-serif',
    fontWeight: 600,
    textDecoration: 'none',
    position: 'relative',
    '&:hover': {
      color: "#fff",
    }
  },
  otherLink: {
    padding: '10px',
    color: '#2E3A59',
    width: '100%',
    borderRadius: '5px',
    fontSize: 14,
    fontFamily: 'Gilroy, sans-serif',
    fontWeight: 600,
    textDecoration: 'none',
    position: 'relative',
    '&:hover': {
      color: '#7585ff',
    }
  },
  linkText: {
    fontSize: 14,
    color: '',
  },
  activeTagNavLink: {
    color: '#2f42d6',
  },
  activeOtherNavLink: {
    color: '#2f42d6'
  },
  listItemIcon: {
    width: '20px',
    marginRight: 5,
    marginLeft: 12,
    verticalAlign: 'middle'
  },
  blockTitle: {
    marginLeft: 22,
  },
  subscribeForm: {
    width:'90%',
    padding: '15px 0',
    borderRadius: 6
  },
  userInput: {
    padding: 0,
    margin: 0,
    color: 'red',
  },
  inputField: { 
    margin: 0, 
    fontSize: '12px', 
    fontFamily: 'Gilroy, sans-serif', 
    padding: '8px 18px', 
    background: '#F3F3F3', 
    color: '#B2B2B2', 
    borderRadius: '6px' 
  },
  noBorder: {
    border: 'none'
  },
  submitBtnHolder: {
    // width: '82px',
    textAlign: 'left',
    paddingTop: 12,
    color: theme.palette.text.secondary,
    fontFamily: 'Gilroy, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '150%',
    borderBottom: '2px',
    borderBottomStyle: 'solid',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  langSwitcher: {
    marginRight: 'auto',
    textAlign: 'left',
    margin: '10px 0',
    width: '25%',
  },
  langSwitchInput: { 
    margin: 0, 
    fontFamily: 'Gilroy, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 15,
    padding: '5px 0', 
    color: '#000',
  },
  endAdornment: {
    color: '#000'
  }
}))

export const LeftMenu = () => {
  const {i18n} = useTranslation()
  const theme = useTheme()
  const isSM = useMediaQuery(theme.breakpoints.down('xs'))
  const DEV_API_LINK = HOST_URL
  const styles = useStyles()
  const [categories, setCategories] = useState([])
  const [contacts, setContacts] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [categoryHover, setCategoryHover] = useState(false)
  const [categoryIndex, setCategoryIndex] = useState(null)

  useEffect(() => {
    const setContent = async () => {
      setLoading(true)
      const contactData = (await get_contacts())
      setContacts(contactData.data)
      setCategories(await get_categories())
      setTags(await get_tags())
      setLoading(false)
    }
    setContent()
  }, [])

  const subscribeHandler = async e => {
    try {
      await create_subscriber({ email: userInput })
      alert("Вітаємо! Ви підписалися на розсилку наших статей!")
      e.target.value=""
      setUserInput("")
      window.location.reload()
    } catch (error) {
      console.log(error)
    } 
  }

  const setItemHover = (e, i) => {
    setCategoryIndex(i)
    setCategoryHover(true)
  }
  
  const setItemNotHover = (e, i) => {
    setCategoryIndex(null)
    setCategoryHover(false)
  }

  const handleLanguageChange = lang => i18n.changeLanguage(lang)
   
  return loading ? null : <>
    <section className={styles.main}>
      <div className={styles.list}>
        <List className={[styles.tagList, "category-list"].concat(" ")}>
          { categories.map((item, index) => (
            <ListItem 
              className={[styles.categoryListItem, "category-list-item"].concat(" ")} 
              key={item._id}
              onMouseEnter={e => setItemHover(e, index)}  
              onMouseLeave={e => setItemNotHover(e, index)}
              // style={{ border: categoryIndex === index && categoryHover === true ? '2px solid black' : 'none' }}
            >
              <NavLink 
                to={`/category/${(item.slug)}`} 
                className={styles.tagLink}
                activeClassName={styles.activeTagNavLink}
              >
                { item.imgUrl_main 
                ? 
                <img 
                  src={
                    categoryIndex === index && categoryHover === true 
                    ? 
                    `${DEV_API_LINK}/${item.imgUrl_hover}` 
                    : 
                    `${DEV_API_LINK}/${item.imgUrl_main}`
                  } 
                  alt={item.title} 
                  className={styles.listItemIcon}
                /> 
                :
                <span className={styles.liCircle}>&#9679;</span> }
                <span className={styles.liLattice}>{item.title_ua}</span>
              </NavLink>
            </ListItem>
          )) }
        </List>
      </div>

      <div className={styles.list}>
        <List className={styles.tagList}>
          { tags.map(item => (
            <ListItem className={styles.tagListItem} key={item._id}>
              <NavLink 
                activeClassName={styles.activeOtherNavLink} 
                to={`/tag/${(item.slug)}`}
                className={styles.otherLink}
              >
                <Typography className={styles.linkText}>
                  <span className={styles.liLattice}>#</span>{item.title_ua}
                </Typography>
              </NavLink>
            </ListItem>
          )) }
        </List>
      </div>

      <div className={styles.blockTitle}>
        <SectionTitle title={<Trans i18nKey="leftMenu.followUs">Follow us</Trans>}/>
      </div>
      <div className={styles.list}>
        <List className={styles.tagList}>
          { contacts.map(item => (
            <ListItem className={styles.tagListItem} key={item._id}>
              <a 
                href={`${item.link}`}
                target="_blank"
                className={styles.otherLink}
              >
                <Typography className={styles.linkText}>
                { item.imgUrl ? 
                <img 
                  src={`${DEV_API_LINK}/${item.imgUrl}`} 
                  alt={item.title} 
                  className={styles.listItemIcon} 
                /> :
                <span className={styles.liCircle}>&#9679;</span> }
                <span className={styles.liLattice}>{item.title_ua}</span>
                </Typography>
              </a>
            </ListItem>
          )) }
        </List>
      </div>
      <div className={styles.blockTitle}>
        <SectionTitle title={<Trans i18nKey="leftMenu.subscribeHeader">Enter email</Trans>}/>
        <div className={styles.subscribeForm}>
          <TextField  
            variant="outlined" 
            placeholder="Ваш email" 
            fullWidth
            inputProps={{ className: styles.inputField }}
            onChange={e => setUserInput(e.target.value)}
            InputProps={{
              classes: { notchedOutline: styles.noBorder }
            }}
          />
          <div style={{ textAlign: 'left', paddingTop: 5 }} onClick={subscribeHandler}>
            <span className={styles.submitBtnHolder}>
              <Trans i18nKey="leftMenu.subscribeLink">Subscribe</Trans>              
            </span>
          </div>
        </div>
      </div>
    </section>
    <section className={styles.main} style={{ margin: '30px 0', padding: '20px 20px' }}>
      <SectionTitle title={<Trans i18nKey="leftMenu.about">About project</Trans>} />
      {/* <div className={styles.langSwitcher} style={{ color: 'black' }}>
        <TextField  
          variant="outlined" 
          placeholder="UA" 
          fullWidth
          inputProps={{ className: styles.langSwitchInput }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <ArrowDropDownIcon />
              </InputAdornment>
            ),
            style: { 
              color: 'black'
            },
            classes: {
              adornedEnd: styles.endAdornment,
              notchedOutline: styles.noBorder
            }
          }}
        />
      </div> */}
      <div id="lang-switcher" style={{ textAlign: 'left', padding: '10px 0' }}>
        <button onClick={() => handleLanguageChange("ua")}>UA</button>
        <button onClick={() => handleLanguageChange("en")}>EN</button>
      </div>
    </section>
  </>
}