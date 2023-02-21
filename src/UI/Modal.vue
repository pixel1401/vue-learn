<template>
    <div class="modal" v-if="show" @click.stop="hideModal">
        <div @click.stop class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({
        name : 'my-modal',
        data() {
            return {
                
            }
        } ,
        props : {
            show : {
                type : Boolean ,
                default : false
            }
        },

        methods: {
            hideModal() {
                this.$emit('update:show' , false);
            }
        }
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