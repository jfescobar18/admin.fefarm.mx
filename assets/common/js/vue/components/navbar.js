var Navbar = Vue.component('Navbar', {
    methods: {
        IsLogged: function () {
            if (localStorage.getItem('IsLogged') === null) {
                window.location.href = '/';
            }
        }
    },
    template: `
        <nav class="main-menu">
            <ul>
                <li class="">
                    <router-link to="/Home">
                        <i class="fa fa-home fa-2x"></i>
                        <span class="nav-text">
                            Inicio
                        </span>
                    </router-link>
                </li>
                <li class="">
                    <router-link to="Files">
                        <i class="far fa-file-pdf fa-2x"></i>
                        <span class="nav-text">
                            Convocatorias
                        </span>
                    </router-link>
                </li>
                <li class="">
                    <router-link to="#">
                        <i class="fas fa-cogs fa-2x"></i>
                        <span class="nav-text">
                            Section
                        </span>
                    </router-link>
                </li>
                <li class="">
                    <router-link to="#">
                        <i class="fas fa-cogs fa-2x"></i>
                        <span class="nav-text">
                            Section
                        </span>
                    </router-link>
                </li>
            </ul>
            <ul class="logout">
                <li>
                    <router-link to="#">
                        <i class="fa fa-power-off fa-2x"></i>
                        <span class="nav-text">
                            Logout
                        </span>
                    </router-link>
                </li>
            </ul>
        </nav>
    `,
    mounted() {
        this.IsLogged();
    }
})

export default Navbar;