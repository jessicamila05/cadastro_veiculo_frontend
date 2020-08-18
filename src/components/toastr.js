import toastr from 'toastr'


toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "1500",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export function showMessage(title, message, type){
    toastr[type](message, title)
}

//Mensagem de Erro...
export function messageError(message){
    showMessage('Erro', message, 'error')
}

//Mensagem de Sucesso...
export function messageSuccess(message){
    showMessage('Sucesso', message, 'success')
}

//Mensagem de Alerta...
export function messageWarning(message){
    showMessage('Alerta', message, 'warning')
}

