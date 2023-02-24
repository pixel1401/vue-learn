<template>
    <input type="checkbox" id="checkbox" :checked="modelValue" @change="onChange" />
</template>

<script>
import { PropType, defineComponent } from 'vue';

export default defineComponent ({
    name: 'my-checkbox',
    props: {
        modelValue : {
            require: true,
            type : Boolean
        }
    },
    
    methods: {
        onChange(e) {
            this.$emit('update:modelValue' , e.target.checked )   
        }
    }
})
</script>
