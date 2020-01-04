var navbar = Vue.component('navbar', {
    template: `
        <div id="nav" class="nav">
            <div class="icon">
                <ul>
                    <li><router-link to="/"><i class="fa fa-home"></i></router-link></li>
                    <li><router-link to="/Reglamento"><i class="fas fa-file-pdf"></i></router-link></li>
                    <li><router-link to="/Evidencias"><i class="fas fa-file-pdf"></i></router-link></li>
                    <li><router-link to="/Requisitos"><i class="fas fa-file-pdf"></i></router-link></li>
            
                </ul>
            </div>
            <div class="text">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/Reglamento">Reglamento</router-link></li>
                    <li><router-link to="/Evidencias">Evidencias</router-link></li>
                    <li><router-link to="/Requisitos">Requisitos</router-link></li>
                </ul>
            </div>
        </div>
    `
});

export default navbar;