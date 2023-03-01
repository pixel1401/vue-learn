import { IPost } from "@/Modals/IPost";
import store from "@/store";
import axios from "axios";
import { onMounted, Ref, ref, watch  } from "vue";


export function usePost(limitPage: number, currentPage: Ref<number>, el: Ref, isScroll: Ref<boolean> = ref(false)) {
  const posts = ref<IPost[]>([]);
  const totalPage = ref(0);
  const isLoadPosts = ref(true);

  const fetching = async (isPush: boolean = false) => {
    if(isPush) {
      currentPage.value += 1;
    }
    let data = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: limitPage,
        _page: currentPage.value
      }
    });
    totalPage.value = Math.ceil(data.headers['x-total-count'] / limitPage);
    if (isPush) {
      posts.value = [...posts.value, ...data.data];
    } else {
      posts.value = data.data;
      
    }

    console.log('workkk');
    
    store.dispatch('post/setPosts', posts.value )

    isLoadPosts.value = false;
  }


  onMounted(() => {

    fetching();
    

  })

  

  watch(currentPage, (count, prevCount) => {
    if (count != prevCount && isScroll.value == false) {
      fetching()
    }
  });




  watch(isScroll, (current, prev) => {
    if (current == true) {
      let observerElem = el?.value;
      let options = {
        rootMargin: '0px',
        threshold: 1.0
      }
      let callback: IntersectionObserverCallback = (entries, observer) => {
        
        if (entries[0].isIntersecting == false || !isScroll.value || currentPage.value + 1 >= totalPage.value) return;
        fetching(true);
      };
      let observer = new IntersectionObserver(callback, options);
      observer.observe(observerElem);
    }
  })


  


  return { posts, totalPage, isLoadPosts };
}   
