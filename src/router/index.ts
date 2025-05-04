import { createRouter, createWebHistory } from 'vue-router'; 
import AddFood from '../pages/AddFood.vue';
import History from '../pages/History.vue';

const routes = [ 
    {path: '/', component: AddFood}, 
    {path: '/history', component: History}
]

export default createRouter({
    history: createWebHistory(), 
    routes
})