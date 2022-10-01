import {Router} from "express"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import {prisma } from "./index.js";

const router = Router()

router.post("/register", async (req, res) => {
    const { email, password, username, } = req.body;

    if(!email || !password || !username){
        return  res.status(401).json("Les champs sont obligatoires")
    }

    const isEmail = validator.isEmail(email)
    if(!isEmail){
        return res.status(401).json("L'adresse email n'est pas valide")
    }

    const isValidPassword = validator.isLength(password, {min: 5})
    if(!isValidPassword){
       return  res.status(401).json("le mot de passe n'est pas valide")
    }


    const existUser = await prisma.user.findUnique({
        where: {email}
    });

    if(existUser){
       return res.status(401).json('impossible de créer l\'utilisateur')
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const user = await prisma.user.create({
        data: {
            email,
            username, 
            password: hashedPassword
        }
    })

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {expiresIn: 1800});

    
   return res.cookie("access_token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    }).status(200).json({msg: "Votre compte a bien été créé"})
  })

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email | !password) {
        return res.status(401).json("Ces champs sont obligatoires")
    }

    const user = await prisma.user.findUnique({
        where: {email}
    });

    if(!user){
    
        return res.status(404).json("Impossible de se connecter")
    }

    const isPasswordCorrect = bcrypt.compareSync(
        password,
        user.password
      );

    if(!isPasswordCorrect){
        return res.status(403).json("Impossible de se connecter")
    }

    const token = jwt.sign({ sub: user.id },  process.env.JWT_SECRET, {expiresIn: 1800});
    return res.cookie("access_token", token, {
        httpOnly: true
    }).status(200).json({msg: "Connecté !"})
  } )

  router.delete('/logout', (req, res) => {
    res.clearCookie("access_token").json({msg: 'Déconnecté'})
  })


  export default router;