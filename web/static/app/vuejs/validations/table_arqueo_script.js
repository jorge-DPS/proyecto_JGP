function load(url) {
  return new Promise(async function (resolve, reject) {
    // do async thing
    const res = await fetch(url)

    // your custom code
    console.log('Yay! Loaded:', url)

    // resolve
    resolve(res.json()) // see note below!
  })
}

// run the function and receive a Promise
const promise = load('/api/v1/corte_monedas/')


//console.log(arrayData);

// opciones del select dinamico y con cambios + variables

//variables para obtener los cambios
var getDataSelect = null

function launcherTipoMoneda(no) {
  let opcion11 = document.querySelector('#BOBE');
  let opcion22 = document.querySelector('#USDE');
  opcion11.checked = false
  opcion22.checked = false
  let select = document.getElementById('getValueSelect')
  let opcion1 = document.querySelector('#BOB');
  let opcion2 = document.querySelector('#USD');

  document.querySelector('#tipo_moneda').addEventListener('change', () => {
    limpiar(select)
    if (opcion1.checked) {
      getDataSelect = opcion1.value
      //alert(getDataSelect)
      console.log('La opcion seleccionada es:' + ' ' + opcion1.value);
      const option = document.createElement('option');
      option.value = ""
      option.text = "seleccione una opcion";
      select.appendChild(option);
      promise.then(datos => {
        datos.forEach(element => {
          if (element.moneda_id == opcion1.value) {
            const option = document.createElement('option');
            option.value = element.valor_corte_moneda;
            option.text = element.descripcion_corte_moneda;
            select.appendChild(option);
          }
        });
      })

    } else if (opcion2.checked) {
      getDataSelect = opcion2.value
      //alert(getDataSelect)
      const option = document.createElement('option');
      option.value = ""
      option.text = "seleccione una opcion";
      select.appendChild(option);
      promise.then(datos => {
        datos.forEach(element => {
          if (element.moneda_id == opcion2.value) {
            const option = document.createElement('option');
            option.value = element.valor_corte_moneda;
            option.text = element.descripcion_corte_moneda;
            select.appendChild(option);
          }
        });
      })
    }
  })
  limpiar(select)
  opcion1.checked = false
  opcion2.checked = false
}

var valorOptions = null

