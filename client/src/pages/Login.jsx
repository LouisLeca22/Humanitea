import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("")
  const handleSubmit =  (e) => {
    e.preventDefault()
    fetch("/auth/login", {
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
        .catch(err => {
          setError(err.msg)
          setTimeoout(() => {
            setError("")
          }, 2000)
        }
        )
  } 

  const handleChange = (e) => {
    setForm(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  return (
    <div className="auth">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email"  onChange={handleChange}/>
        <input type="password" name="password" placeholder="Mot de passe"  onChange={handleChange}/>
        <button type="submit">Se connecter</button>
        {error &&  <p>{error}</p>}
        <span>Pas encore de compte ? <Link to="/register">S'inscrire</Link></span>
      </form>
    </div>
  )
}
export default Login