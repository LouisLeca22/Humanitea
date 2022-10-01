import { useNavigate } from "react-router-dom"

const Menu = ({posts}) => {
  
  const navigate = useNavigate()
  return (
    <div className="menu">
        <h1>Autres postes</h1>
        {posts.map(post => (
               <div className="post" key={post.id}>
               <img src={new URL(`../assets/upload/${post.img}`, import.meta.url).href} alt="" />
               <h2>{post.title}</h2>
               <button onClick={() => navigate(`/post/${post.id}`)}>Lire plus</button>
           </div>
        ))}
     
    </div>
  )
}
export default Menu