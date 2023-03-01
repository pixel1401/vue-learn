import { IPost } from "@/Modals/IPost";
import axios from "axios";
import { ActionTree } from "vuex";
import RootState from "../types";
import { PostMutations } from "./mutations";
import PostModuleState from "./types";





const actions : ActionTree<PostModuleState , RootState>= {
    async getPosts({state  , commit}) {
        commit(PostMutations.SET_IS_LOAD_POSTS , true);
        let data = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: state.limitPage ?? 10,
            _page: state.currentPage ?? 1
          }
        });
        commit( PostMutations.SET_TOTAL_PAGE  , Math.ceil(data.headers['x-total-count'] / state.totalPage));
        commit( PostMutations.SET_POST  , data.data);
        // state.posts = data.data;
        commit( PostMutations.SET_IS_LOAD_POSTS , false);
    },
  
  
      
    async getPostsScroll({state  , commit} ) {
        commit( PostMutations.CHANGE_PAGE  , state.currentPage + 1);
        let data = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: state.limitPage,
            _page: state.currentPage
          }
        });
        commit( PostMutations.SET_TOTAL_PAGE  , Math.ceil(data.headers['x-total-count'] / state.limitPage));
        commit( PostMutations.SET_SCROLL_POSTS  , data.data);
    },


    setCurrentPage({state , commit} , page : number) {
      commit( PostMutations.CHANGE_PAGE  , page);
    },

    setCurrentPost({state , commit} , id : string) {

      
      let post : IPost | undefined ;

      console.log('wadawda' , id);
      

      console.log(state.posts);
      for(let a of state.posts) {
        if(a.id == +id) {
          
          post = a;
          break;
        }
      }
      if(post) {
        commit(PostMutations.SET_CURRENT_POST , post);
      }
    },


    setPosts ({state , commit} , posts : IPost[]) {
      commit(PostMutations.SET_POST , posts)
    }



}


export default actions;