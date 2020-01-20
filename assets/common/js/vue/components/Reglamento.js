var Reglamento = Vue.component('Reglamento', {
    props: {
        PDFs: {
            default: {}
        },
        Rules_PDF_Name: {
            default: ''
        },
        fileUploadFormData: {
            default: new FormData()
        }
    },
    methods: {
        initUI: function () {
            this.loadPDFs();
            setTimeout(() => {
                animInput();
            }, 500);
        },
        loadPDFs: function () {
            showLoader();
            this.$http.get(APIUrl() + 'RulesPDF/GetPDFs', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.PDFs = response.body.map(function (x) {
                        x.Rules_PDF_Path = APIUrl() + x.Rules_PDF_Path;
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
        addPDF: function () {
            showLoader();

            this.fileUploadFormData.append('cat_Rules_PDF', JSON.stringify({
                Rules_PDF_Name: this.Rules_PDF_Name
            }));

            this.$http.post(APIUrl() + 'RulesPDF/AddPDF', this.fileUploadFormData, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'PDF agregado correctamente');
                    this.initUI();
                    this.clearUI();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        editPDF: function (index) {
            showLoader();

            this.fileUploadFormData.append('cat_Rules_PDF', JSON.stringify({
                Rules_PDF_Id: this.PDFs[index].Rules_PDF_Id,
                Rules_PDF_Name: this.PDFs[index].Rules_PDF_Name
            }));

            this.$http.post(APIUrl() + 'RulesPDF/UpdatePDF', this.fileUploadFormData, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'PDF modificado correctamente');
                    this.initUI();
                    this.clearUI();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        deletePDF: function (Rules_PDF_Id) {
            showLoader();

            this.$http.post(APIUrl() + 'RulesPDF/DeletePDF', {
                Rules_PDF_Id: Rules_PDF_Id
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'PDF eliminado correctamente');
                    this.loadPDFs();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        onFileChange: function (e, index) {
            const file = e.target.files[0];
            this.fileUploadFormData.append('file', file);

            if (index !== undefined) {
                this.PDFs[index].Rules_PDF_Path = URL.createObjectURL(file);
            }
        },
        clearUI: function () {
            this.fileUploadFormData = new FormData();
            this.Rules_PDF_Name = '';
            var label = document.querySelector('#app > div.scrollcontent > div.col-md-12 > div > form > div > div:nth-child(2) > label');
            label.classList.remove('has-file');
            label.querySelector('.js-fileName').innerHTML = 'Selecciona un archivo';
        }
    },
    template: `
        <div class="scrollcontent">
            <div class="title text-center">
                <h1>Reglamento</h1>
            </div>

            <div v-for="(pdf, index) in PDFs" class="col-md-4">
                <form v-on:submit.prevent="editPDF(index)">
                    <div>
                        <div class="form-group col-md-12 text-center">
                            <img class="w20" src="./assets/common/img/pdf.png" alt="pdf logo">
                        </div>
                        <div class="form-group col-md-6 col-md-offset-3">
                            <div class="form-group">
                                <label for="name">Nombre del archivo:</label>
                                <a class="text-right f-right" v-bind:href="pdf.Rules_PDF_Path" target="_blank">&nbsp;Ver&nbsp;<i class="far fa-eye"></i></a>
                                <input required type="text" v-model="pdf.Rules_PDF_Name" class="form-control">
                            </div>
                            <input v-on:change="onFileChange(event, index)" type="file" v-bind:id="'file' + index" class="input-file" accept="application/pdf">
                            <label v-bind:for="'file' + index" class="btn btn-tertiary js-labelFile">
                                <i class="icon fa fa-check"></i>
                                <span class="js-fileName">Selecciona un archivo</span>
                            </label>
                        </div>
                        <div class="form-group col-md-6 col-md-offset-3 text-center">
                            <input type="submit" class="btn btn-info" value="Guardar">
                            <button v-on:click="deletePDF(pdf.Rules_PDF_Id)" class="btn btn-danger">Eliminar</button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="col-md-12">
                <div class="col-md-4 col-md-offset-4">
                    <form v-on:submit.prevent="addPDF">
                        <div>
                            <div class="form-group text-center">
                                <hr />
                                <h3>Nuevo archivo</h3>
                            </div>
                            <div class="form-group col-md-6 col-md-offset-3">
                                <div class="form-group">
                                    <label for="Rules_PDF_Name">Nombre del archivo:</label>
                                    <input required type="text" v-model="Rules_PDF_Name" id="Rules_PDF_Name" class="form-control">
                                </div>
                                <input v-on:change="onFileChange(event)" required type="file" id="newFile" class="input-file" accept="application/pdf">
                                <label for="newFile" class="btn btn-tertiary js-labelFile w100">
                                    <i class="icon fa fa-check"></i>
                                    <span class="js-fileName">Selecciona un archivo</span>
                                </label>
                            </div>
                            <div class="form-group col-md-6 col-md-offset-3">
                                <input type="submit" class="btn btn-success w100" value="Guardar">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    created: function () {
        this.initUI();
    }
})

export default Reglamento;