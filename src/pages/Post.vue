<template>
    <div class="post">
        <div class="post__title"><strong>Названия {{ idPost }}:</strong>{{ title }}  </div>
        <div class="post__body"><strong>Описание: </strong>{{ body }}</div>
    </div>
</template>



<script lang="ts">
import PostModuleState from '@/store/post/types';
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';
import { mapActions, useStore } from 'vuex';

export default defineComponent({

    data() {
        let idPost = this.$route.params.id;
        this.setCurrentPost(idPost);


        const store = useStore().state.post as PostModuleState;
        let title = computed(() => store.currentPost?.title);
        let body = computed(() => store.currentPost?.body);

        


        return{
            idPost,
            title,
            body
        }
    },

    methods: {
        ...mapActions({
            setCurrentPost: 'post/setCurrentPost'
        })
    },


})
</script>


<style scoped lang="scss">
    .post {
        display: flex;
        flex-direction: column;
        gap: 10px;
        &__title {
            & strong {
                margin-right: 17px;
            }
        }
        &__body {
            & strong {
                margin-right: 17px;
            }
        }
    }
</style>