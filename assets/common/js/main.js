import Login from './vue/components/Login.js'
import Navbar from './vue/components/navbar.js'
import Index from './vue/components/index.js'
import Files from './vue/components/Files.js'
import NewFile from './vue/components/newfile.js'

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/Home',
            name: 'Index',
            component: Index
        },
        {
            path: '/Files',
            name: 'Files',
            component: Files
        },
        {
            path: '/NewFile',
            name: 'NewFile',
            component: NewFile
        }
    ]
});

const app = new Vue({
    el: '#app',
    router
})