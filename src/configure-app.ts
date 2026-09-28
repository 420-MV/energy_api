import { INestApplication, ValidationPipe, VersioningType } from "@nestjs/common";
import { HttpExceptionFilter } from "./commun/filters/http-exception.filter";

export function configureApp(app: INestApplication){
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            stopAtFirstError: false,
            validationError: {
                target: false,
                value: false,
            },
        }),
    );
    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'v',
        defaultVersion: '1',
    });
}