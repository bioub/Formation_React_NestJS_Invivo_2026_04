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