function add_row() {
  //limpiar(elementoSelect)
  let selectEditar = document.getElementById("seleccionEditar")
  limpiar(selectEditar)
  let opcion1 = document.querySelector('#BOBE');
  let opcion2 = document.querySelector('#USDE');
  opcion1.checked = false
  opcion2.checked = false
  let totalBolivianosFoot = document.getElementById("total_valor_bolivianos0")
  let totalDolaresFoot = document.getElementById("total_valor_dolares0")

  selectElement = document.querySelector('#getValueSelect');
  valorOptions = selectElement.options[selectElement.selectedIndex].text;
  promise.then(datos => {
    datos.forEach(element => {
      if (element.descripcion_corte_moneda == valorOptions) {
        descCortMon = element.valor_corte_moneda
        //alert(descCortMon + " aqui esta la funcion add")
        //var cod_corte_moneda = document.getElementById("cod_corte_moneda").value;
        //var new_country = document.getElementById("new_country").value;

        var new_age = document.getElementById("new_age").value;

        var table = document.getElementById("data_table");
        var table_len = table.rows.length;
        var row = (table.insertRow(table_len).outerHTML =
          "<tr class='rows' id='row" +
          table_len +
          "'><td><span class='monedaId fw-bold fs-6 text-gray-400' style='width: 15%;' id='moneda_id" + table_len + "'>" + element.moneda_id + "</span>"
          +
          "</td><td>\n\
        <span class='descripcionCorteMoneda fw-bold fs-6 text-gray-400' style='width: 15%;' id='descripcion_corte_moneda_row" + table_len + "'>" + element.descripcion_corte_moneda + "</span>" +
          "</td><td>\n\
        <span class='cantidadCorteMoneda fw-bold fs-6 text-gray-400' style='width: 15%;' id='cantidad_corte_moneda_row" + table_len + "'>" + parseFloat(new_age) + "</span>" +
          "</td>\n\
        <td>\n\
        <span class='fw-bold fs-6 text-gray-400' style='width: 15%;' id='sub_total_row" + table_len + "'>" + (parseFloat(element.valor_corte_moneda * parseFloat(new_age))).toFixed(2) + "</span>" +
          "</td>\n\
        <td><button class='btn btn-sm btn-light btn-active-primary btn-icon m-1' title='Editar' data-bs-toggle='modal' data-bs-target='#exampleModalEditar' id='edit_button" +
          table_len +
          "' value='Edit' onclick='edit_row(" +
          table_len +
          ")'><i class='bi bi-pencil-square'></i></button>\n\
        <button class='save btn btn-sm btn-light btn-active-primary btn-icon m-1' title='Guardar' id='save_button" +
          table_len +
          "' value='Save' onclick='save_row(" +
          table_len +
          ")'><i class='bi bi-check-square'></i>\n\
        </button><button class='btn btn-sm btn-light-danger btn-active-danger btn-icon m-1' title='Eliminar' onclick='delete_row(" +
          table_len +
          ")'><i class='bi bi-trash'></i></button></td>\n\
        <td class='uniqueID py-2 visually-hidden'><span class='fw-bold fs-6 text-gray-400' style='width: 15%;' id='id" + table_len + "'>" + element.id + "</span>" +
          "</td>\n\
          <td class='valorCorteMoneda py-2 visually-hidden'><span class='fw-bold fs-6 text-gray-400' style='width: 15%;' id='valor_corte_moneda" + table_len + "'>" + element.valor_corte_moneda + "</span>" +
          "</td></tr>");

        $(".save").css('display', 'none')
        //document.getElementById("cod_corte_moneda").value = "";
        //document.getElementById("new_country").value = "";
        document.getElementById("new_age").value = 0;
        limpiar(selectElement)
        if (element.moneda_id == 1) {
          let valor_base_bolivianos = totalBolivianosFoot.innerHTML
          let subTotalValor_row = document.getElementById("sub_total_row" + table_len).innerHTML
          //alert(subTotalValor_row + " aquiiiiiiiiiiiii suna")
          totalBolivianosFoot.innerHTML = (parseFloat(valor_base_bolivianos) + parseFloat(subTotalValor_row)).toFixed(2)
        }
        if (element.moneda_id == 2) {
          let valor_base_dolares= totalDolaresFoot.innerHTML
          let subTotalValor_row = document.getElementById("sub_total_row" + table_len).innerHTML
          //alert(subTotalValor_row + " aquiiiiiiiiiiiii suna")
          totalDolaresFoot.innerHTML = (parseFloat(valor_base_dolares) + parseFloat(subTotalValor_row)).toFixed(2)
        }
      }
      
    });
  })
}
  
var cambio = 0
var BobUsd = 0
var opcion1_actual = 0
var opcion2_actual = 0

function edit_row(no) {
  let opcion1 = document.querySelector('#BOBE');
  let opcion2 = document.querySelector('#USDE');
  opcion1_actual = 0
  opcion2_actual = 0
  let selectEditar = document.getElementById("seleccionEditar")
  let monedaId = document.getElementById("moneda_id" + no).innerHTML
  let valor_corte_moneda = document.getElementById("valor_corte_moneda" + no).innerHTML
  let cantidad_moneda = document.getElementById("cantidad_corte_moneda_row" + no).innerHTML
  let new_cantidad_moneda = document.getElementById("cantidad_editar")
  let footmodaledit = document.getElementById("footerModalEdit")
  let sub_total = document.getElementById("sub_total_row" + no).innerHTML
  let sub_total_d = sub_total
  
  console.log(sub_total, " editar");
  console.log(sub_total_d, " editar");
  
  promise.then(datos => {
    datos.forEach(element => {
      if (element.moneda_id == monedaId) {
        if (element.moneda_id == 1) {
          opcion1.checked = true
          opcion1_actual = 1
          
        }else{
          opcion2.checked = true
          opcion2_actual = 2
        }
        //alert(monedaId)
        const option = document.createElement('option');
        option.value = element.valor_corte_moneda;
        option.text = element.descripcion_corte_moneda;
        selectEditar.appendChild(option);
      }
      document.getElementById('seleccionEditar').value= valor_corte_moneda
    });
  })
  limpiar(selectEditar)
  opcion1.checked = false
  opcion2.checked = false

  document.querySelector('#tipo_moneda_editar').addEventListener('change', () => {
    limpiar(selectEditar)
    if (opcion1.checked) {
      if (1 == opcion1_actual) {
        console.log(opcion1_actual, " opcion 1 acutal");
        cambio = 0
      }else{
        cambio = 1
      }
      console.log(cambio, " aqui el cambio de usd a bob ");
      console.log('La opcion seleccionada es:' + ' ' + opcion1.value);
      const option = document.createElement('option');
      option.value = ""
      option.text = "seleccione una opcion";
      selectEditar.appendChild(option);
      promise.then(datos => {
        datos.forEach(element => {
          if (element.moneda_id == opcion1.value) {
            const option = document.createElement('option');
            option.value = element.valor_corte_moneda;
            option.text = element.descripcion_corte_moneda;
            selectEditar.appendChild(option);
          }
        });
      })
  
    } 
    if (opcion2.checked) {
      if (opcion2.value == opcion2_actual) {
        cambio = 0
      }else{
        cambio = 2
      }
      console.log(opcion2_actual.value, "cambio de actual 2");
            
      console.log(cambio, " aqui el cambio de bol a dolares ");
      
      const option = document.createElement('option');
      option.value = ""
      option.text = "seleccione una opcion";
      selectEditar.appendChild(option);
      promise.then(datos => {
        datos.forEach(element => {
          if (element.moneda_id == opcion2.value) {
            const option = document.createElement('option');
            option.value = element.valor_corte_moneda;
            option.text = element.descripcion_corte_moneda;
            selectEditar.appendChild(option);
          }
        });
      })
    }
  })

  new_cantidad_moneda.value = cantidad_moneda

  console.log(cambio, "cabio aqyuuuuuuuuuuuuuuuuu");

  footmodaledit.innerHTML = '<button type="button" class="btn btn-secondary" onclick="cancelar();" data-bs-dismiss="modal">Cancelar</button>\n\
  <button type="button" class="btn btn-primary" onclick="save_row('+ no +', '+ cambio +');" data-bs-dismiss="modal">Editar </button>'


}

