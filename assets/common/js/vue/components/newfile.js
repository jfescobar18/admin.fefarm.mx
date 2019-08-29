var NewFile = Vue.component('NewFile', {
    props: ['Grant_PDF_Name', 'fileUploadFormData'],
    data() {
        return {
            Name: this.Grant_PDF_Name,
            fileUploadFormData: this.fileUploadFormData
        }
    },
    methods: {
        processform: function () {
            this.$http.post('http://api.fefarm.mx/GrantPDF/AddGrantPDF/' + this.Grant_PDF_Name.replace(/ /g, "_"), this.fileUploadFormData).then(
                response => {
                    if (response.status === 201) {
                        swal({
                            icon: "success",
                            title: "¡Éxito",
                            text: "Convocatoria guardada correctamente"
                        });
                        setTimeout(() => {
                            window.location.replace("/#/Files");
                        }, 2000);
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
        },
        handleName(e) {
            this.$emit('input', this.Name);
        },
        onFileChange: function (e, index) {
            this.fileUploadFormData = new FormData();
            const file = e.target.files[0];
            this.fileUploadFormData.append('file', file);
            document.getElementById('file-info').innerHTML = file.name;
        }
    },
    template: `
        <div>
            <navbar></navbar>
            <div class="area">
                <h1>Nueva Convocatoria</h1>
                <div class="file-container new-file-container">
                    <form class="form-file" @submit.prevent="processform" >
                        <input class="file-input" type="file" v-on:change="onFileChange(event)">
                        <p id="file-info">Arrastra tu archivo o haz click aquí.</p>
                        <input type="text" placeholder="Nombre" v-model="Grant_PDF_Name" @input="handleName">
                        <input type="text" hidden>
                        <button type="submit">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    `
})

export default NewFile;