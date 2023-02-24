<template>
    <div class="post">
        <div class="post__info">
            <div><strong>Названия</strong>{{ post.title }}</div>
            <div><strong>Описание</strong>{{ post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button @click="$router.push(`/post/${post.id}`)" >Открыть</my-button>
            <my-button @click="$emit('remove' , post)" class="post__btn">Удалить</my-button>
        </div>
    </div>
</template>

<script lang="ts">

    import { IPost } from '@/Modals/IPost';
    import { PropType, defineComponent } from 'vue';
    


export default defineComponent({

 
    props: {
        post: {
            type: Object as PropType<IPost>,
            required: true
        }
    },
    
    methods : {
        
    },

    
    setup(props) {
        return { 
              
            post: props.post
        }
    },


});
</script>



<style lang="scss" scoped>
.post {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 1px solid teal;
    margin-bottom: 10px;

    & strong {
        margin-right: 10px;
    }


    &__info {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    &__btns {
        margin-left: 20px;
        display: flex;
        gap: 5px;
    }
}
</style>