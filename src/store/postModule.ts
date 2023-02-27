import Vuex, { Module } from 'vuex'
import axios from 'axios';
import { IPost } from '@/Modals/IPost';


interface PostState {
    posts:  IPost[],
        isLoadPosts: boolean,
        isPaginationOrScroll: boolean,
        selectedSort:  'title' | 'body' | '',
        sortOptions: [
            { value: "title", name: 'По названию' },
            { value: "body", name: 'По содержимому' },
        ],
        postsQuery: string,
        limitPage: number,
        currentPage: number,
        totalPage: number,
}


const  postModule  = {
    state : () => ({
        posts: [] ,
        isLoadPosts: true,
        isPaginationOrScroll: true,
        selectedSort: '',
        sortOptions: [
            { value: "title", name: 'По названию' },
            { value: "body", name: 'По содержимому' },
        ],
        postsQuery: '',
        limitPage: 10,
        currentPage: 1,
        totalPage: 0,
    }),

    getters : {
        selectedPost(state: PostState): IPost[] {
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
      
      
        selectedQuery(state : PostState , getters : any): IPost[] {
            if (state.postsQuery == '') {
              return getters.selectedPost.filter((post : IPost) => true)
            } else {
              return getters.selectedPost.filter((post : IPost) => post.title.includes(state.postsQuery))
            }
        
        },

    },

    mutations: {
        setPosts(state : PostState , posts : IPost[]) {
            state.posts = posts;
        },

        setScrollPost (state : PostState , post : IPost[]) {
            state.posts = [...state.posts , ...post];
        },



        createPost( state : PostState , post: IPost) {
            state.posts.push(post);
        },

        deletePost( state : PostState ,  post: IPost) {
            state.posts = state.posts.filter((elem) => elem.id !== post.id);
        },
        changePage( state : PostState , page: number) {
            state.currentPage = page;
        },

        setIsLoadPosts(state : PostState , value : boolean) {
            state.isLoadPosts = value
        },

        setTotalPage(state : PostState , value : number) {
            state.totalPage = value;
        },

        
        updateQuery(state: PostState , value : string) {
            state.postsQuery = value;
        },
        updateSortOptions(state: PostState , value : string) {
          
          state.selectedSort = value as 'title' | 'body' | '' ;
        },

        updateIsScrollOrPagination(state: PostState , value : boolean) {
            state.isPaginationOrScroll = value;
        }
    },


    actions: {
        async getPosts({state  , commit} : any) {
            commit('setIsLoadPosts' , true);
            let data = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _limit: state.limitPage ?? 9,
                _page: state.currentPage ?? 1
              }
            });
            commit('setTotalPage' , Math.ceil(data.headers['x-total-count'] / state.totalPage));
            commit('setPosts' , data.data);
            // state.posts = data.data;
            commit('setIsLoadPosts' , false);
        },
      
      
          
        async getPostsScroll({state  , commit} : any) {
            commit('changePage' , state.currentPage + 1);
            let data = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _limit: state.limitPage,
                _page: state.currentPage
              }
            });
            commit('setTotalPage' , Math.ceil(data.headers['x-total-count'] / state.limitPage));
            commit('setScrollPost' , data.data);
        },


        setCurrentPage({state , commit} : any , page : number) {
          commit('changePage' , page);
        }

    },
    namespaced: true

}


export default postModule;