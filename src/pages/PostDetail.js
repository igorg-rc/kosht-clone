import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useRouteMatch } from "react-router"
import { Link } from "react-router-dom"
import { get_post_by_slug, get_readmore_posts } from "../api/api"
import { PostGeneralView } from "../componenents/Post/PostGeneralView"
import { makeStyles } from "@material-ui/styles"
import { PostSeparateListIndex } from "../componenents/PostList/PostSeparateListIndex"
import { SpinnerContent } from "../componenents/UI/SpinnerContent"
import { useTranslation } from "react-i18next"

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%'
  },
  categoryLink: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    marginRight: 5,
    fontSize: 12,
  },
  linkText: {
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))


export const PostDetail = () => {
  const { t } = useTranslation()
  const match = useRouteMatch()
  const styles = useStyles()
  const [post, setPost] = useState({})
  const [posts, setPosts] = useState([])
  const [morePosts, setMorePosts] = useState([])
  const [postsLabel, setPostsLabel] = useState("")
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(true)
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    const setPageContent = async () => {
      setLoading(true)
      const posts = await get_readmore_posts(match.params.slug)
      setPost(await get_post_by_slug(match.params.slug))
      setPosts(posts.slice(0, 5))
      setMorePosts(posts.slice(0, 10))
      const readMoreLabel = t("separateList.titleReadMore")
      setPostsLabel(readMoreLabel)
      setLoading(false)
    }
    setPageContent()
  }, [match.params.slug, t])

  console.log(post)
  console.log(match.path)

  return !loading ? <div className={styles.main}>
    <Helmet>
      <title>{post && `Kosht | ${post.title}`}</title>
      <meta name="description" content={post && post.description} />
      <meta name="keywords" content="one, two, three" />
    </Helmet>

    <PostGeneralView
      title={post.title}
      body={post.body}
      date={post.createdAt}
      categories={post.categories && post.categories.map(i => (
        <Link key={i._id} to={(`/category/${(i.slug)}`).toLowerCase()} className={styles.categoryLink}>
          <span className={styles.linkText}>{i.title_ua}</span>
        </Link>
      )) }
    />
    <PostSeparateListIndex 
      items={posts} 
      label={postsLabel} 
      items={showMore ? posts : morePosts} 
      showMore={showMore}
      expanded={expanded}
      toggleExpanded={() => setExpanded(!expanded)}
      toggleShowMore={() => setShowMore(!showMore)} 
    />
  </div> 
  : <SpinnerContent loadingStatus={loading} />
}