import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configureSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Energy API')
        .setDescription(
          'API REST de gestion de données énergétiques pour des bâtiments.',
        )
        .setVersion('1.0.0')
        .addTag('Buildings', 'Gestion des bâtiments')
        .addTag('Rooms', 'Gestion des locaux')
        .addTag('Health', 'État du service')
        .build();  

    const documentFactory  = () => 
        SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, documentFactory, {
        jsonDocumentUrl: 'docs/openapi.json',
        customSiteTitle: 'Energy API — Documentation',
    });
}