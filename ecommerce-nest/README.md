# TP Nest.js

## Description

Le but de ce TP est de mettre en place un API correspondant à un site de e-commerce. L'API doit fournir les ressources suivantes :
- Produits (Product)
- Categories (Category)
- Commandes (Order)
- Utilisateurs (User)

Voici les propriétés de chaque ressource :
- Product :
  - id (number)
  - name (string)
  - description (string)
  - price (number)
- Category :
  - id (number)
  - name (string)
- Order :
  - id (number)
  - date (Date)
- User :
  - id (number)
  - name (string)
  - email (string)
  - password (string)

Les relations seront les suivantes :
- Product :
  - category (Category)
- Order :
  - products (Product[])
  - user (User)

## Exercice 1: Modules

Modifier le fichier `app.module.ts` pour authoriser les requêtes depuis n'importe quelle origine (CORS).

En utilisant la commande `nest generate module <nom>` vous pouvez créer un module avec les controllers, services et les types associés.

Créer les modules pour chaque ressource :
- ShopModule (src/shop/shop.module.ts)
- UserModule (src/user/user.module.ts)
  
## Exercice 2: Classes Entités

Générer avec la commande `nest generate class <nom>` les classes suivantes :
- ProductEntity (src/shop/entity/product.entity.ts)
- CategoryEntity (src/shop/entity/category.entity.ts)
- OrderEntity (src/shop/entity/order.entity.ts)
- UserEntity (src/user/user.entity.ts)

Ajouter les propriétés des classes ci-dessus, sans les relations à ce stade.

## Exercice 3: DTOs

Générer avec la commande `nest generate class <nom>` les classes suivantes :
- CreateProductDto (src/shop/dto/create-product.dto.ts)
- CreateCategoryDto (src/shop/dto/create-category.dto.ts)
- CreateOrderDto (src/shop/dto/create-order.dto.ts)
- CreateUserDto (src/user/create-user.dto.ts)

Ajouter les propriétés des classes ci-dessus sans les ids.

## Exercice 4: Controllers

Générer avec la commande `nest generate controller <nom>` les controllers suivants :
- ProductController (src/shop/product.controller.ts)
- CategoryController (src/shop/category.controller.ts)
- OrderController (src/shop/order.controller.ts)
- UserController (src/user/user.controller.ts)

Ajouter les routes CRUD correspondantes :
- ProductController :
  - `getProducts` (GET /products)
  - `getProductsById` (GET /products/:id)
  - `createProduct` (POST /products)
  - `updateProduct` (PATCH /products/:id)
  - `deleteProduct` (DELETE /products/:id)
- CategoryController :
  - `getCategories` (GET /categories)
  - `createCategory` (POST /categories)
  - `deleteCategory` (DELETE /categories/:id)
- OrderController :
  - `getOrders` (GET /orders)
  - `createOrder` (POST /orders)
  - `deleteOrder` (DELETE /orders/:id)
- UserController :
  - `getUsers` (GET /users)
  - `getUsersById` (GET /users/:id)
  - `createUser` (POST /users)
  - `updateUser` (PATCH /users/:id)
  - `deleteUser` (DELETE /users/:id)

Ajouter aussi les routes pour les relations :
- CategoryController :
  - `getProductsByCategory` (GET /categories/:id/products)
- UserController :
  - `getOrdersByUser` (GET /users/:id/orders)

Ajouter le query parameter search dans la route `getProducts`.

Retourner des exemples correspondants aux classes définies ci-dessus.

## Exercice 5: Services

Générer avec la commande `nest generate service <nom>` les services suivants :
- ProductService (src/shop/product.service.ts)
- CategoryService (src/shop/category.service.ts)
- OrderService (src/shop/order.service.ts)
- UserService (src/user/user.service.ts)

Ajouter les methodes CRUD correspondantes :
- ProductService :
  - `getAll` retourne tous les produits
  - `getById` retourne un produit par son id
  - `search` retourne les produits à partir de la recherche reçue en paramètre
  - `create` crée un nouveau produit
  - `update` modifie un produit existant
  - `delete` supprime un produit
- CategoryService :
  - `getAll` retourne tous les categories
  - `create` crée une nouvelle category
  - `delete` supprime une category
- OrderService :
  - `getAll` retourne toutes les commandes
  - `create` crée un nouveau commande
  - `delete` supprime une commande
- UserService :
  - `getAll` retourne tous les users
  - `getById` retourne un user par son id
  - `create` crée un nouveau user
  - `update` modifie un user existant
  - `delete` supprime un user

Créer un module ConfigModule et y déclarer un provider dont la clé sera la chaine de caractère "CONFIG".

Associer à cette clé le service suivant :
```
{
  searchFields: ['name'], // pourrait être ['name', 'description']
}
```

Injecter ce service de config dans `ProductService` de sorte a ce que la méthode `search` ait accès aux champs de recherche (les logguer à ce stade).

## Exercice 6: Configuration et TypeORM

Installer @nestjs/config puis créer un fichier .env avec les variables de configuration suivantes :
- JWT_SECRET : string
- DB_DATABASE : 'chemin_vers_le_fichier.sqlite'

Installer @nestjs/typeorm puis le configurer avec une base de données SQLite (dans /data/db.sqlite), s'inspirer de cette documentation :
https://docs.nestjs.com/techniques/database#async-configuration

Modifier les classes Product, Category, Order, User pour qu'elles soient correspondantes avec les entités TypeORM.

Créer un script en s'inspirant de cette documentation :
https://docs.nestjs.com/standalone-applications#standalone-applications

Il faudra récupérer le service EntityManager pour insérer les entités.

Dans ce script, vous devez générer des fixtures pour les classes Product, Category, Order, User.

Utiliser éventuellement une library pour générer des fixtures, par exemple : https://www.npmjs.com/package/@faker-js/faker

Injecter les repository dans nos services ProductService, OrderService, CategoryService et UserService, utiliser les méthodes des repository pour lire, ajouter, modifier, supprimer les entités.

Appeler ces services dans les contrôleurs, ajouter les exceptions NotFoundException si l'enregistrement en introuvable (pour les @Param('id'))

## Exercice 7 : Swagger

Installer @nestjs/swagger puis le configurer dans main.ts.

Ajouter des décorateurs au niveau des DTOs et des contrôleurs comme dans les slides.

Importer dans Postman le JSON présent à l'URL http://localhost:3000/api-json

## Exercice 8 : Relations

Ajouter les relations aux classes Product et Order en utilisant TypeORM.

Ajouter les propriétés dans les DTOs CreateProductDto (categoryId), CreateOrderDto (userId, orderId)

Retourner les entités liées dans les méthodes getAll et getById des services.

Faire en sorte que les méthodes getProductsByCategory, getOrdersByUser soient implementées.

## Exercice 9: Validation

Ajouter les décorateurs de class-validator aux classes CreateProductDto, CreateCategoryDto, CreateOrderDto, CreateUserDto pour valider leurs propriétés.

Tous les champs sont obligatoires, valider leur types.

Dans CreateProductDto :
- name doit faire minimum 3 caractères
- price doit être un nombre > 0.01

Configurer ValidationPipe pour utiliser class-validator.