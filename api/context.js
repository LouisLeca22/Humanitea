import jwt from "jsonwebtoken";
import { createUserLoader, createCategoryLoader, createPostLoader } from './dataloaders.js';
import { prisma } from "./index.js";

export const context = async ({ req }) => {
    const cookie = req.cookies.access_token
    const userLoader = createUserLoader()
    const categoryLoader = createCategoryLoader()
    const postLoader = createPostLoader()
    try {
      const decoded = jwt.verify(cookie, process.env.JWT_SECRET)
  
      const user = await prisma.user.findUnique({
        where: {id: decoded.sub}
      })
      return {currentUser: {id: user.id, username: user.username}, userLoader, categoryLoader, postLoader}
    } catch (error) {
      return {currentUser: null, userLoader, categoryLoader, postLoader}
    }
  };