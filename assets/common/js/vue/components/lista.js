var List = Vue.component('List', {
    props: {
        Requests: {
            default: {}
        }
    },
    methods: {
        loadApplications: function () {
            showLoader();
            this.$http.get(APIUrl() + 'Requests/GetRequestTemplates', {
                headers: {
                    APIKey: config.APIKey
                }
            }).then(
                response => {
                    this.Requests = response.body;
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        }
    },
    template: `
        <div class="scrollcontent">
            <div class="title text-center">
                <h1>Aplicaciones</h1>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="request in Requests">
                                        <td class="text-center">{{ request.Request_Id }}</td>
                                        <td class="text-center">{{ request.Request_Name }}</td>
                                        <td class="text-center">
                                            <router-link class="btn btn-info" v-bind:to="'/Aplicaciones/' + request.Request_Id ">Ver aplicaciones</router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    created: function () {
        this.loadApplications();
    }
})

export default List;