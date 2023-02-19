/* $("#limpiar").click(function(){
    //Limpia los registros de local storage
    localStorage.clear();
}) */

var std = localStorage.getItem('std');
//var del = localStorage.getItem('del')
console.log(std, 'estado.........')
//console.log(del, 'delete')
if (std == '201') {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toastr-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
    };
    toastr.success("Se ha almacenado correctamente")
    localStorage.clear();
}else{
    //Para eliminar
    if (std == '204') {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toastr-top-center",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "2000",
        };
        toastr.success("Se elimino correctamente")
        localStorage.clear();
    }
}