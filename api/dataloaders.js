import Dataloader from "dataloader";
import { prisma } from "./index.js";

export function createUserLoader(){
    return new Dataloader(async (userIds) => {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            }
        })
        // put the batch in the right order
        return userIds.map(userId => {
            return users.find(user => user.id === userId)
        })
    })
}


export function createCategoryLoader(){
    return new Dataloader(async (categoryIds) => {
        const categories = await prisma.category.findMany({
            where: {
                id: {
                    in: categoryIds
                }
            }
        })
        return categoryIds.map(categoryId => {
            return categories.find(category => category.id === categoryId)
        })
    })
}

export function createPostLoader(){
    return new Dataloader(async (categoryIds) => {
        const posts = await prisma.post.findMany({
            where: {
                categoryId: {
                    in: categoryIds
                }
            }
        })
        return categoryIds.map(categoryId => {
            return posts.filter(post => post.categoryId === categoryId)
        })
    })
}