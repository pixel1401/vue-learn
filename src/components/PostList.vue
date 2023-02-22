<template>
    <div>
        <h2>Список постов</h2>
        <br>
        <transition-group name="fade">
            <PostItem v-if="posts.length > 0" @remove="$emit('deletePost', post)" :post="post" v-for="post in posts"
                :key="post.id"></PostItem>
            <div v-else>Постов нет</div>
        </transition-group>
    </div>
</template>


<script lang="ts">
import { IPost } from '@/Modals/IPost';
import { PropType, defineComponent } from 'vue';
import PostItem from '@/components/ProductItem.vue';


export default defineComponent({
    components: {
        PostItem
    }, 
    props: {
        posts: {
            type: Array as PropType<IPost[]>,
            required: true
        }
    },
    setup(props) {
        return {
            posts: props.posts
        }
    },

    methods: {

    }
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease;
}

.fade-enter,
.fade-leave-to{
    opacity: 0;
    transform: translateX(130px);
}

.fade-move {
    transition: transform 0.4s ease;
}</style>