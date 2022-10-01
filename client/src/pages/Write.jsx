import { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useCreatePost, useUpdatePost } from "../graphql/hooks";
import axios from "axios"

const Write = () => {
  const navigate = useNavigate()
  const currentUser = useOutletContext()
  const { createPost, loading } = useCreatePost()
  const {updatePost, error: err} = useUpdatePost()
  const state = useLocation().state;

  const [desc, setDesc] = useState(state?.desc || "")
  const [title, setTitle] = useState(state?.title || "")
  const [cat, setCat] = useState(state?.cat.id || "2")
  const [file, setFile] = useState(null);
  const [error, setError] = useState("")

  useEffect(() => {
    if (!currentUser) {
      navigate("/")
    }
  }, [currentUser])

    // console.log(JSON.stringify(err, null, 2));


  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };


  const handlePublish = async (e) => {
    e.preventDefault()
    if (!desc || !title || !cat) {
      setError("tous les champs doivent être remplis")
      setTimeout(() => {
        setError("")
      }, 2000)
      return
    }


    if (!file && !state) {
      setError("vous devez ajouter une image")
      setTimeout(() => {
        setError("")
      }, 2000)
      return
    }

      let img = await upload();

      if(!img){
        img = state.img
      }

      console.log(img)

    if(state){
      try {
        const post = await updatePost(state.id, title, desc, img, cat)
        navigate(`/post/${post.id}`)
      } catch (error) {
        console.log(error)
      }
    } else {
    try {
      const post = await createPost(title, desc, img, cat)
      navigate(`/post/${post.id}`)
    } catch (error) {
      console.log(error)
    }
  }
  }

  return (
    <div className="add">
      <div className="content">
        {error && <p className="error">{error}</p>}
        {loading ? <p>Chargement...</p> : (
          <>
            <input type="text" placeholder="Titre de l'article" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="editorContainer">
              <ReactQuill className="editor" theme="snow" value={desc} onChange={setDesc} />
            </div>
          </>
        )}
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publier</h1>
          <span>Statut: <b>Brouillon</b></span>
          <span>Visibilité: <b>Tous le mo</b></span>
          <input style={{ display: "none" }} type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
          <label className="file" htmlFor="file">
            Ajouter une image
          </label>
          <div className="buttons">
            <button>Sauvegarder le brouillon</button>
            <button onClick={handlePublish}>Publier</button>
          </div>
        </div>
        <div className="item">
          <h1>Categories</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="2"
              id="art"
              checked={cat === "2"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="5"
              id="litterature"
              checked={cat === "5"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="litterature">Littérature</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="4"
              id="science"
              checked={cat === "4"}
              onChange={(e) => setCat(e.target.value)}

            />
            <label htmlFor="science">Sciences</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="1"
              id="technologie"
              checked={cat === "1"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technologie</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="3"
              id="cinema"
              checked={cat === "3"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinéma</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="6"
              id="philosophie"
              checked={cat === "6"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="philosophy">Philosophy</label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Write