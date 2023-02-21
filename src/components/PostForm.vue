<template>
    <div>
        <my-button @click="setModalShow">Создать пост</my-button>
        <my-modal v-model:show="modalShow">
            <form @submit.prevent class="form">
                <my-input v-bind:value="post.title" @input="inputTile" class="form__input" type="text"
                    placeholder="Title" />
                <my-input v-model="post.body" class="form__input" type="text" placeholder="Body" />

                <my-button @click="createPost" class="form__btn">Create</my-button>
            </form>
        </my-modal>
    </div>
</template>



<script >
export default {


    data() {
        return {
            post: {
                title: '',
                body: ''
            },
            modalShow: false
        }
    },

    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                body: '',
                title: ''
            };
            this.modalShow = false;
        },

        inputTile(event) {
            this.post.title = event.target.value;
        },

        setModalShow() {
            this.modalShow = !this.modalShow;
        }
    }

}

</script>



<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;

    /* &__input {
      border: 2px solid teal;
      padding: 10px 15px;
      margin-bottom: 10px;
    } */
    &__btn {
        width: fit-content;
        padding: 10px 15px;
    }
}
</style>
