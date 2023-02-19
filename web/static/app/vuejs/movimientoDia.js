var csrf_token = { headers: { "X-CSRFToken": csrftoken } };
var app = new Vue({
    el: '#movimientosDia',
    delimiters: ["[[", "]]"],
    data: {
        movimiento: {
            producto_financiero_id:null,
            detalle:null,
            fondo:null,
            monto_ingreso:0,
            monto_salida:0,
        },

        ingreso:null,
        monto:null,
        errorMovimientos:[],
    },

    methods: {
        createInventarioMercaderia: function () {
            let val = 0
            if (this.movimiento.producto_financiero_id == null) {
                toastr.error("Eliga una opcion de productos");
                return
            }
            if (this.movimiento.fondo == null) {
                toastr.error("Eliga una opcion de Fondos A o B");
                return
            }
            if (this.ingreso == null) {
                toastr.error("Eliga una opcion de ingreso o salida");
                return
            }

            if (this.monto == null) {
                toastr.error("Ingrese un monto");
                return
            }

            if (this.monto == 0) {
                toastr.error("Ingrese un monto mayor a cero");
                return
            }
            
            if (this.ingreso == 'ingreso') {
                this.movimiento.monto_ingreso = this.monto
            }
            if (this.ingreso == 'salida') {
                this.movimiento.monto_salida = this.monto
            }
            //var _header = { headers: { "X-CSRFToken": csrftoken } };
            var self = this;
                Swal.fire({
                    title: "¿Está seguro?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Si, enviar movimiento del dia",
                    cancelButtonText: "No, cancelar",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-success",
                        cancelButton: "btn font-weight-bold btn-default",
                    },
                }).then(function (resultado) {
                    if (resultado.value) {
                        var url = URLS.endpoints.crearListarMovimientos();
                        //console.log("aqui esta id", this.zona.localidad);
                        self.$http.post(url, self.movimiento, csrf_token).then(
                            function (response) {
                                localStorage.setItem('std', response.status);
                                window.location.href = URL_LIST;
                            },
                            //atrapando los errores desde el backend
                            function (responseError) {
                                this.errorMovimientos = responseError.status
                                console.log(this.errorMovimientos);
                                toastr.error("Error al enviar datos "+ this.errorMovimientos);
                            }
                        );
                    }
                });

        },

        getMovimiento(pk){
            var url = URLS.endpoints.updateRetrieveDeleteMovimiento(pk);
            this.$http.get(url).then(function (response) {
                this.movimiento = response.body;
                console.log(this.movimiento);
                if (this.movimiento.monto_ingreso != 0.00) {
                    this.ingreso = 'ingreso'
                    this.monto = this.movimiento.monto_ingreso
                }
                if (this.movimiento.monto_salida != 0.00) {
                    this.ingreso = 'salida'
                    this.monto = this.movimiento.monto_salida
                }

            });
        },
        
        updateMovimiento(pk){

            if (this.monto == "") {
                toastr.error("Ingrese un monto");
                return
            }
            if (this.monto == 0) {
                toastr.error("Ingrese un monto mayor a cero");
                return
            }

            if (this.ingreso == 'ingreso') {
                this.movimiento.monto_ingreso = this.monto
                this.movimiento.monto_salida = 0.00
            }
            if (this.ingreso == 'salida') {
                this.movimiento.monto_ingreso = 0.00
                this.movimiento.monto_salida = this.monto
            }
            console.log("========= ACTUALIZAR MOVIMIENTO =========");
            var self = this;
            var url = URLS.endpoints.updateRetrieveDeleteMovimiento(pk);
            Swal.fire({
                title: "¿Está seguro?",
                text: "Se actualizara los datos de Cuenta.",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Si, actualizar",
                cancelButtonText: "No, cancelar",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-success",
                    cancelButton: "btn font-weight-bold btn-default",
                },
            }).then(function (resultado) {
                if (resultado.value) {
                    console.log(
                        "========= ACTUALIZANDO MOVIMIENTO ===========",
                        this.movimiento
                    );
                    self.$http.put(url, self.movimiento, csrf_token).then(
                        function (response) {
                            localStorage.setItem('std', response.status);
                            window.location.href = URL_LIST;
                        },
                        function (responseError) {
                            this.errorMovimientos = responseError.body;
                            toastr.error(
                                "No se ha almacenado correctamente el movimiento del dia" +
                                responseError.data
                            );
                        }
                    );
                }
            });
        },

        deleteMovimiento(pk){
            console.log("delete", pk);
            var url = URLS.endpoints.updateRetrieveDeleteMovimiento(pk);
            //var _header = { headers: { "X-CSRFToken": csrftoken } };
            var self = this;
            Swal.fire({
                title: "¿Está seguro?",
                text: "Se eliminara el Movimiento del dia y todos sus datos.",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "No, cancelar",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-danger",
                    cancelButton: "btn font-weight-bold btn-default",
                },
            }).then(function (result) {
                if (result.value) {
                    self.$http.delete(url, csrf_token).then(
                        function (response) {
                            localStorage.setItem('std', response.status);
                            window.location.href = URL_LIST;
                        },
                        function (responseError) {
                            this.error_zona = responseError.data;
                            toastr.error("error al eliminar los datos" + responseError.data);
                        }
                    );
                    //window.location.href = URL_LIST;
                }
            });
        }

    },

    
});
