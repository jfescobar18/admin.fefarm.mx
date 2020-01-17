var Solicitudes = Vue.component('Solicitudes', {
    props: {
        Requests: {
            default: {}
        },
        RequestModel: {
            default: {
                Request_Id: 0,
                Request_Name: '',
                Request_JSON_Body: '',
                Request_Start_Date: null,
                Request_Finish_Date: null,
                Request_Max_Applications: null,
                Request_Max_Beneficiaries: null
            }
        },
        RequestTemplate: {
            default: [
                {
                    id: 1,
                    label: 'Tipo de solicitud',
                    type: '3',
                    values: {
                        string: 'Beca,Estancia',
                        array: ['Beca', 'Estancia']
                    },
                    points: {
                        string: '',
                        array: []
                    },
                    answers: [''],
                    required: false,
                    size: '3 mb-6 mt-6'
                }
            ]
        },
        InputModel: {
            default: {
                id: 0,
                label: '',
                type: 0,
                values: {
                    string: '',
                    array: []
                },
                points: {
                    string: '',
                    array: []
                },
                answers: [],
                required: false,
                size: 12
            }
        }
    },
    methods: {
        initUI: function () {

        },
        loadRequests: function () {
            showLoader();
            this.$http.get(APIUrl() + 'Requests/GetRequestTemplates', {
                headers: {
                    APIKey: config.APIKey
                }
            }).then(
                response => {
                    this.Requests = response.body.map(function (x) {
                        x.Request_JSON_Body = JSON.parse(x.Request_JSON_Body);
                        x.Request_Start_Date = new Date(x.Request_Start_Date).toISOString().substr(0, 10);
                        x.Request_Finish_Date = new Date(x.Request_Finish_Date).toISOString().substr(0, 10);
                        x.Display_Request_Creation_Date = formatDate(new Date(x.Request_Creation_Date));
                        x.Display_Request_Start_Date = formatDate(new Date(x.Request_Start_Date));
                        x.Display_Request_Finish_Date = formatDate(new Date(x.Request_Finish_Date));
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
        saveRequest: function () {
            showLoader();

            this.$http.post(APIUrl() + `Requests/${this.RequestModel.Request_Id === 0 ? 'AddRequestTemplate' : 'UpdateRequestTemplate'}`, {
                Request_Id: this.RequestModel.Request_Id,
                Request_Name: this.RequestModel.Request_Name,
                Request_JSON_Body: JSON.stringify(this.RequestTemplate),
                Request_Start_Date: this.RequestModel.Request_Start_Date,
                Request_Finish_Date: this.RequestModel.Request_Finish_Date,
                Request_Max_Applications: this.RequestModel.Request_Max_Applications,
                Request_Max_Beneficiaries: this.RequestModel.Request_Max_Beneficiaries
            }, {
                headers: {
                    APIKey: config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', `Solicitud ${this.RequestModel.Request_Id === 0 ? 'agregada' : 'modificada'} correctamente`);
                    this.loadRequests();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );

            this.resetProps();
            this.closeModal();
        },
        modalNewRequest: function () {
            this.resetProps();
            $('#new-modal').modal();
        },
        editRequest: function (Request_Id) {
            this.RequestModel = this.Requests.filter(x => x.Request_Id === Request_Id)[0];
            this.RequestTemplate = this.RequestModel.Request_JSON_Body;
            $('#new-modal').modal();
        },
        deleteRequest: function (Request_Id) {
            showLoader();
            this.$http.post(APIUrl() + 'Requests/DeleteRequestTemplate', {
                Request_Id: Request_Id
            }, {
                headers: {
                    APIKey: config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Solicitud eliminada correctamente');
                    this.loadRequests();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        saveField: function () {
            this.parseInputModelValues();

            if (this.InputModel.id === 0) {
                this.InputModel.id = Math.max.apply(null, this.RequestTemplate.length > 0 ? this.RequestTemplate.map(x => x.id) : [0]) + 1;
                this.RequestTemplate.push(this.InputModel);
            }

            this.cleanInputModel();
        },
        editField: function (id) {
            location.hash = '#edit-form';
            this.InputModel = this.RequestTemplate.filter(x => x.id === id)[0];
        },
        deleteField: function (id) {
            this.RequestTemplate = this.RequestTemplate.filter(x => x.id !== id);
        },
        parseInputModelValues: function () {
            this.InputModel.values.array = this.InputModel.values.string.split(',');
            this.InputModel.points.array = this.InputModel.points.string.split(',');

            if (this.InputModel.type === '4') {
                this.InputModel.answers = [];
                for (let i = 0; i < this.InputModel.values.array.length; i++) {
                    this.InputModel.answers.push(false);
                }
            }
            else if (this.InputModel.type === '5') {
                this.InputModel.answers.push(false);
            }
            else {
                this.InputModel.answers.push('');
            }
        },
        resetProps: function () {
            this.cleanRequestModel();
            this.cleanRequestTemplate();
            this.cleanInputModel();
        },
        cleanRequestModel: function () {
            this.RequestModel = {
                Request_Id: 0,
                Request_Name: '',
                Request_JSON_Body: '',
                Request_Start_Date: null,
                Request_Finish_Date: null,
                Request_Max_Applications: null,
                Request_Max_Beneficiaries: null
            };
        },
        cleanRequestTemplate: function () {
            this.RequestTemplate = [{
                id: 1,
                label: 'Tipo de solicitud',
                type: '3',
                values: {
                    string: 'Beca,Estancia',
                    array: ['Beca', 'Estancia']
                },
                points: {
                    string: '',
                    array: []
                },
                answers: [''],
                required: false,
                size: '3 mb-6 mt-6'
            }];
        },
        cleanInputModel: function () {
            this.InputModel = {
                id: 0,
                label: '',
                type: 0,
                values: {
                    string: '',
                    array: []
                },
                points: {
                    string: '',
                    array: []
                },
                answers: [],
                required: false,
                size: 12
            };
        },
        closeModal: function () {
            $('#new-modal').modal('hide');
        }
    },
    template: `
        <div class="scrollcontent">
            <div class="title text-center">
                <h1>Solicitudes</h1>
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
                                        <th>Fecha de creación</th>
                                        <th>Fecha de inicio</th>
                                        <th>Fecha de finalización</th>
                                        <th>Máximo de aplicantes</th>
                                        <th>Máximo de beneficiarios</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="request in Requests">
                                        <td>{{ request.Request_Id }}</td>
                                        <td>{{ request.Request_Name }}</td>
                                        <td>{{ request.Display_Request_Creation_Date }}</td>
                                        <td>{{ request.Display_Request_Start_Date }}</td>
                                        <td>{{ request.Display_Request_Finish_Date }}</td>
                                        <td>{{ request.Request_Max_Applications }}</td>
                                        <td>{{ request.Request_Max_Beneficiaries }}</td>
                                        <td class="text-center">
                                            <button class="btn btn-info btn-sm" v-on:click="editRequest(request.Request_Id)"><i class="fas fa-edit"></i></button>
                                            <button class="btn btn-danger btn-sm" v-on:click="deleteRequest(request.Request_Id)"><i class="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-md-offset-4">
                <div class="form-group col-md-12">
                    <hr />
                    <button type="button" class="btn btn-success w100" v-on:click="modalNewRequest">Nueva Solicitud</button>
                </div>
            </div>

            <div id="new-modal" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" v-on:click="closeModal">&times;</button>
                            <h4 class="modal-title">Agregar/Editar Solicitud</h4>
                        </div>
                        <div class="modal-body">

                            <form v-on:submit.prevent="saveRequest">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="name">Nombre</label>
                                            <input required type="text" class="form-control" placeholder="" id="name" v-model="RequestModel.Request_Name">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <hr />
                                        <div class="form-group">
                                            <label for="company">Formulario</label>
                                            
                                            <div class="row">
                                                <div v-for="input in RequestTemplate" v-bind:class="'col-md-' + input.size">
                                                    <div class="form-group">
                                                        <label v-if="input.type !== '7' && input.type !== '8' && input.type !== '9' && input.type !== '10'" v-bind:for="'input-id-' + input.id">{{input.label}}</label>
                                                        
                                                        <input v-if="input.type === '1'" type="text" class="form-control" placeholder="" v-bind:id="'input-id-' + input.id">
                                                        
                                                        <input v-if="input.type === '2'" type="date" class="form-control" placeholder="" v-bind:id="'input-id-' + input.id">
                                                        
                                                        <select v-if="input.type === '3'" v-bind:id="'input-id-' + input.id" class="form-control">
                                                            <option v-for="(option, index) in input.values.array" v-bind:value="index + 1">{{ option.split(';').join(',') }}</option>
                                                        </select>
                                                        
                                                        <template v-if="input.type === '4'">
                                                            <br />
                                                            <template v-for="(option, index) in input.values.array">
                                                                <input type="checkbox" value="option" v-bind:id="'checkbox-group-option-' + input.id + '-' + index"> {{ option.split(';').join(',') }}
                                                                <br v-if="index < input.values.array.length - 1" />
                                                            </template>
                                                        </template>
                                                        
                                                        <input v-if="input.type === '5'" type="checkbox" v-bind:id="'input-id-' + input.id">
                                                        
                                                        <textarea v-if="input.type === '6'" class="form-control" v-bind:id="'input-id-' + input.id" rows="10"></textarea>
                                                        
                                                        <h3 v-bind:id="'input-id-' + input.id" v-if="input.type === '7'">{{ input.label }}</h3>

                                                        <h4 v-bind:id="'input-id-' + input.id" v-if="input.type === '8'">{{ input.label }}</h4>

                                                        <small v-bind:id="'input-id-' + input.id" v-if="input.type === '9'">{{ input.label }}</small>

                                                        <p v-bind:id="'input-id-' + input.id" v-if="input.type === '10'">{{ input.label }}</p>

                                                        <div class="mt-5">
                                                            <button type="button" class="btn btn-sm btn-info" v-on:click="editField(input.id)"><i class="fas fa-edit"></i></button>
                                                            <button type="button" class="btn btn-sm btn-danger" v-on:click="deleteField(input.id)"><i class="fas fa-times"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="well col-md-12">
                                                <div class="row" id="edit-form">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="field-label">Etiqueta</label>
                                                            <input type="text" class="form-control" placeholder="" id="field-label" v-model="InputModel.label">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="field-type">Tipo</label>
                                                            <select id="field-type" class="form-control" v-model="InputModel.type">
                                                                <option value="1">Texto</option>
                                                                <option value="2">Fecha</option>
                                                                <option value="3">Lista desplegable</option>
                                                                <option value="4">Opción múltiple</option>
                                                                <option value="5">Check</option>
                                                                <option value="6">Texto largo</option>
                                                                <option value="7">Título</option>
                                                                <option value="8">Subtítulo</option>
                                                                <option value="9">Leyenda</option>
                                                                <option value="10">Párrafo</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="field-values">Opciones
                                                                <span class="qs"><i class="fas fa-info-circle"></i>
                                                                    <span class="custom-popover above">Las opciones son los diferentes valores que se pueden escoger, van separadas por comas</span>
                                                                </span>
                                                            </label>
                                                            <input type="text" class="form-control" placeholder="" id="field-values" v-model="InputModel.values.string">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="field-points">Puntos
                                                                <span class="qs"><i class="fas fa-info-circle"></i>
                                                                    <span class="custom-popover above">El orden corresponderá al mismo de las opciones, van separados por comas</span>
                                                                </span>
                                                            </label>
                                                            <input type="text" class="form-control" placeholder="" id="field-points" v-model="InputModel.points.string">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="required">Requerido
                                                                <span class="qs"><i class="fas fa-info-circle"></i>
                                                                    <span class="custom-popover above">No se podrá enviar la solicitud si el campo está vacío (sólo aplica para Texto, Lista desplegable y Texto largo)</span>
                                                                </span>
                                                            </label>
                                                            <input type="checkbox" class="form-control required-field" placeholder="" id="required" v-model="InputModel.required">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="field-size">Tamaño
                                                                <span class="qs"><i class="fas fa-info-circle"></i>
                                                                    <span class="custom-popover above">El máximo que puedes usar es 12 y lo puedes dividir para agrupar tus campos, ejemplo:<br/>Usando un tamaño de 6 lograrás agruparlos de dos en dos<br/>Usando un tamaño 4 lograrás agruparlos de tres en tres</span>
                                                                </span>
                                                            </label>
                                                            <input type="text" class="form-control" placeholder="" id="field-size" v-model="InputModel.size">
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="button" class="btn btn-sm btn-success" v-on:click="saveField"><i class="fas fa-check"></i></button>
                                                <button type="button" class="btn btn-sm btn-warning" v-on:click="cleanInputModel"><i class="fas fa-eraser"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="start-date">Fecha de inicio</label>
                                            <input required type="date" class="form-control" placeholder="" id="start-date" v-model="RequestModel.Request_Start_Date">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="end-date">Fecha de fin</label>
                                            <input required type="date" class="form-control" placeholder="" id="end-date" v-model="RequestModel.Request_Finish_Date">
                                        </div>
                                    </div>
                                </div>
                        
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="max-applications">Máximo de aplicaciones<small>Si no hay límite deje en blanco</small></label>
                                            <input type="number" class="form-control" placeholder="" id="max-applications" v-model="RequestModel.Request_Max_Applications">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="max-beneficiaries">Máximo de beneficiarios<small>Si no hay límite deje en blanco</small></label>
                                            <input type="number" class="form-control" placeholder="" id="max-beneficiaries" v-model="RequestModel.Request_Max_Beneficiaries">
                                        </div>
                                    </div>
                                </div>
                                
                                <button type="submit" class="btn btn-primary">Enviar</button>
                            </form>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" v-on:click="closeModal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    created: function () {
        this.loadRequests();
    }
})

export default Solicitudes;