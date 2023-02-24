<template>
    <div class="modal" v-if="show" @click.stop="hideModal">
        <div @click.stop class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import modalMixin from "@/mixins/modalMixin";
    import { defineComponent } from "vue";
    export default defineComponent({
        name : 'my-modal',
        mixins: [modalMixin],   
    })
</script>


<style scoped lang="scss">
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:rgba($color: #000000, $alpha: .5);
        /* opacity: ; */
    }
    
    .content {
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px teal;
    }
</style>