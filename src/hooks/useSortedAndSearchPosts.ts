

import { IPost } from "@/Modals/IPost";
import { computed, Ref, ref } from "vue";


export function useSortedAndSearchPost (selectedPost : any) {
    const postsQuery = ref<string>('');

    const selectedQuery = computed(()=> {
        if (postsQuery.value == '') {
            return selectedPost.value.filter((post : any ) => true)
          } else {
            return selectedPost.value.filter((post : any) => post.title.includes(postsQuery.value))
          }
    })

    return {selectedQuery , postsQuery};
}