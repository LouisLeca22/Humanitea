import { gql, InMemoryCache, ApolloClient } from "@apollo/client";


const GRAPHQL_URL = "/graphql";

export const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache()
})

export const CHECK_USER = gql`
        query checkUser {
            currentUser{
                id 
                username
            }
        }
    `

export const POSTS_QUERY = gql`
        query postsQuery($categoryId: ID) {
            posts(categoryId: $categoryId){
                id
                title
                desc
                cat {
                    name
                }
                img
                createdAt
                author{
                    id
                    username
                }
            }
        }
    `


export const POST_QUERY = gql`
    query postQuery ($postId: ID!) {
        post(id: $postId){
            id 
            title 
            desc
            img 
            createdAt
            author{
                id 
                username
            }
            cat{
                id
                name
                posts{
                    id 
                    title 
                    desc 
                    img 
                }
            }
        }
    }
`

export const CREATE_POST_MUTAION = gql`
            mutation CreatePostMutation ($input: PostInput!) {
        #   post will be the alias for createPost
           post: createPost(input: $input ) {
                id
                title
                desc
                cat {
                    name
                    posts {
                        id 
                        title 
                        desc
                        img
                    }
                }
                img
                createdAt
                author{
                    id
                    username
                }
                }
            }
    `


export const DELETE_POST_MUTATION = gql`
    mutation deletePost ($postId: ID!) {
       post: deletePost(id: $postId){
            id 
        }
    }
`

export const UPDATE_POST_MUTATION = gql`
            mutation UpdatePostMutation ($postId: ID!, $input: PostInput!) {
        #   post will be the alias for createPost
           post: updatePost(id: $postId ,input: $input ) {
                id
                title
                desc
                cat {
                    name
                    posts {
                        id 
                        title 
                        desc
                        img
                    }
                }
                img
                createdAt
                author{
                    id
                    username
                }
                }
            }
    `