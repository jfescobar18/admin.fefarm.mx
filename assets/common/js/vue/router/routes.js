import navbar from '../components/navbar.js'
import home from '../components/home.js'
import Solicitudes from '../components/solicitudes.js'
import Aplicaciones from '../components/aplicaciones.js'
import Reglamento from '../components/reglamento.js'
import Evidencias from '../components/evidencias.js'
import Requisitos from '../components/requisitos.js'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/Aplicaciones',
        name: 'Aplicaciones',
        component: Aplicaciones
    },
    {
        path: '/Solicitudes',
        name: 'Solicitudes',
        component: Solicitudes
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