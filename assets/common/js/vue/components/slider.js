var slider = Vue.component('slider', {
    methods: {
        initUI: function () {
            $('.input-file').each(function () {
                var $input = $(this),
                    $label = $input.next('.js-labelFile'),
                    labelVal = $label.html();

                $input.on('change', function (element) {
                    var fileName = '';
                    if (element.target.value) fileName = element.target.value.split('\\').pop();
                    fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
                });
            });
        }
    },
    template: `
        <div class="scrollcontent">
            <div class="title text-center">
                <h1>Slider</h1>
            </div>

            <div class="col-md-4">
                <form>
                    <div>
                        <div class="form-group col-md-12 text-center">
                            <img src="./assets/common/img/logo.png" alt="">
                        </div>
                        <div class="form-group col-md-6 col-md-offset-3">
                            <input required type="file" name="file" id="file" class="input-file" accept="image/x-png,image/jpeg">
                            <label for="file" class="btn btn-tertiary js-labelFile">
                                <i class="icon fa fa-check"></i>
                                <span class="js-fileName">Selecciona un archivo</span>
                            </label>
                        </div>
                        <div class="form-group col-md-6 col-md-offset-3 text-center">
                            <input type="submit" class="btn btn-info" value="Guardar">
                            <button class="btn btn-danger">Eliminar</button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="col-md-12">
                <div class="col-md-6 col-md-offset-3">
                    <form>
                        <div>
                            <div class="form-group text-center">
                                <h3>Nuevo Slide</h3>
                            </div>
                            <div class="form-group col-md-6 col-md-offset-3 text-center">
                                <img src="" alt="">
                            </div>
                            <div class="form-group col-md-6 col-md-offset-3">
                                <input required type="file" id="newFile" class="input-file" accept="image/x-png,image/jpeg">
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
    mounted: function () {
        this.initUI();
    },
    updated: function () {
        this.initUI();
    }
});

export default slider;