import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [error, setError] = useState("")

  const handleSubmit =  (e) => {
    e.preventDefault()
    fetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(form), 
      headers: {
        "Content-type": "application/json"
      },
      credentials: "include"
    })
    .then(async res =>{
      if(res.ok){
        navigate("/")
      } else {
        const err = await res.json()
        setError(err)
        setTimeout(() => {
          setError("")
        }, 2000)
      }
    })
        .catch(err =>{
          setError(err.msg)
          setTimeout(() => {
            setError("")
          }, 2000)
        })


  } 
  
  const handleChange = (e) => {
    setForm(prev => ({...prev, [e.target.name]: e.target.value}))
  }


  return (
    <div className="auth">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Nom d'utilisateur"  onChange={handleChange}/>
        <input type="password" name="password" placeholder="Mot de passe"  onChange={handleChange} />
        <input type="email" name="email" placeholder="email" onChange={handleChange} />
        <button type="submit">S'inscrire</button>
        {error &&  <p>{error}</p>}
        <span>Déjà inscrit ? <Link to="/login">Se connecter</Link></span>
      </form>
    </div>
  )
}
export default Register