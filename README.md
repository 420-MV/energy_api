# Energy API

API REST de gestion de données énergétiques pour des bâtiments.

`energy-api` fournit un point d’entrée central pour enregistrer, consulter et exploiter les informations nécessaires au suivi énergétique. Le projet est développé avec [NestJS](https://nestjs.com/) et TypeScript.

> Le projet est en développement actif. Le contrat d’API peut évoluer avant la première version stable.

## Fonctionnalités

- vérification de l’état du service;
- gestion des bâtiments;
- réponses HTTP au format JSON;
- architecture modulaire par domaine;
- tests unitaires et tests de bout en bout;
- contrôles de qualité avec ESLint et Prettier.

## Technologies

- Node.js;
- TypeScript;
- NestJS;
- Jest;
- Supertest;
- ESLint;
- Prettier.

## Prérequis

- une version de Node.js compatible avec le fichier `package.json`;
- npm;
- Git.

Vérifier l’environnement local :

```bash
node --version
npm --version
git --version
```

## Installation

Cloner le dépôt :

```bash
git clone <URL_DU_DEPOT>
cd energy-api
```

Installer les dépendances :

```bash
npm install
```

## Configuration

L’application attend la variable d’environnement suivante :

| Variable | Obligatoire | Description | Exemple local |
|---|---|---|---|
| `PORT` | Oui | Port d’écoute du serveur HTTP | `3000` |

Le numéro `3000` est seulement un exemple de configuration locale. L’application ne doit pas imposer silencieusement ce port dans son code.

Sous Linux ou macOS :

```bash
PORT=3000 npm run start:dev
```

Sous PowerShell :

```powershell
$env:PORT=3000
npm run start:dev
```

Si le projet utilise un fichier `.env`, créer celui-ci à partir du modèle versionné :

```bash
cp .env.example .env
```

Le fichier `.env` ne doit jamais être ajouté au dépôt.

## Exécution

### Développement

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

Avec `PORT=3000`, l’API est accessible à l’adresse suivante :

```text
http://localhost:3000/api
```

## API

Toutes les routes sont exposées sous le préfixe global `/api`.

| Méthode | Route | Statut attendu | Description |
|---|---|---:|---|
| `GET` | `/api/health` | `200 OK` | Vérifie l’état du service |
| `GET` | `/api/buildings` | `200 OK` | Retourne les bâtiments |
| `POST` | `/api/buildings` | `201 Created` | Crée un bâtiment |

### Vérifier l’état du service

```bash
curl -i http://localhost:3000/api/health
```

Exemple de réponse :

```json
{
  "status": "ok"
}
```

### Obtenir les bâtiments

```bash
curl -i http://localhost:3000/api/buildings
```

### Créer un bâtiment

```bash
curl -i \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Pavillon principal","address":"7000, rue Marie-Victorin","yearBuilt":1965}' \
  http://localhost:3000/api/buildings
```

L’identifiant est généré par le serveur et ne doit pas être fourni par le client lors de la création.

## Persistance des données

Dans l’état actuel du projet, les bâtiments sont conservés en mémoire. Les données sont donc réinitialisées au redémarrage de l’application.

L’intégration d’une base de données persistante est prévue dans une prochaine version.

## Structure du projet

```text
src/
├── main.ts
├── app.module.ts
├── health/
│   ├── health.controller.ts
│   └── health.module.ts
└── buildings/
    ├── buildings.module.ts
    ├── buildings.controller.ts
    ├── buildings.service.ts
    └── dto/
        └── create-building.dto.ts
```

Le projet suit une organisation par fonctionnalité :

- les modules regroupent les composants d’un domaine;
- les contrôleurs gèrent les échanges HTTP;
- les services portent la logique applicative;
- les DTO définissent la forme des données échangées.

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run start` | Démarre l’application |
| `npm run start:dev` | Démarre l’application en mode surveillance |
| `npm run build` | Compile l’application |
| `npm run lint` | Analyse et corrige le code selon les règles configurées |
| `npm run test` | Exécute les tests unitaires |
| `npm run test:e2e` | Exécute les tests de bout en bout |
| `npm run test:cov` | Produit le rapport de couverture des tests |

## Qualité du code

Avant de soumettre une pull request, exécuter :

```bash
npm run build
npm run lint
npm run test
npm run test:e2e
```

## Sécurité

Pour signaler une vulnérabilité, utiliser le mécanisme de signalement privé du dépôt plutôt qu’une issue publique.

## Feuille de route

- validation structurée des données reçues;
- persistance dans une base de données;
- documentation OpenAPI;
- versionnement explicite de l’API;
- authentification et autorisation;
- observabilité et déploiement automatisé.

## Licence

Consulter le fichier `LICENSE` à la racine du dépôt pour connaître les conditions d’utilisation et de redistribution.
