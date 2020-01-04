import navbar from '../components/navbar.js'
import home from '../components/home.js'
import Reglamento from '../components/Reglamento.js'
import Evidencias from '../components/Evidencias.js'
import Requisitos from '../components/Requisitos.js'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/Reglamento',
        name: 'Reglamento',
        component: Reglamento
    },
    {
        path: '/Evidencias',
        name: 'Evidencias',
        component: Evidencias
    },
    {
        path: '/Requisitos',
        name: 'Requisitos',
        component: Requisitos
    }
];

const router = new VueRouter({
    routes
});

export default router;