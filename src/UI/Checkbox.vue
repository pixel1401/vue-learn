
<template>
    <input type="checkbox" id="checkbox" :value="modelValue" @input="onChange" />
</template>

<script>

export default {
    name: 'my-checkbox',
    props: {
        modelValue : Boolean
    },
    
    
    methods: {
        onChange(e) {
            console.log(e);
            this.$emit('update:modelValue' , true )   
        }
    }
}
</script>
