import { createApp } from 'vue'
import App from './App.vue'
import components from "@/UI/index";

const app = createApp(App);



components.forEach(component => {
    if(component?.name) {
        app.component(component.name , component);
    }
    
});



app.mount('#app')
