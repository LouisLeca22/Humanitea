import { useMutation, useQuery } from "@apollo/client"
import { CHECK_USER, CREATE_POST_MUTAION, DELETE_POST_MUTATION, POSTS_QUERY, POST_QUERY, UPDATE_POST_MUTATION } from "./querries"

export  function useCurrentUser(){
    const {data, loading, error} = useQuery(CHECK_USER, {fetchPolicy:"network-only"})
  
    return {
      currentUser: data?.currentUser,
      loading,
      error: Boolean(error)
    }
  }


  export  function usePosts(categoryId){
    const {data, loading, error} = useQuery(POSTS_QUERY, {
      fetchPolicy:"network-only",
      variables: {categoryId} 
    })
    return {
      posts: data?.posts,
      loading,
      error: Boolean(error)
    }
  }

  export function usePost(postId){
      const {data, loading, error} = useQuery(POST_QUERY, {
        fetchPolicy: "network-only",
        variables: {postId}
      })
      return {
        post: data?.post,
        loading,
        error: Boolean(error)
      }
  }


  export function useCreatePost(){
    const [mutate, {loading, error}] = useMutation(CREATE_POST_MUTAION)
  
    return {
      createPost: async (title, desc, img, cat) => {
        const {data: {post}} = await mutate({
          variables: {input: {title, desc, img, cat}},
          update: (cache, {data: {post}}) => (
            cache.writeQuery({
                query: POST_QUERY,
                variables: {id: post.id},
                data: {post}
            }
            )
        )
        })
        return post;
      },
      loading,
      error
    }
  }


  export function useDeletePost(){
    const [mutate, {loading, error}] = useMutation(DELETE_POST_MUTATION)
    return {
      deletePost: async (postId) => {
        const {data: {post}} = await mutate({
          variables: {postId}
        })
        return post;
      },
      loading,
      error
    }
  }

  export function useUpdatePost(){
    const [mutate, {loading, error}] = useMutation(UPDATE_POST_MUTATION)
    return {
      updatePost: async (id, title, desc, img, cat) => {
        const {data: {post}} = await mutate({
          variables: {postId: id, input: {title, desc, img, cat}},
   
        })
        return post;
      },
      loading,
      error
    }
  }

  