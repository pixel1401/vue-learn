import { IPost } from "@/Modals/IPost";
import { MutationTree } from "vuex";
import PostModuleState from "./types";



export enum PostMutations {
    SET_POST = 'SET_POST',
    SET_SCROLL_POSTS = 'SET_SCROLL_POSTS',
    CREATE_POST = 'CREATE_POST',
    DELETE_POST = 'DELETE_POST',
    CHANGE_PAGE = 'CHANGE_PAGE',
    SET_IS_LOAD_POSTS = 'SET_IS_LOAD_POSTS',
    SET_TOTAL_PAGE = 'SET_TOTAL_PAGE',
    UPDATE_QUERY= 'UPDATE_QUERY',
    UPDATE_SORT_OPTIONS = 'UPDATE_SORT_OPTIONS',
    UPDATE_IS_SCROLL_OR_PAGINATION = 'UPDATE_IS_SCROLL_OR_PAGINATION'
}



const mutations : MutationTree<PostModuleState> = {
    [PostMutations.SET_POST] (state , payload : IPost[]) {
        state.posts = payload;
    },
    [PostMutations.SET_SCROLL_POSTS] (state , payload : IPost[]) {
        state.posts = [...state.posts , ...payload];
    },
    [PostMutations.CREATE_POST] (state , payload : IPost) {
        state.posts.push(payload);
    },
    [PostMutations.DELETE_POST] (state , payload : IPost) {
        state.posts = state.posts.filter((elem) => elem.id !== payload.id);
    },
    [PostMutations.CHANGE_PAGE] (state , payload : number) {
        state.currentPage = payload;
    },
    [PostMutations.SET_IS_LOAD_POSTS] (state , payload : boolean) {
        state.isLoadPosts = payload
    },
    [PostMutations.SET_TOTAL_PAGE] (state , payload : number) {
        state.totalPage = payload;
    },
    [PostMutations.UPDATE_QUERY] (state , payload : string) {
        state.postsQuery = payload;
    },
    [PostMutations.UPDATE_SORT_OPTIONS] (state , payload : string) {
        state.selectedSort = payload as 'title' | 'body' | '' ;
    },
    [PostMutations.UPDATE_IS_SCROLL_OR_PAGINATION] (state , payload : boolean) {
        state.isPaginationOrScroll = payload;
    },
}


export default mutations;