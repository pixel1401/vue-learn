

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
    <post-list v-if="isLoadPosts == false && posts.length > 0" @deletePost="deletePost" :posts="selectedQuery" />
    <div v-else>Идет загрузка</div>

    <!-- <div v-show="isPaginationOrScroll"   ref="observer" class="observer"></div> -->
    <div v-show="isPaginationOrScroll" v-observer="({
      totalPage: totalPage,
      page: currentPage,
      getLoadData: getPostsScroll,
      isPaginationOrScroll
    } as IObserver)" class="observer"></div>

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
import { defineComponent, nextTick, reactive, ref } from 'vue'
import axios from 'axios';
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { IPost } from '@/Modals/IPost';
import { IObserver } from '@/directives/VObserver';
import { mapActions } from 'vuex';




export default defineComponent({


  components: {
    PostForm, PostList
  },


  data() {
    return {
      posts: [] as IPost[],
      isLoadPosts: true,
      isPaginationOrScroll: true,
      selectedSort: '' as 'title' | 'body' | '',
      sortOptions: [
        { value: "title", name: 'По названию' },
        { value: "body", name: 'По содержимому' },
      ],
      postsQuery: '',
      limitPage: 10,
      currentPage: 1,
      totalPage: 0,
    }
  },

  methods: {

    ...mapActions({
      setPosts: 'post/setPosts'
        }),


    createPost(post: IPost) {
      this.posts.push(post);
    },


    deletePost(post: IPost) {
      this.posts = this.posts.filter((elem) => elem.id !== post.id);
    },


    async getPosts() {
      this.isLoadPosts = true;
      let data = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _limit: this.limitPage,
          _page: this.currentPage
        }
      });
      this.totalPage = Math.ceil(data.headers['x-total-count'] / this.limitPage);
      this.posts = data.data;
      this.setPosts(this.posts)
      this.isLoadPosts = false;
    },


    async getPostsScroll() {
      this.currentPage++;
      let data = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _limit: this.limitPage,
          _page: this.currentPage
        }
      });
      this.totalPage = Math.ceil(data.headers['x-total-count'] / this.limitPage);
      this.posts = [...this.posts, ...data.data];
      this.setPosts(this.posts)
    },



    changePage(page: number) {
      this.currentPage = page;
    },



  },

  mounted() {
    this.getPosts();


    // let observerElem = this.$refs.observer as Element;

    // let options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // let callback: IntersectionObserverCallback = (entries, observer) => {

    //   if (entries[0].isIntersecting == false && this.isPaginationOrScroll && this.currentPage +1  < this.totalPage ) return;
    //   this.getPostsScroll();
    // };
    // let observer = new IntersectionObserver(callback, options);
    // observer.observe(observerElem);
  },

  computed: {
    selectedPost(): IPost[] {
      if (this.selectedSort === '') {
        return this.posts;
      } else {
        return this.posts.sort(
          (post1: IPost, post2: IPost) => {
            return post1[this.selectedSort as 'title' | 'body'].localeCompare(post2[this.selectedSort as 'title' | 'body']);
          }
        )
      }
    },


    selectedQuery(): IPost[] {
      if (this.postsQuery == '') {
        return this.selectedPost.filter((post) => true)
      } else {
        return this.selectedPost.filter((post) => post.title.includes(this.postsQuery))
      }
    },




  },

  watch: {
    currentPage() {
      if (this.isPaginationOrScroll) return;
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
  