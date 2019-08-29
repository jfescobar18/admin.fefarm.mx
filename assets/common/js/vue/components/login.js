var Login = Vue.component('Login', {
    props: ['loginUsername', 'loginPassword'],
    data() {
        return {
            User: this.loginUsername,
            Password: this.loginPassword
        }
    },
    methods: {
        IsLogged: function () {
            if (localStorage.getItem('IsLogged') !== null) {
                window.location.href = '/#/Home';
            }
        },
        handleUser(e) {
            this.$emit('input', this.User)
        },
        handlePassword(e) {
            this.$emit('input', this.Password)
        },
        processForm: function () {
            this.$http.post("http://api.fefarm.mx/Users/Login", {
                UserAdmin_User_Username: this.loginUsername,
                UserAdmin_User_Password: this.loginPassword
            }).then(
                response => {
                    if (response.status === 200) {
                        localStorage.setItem("IsLogged", 'true');
                        window.location.replace("/#/Home");
                    }
                    else {
                        swal({
                            icon: "error",
                            title: "Credenciales inválidas",
                            text: "Por favor verifica tu usuario y tu contraseña"
                        });
                    }
                },
                err => {
                    console.log(err);
                    if (err.status === 403) {
                        swal({
                            icon: "error",
                            title: "Credenciales inválidas",
                            text: "Por favor verifica tu usuario y tu contraseña"
                        });
                    }
                    else {
                        swal({
                            icon: "error",
                            title: "¡Ups!",
                            text: "Algo ha ido mal, intenta más tarde"
                        });
                    }
                }
            );
        }
    },
    template: `
        <div>
            <div class="wrapper">
                <div class="container">
                    <h1>Welcome</h1>
                    
                    <form class="form" @submit.prevent="processForm">
                        <input type="text" placeholder="Username" required v-model="loginUsername" @input="handleUser" >
                        <input type="password" placeholder="Password" required v-model="loginPassword" @input="handlePassword" >
                        <button type="submit" id="login-button">Login</button>
                    </form>
                </div>
                
                <ul class="bg-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    `,
    mounted() {
        this.IsLogged();
    }
})

export default Login;