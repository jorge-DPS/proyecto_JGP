/*obtener valores de select-option detalle*/
/* $('.credito_id').on('select2:select', function (e) {
    //alert(You picked ${e.params.data.text} for $${e.params.data.monto_aprobado});
    document.getElementById('detalle_transaccion').value = e.params.data.text;
    document.getElementById('monto_aprobado').value = e.params.data.monto_aprobado;
    document.getElementById('descuentos_desembolso').value = e.params.data.descuentos_desembolso;
    document.getElementById('monto_desembolsado').value = e.params.data.monto_aprobado - e.params.data.descuentos_desembolso;
}); */

$(document).on("change", ".detalle", function () {
    var valorDetalle = $(".detalle option:selected").val();
    var valorText = $(".detalle option:selected").text();
    app.movimiento.producto_financiero_id = valorDetalle;
    app.movimiento.detalle = valorText;
});


function load(url) {
    return new Promise(async function (resolve, reject) {
        // do async thing
        const res = await fetch(url);

        // your custom code
        console.log("Yay! Loaded:", url);

        // resolve
        resolve(res.json()); // see note below!
    });
}

// run the function and receive a Promise

var valor
var text = null
const promise = load("/api/v1/transaccion_inventarios/" + MOVIMIENTO_ID);

promise.then(dato => {
    console.log("value", dato.producto_financiero_id);
    $('#detalle').select2().val(String(dato.producto_financiero_id)).trigger("change")
    
})

console.log("value:", valor);



