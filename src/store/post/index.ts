import { Module } from "vuex";
import RootState from "../types";
import PostModuleState from "./types";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const post : Module<PostModuleState , RootState> = {
    state: {
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
    },
    getters,
    mutations,
    actions ,
    namespaced : true,
}





export default post;