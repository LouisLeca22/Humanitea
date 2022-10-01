import { prisma } from "./index.js"


function reject(condition) {
    if (condition) {
      throw new Error('Vous n\'êtes pas autorisé ');
    }
  }

export const resolvers = {
    Query: {
        currentUser: (_root,_args, {currentUser}) => {
            return currentUser
        },
        posts: async (_root, {categoryId}, _context) => {
            if(categoryId){
                return await prisma.post.findMany({
                    where: {categoryId: Number(categoryId)}
                })
            }
            return await prisma.post.findMany({orderBy: [{createdAt: "desc"}]})
        },
        post: async (_root, {id}, _context) => {
            return await prisma.post.findUnique({
                where: {id: Number(id)}
            })
        },

    },
    Mutation: {
        createPost: async (_, {input}, {currentUser}) => {
            reject(!currentUser || !input.title || !input.desc || !input.img || !input.cat);
                const post = await prisma.post.create({
                    data: {
                        title: input.title,
                        desc: input.desc,
                        img: input.img, 
                        categoryId: Number(input.cat), 
                        authorId: Number(currentUser.id)
                    }
                })
                return post
        },
        deletePost: async (_root, {id}, {currentUser}) => {
            reject(!currentUser)
            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id)
                }
            })

            reject(!post || post.authorId !== currentUser.id)

            await prisma.post.delete({where: {id: Number(id)}})
            return post
        },
        updatePost: async (_root, {id, input}, {currentUser}) => {
            reject(!currentUser)
            reject(!currentUser || !input.title || !input.desc || !input.img || !input.cat);

            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id)
                }
            })

            reject(!post || post.authorId !== currentUser.id)


    
            const updatedPost  = await prisma.post.update({
                data: {
                    title: input.title, 
                    desc: input.desc,
                    img: input.img, 
                    categoryId: Number(input.cat)
                },
                where: {
                    id: Number(id)
                }
            }) 

            return updatedPost

        }
    },
    Post: {
        author: async (post, _args, {userLoader}) => {
           return await userLoader.load(post.authorId)
        },
        cat: async (post, _args, {categoryLoader}) => {
            return await categoryLoader.load(post.categoryId)
        }
    },
    Category: {
        posts: async(category, _args, {postLoader}) => {
            const posts =  await postLoader.load(category.id)
            return posts
        }
    }
}