$(".funcionario").select2({
  dropdownParent: $('#exampleModal'),
  placeholder: {"id":"","text":"Busque a un funcionario"}, 
  ajax: {
    url: "/api/v1/usuario",
    dataType: 'json',
    data: (params) => {
      return {
        search: params.term,
        page: params.page 
      }
    },
    processResults: (data, params) => {
      params.page = params.page || 1; 
      return {
        results: $.map(data.results, function (funcionario) {
          funcionario.id = funcionario.id;
          funcionario.text = funcionario.first_name + ' ' + funcionario.last_name
          return funcionario;
        }),
        pagination: { 
          more: data.next
        } 
      }
    },
    cache: true 
  },
  escapeMarkup: function (markup) { 
    return markup; 
} 
});

$(document).on('change', '.funcionario', function() {
  var idFuncionario= $('.funcionario option:selected').val()
  app.cuentas_cobrar.funcionario_id = idFuncionario;
});

$('#exampleModal').on('show.bs.modal', function (event) {
  $(".funcionario").val("").change();
  $("#exampleModal input").val("");
});
