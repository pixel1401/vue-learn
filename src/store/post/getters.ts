import { IPost } from "@/Modals/IPost";
import { GetterTree } from "vuex";
import RootState from "../types";
import PostModuleState from "./types";




const getters : GetterTree<PostModuleState , RootState>  = {
    selectedPost(state): IPost[] {
        if (state.selectedSort === '') {
          return state.posts;
        } else {
          return state.posts.sort(
            (post1: IPost, post2: IPost) => {
              return post1[state.selectedSort as 'title' | 'body'].localeCompare(post2[state.selectedSort as 'title' | 'body']);
            }
          )
        }
    },
  
  
    selectedQuery(state  , getters ): IPost[] {
        if (state.postsQuery == '') {
          return getters.selectedPost.filter((post : IPost) => true)
        } else {
          return getters.selectedPost.filter((post : IPost) => post.title.includes(state.postsQuery))
        }
    },
}


export default getters;