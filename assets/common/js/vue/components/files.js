var Files = Vue.component('Files', {
    props: ['Pdfs'],
    methods: {
        GetPdfs: function () {
            this.$http.get('http://api.fefarm.mx/GrantPDF/GetGrantPDFs').then(
                response => {
                    console.log(response.body);
                    if (response.status === 200) {
                        this.Pdfs = response.body;
                    }
                },
                err => {
                    console.log(err);
                    swal({
                        icon: "error",
                        title: "¡Ups!",
                        text: "Algo ha ido mal, intenta más tarde"
                    });
                }
            );
        }
    },
    template: `
        <div>
            <navbar></navbar>
            <div class="area">
                <h1>Convocatorias</h1>
                <div class="file-container" v-for="pdf in Pdfs">
                    <form class="form-file" >
                        <input type="file">
                        <p>{{pdf.Grant_PDF_Path.replace('PDFs/', '')}}</p>
                        <input type="text" placeholder="Nombre" v-bind:value="pdf.Grant_PDF_Name">
                        <input type="text" hidden>
                        <button type="submit">Guardar</button>
                        <button class="delete" type="submit">Eliminar</button>
                    </form>
                </div>

                <div class="flex mb-4">
                        <router-link to="NewFile" class="btn-add bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Agregar nueva convocatoria
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        this.GetPdfs();
    }
})

export default Files;