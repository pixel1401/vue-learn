
<template>
  <div class="post">
    <div class="query__scroll">
      <my-input class="query" v-model="postsQuery" placeholder="Поиск..."></my-input>
      <my-checkbox class="scroll__checkbox" v-model="isPaginationOrScroll" type="checkbox"></my-checkbox>
    </div>
    <div class="post__top">
      <post-form @create="createPost" />
      <my-select v-model:modelValue="selectedSort" :options="sortOptions"></my-select>
    </div>
    <post-list v-if="isLoadPosts == false && selectedQuery.length > 0" @deletePost="deletePost" :posts="selectedQuery" />
    <div v-else>Идет загрузка</div>

    <div v-show="isPaginationOrScroll" ref="observerRef" class="observer"></div>


    <div v-if="isPaginationOrScroll == false" class="page__wrap">
      <div v-for="pageNum in totalPage" @click="changePage(pageNum)" class="page__item" :class="{
        'page__active': pageNum == currentPage
      }">
        {{ pageNum }}
      </div>
    </div>
  </div>
</template>
  
  
<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
import axios from 'axios';
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { IPost } from '@/Modals/IPost';
import { IObserver } from '@/directives/VObserver';
import { usePost } from '@/hooks/usePost';
import { useSortedPost } from '@/hooks/useSortedPosts';
import { useSortedAndSearchPost } from '@/hooks/useSortedAndSearchPosts';




export default defineComponent({


  components: {
    PostForm, PostList
  },




  setup() {

    const observerRef = ref(null);

    const currentPage = ref(1);
    const isPaginationOrScroll = ref(false);

    onMounted(() => {

    })
    const { posts, totalPage, isLoadPosts } = usePost(10, currentPage, observerRef, isPaginationOrScroll);

    const { selectedPost, selectedSort } = useSortedPost(posts);


    const { selectedQuery, postsQuery } = useSortedAndSearchPost(selectedPost);

    return {
      posts,
      observerRef,
      totalPage,
      isLoadPosts,
      selectedPost,
      selectedQuery,
      selectedSort,
      postsQuery,
      currentPage,
      isPaginationOrScroll,
      sortOptions: [
        { value: "title", name: 'По названию' },
        { value: "body", name: 'По содержимому' },
      ],
    }
  },

  methods: {
    changePage(value: number) {
      this.currentPage = value;
    },

    createPost(post: IPost) {
      this.posts.push(post);
    },


    deletePost(post: IPost) {
      this.posts = this.posts.filter((elem) => elem.id !== post.id);
    },
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
  