var Aplicaciones = Vue.component('Aplicaciones', {
    props: {
        Applications: {
            default: {}
        }
    },
    methods: {
        loadApplications: function () {
            showLoader();
            this.$http.get(APIUrl() + 'Application/GetApplications', {
                headers: {
                    APIKey: config.APIKey
                }
            }).then(
                response => {
                    this.Applications = response.body.map(function (x) {
                        x.Application_Date = new Date(x.Application_Date).toISOString().substr(0, 10);
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
                    APIKey: config.APIKey
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
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
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
                                        <td>{{ application.Application_Applicant_Name }}</td>
                                        <td>{{ application.Application_Applicant_Email }}</td>
                                        <td>{{ application.Application_Applicant_Phone }}</td>
                                        <td>{{ application.Application_Score }}</td>
                                        <td>{{ application.Application_Date }}</td>
                                        <td class="text-center">
                                            <a class="btn btn-danger btn-sm" target="_blank" v-bind:href="application.Application_PDF_Path"><i class="fas fa-file-pdf"></i></a>
                                        </td>
                                        <td class="text-center">
                                            <button type="button" class="btn btn-success btn-sm" v-on:click="donwloadZIP(application.Application_Id)"><i class="fas fa-file-archive"></i></button>
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

export default Aplicaciones;