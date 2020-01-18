import navbar from '../components/navbar.js'
import home from '../components/home.js'
import Solicitudes from '../components/solicitudes.js'
import List from '../components/lista.js'
import Aplicaciones from '../components/aplicaciones.js'
import Reglamento from '../components/reglamento.js'
import Evidencias from '../components/evidencias.js'
import Requisitos from '../components/requisitos.js'
import Noticias from '../components/noticias.js'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/Lista',
        name: 'List',
        component: List
    },
    {
        path: '/Aplicaciones/:Request_Id',
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
    },
    {
        path: '/Noticias',
        name: 'Noticias',
        component: Noticias
    }
];

const router = new VueRouter({
    routes
});

export default router;