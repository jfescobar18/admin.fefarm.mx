import navbar from '../components/navbar.js?n=1'
import home from '../components/home.js?n=1'
import Solicitudes from '../components/solicitudes.js?n=1'
import List from '../components/lista.js?n=1'
import Aplicaciones from '../components/aplicaciones.js?n=1'
import Reglamento from '../components/reglamento.js?n=1'
import Evidencias from '../components/evidencias.js?n=1'
import Requisitos from '../components/requisitos.js?n=1'
import Noticias from '../components/noticias.js?n=1'

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