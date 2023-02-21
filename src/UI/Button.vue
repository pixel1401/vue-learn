

<template>
    <button  class="btn">
        <slot></slot>
    </button>
</template>


<script lang="ts">
    export default {
        name : 'my-button'
    }
</script>



<style lang="scss" scoped>
    .btn {
        padding: 10px 20px;
        border: 1px solid teal;
        background: none;
        color: black;
        font-weight: 600;

    }

</style>