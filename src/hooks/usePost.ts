import { IPost } from "@/Modals/IPost";
import axios from "axios";
import { onMounted, ref } from "vue";


export function usePost(limitPage : number , currentPage : number) {
    const posts  = ref<IPost[]>([]);
    const totalPage = ref(0);
    const isLoadPosts = ref(true);

    const fetching = async () => {
            let data  = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _limit: limitPage,
                _page: currentPage
              }
            });
            totalPage.value = Math.ceil(data.headers['x-total-count'] / limitPage);
            posts.value = data.data;
            isLoadPosts.value = false;
            
    }


    onMounted(fetching)
    


    return {posts, totalPage , isLoadPosts};    
}   
