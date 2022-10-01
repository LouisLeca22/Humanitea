import { Link, useLocation } from "react-router-dom"
import { usePosts } from "../graphql/hooks"
import DOMPurify from "dompurify"

import {format, register} from "timeago.js"
import locale from "timeago.js/lib/lang/fr"
import { useEffect } from "react"
register("fr", locale);


const Home = () => {
  const cat = useLocation().search.split("=")[1] || null
  const {posts, loading, error} = usePosts(cat)
  // const getText = (html) =>{
  //   const doc = new DOMParser().parseFromString(html, "text/html")
  //   return doc.body.textContent
  // }

  useEffect(() => {

  }, [])

  return (
    <div className="home">
      <div className="posts">
        {posts?.map(post => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={new URL(`../assets/upload/${post.img}`, import.meta.url).href} alt="" />
            </div>
            <div className="content">
              <Link  className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p className="meta"> <em>{post.author.username}</em> ◉ {format(post.createdAt, "fr")}  ◉ {post.cat.name}</p>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
              <Link  className="link" to={`/post/${post.id}`}>
                <button>Lire la suite</button>
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>  
  )
}
export default Home