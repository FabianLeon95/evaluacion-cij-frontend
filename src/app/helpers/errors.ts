import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {throwError} from 'rxjs';

export const handleHttpError = catchError(err => {
  Swal.fire({
    icon: 'error',
    title: 'Ha ocurrido un error',
    text: err.error.message || 'Refresque la página e intentelo de nuevo. Si el error persiste comuníquelo al encargado.',
  });
  throw throwError(err);
});

export const handleLoginError = catchError(err => {
  Swal.fire({
    icon: 'error',
    title: 'Error al iniciar sesión',
    text: err.error.message || 'Refresque la página e intentelo de nuevo. Si el error persiste comuníquelo al encargado.',
  });
  throw throwError(err);
});

export const handleExpiredToken = () => {
  if (this.authService.isAuthenticated() && this.jwtHelper.isTokenExpired()) {
    Swal.fire({
      icon: 'warning',
      title: 'La sesión ha expirado',
      text: 'Por favor, vuelva a iniciar sesión'
    });
  }
};

export const handleInvalidFileType = () => {
  Swal.fire({
    icon: 'error',
    title: 'Archivo no soportado',
    text: 'Ingrese una imagen, preferiblemente en formato png.',
  });
};
