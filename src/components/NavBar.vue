<template>
    <nav class="nav">
        <div @click="$router.push('/')" class="nav__logo" >Logo</div>
        <my-button  @click="$router.push('/post')"
        >Посты</my-button>
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
    }
</style>