//var csrf_token = { headers: { "X-CSRFToken": csrftoken } };

var csrf_token = { headers: { "X-CSRFToken": csrftoken } };
var expRegSoloLetras = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
var app = new Vue({
    el: "#cuentasPorCobrar",
    delimiters: ["[[", "]]"],
    
    data: {
        cuentas_cobrar: {
            esCreado:null,
            funcionario_id: null,
            caja_id:null,
            monto_entregado: null,
            monto_devuelto_add: 0,
            monto_saldo: 0,
        },
        
        cuentas_cobrar_get: {
            funcionario_id:{
                id:null,
                nombre_completo:null,
            },
        },

        rendir_cuentas_cobrar:{
            monto_devuelto_add: null,
        },
        
        //fechas
        date_entrega:null,
        date_ultimo_pago:null,
        
        errorCuentas:{
            funcionario_id:null,
            monto_entregado:null
        },

        estado:null,
    },

    methods: {
        createCuentas: function () {
            var self = this;
            if (this.cuentas_cobrar.funcionario_id == "") {
                toastr.error("Porfavor seleccione a un funcionario");
                return
            }
            if (this.cuentas_cobrar.funcionario_id == null) {
                toastr.error("Porfavor seleccione a un funcionario");
                return
            }

            if (this.cuentas_cobrar.monto_entregado == null || this.cuentas_cobrar.monto_entregado == "") {
                toastr.error("Ingrese una cantidad")
                return
            }

            if (this.cuentas_cobrar.monto_entregado == 0) {
                toastr.error("Ingrese una cantidad mayor a cero")
                return
            }

            var url = URLS.endpoints.crearListarCuentasCobrar();
            //console.log("aqui esta id", this.zona.localidad);
            this.cuentas_cobrar.esCreado = 'creado'
            self.$http.post(url, self.cuentas_cobrar, csrf_token).then(
                function (response) {
                    this.estado = response.status
                    localStorage.setItem('std', response.status);

                    console.log(this.estado, 'estado');
                    //console.log(this.estado, 'aqui el responses');
                    window.location.href = URL_LIST;
                    //toastr.options.onHidden = function() { window.location.href = URL_LIST } 
                    //toastr.success("La cuenta se ha almacenado correctamente")
                    
                },
                function(responseError){
                    this.errorCuentas = responseError.body
                    console.log(this.errorCuentas)
                    toastr.error(this.errorCuentas.message)
                }
            );   
        },

        getCuentasCobrar: function (pk) {
            var url = URLS.endpoints.retrieveEditDelete(pk);
            this.$http.get(url).then(function (response) {
                this.cuentas_cobrar_get = response.body;
                let fechaEntrega = this.cuentas_cobrar_get.fecha_entrega
                //console.log(fechaEntrega, 'entrega');
                this.date_entrega = moment(String(fechaEntrega)).format('DD/MM/YYYY')
                //console.log(this.cuentas_cobrar_get.fecha_ultimo_pago, "aquiiiiiiii");
                if (this.cuentas_cobrar_get.fecha_ultimo_pago != null) {
                    let fecha_Ultimo_pago = this.cuentas_cobrar_get.fecha_ultimo_pago
                    this.date_ultimo_pago = moment(String(fecha_Ultimo_pago)).format('DD/MM/YYYY')
                    //console.log(fecha_Ultimo_pago, 'ultimo');
                }
            });
        },

        //esto es como el editar
        rendirCuentas: function (pk) {
            let monto_devuelto_get = this.rendir_cuentas_cobrar.monto_devuelto_add;
            //console.log(this.rendir_cuentas_cobrar.monto_saldo, "monto entrgado");
            if (parseFloat(this.rendir_cuentas_cobrar.monto_saldo) < parseFloat(monto_devuelto_get)) {
                toastr.error("El monto devuelto ingresdo, es mayor al saldo");
                return;
            }

            if (this.rendir_cuentas_cobrar.monto_devuelto_add == 0) {
                toastr.error("Ingrese un monto mayor a cero");
                return;
            }

            if (this.rendir_cuentas_cobrar.monto_devuelto_add == null) {
                toastr.error("Ingrese un monto");
                return;
            }

            if (parseFloat(this.rendir_cuentas_cobrar.monto_devuelto_add) > parseFloat(this.cuentas_cobrar_get.monto_saldo)) {
                toastr.error("El monto devuelto es mayor al saldo")
                return
            }

            console.log("========= EDITAR Cuenta =========");
            var self = this;
            var url = URLS.endpoints.retrieveEditDelete(pk);
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
                        "========= EDITANDO CUENTA ===========",
                        this.rendir_cuentas_cobrar
                    );
                    self.$http.put(url, self.rendir_cuentas_cobrar, csrf_token).then(
                        function (response) {
                            localStorage.setItem('std', response.status);
                            window.location.href = URL_LIST;

                        },
                        function (responseError) {
                            this.errorCuentas = responseError.body;
                            toastr.error(
                                "No se ha almacenado correctamente la Cuenta" +
                                responseError.body.message
                            );
                        }
                    );
                }
            });
        },

        deleteCuenta:function (pk) {
            console.log("delete", pk);
            var url = URLS.endpoints.retrieveEditDelete(pk);
            var self = this;
            Swal.fire({
                title: "¿Está seguro?",
                text: "Se eliminara la Cuenta y todos sus datos.",
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
                            //toastr.success("La cuenta se ha eliminado correctamente");
                            window.location.href = URL_LIST;
                        },
                        function (responseError) {
                            this.errorCuentas = responseError.data;
                            toastr.error("error al eliminar los datos");
                        }
                    );
                }
            });
        }
        
        
    },

    

});

/* saveContrato: function () {
    console.log("saveContrato");
    this.setContrato(this.contrato);
          
    var self=this;
    Swal.fire({
      title: "¿Está seguro?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Si, guardar!",
      cancelButtonText: "No, cancelar",
      customClass: {
          confirmButton: "btn font-weight-bold btn-success",
          cancelButton: "btn font-weight-bold btn-default"
    }
    }).then(function (result) {
    if (result.value) {
        var url = URLS.endpoints.postContrato();
        console.log(this.contrato_completo);
        var data = self.contrato_completo;

        console.log("====>",data, url)
        self.$http.post(url, data, csrf_token).then(function (response) {
            toastr.success("El contrato se ha almacenado correctamente");
            window.location.href = URL_LIST;
        },
        function (responseError) {
            //self.contrato_errors = responseError.body;
            toastr.error("El contrato NO se ha almacenado correctamente");
            console.log(responseError.body)
        });
    }
    });
  }, */