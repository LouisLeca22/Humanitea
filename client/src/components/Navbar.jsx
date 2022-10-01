import Logo from "../assets/logo.png"
import { Link } from "react-router-dom"
const Navbar = ({ currentUser }) => {

  const logout = () => {
    fetch("/auth/logout", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
      credentials: "include"
    })
      .then(res => {
        return res.json()
      })
      .then(data => console.log(data))
      .catch(error => console.log(error))
    window.location.reload()
  }


  return (
    <div className="navbar">
      <div className="container">
        <Link to="/">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
        </Link>
        <div className="links">
          <Link className="link" to="/?cat=2"><h6>ART</h6></Link>
          <Link className="link" to="/?cat=5"><h6>LITTERATURE</h6></Link>
          <Link className="link" to="/?cat=4"><h6>SCIENCES</h6></Link>
          <Link className="link" to="/?cat=1"><h6>TECHNOLOGIE</h6></Link>
          <Link className="link" to="/?cat=3"><h6>CINEMA</h6></Link>
          <Link className="link" to="/?cat=6"><h6>PHILOSOPHIE</h6></Link>
          {currentUser ? (
            <div className="user-nav">
              <span>Bonjour {currentUser.username}</span>

              <span onClick={logout}>Déconnexion</span>
              <span className="write">
                <Link className="link" to="/write">Ecrire</Link>
              </span>
            </div>
          ) : (
            <div className="user-nav">
              <Link to="/login" className="link">
                <span>Connexion</span>
              </Link>
              <Link to="/register" className="link">
                <span>Inscription</span>
              </Link>

            </div>
          )}



        </div>
      </div>
    </div>
  )
}
export default Navbar