function save_row(no) {
  let cambio_save = cambio
  console.log(cambio, "cambio en sabe");
  let elementoSelect = document.getElementById("seleccionEditar")
  let descripcion_moneda_text = elementoSelect.options[elementoSelect.selectedIndex].text;
  //alert(descripcion_moneda_text + " aquiiiiiiiiiiii")
  let nueva_cantidad = document.getElementById("cantidad_editar").value
  let monedaId = document.getElementById("moneda_id" + no)
  let descripcion_moneda = document.getElementById("descripcion_corte_moneda_row" + no)
  let cantidad_moneda = document.getElementById("cantidad_corte_moneda_row" + no)
  let sub_total = document.getElementById("sub_total_row" + no)
  let sub_tota_antes = sub_total.innerHTML
  console.log(sub_tota_antes, "antes");
  let id = document.getElementById("id" + no)
  let valor_corte_moneda = document.getElementById("valor_corte_moneda" + no)

  let total_dolares = document.getElementById("total_valor_dolares0");
  let total_dolares_value = total_dolares.innerHTML;

  let total_bolivianos = document.getElementById("total_valor_bolivianos0");
  let total_bolivianos_value = total_bolivianos.innerHTML

  switch (cambio) {
    case 1:
      console.log(cambio, " aqui de dolares a bolivianos");
      console.log(sub_tota_antes, "antes");
      total_dolares.innerHTML = (parseFloat(total_dolares_value) - parseFloat(sub_tota_antes)).toFixed(2)
      console.log(total_dolares.innerHTML, " nuevo total dolares");

      
      break;
    case 2:
      console.log(cambio, " aqui de bolivianos a dolares");
      console.log(sub_tota_antes, "antes");
      total_bolivianos.innerHTML = (parseFloat(total_bolivianos_value) - parseFloat(sub_tota_antes)).toFixed(2)
      console.log(total_bolivianos.innerHTML, " nuevo total bolivianos");
      break;
    case 0:
      console.log(cambio, " no se hizo el cambio esta en el mismos");
      console.log(sub_tota_antes, "antes");
      console.log(opcion1_actual, " opcion actual")
      if (opcion1_actual == 1) {
        total_bolivianos.innerHTML = (parseFloat(total_bolivianos_value) - parseFloat(sub_tota_antes)).toFixed(2)
        
      }else if (opcion2_actual == 2) {
        total_dolares.innerHTML = (parseFloat(total_dolares_value) - parseFloat(sub_tota_antes)).toFixed(2)
      }


      break;
    default:
      break;
  }

  promise.then(datos => {
    datos.forEach(element => {
      if (element.descripcion_corte_moneda == descripcion_moneda_text) {
        monedaId.innerHTML = element.moneda_id;
        descripcion_moneda.innerHTML = element.descripcion_corte_moneda
        cantidad_moneda.innerHTML = nueva_cantidad;
        sub_total.innerHTML = (nueva_cantidad * parseFloat(element.valor_corte_moneda)).toFixed(2);
        console.log(sub_total.innerHTML, "ahora");
        if (element.moneda_id == 1) {
          let totalBOBNew = total_bolivianos.innerHTML
          total_bolivianos.innerHTML = (parseFloat(totalBOBNew) + parseFloat(sub_total.innerHTML)).toFixed(2)
          console.log(parseFloat(sub_total.innerHTML), "sub total nuevo");
        }else if (element.moneda_id == 2) {
          let tatalUSDNew = total_dolares.innerHTML
          total_dolares.innerHTML = (parseFloat(tatalUSDNew) + parseFloat(sub_total.innerHTML)).toFixed(2)
          console.log(parseFloat(sub_total.innerHTML), "sub total nuevo");

        }
        console.log(cambio_save, " cambio antes del if save");
        id.innerHTML = element.id;
        valor_corte_moneda.innerHTML = element.valor_corte_moneda;
      }
    });
    limpiar(elementoSelect)
  let opcion1 = document.querySelector('#BOBE');
  let opcion2 = document.querySelector('#USDE');
  opcion1.checked = false
  opcion2.checked = false
  })

  console.log(sub_total.innerHTML, "despues de promise");

  cambio = 0
}

