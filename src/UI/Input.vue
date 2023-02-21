<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text"/>
</template>

<script>
    export default {
        name : 'my-input',
        props : {
            modelValue : [String , Number]
        } ,
        methods : {
            updateInput(e) {
                this.$emit('update:modelValue' , e.target.value);
            }
        }
    }
</script>


<style lang="scss">

    .input {
      border: 2px solid teal;
      padding: 10px 15px;
      margin-bottom: 10px;
    }


</style>