import Edit from "../assets/edit.png"
import Delete from "../assets/delete.png"
import NoUser from "../assets/user.jpg"
import {Link, useNavigate, useParams} from "react-router-dom"
import Menu from "../components/Menu"
import { useDeletePost, usePost } from "../graphql/hooks"
import {format, register} from "timeago.js"
import locale from "timeago.js/lib/lang/fr"
import DOMPurify from "dompurify";
import { useOutletContext } from "react-router-dom";


register("fr", locale);

const Single = () => {

  const currentUser = useOutletContext()
  const {id} = useParams()
  const {post, loading} = usePost(id)
  const navigate = useNavigate()
  const { deletePost, error } = useDeletePost()

  // console.log(JSON.stringify(error, null, 2));
  if(loading){
    return <p>Chagement...</p>
  }



  return (
    <div className="single">
      <div className="content">
      <img src={new URL(`../assets/upload/${post.img}`, import.meta.url).href} alt="" />
        <div className="user">
          <img src={NoUser} alt="" />
          <div className="info">
            <span>{post.author.username}</span>
            <p>publié {format(post.createdAt, "fr")}</p>
          </div>
          {currentUser?.id === post.author.id && (
                <div className="edit">
                 <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={Edit} alt="" />
                </Link>
                <img  src={Delete} alt="" onClick={async () => {
                      await deletePost(post.id)
                   navigate("/")
                }} />
              </div>
          )}
        </div>
        <h1>
          {post.title}
        </h1>
          <p     dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}>
          </p>
      </div>
      <div className="menu">
        <Menu posts={post.cat.posts.filter(item => item.id !== post.id)}/>
      </div>
    </div>
  )
}
export default Single