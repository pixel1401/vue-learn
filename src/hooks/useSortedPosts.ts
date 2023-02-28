import { IPost } from "@/Modals/IPost";
import { computed, Ref, ref } from "vue";


export function useSortedPost (posts : any) {
    const selectedSort = ref<''| 'title' | 'body'>('');

    const selectedPost = computed(()=> {
         if (selectedSort.value === '') {
            return posts.value;
          } else {
            return posts.value.sort(
              (post1: IPost, post2: IPost) => {
                return post1[selectedSort.value as 'title' | 'body'].localeCompare(post2[selectedSort.value as 'title' | 'body']);
              }
            )
          }
    })

    return {selectedPost , selectedSort};
}