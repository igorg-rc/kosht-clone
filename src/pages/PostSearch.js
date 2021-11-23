import { useState, useEffect } from "react"
import { useRouteMatch, Link } from "react-router-dom"
import { get_posts } from "../api/api"
import { PostGeneralView } from "../componenents/Post/PostGeneralView"
import { PageMessage } from "../componenents/UI/PageMessage"
import { makeStyles } from "@material-ui/styles"
import { SpinnerContent } from "../componenents/UI/SpinnerContent"
import {useTranslation} from "react-i18next"

const useStyles = makeStyles(theme => ({
  main: {
    paddingBottom: 10,
    width: '100%'
  },
  categoryLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    marginRight: 5,
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  linkText: {
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

export const PostSearch = () => {
  const { t } = useTranslation()
  const styles = useStyles()
  const match = useRouteMatch()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const fetchedPosts = await get_posts()
      const reg = match.params.query
      const searchList = fetchedPosts.filter(
        post => {
          return (
            post.title.includes(reg) || post.description.includes(reg) || post.body.includes(reg)  ||
            post.title.includes(reg.toLowerCase()) || post.description.includes(reg.toLowerCase()) || 
            post.body.includes(reg.toLowerCase())  || post.body.includes((reg).charAt(0).toUpperCase() + (reg).slice(1))  ||
            post.body.includes(reg.toLowerCase())  || post.title.includes((reg).charAt(0).toUpperCase() + (reg).slice(1)) ||
            post.body.includes((reg).charAt(0).toUpperCase() + (reg).slice(1)) || 
            post.description.includes((reg).charAt(0).toUpperCase() + (reg).slice(1)) 
          )}
      )
      setPosts(searchList)
      setLoading(false)
    }
    fetchPosts()
  }, [match.params.query])

  console.log(posts)

  return loading ? <SpinnerContent loadingStatus={loading} /> : <>
    <PageMessage message={`${t("search.searchQuery")} "${match.params.query}"`} />
    { posts.length > 0 ?
    <>
      { posts.map(post => (
        <div className={styles.main}>
          <PostGeneralView 
            style={{ marginBottom: 10 }}
            id={post._id}
            imgPoster={post.imgPoster}
            videoPoster={post.videoPoster}
            date={post.createdAt}
            title={post.title}
            slug={post.slug}
            description={post.description}
            categories={post.categories && post.categories.map(i => (
              <Link 
                key={i._id} 
                to={(`/category/${(i.slug)}`).toLowerCase()} 
                className={styles.categoryLink}
              >
                <span className={styles.linkText}>{i.title_ua}</span>
              </Link>
            ))}
          />
        </div> 
      ))}
    </> 
    : 
    <PageMessage  message={t("search.searchMessage")} /> }
  </>
}