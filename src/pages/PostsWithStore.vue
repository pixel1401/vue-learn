

<template>
    
    <div class="post">
      <div class="query__scroll">
        <my-input  class="query" :model-value="postsQuery" @update:model-value="updateQuery" placeholder="Поиск..."></my-input>
        <my-checkbox class="scroll__checkbox" :model-value="isPaginationOrScroll" @update:model-value="updateIsScrollOrPagination" type="checkbox"></my-checkbox>
      </div> 
      <div class="post__top">
        <post-form @create="createPost" />
        <my-select :model-value="selectedSort" @update:model-value="updateSortOptions"  :options="sortOptions"></my-select>
      </div>
      <post-list v-if="isLoadPosts == false && posts.length > 0" @deletePost="deletePost" :posts="selectedQuery" />
      <div v-else>Идет загрузка</div>
  

      <div v-show="isPaginationOrScroll" v-observer="({
        totalPage : totalPage,
        page: currentPage,
        getLoadData : getPostsScroll,
        isPaginationOrScroll
      } as IObserver)"  class="observer"></div>
  
      <div v-if="isPaginationOrScroll == false" class="page__wrap">
        <div v-for="pageNum in totalPage" @click="setCurrentPage(pageNum)" class="page__item" :class="{
          'page__active': pageNum == currentPage
        }">
          {{ pageNum }}
        </div>
      </div>
  
  
    </div>
  </template>
  
  
  <script lang="ts">
  import { defineComponent, nextTick, reactive, ref } from 'vue'
  import {mapActions , mapGetters , mapState , mapMutations, useStore} from 'vuex'
  import PostForm from '@/components/PostForm.vue';
  import PostList from '@/components/PostList.vue';
import { IPost } from '@/Modals/IPost';
import { computed } from '@vue/reactivity';
import { IObserver } from '@/directives/VObserver';


  
  
  
  export default defineComponent({
    
    setup () {
        const store = useStore().state.post;

        const posts = computed(()=> store.posts);
        let postsQuery = computed(() => store.postsQuery)
        let isPaginationOrScroll = computed(()=> store.isPaginationOrScroll);
        let selectedSort = computed(()=> store.selectedSort)
        let sortOptions = computed(()=> store.sortOptions)
        
        let isLoadPosts = computed(()=> store.isLoadPosts);

        let totalPage = computed(()=> store.totalPage)
        let currentPage = computed(()=> store.currentPage);

        

        return {posts , postsQuery ,isPaginationOrScroll , selectedSort , sortOptions , isLoadPosts , totalPage , currentPage}
        
    },

    
    components: {
      PostForm, PostList
    },
  
    methods: {
      ...mapMutations({
        changePage : 'post/changePage',
        createPost : 'post/createPost',
        deletePost : 'post/deletePost',
        updateQuery : 'post/updateQuery',
        updateSortOptions : 'post/updateSortOptions',
        updateIsScrollOrPagination : 'post/updateIsScrollOrPagination'

      }),
      ...mapActions({
        getPosts : 'post/getPosts',
        getPostsScroll : 'post/getPostsScroll',
        setCurrentPage : 'post/setCurrentPage'
      })
    },
  
    mounted() {
        this.getPosts();
    },
  
    computed: {
        ...mapGetters({
            selectedPost : 'post/selectedPost',
            selectedQuery : 'post/selectedQuery'
        })
    },
  
    watch: {
      currentPage() {
        if(this.isPaginationOrScroll ) return;
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
  
  
  .post {
  
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
  
  
  .observer {
    width: 100%;
    height: 100px;
  }
  
  
  
  .query__scroll {
    display: flex;
    justify-content: space-between;
  }
  </style>
  
