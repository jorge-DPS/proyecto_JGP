var csrf_token = { headers: { "X-CSRFToken": csrftoken } };
const DETALLE_ARQUEO = {
    corte_moneda_id:null,
    moneda_id:null,
    cantidad_corte_moneda:null,
};

var expRegularSoloNumeros = "^[0-9]+$";

var cajax = null

var app = new Vue({
    el:'#arqueo',
    delimiters: ['[[',']]'],
    data:{
        arqueoEncabezado:{
            total_arqueo_mn:0,
            total_arqueo_me:0,
            observaciones:null,
            detalle_arqueo_encabezado:[
                
            ]
        },
        detalle_arqueo: {...DETALLE_ARQUEO},
        listaDiccionarioCorteMoneda:[],
        editDetalle:false,
        showTotal:0,
        listaArqueo:[],
        errorDetalleSelcet:null,
        errorDetalleCantidad:null,
        errorArqueo:[]
    },

    methods: {
        key:function(event){
            this.message = 'key ' + event.key + ' (' + event.keyCode + ')';
                console.log(event.key, "aqui el ascii de la tecla");
            
        },
        
        cargarDiccionarioCorteMonedas: function () {
            var url = '/api/v1/corte_monedas/';
            console.log("entrando al metodo");
            this.$http.get(url).then((response) => {
                this.listaDiccionarioCorteMoneda = response.body;
                //console.log(this.listaDiccionarioCorteMoneda);
                //console.log(JSON.stringify(this.listaDiccionarioCorteMoneda));
            });
        },
        
        adicionarDetalle: function () {
            let val = 0;
            //console.log(this.detalle_arqueo.corte_moneda_id, " aqui la moneda");
            if (this.detalle_arqueo.corte_moneda_id == null) {
                toastr.error("Porfavor eliga una opcion");
                return
            }
            if (this.detalle_arqueo.cantidad_corte_moneda == "") {
                toastr.error("Porfavor ingrese una cantidad");
                return
            }
            
            if (this.detalle_arqueo.cantidad_corte_moneda == null) {
                toastr.error("Porfavor ingrese una cantidad");
                return
            }
                let idMoneda = this.detalle_arqueo.corte_moneda_id
                let indice = this.listaDiccionarioCorteMoneda.findIndex(indicem => indicem.id === idMoneda)
                //console.log(indice, "indice del objeto quiiiiiiiiiii");
                this.detalle_arqueo.moneda_id  = this.listaDiccionarioCorteMoneda[indice].moneda_id
                this.detalle_arqueo.descripcion_corte_moneda = this.listaDiccionarioCorteMoneda[indice].descripcion_corte_moneda
                this.detalle_arqueo.valor_corte_moneda = (this.listaDiccionarioCorteMoneda[indice].valor_corte_moneda * this.detalle_arqueo.cantidad_corte_moneda).toFixed(2)
    
                //console.log(this.detalle_arqueo, "objeto detalle");
    
                if (this.detalle_arqueo.moneda_id == 1) {
                    this.arqueoEncabezado.total_arqueo_mn = (parseFloat(this.arqueoEncabezado.total_arqueo_mn) + parseFloat(this.detalle_arqueo.valor_corte_moneda)).toFixed(2)
                }else if (this.detalle_arqueo.moneda_id == 2) {
                    this.arqueoEncabezado.total_arqueo_me = (parseFloat(this.arqueoEncabezado.total_arqueo_me) + parseFloat(this.detalle_arqueo.valor_corte_moneda)).toFixed(2)
                }
    
                //adicionando los detalles al array de arque encabezado
                this.arqueoEncabezado.detalle_arqueo_encabezado.push({...this.detalle_arqueo});
                this.detalle_arqueo = {...DETALLE_ARQUEO};
                this.showTotal = 1
                

        },

        editarDetalle: function (index) {
            indice = index;
            //console.log(index, " aqui el index");
            let detalleEdit = this.arqueoEncabezado.detalle_arqueo_encabezado[index]
            //console.log(detalleEdit, " aqui el detalle obtenido");
            
            this.editDetalle = true;
            this.detalle_arqueo.corte_moneda_id = this.arqueoEncabezado.detalle_arqueo_encabezado[index].corte_moneda_id
            this.detalle_arqueo.cantidad_corte_moneda = this.arqueoEncabezado.detalle_arqueo_encabezado[index].cantidad_corte_moneda
        },

        guardarDetalle: function() {
            let val = 0;
            console.log(this.detalle_arqueo.corte_moneda_id, " aqui la moneda");
            if (this.detalle_arqueo.corte_moneda_id == null) {
                toastr.error("el campo MONEDA esta vacio, eliga una moneda");
            }else{
                val = val + 1;
            }
            console.log(String(this.detalle_arqueo.cantidad_corte_moneda), "aqui la cantidad", expRegularSoloNumeros);
            if (String(this.detalle_arqueo.cantidad_corte_moneda).match(expRegularSoloNumeros) == null) {
                toastr.error("El campo CANTIDAD solo acepta numeros positivos");
            } else{
                val = val + 1
            }

            if (this.detalle_arqueo.cantidad_corte_moneda == 0) {
                toastr.error("El campo CANTIDAD solo acepta numeros positivos");    
            }else{
                val = val + 1
            }
            //console.log("aqui val =>>>>>>>>>>>>" , val);

            if (val == 3) {
                //console.log(indice,  "entra al gusdra"); 
                // init resta del valor editado 
            this.detalle_arqueo.moneda_id = this.arqueoEncabezado.detalle_arqueo_encabezado[indice].moneda_id
            if (this.detalle_arqueo.moneda_id == 1) {
                    //console.log(this.detalle_arqueo.moneda_id, "aqui la moneda_id");
                this.arqueoEncabezado.total_arqueo_mn = parseFloat(this.arqueoEncabezado.total_arqueo_mn) - parseFloat(this.arqueoEncabezado.detalle_arqueo_encabezado[indice].valor_corte_moneda)
            }else if (this.detalle_arqueo.moneda_id == 2) {
                this.arqueoEncabezado.total_arqueo_me = parseFloat(this.arqueoEncabezado.total_arqueo_me) - parseFloat(this.arqueoEncabezado.detalle_arqueo_encabezado[indice].valor_corte_moneda) 
            }
            // end resta del valor edita en total bolivinos o doleres

            let idMonedaEditado = this.detalle_arqueo.corte_moneda_id
            let indiceEditado = this.listaDiccionarioCorteMoneda.findIndex(indicem => indicem.id === idMonedaEditado)
            // optimizar esta parte del codigo "meterlo en una funcion"
            this.detalle_arqueo.descripcion_corte_moneda = this.listaDiccionarioCorteMoneda[indiceEditado].descripcion_corte_moneda
            this.detalle_arqueo.moneda_id = this.listaDiccionarioCorteMoneda[indiceEditado].moneda_id
            this.detalle_arqueo.valor_corte_moneda = (this.listaDiccionarioCorteMoneda[indiceEditado].valor_corte_moneda * this.detalle_arqueo.cantidad_corte_moneda).toFixed(2)
            //console.log(this.detalle_arqueo, "objeto editado");

            if (this.detalle_arqueo.moneda_id == 1) {
                this.arqueoEncabezado.total_arqueo_mn = (parseFloat(this.arqueoEncabezado.total_arqueo_mn) + parseFloat(this.detalle_arqueo.valor_corte_moneda)).toFixed(2)   
            } else if (this.detalle_arqueo.moneda_id == 2) {
                this.arqueoEncabezado.total_arqueo_me = (parseFloat(this.arqueoEncabezado.total_arqueo_me) + parseFloat(this.detalle_arqueo.valor_corte_moneda)).toFixed(2)   
                
            }
                this.arqueoEncabezado.detalle_arqueo_encabezado.splice(indice, 1, {...this.detalle_arqueo})
                
                this.detalle_arqueo = {...DETALLE_ARQUEO}
    
                this.editDetalle = false
                //console.log(this.editDetalle, "aqui el cambi de el bool");
                
            }


        },

        eliminarDetalle: function (index) {
            this.detalle_arqueo = {...DETALLE_ARQUEO}
            this.editDetalle = false
            if (this.arqueoEncabezado.detalle_arqueo_encabezado[index].moneda_id == 1) {
                this.arqueoEncabezado.total_arqueo_mn = (parseFloat(this.arqueoEncabezado.total_arqueo_mn) - parseFloat(this.arqueoEncabezado.detalle_arqueo_encabezado[index].valor_corte_moneda)).toFixed(2)
            }else if (this.arqueoEncabezado.detalle_arqueo_encabezado[index].moneda_id == 2) {
                this.arqueoEncabezado.total_arqueo_me = (parseFloat(this.arqueoEncabezado.total_arqueo_me) - parseFloat(this.arqueoEncabezado.detalle_arqueo_encabezado[index].valor_corte_moneda)).toFixed(2)
            }
            this.arqueoEncabezado.detalle_arqueo_encabezado.splice(index, 1)
        },

        createArqueo: function () {
            if (this.arqueoEncabezado.detalle_arqueo_encabezado.length > 0) {
                let self = this;
                Swal.fire({
                title: "¿Está seguro?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Si, enviar el arqueo!",
                cancelButtonText: "No, cancelar",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-success",
                    cancelButton: "btn font-weight-bold btn-default"
                }  
            }).then(function (resultado) {
                if (resultado.value) {
                    var url = URLS.endpoints.crearListarArqueo()
                    //console.log("aqui esta id", this.zona.localidad);
                    self.$http.post(url, self.arqueoEncabezado, csrf_token ).then(
                        function (response) {
                            localStorage.setItem('std', response.status);
                            window.location.href = URL_LIST; 
                            
                        },
                        
                        //atrapando los errores desde el backend
                        function (responseError) {
                            this.errorArqueo = responseError.data
                            toastr.error("Error al almacenar los datos" + responseError.data);
                        }
                        )
                        
                    }
                })
            }else{
                toastr.error("Por favor añada al menos un detalle a la lista de detalles", "Error al guardar");
                
            }
        },
            
        getArqueo: function (pk) {
            var url = URLS.endpoints.retrieveArqueo(pk);
            this.$http.get(url).then(
                function (response){
                    let copyEncabezadoArqueo = response.body;
                    //console.log(copyEncabezadoArqueo, " aquiiiiiiii la cop");
                    let detalles = copyEncabezadoArqueo.detalle_arqueo_encabezado;
                    copyEncabezadoArqueo.detalle_arqueo_encabezado = []
                    for (let i = 0; i < detalles.length; i++) {
                        const monedaId = detalles[i].corte_moneda_id;
                        //console.log(monedaId, "aqui la moneda id");
                        let mindice = this.listaDiccionarioCorteMoneda.findIndex(indicem => indicem.id === monedaId)
                        this.detalle_arqueo.corte_moneda_id = detalles[i].corte_moneda_id
                        this.detalle_arqueo.moneda_id = detalles[i].moneda_id
                        this.detalle_arqueo.cantidad_corte_moneda = detalles[i].cantidad_corte_moneda
                        this.detalle_arqueo.valor_corte_moneda = detalles[i].valor_corte_moneda
                        this.detalle_arqueo.descripcion_corte_moneda = this.listaDiccionarioCorteMoneda[mindice].descripcion_corte_moneda
                        copyEncabezadoArqueo.detalle_arqueo_encabezado.push({...this.detalle_arqueo});
                        this.detalle_arqueo = {...DETALLE_ARQUEO};

                    }
                    //this.arqueoEncabezado.caja_id = 3
                    cajax = copyEncabezadoArqueo.caja_id.id
                    //console.log(cajax, "aqui el id de la caja recuperado del objeto caja_id{}");
                    this.arqueoEncabezado = copyEncabezadoArqueo;
                    /* console.log(copyEncabezadoArqueo, "aqui el editatado cargado");
                    console.log(detalles, "aquiiii la copia");
                    console.log("aqui los objetos", this.arqueoEncabezado); */

                }
            )
        },
        editarArqueo:function (pk) {
            if (this.arqueoEncabezado.detalle_arqueo_encabezado.length > 0) {
            console.log("========= EDITAR Arqueo =========");
            var self = this;
            var url = URLS.endpoints.editArqueo(pk)
            //var data = self.makeFormDataPersona(self.persona);
            this.arqueoEncabezado.caja_id = cajax;
                Swal.fire({
                    title: "¿Está seguro?",
                    text: "Se actualizara los datos del arqueo.",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Si, actualizar",
                    cancelButtonText: "No, cancelar",
                    customClass: {
                    confirmButton: "btn font-weight-bold btn-success",
                    cancelButton: "btn font-weight-bold btn-default"
                    }
                    }).then(function (result) {
                        if (result.value) {
                            console.log("========= EDITANDO arqueo ===========")
                            self.$http.put(url, self.arqueoEncabezado, csrf_token).then(
                                //var _header = { headers: { "X-CSRFToken": csrftoken } };
                                function (response) {
                                    localStorage.setItem('std', response.status);
                                    window.location.href = URL_LIST;        
                                },
                                function(responseError) {
                                    //this.error_grupo = responseError.body
                                    //toastr.error("ERROR: YA EXISTE LA DESCRIPCION NO PUEDE REPETIRSE, INTENTE CON OTRA DESCRIPCION", responseError.body)
                                    
                                }
                            )
                            
                        }
                    })  
            }else{
                toastr.error("Por favor añada al menos un detalle a la lista de detalles", "Error al actualizar");
            }
            
        },

        deleteArqueo:function (pk) {
            console.log("delete",pk)
			var url = URLS.endpoints.deleteArqueo(pk);
            //var _header = { headers: { "X-CSRFToken": csrftoken } };
			var self = this;
			Swal.fire({
				title: "¿Está seguro?",
				text: "Se eliminara este Arquoe y todos sus datos.",
				icon: "warning",
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: "Si, eliminar!",
				cancelButtonText: "No, cancelar",
				customClass: {
					confirmButton: "btn font-weight-bold btn-danger",
					cancelButton: "btn font-weight-bold btn-default"
				}
			}).then(function (result) {
				if (result.value) {
					self.$http.delete(url, csrf_token).then(
						function (response) {
                            //console.log(response, 'estadooooooo');
                            localStorage.setItem('std', response.status);
                            //localStorage.setItem('del', 'borrar');
							//console.log("eliminado", response)
                            //toastr.success("Arqueo se ha eliminado correctamente");
                            window.location.href = URL_LIST;
                            
						},
						function (responseError) {

							console.log("ERROR eliminado")
						}
					);
					//window.location.href = URL_LIST;
				}
			});
        },
        
    },

    created: function() {
        this.cargarDiccionarioCorteMonedas();
        //window.addEventListener('keydown', this.key)

    },
   

    computed: {
        checkDetalle: function () {
            return this.arqueoEncabezado.detalle_arqueo_encabezado.length > 0 ? false : true;
        },
    }
    
});