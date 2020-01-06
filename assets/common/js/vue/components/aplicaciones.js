var Aplicaciones = Vue.component('Aplicaciones', {
    props: {
        PDFs: {
            default: {}
        },
        Evidences_PDF_Name: {
            default: ''
        },
        fileUploadFormData: {
            default: new FormData()
        }
    },
    methods: {
        initUI: function () {

        }
    },
    template: `
        <div class="scrollcontent">
            <div class="title text-center">
                <h1>Aplicaciones</h1>
            </div>

            
        </div>
    `,
    created: function () {
        this.initUI();
    }
})

export default Aplicaciones;