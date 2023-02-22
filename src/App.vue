

<template>
  <div class="app">
    <my-input v-model="postsQuery" placeholder="Поиск..."></my-input>
    <div class="app__top">
      <post-form @create="createPost" />
      <my-select v-model:modalValue="selectedSort"
        :options="sortOptions"
      ></my-select>
    </div>
    <post-list v-if="isLoadPosts == false" @deletePost="deletePost" :posts="selectedQuery" />
    <div v-else>Идет загрузка</div>

    <div class="page__wrap">
      <div v-for="pageNum in totalPage"  @click="changePage(pageNum)"   class="page__item"  :class="{
        'page__active' : pageNum == currentPage
      }">
        {{ pageNum }}
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import  { defineComponent , nextTick , reactive , ref  } from 'vue'
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
      posts: ref<IPost[]>([]) ,
      isLoadPosts : true , 
      selectedSort : '' as 'title' | 'body' | '' ,
      sortOptions : [
        {value: "title" , name : 'По названию'},
        {value: "body" , name : 'По содержимому'},
      ],
      postsQuery: '' ,
      limitPage : 10 ,
      currentPage : 1,
      totalPage : 0
    }
  },

  methods: {
    createPost(post: IPost) {
      this.posts.push(post); 
    },


    deletePost ( post : IPost ) {
      console.log('wadaw');
      
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
      let data = await axios.get('https://jsonplaceholder.typicode.com/posts' , {
        params: {
          _limit : this.limitPage ,
          _page : this.currentPage
        }
      });
      this.totalPage = Math.ceil(data.headers['x-total-count'] / this.limitPage);
      this.posts = data.data;
      this.isLoadPosts = false;
    },



    changePage(page : number) {
      this.currentPage = page;
    }


  },

  mounted () {
    this.getPosts();
  },

  computed: {
    selectedPost () : IPost[] {
      if(this.selectedSort === '') {
        return this.posts;
      }else  {
        return this.posts.sort(
        (post1 : IPost , post2 : IPost)=> {
          return post1[this.selectedSort as 'title' | 'body'].localeCompare(post2[this.selectedSort as 'title' | 'body']);
        }
      )
      }
    },


    selectedQuery () : IPost[] {
      if(this.postsQuery == '') {
        return  this.selectedPost.filter((post) => true)
      }else {
        return  this.selectedPost.filter((post) => post.title.includes(this.postsQuery))
      }
    }

  },

  watch: {
    currentPage () {
      this.getPosts()
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

.page {
  &__wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px;
  }

  &__item {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid grey;
  }

  &__active {
    border-color: teal;
    border-width: 2px;
    color: teal;
  }
}


</style>
