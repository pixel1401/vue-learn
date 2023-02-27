import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index';
import components from "@/UI/index";
import directives from './directives';

const app = createApp(App);



components.forEach(component => {
    if(component?.name) {
        app.component(component.name , component);
    }
    
});


directives.forEach((directive)=> {
    app.directive(directive.name , directive);
})





app
    .use(router)
    .use(store)
    .mount('#app')
