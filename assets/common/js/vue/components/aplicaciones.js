var Aplicaciones = Vue.component('Aplicaciones', {
    props: {
        Applications: {
            default: {}
        }
    },
    methods: {
        loadApplications: function () {
            showLoader();
            this.$http.get(APIUrl() + 'Application/GetApplications/' + this.$route.params.Request_Id, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    console.log(response.body);

                    this.Applications = response.body.map(function (x) {
                        x.Application_Date = new Date(x.Application_Date).toISOString().substr(0, 10);
                        x.IdNumber = new Date(x.Application_Date).toISOString().substr(0, 10).split('-').join('') + x.Application_Id;
                        x.Application_PDF_Path = APIUrl() + x.Application_PDF_Path;
                        return x
                    });
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        donwloadZIP: function (Application_Id) {
            showLoader();
            this.$http.get(APIUrl() + 'Application/GetApplicationDocumentation/' + Application_Id, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    const link = document.createElement('a');
                    link.href = APIUrl() + response.body.path;
                    link.setAttribute('download', response.body.filename);
                    document.body.appendChild(link);
                    link.click();

                    hideLoader();
                    document.body.removeChild(link);
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        downloadExcel: function () {
            showLoader();
            this.$http.get(APIUrl() + 'Application/GetApplicationsExcel/' + this.$route.params.Request_Id, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    const link = document.createElement('a');
                    link.href = APIUrl() + response.body.path;
                    link.setAttribute('download', response.body.filename);
                    document.body.appendChild(link);
                    link.click();

                    hideLoader();
                    document.body.removeChild(link);
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
                        <div class="text-right table">
                            <button v-on:click="downloadExcel" class="btn btn-success">Descargar Excel</button>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Folio</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Teléfono Celular</th>
                                        <th>Puntaje</th>
                                        <th>Fecha de solicitud</th>
                                        <th>Solicitud</th>
                                        <th>Documentos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="application in Applications">
                                        <td>{{ application.Application_Id }}</td>
                                        <td>{{ application.IdNumber }}</td>
                                        <td>{{ application.Application_Applicant_Name }}</td>
                                        <td>{{ application.Application_Applicant_Email }}</td>
                                        <td>{{ application.Application_Applicant_Phone }}</td>
                                        <td>{{ application.Application_Score }}</td>
                                        <td>{{ application.Application_Date }}</td>
                                        <td class="text-center">
                                            <a class="btn btn-danger btn-sm" target="_blank" v-bind:href="application.Application_PDF_Path"><i class="fas fa-file-pdf"></i></a>
                                        </td>
                                        <td class="text-center">
                                            <button type="button" class="btn btn-info btn-sm" v-on:click="donwloadZIP(application.Application_Id)"><i class="fas fa-file-archive"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <router-link class="btn btn-warning" to="/Lista"><i class="fas fa-arrow-left"></i> Voler</router-link>
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

export default Aplicaciones;