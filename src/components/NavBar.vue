<template>
    <nav class="nav">
        <div @click="$router.push('/')" class="nav__logo" >Logo</div>
        <div class="nav__btns">
            <my-button  @click="$router.push('/post')">Посты</my-button>
            <my-button  @click="$router.push('/post-store')">Посты-Store</my-button>
            <my-button  @click="$router.push('/post-composition')">Посты-CompositionApi</my-button>
        </div>
    </nav>
</template>



<script lang="ts">
    export default {
        
    }
</script>

<style lang="scss">
    .nav {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        /* background-color:rgba($color: teal, $alpha: .5); */
        border: 1px solid teal;
        margin-bottom: 25px;
            &__logo {
                cursor: pointer;
            }

            &__btns {
                display: flex;
                gap: 10px;
            }
    }
</style>