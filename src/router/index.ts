import {createRouter , createWebHistory} from 'vue-router';
import { Component } from "vue"
import Main from '@/pages/Main.vue';
import Posts from '@/pages/Posts.vue'
import Post from '@/pages/Post.vue'
import PostsWithStore from '@/pages/PostsWithStore.vue';
import PostSComposition from '@/pages/PostsCompositionApi.vue';

interface IPages {
    path : string,
    component : Component
}

const routes : IPages[] = [
    {
        path : '/',
        component : Main
    },
    
    {
        path: '/post' ,
        component : Posts
    },

    {
        path : '/post-store',
        component : PostsWithStore
    },

    {
        path : '/post-composition',
        component : PostSComposition
    },

    {
        path: '/post/:id' ,
        component : Post
    }

]




export default createRouter({
    history: createWebHistory(),
    routes
})
