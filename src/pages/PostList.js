import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import { PostGeneralView } from "../componenents/Post/PostGeneralView"
import { PageMessage } from "../componenents/UI/PageMessage"
import { SpinnerContent } from "../componenents/UI/SpinnerContent"
import { PostSeparateListIndex } from "../componenents/PostList/PostSeparateListIndex"
// import InfiniteScroll from 'react-infinite-scroll-component'
// import { InfiniteScroll } from "../componenents/UI/InfiniteScroll"
// import axios from "axios"
import { useTranslation } from'react-i18next'
import { get_list_by_slug, get_posts } from "../api/api"

const useStyles = makeStyles(theme => ({
  main: {
    marginBottom: 30,
  },
  categoryLink: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    marginRight: 4,
    fontSize: 12,
    fontFamily: 'Gilroy, sans-serif',
  },
  linkText: {
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))


export const PostList = () => {
  const styles = useStyles()
  const { t } = useTranslation()
  const [posts, setPosts] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [expanded, setExpanded] = useState(true)
  const [mainNewsLabel, setMainNewsLabel] = useState("")
  const [mainNews, setMainNews] = useState([])
  const [mainNewsMore, setMainNewsMore] = useState([])
  const [loading, setLoading] = useState(false)
  // const [skip, setSkip] = useState(1)
  // const [fetching, setFetching] = useState(true)
  // const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    const setContent = async () => {
      setLoading(true)
      const fetchedPosts = await get_posts()
      const newsWeek = await get_list_by_slug("main-news")
      const newsWeekTitle = t("separateList.titleNewsWeek")
      setMainNewsLabel(newsWeekTitle)
      setMainNews(newsWeek.posts.slice(0, 4))
      setMainNewsMore(newsWeek.posts.slice(0, 10))
      setPosts(fetchedPosts)
      setLoading(false)
    }
    setContent()
  }, [t])

  console.log(posts)

  // useEffect(() => {
  //   const setPage = async () => {
  //     setLoading(true)
  //     if (loading) {
  //       const fetchUrl = 'https://jsonplaceholder.typicode.com/posts'
  //       // const fetchUrl = 'http://localhost:5000/api/posts/'
  //       axios.get(`${fetchUrl}?_page=${pageNumber}&_limit=5`)
  //         .then(res => {
  //           setPosts(res.data)
  //           setPageNumber(prevState => prevState + 1)
  //         })
  //         .catch(error => console.log(error))
  //     }
  //     setLoading(false)
  //   }
  //   setPage()
  // }, [pageNumber, loading])

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler)

  //   return () => document.removeEventListener('scroll', scrollHandler)
  // }, [])

  // const scrollHandler = e => {
  //   if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
  //     setLoading(true)
  //     setFetching(true)
  //   }
  // }

  // const fetchPostsData = async () => {
  //   await axios.get(`http://localhost:5000/api/posts?page=${pageNumber}&limit=3`)
  //     .then(res => {
  //       setPosts([...posts, res.data])
  //       setPageNumber(pageNumber + 1)
  //     })
  //     .catch(err => console.log(err))
  // }

  console.log(posts.length)

  return <>
    {/* <InfiniteScroll
      dataLength={posts.length}
      hasMore={true}
      loader={<h1>...Loading</h1>}
      next={() => {
        if (!loading) setPageNumber(pageNumber + 1)
        }
      }
    > */}
      { !loading ? <> 
      <PostSeparateListIndex 
        items={showMore ? mainNews : mainNewsMore} 
        label={mainNewsLabel} 
        showMore={showMore}
        expanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
        toggleShowMore={() => setShowMore(!showMore)}  
      /> 
      { (posts && posts.length > 0) && posts.map(post => (
        <div className={styles.main} key={post._id} >
          <PostGeneralView 
            title={post.title}
            slug={post.slug}
            posterImage={post.posterImage}
            posterVideo={post.posterVideo}
            date={post.createdAt}
            id={post._id}
            description={post.description}
            categories={post.categories && post.categories.map(i => (
              <Link 
                key={i._id} 
                to={(`/category/${(i.slug)}`).toLowerCase()} 
                className={styles.categoryLink}
              ><span className={styles.linkText}>{i.title_ua}</span>
              </Link>
            ))}
          />
        </div> )) } 
        { (posts.length == 0) && <PageMessage message={t("postList.noPosts")} />  }
        </>
      : <><SpinnerContent loadingStatus={loading} items={posts} /></> }
    {/* </InfiniteScroll> */}
  </>
}