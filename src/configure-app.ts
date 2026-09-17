import { INestApplication, VersioningType } from "@nestjs/common";
import { HttpExceptionFilter } from "./commun/filters/http-exception.filter";

export function configureApp(app: INestApplication){
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'v',
        defaultVersion: '1',
    });
}