import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ProblemDetailsDto } from '../dto/problem-details.dto';
import { isDuplicateKeyError, MongoDuplicateKeyError } from '../database/mongo-errors';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const problem = this.createProblemDetails(
      exception,
      request.url,
    );

    response
      .status(problem.status)
      .type('application/problem+json')
      .json(problem);  
  }

  private createProblemDetails(
    exception: unknown,
    instance: string,
  ): ProblemDetailsDto {
    if (isDuplicateKeyError(exception)) {
      return this.createConflictProblem(
        exception,
        instance,
      );
    }

    if (exception instanceof HttpException) {
      return this.createHttpProblem(
        exception,
        instance,
      );
    }

    return {
      type: 'about:blank',
      title: 'Internal Server Error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      detail: 'Une erreur interne est survenue.',
      instance,
      timestamp: new Date().toISOString(),
    };
  }

  private createConflictProblem(
    exception: MongoDuplicateKeyError,
    instance: string,
  ): ProblemDetailsDto {
    return {
      type: 'about:blank',
      title: 'Conflict',
      status: HttpStatus.CONFLICT,
      detail: this.getDuplicateDetail(exception),
      instance,
      timestamp: new Date().toISOString(),
    };
  }

  private getDuplicateDetail(
    exception: MongoDuplicateKeyError,
  ): string {
    const duplicatedCode = exception.keyValue?.code;

    if (duplicatedCode !== undefined) {
      return (
        `Le code ${String(duplicatedCode)} ` +
        'est déjà utilisé dans ce bâtiment.'
      );
    }

    return 'Une ressource possédant ces valeurs existe déjà.';
  }

  private getHttpDetail(
    exception: HttpException,
  ): string {
    const body = exception.getResponse();

    if (typeof body === 'string') {
      return body;
    }

    if (
      typeof body === 'object' &&
      body !== null &&
      'message' in body
    ) {
      const message = body.message;

      if (Array.isArray(message)) {
        return message.join(' ');
      }

      if (typeof message === 'string') {
        return message;
      }
    }

    return exception.message;
  }

  private createHttpProblem(
    exception: HttpException,
    instance: string,
  ): ProblemDetailsDto {
    const status = exception.getStatus();

    return {
      type: 'about:blank',
      title: this.getTitle(status),
      status,
      detail: this.getHttpDetail(exception),
      instance,
      timestamp: new Date().toISOString(),
    };
  }

  private getTitle(status: number): string {
    const titles: Record<number, string> = {
      400: 'Bad Request',
      404: 'Not Found',
      409: 'Conflict',
      415: 'Unsupported Media Type',
      500: 'Internal Server Error',
    };

    return titles[status] ?? 'Error';
  }
}