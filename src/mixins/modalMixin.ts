import { defineComponent } from 'vue';


export default defineComponent({
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
});