function delete_row(no) {
  let monedaId = document.getElementById("moneda_id" + no).innerHTML
  let sub_total_value = document.getElementById("sub_total_row" + no).innerHTML
  let total_bolivianos = document.getElementById("total_valor_bolivianos0")
  let total_dolares = document.getElementById("total_valor_dolares0")
  let total_bolivianos_value = total_bolivianos.innerHTML
  let total_dolares_value = total_dolares.innerHTML

  if (monedaId == 1) {
    total_bolivianos.innerHTML = (parseFloat(total_bolivianos_value) - parseFloat(sub_total_value)).toFixed(2);
    
  }else if (monedaId ==  2) {
    
    total_dolares.innerHTML = (parseFloat(total_dolares_value) - parseFloat(sub_total_value)).toFixed(2);
  }
  document.getElementById("row" + no + "").outerHTML = "";
  
}
//onfocusout Event-> cuando se sale del foco del input
function focusInput(no) {
  /* var x = document.getElementById("fname");
  x.value = x.value.toUpperCase(); */
  save_row(no)
}

//document.getElementsByClassName(".select2-selection--single").style.height = "50px"
$(document).ready(function () {
  $(".select2-selection--single").css("height", "40px");
});

function limpiar(select) {
  for (let i = select.options.length; i >= 0; i--) {
    select.remove(i)
  }
}

function cancelar() {
  alert("CANCELAR")
  let opcion1 = document.querySelector('#BOBE');
  let opcion2 = document.querySelector('#USDE');
  opcion1.checked = false;
  opcion1.checked = false;
  let select = document.getElementById('getValueSelect')
  let selectEditar = document.getElementById('seleccionEditar')
  limpiar(select)
  limpiar(selectEditar)
  document.getElementById("new_age").value = 0;
  document.getElementById("cantidad_editar").value = 0;
  /* 
  let footModal = document.getElementById("footerModal")
  footModal.innerHTML =
    "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>\n\
    <button type='button' class='btn btn-primary' onclick='add_row();' data-bs-dismiss='modal' >Crear Detalle</button>"; */
}

/* var myModalEl = document.getElementById('exampleModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  let opcion1 = document.querySelector('#BOBE');
  let opcion2 = document.querySelector('#USDE');
  opcion1.checked = false;
  opcion1.checked = false;
  let select = document.getElementById('getValueSelect')
  let selectEditar = document.getElementById('seleccionEditar')
  limpiar(select)
  limpiar(selectEditar)
  document.getElementById("new_age").value = 0;
  document.getElementById("cantidad_editar").value = 0;
})

var modalEdit = document.getElementById("exampleModalEditar")
modalEdit.addEventListener('hidden.bs.modal', function (event) {
  let opcion1 = document.querySelector('#BOBE');
  let opcion2 = document.querySelector('#USDE');
  opcion1.checked = false;
  opcion1.checked = false;
  let select = document.getElementById('getValueSelect')
  let selectEditar = document.getElementById('seleccionEditar')
  limpiar(select)
  limpiar(selectEditar)
  document.getElementById("new_age").value = 0;
  document.getElementById("cantidad_editar").value = 0;
}) */