<template>
    <h1>Главная страница</h1>
    <my-button @click="$store.commit('increment')">Increment</my-button>
    <br>
    <h2>{{ $store.state.post.count }}</h2>
</template>


<script></script>

