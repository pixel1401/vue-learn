

<template>
  <div class="app">
    <div class="app__top">
      <post-form @create="createPost" />
      <my-select v-model:modalValue="selectedSort"
        :options="sortOptions"
      ></my-select>
    </div>
    <post-list v-if="isLoadPosts == false" @deletePost="deletePost" :posts="selectedPost" />
    <div v-else>Идет загрузка</div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import  { defineComponent , nextTick   } from 'vue'
import axios from 'axios';
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { IPost } from './Modals/IPost';



export default defineComponent({

  components: {
    PostForm, PostList
  },

  data() {
    return {
      posts: [
        {title:'jwad' , body:'awd' , id:8749848} 
      ] as IPost[] ,
      isLoadPosts : true , 
      selectedSort : 'title' as 'title' | 'body' ,
      sortOptions : [
        {value: "title" , name : 'По названию'},
        {value: "body" , name : 'По содержимому'},
      ]
    }
  },

  methods: {
    createPost(post: IPost) {
      this.posts.push(post); 
    },


    deletePost ( post : IPost ) {
      for (let index = 0; index < this.posts.length; index++) {
        const element = this.posts[index];
        if(element.id === post.id ) {
          this.posts.splice(index , 1);
          break;
        }
      }
    },


    async getPosts () {
      this.isLoadPosts = true;
      let data = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
      this.posts.splice(0)
      this.posts.push(...data.data);
      this.isLoadPosts = false;
    }
  },

  mounted () {
    this.getPosts();
  },

  computed: {
    selectedPost () : IPost[] {
      return this.posts.sort(
        (post1 : IPost , post2 : IPost)=> {
          return post1[this?.selectedSort].localeCompare(post2[this.selectedSort]);
        }
      )
    }
  }


})
</script>







<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


.app {
  padding: 15px;
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
}


</style>
