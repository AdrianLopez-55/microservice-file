import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error(exception); // Imprime la excepción en la consola

    // Puedes agregar aquí tu propia lógica de manejo de errores, como enviar una respuesta de error personalizada al cliente.

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(500).json({
      message: 'Internal server error',
    });
  }
}
