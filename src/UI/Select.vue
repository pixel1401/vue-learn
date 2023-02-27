<template>
    <select :value="modelValue" @change="changeOption">
        <option disabled value="">Выберите из списка</option>
        <option v-for="option in options"  :value="option.value" :key="option.value" >{{option.name}}</option>
    </select>
</template>

<script lang="ts">
 import { defineComponent } from "vue";
    export default defineComponent({
        name : 'my-select' ,
        props: {
            modelValue : {
                type: String,
            },

            options : {
                type : Object,
                default : ()=> []
            }
            
        },
        methods: {
            changeOption (event : any ) {
                this.$emit('update:modelValue' , event.currentTarget.value)
            }
        },
        
    })
</script>


<style></style>