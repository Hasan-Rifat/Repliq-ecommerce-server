# Repliq-ecommerce-server

### Create routes, controllers ,services,constants,validation , utils for the admin module given below

#### Root route should be `http://localhost:5000/api/v1`.

## user

- apis

```
get  > all-user:-       http://localhost:5000/api/v1/user/

post > login user:-     http://localhost:5000/api/v1/user/login

post > user register:-  http://localhost:5000/api/v1/user/register

get  > sigle-user:-     http://localhost:5000/api/v1/user/john@example1.com

put  > sigle-user:-     http://localhost:5000/api/v1/user/john@example1.com

delete > delete user:-  http://localhost:5000/api/v1/user/john@example.com

```

## Product

- apis

```
get > all product:-       http://localhost:5000/api/v1/product/

post > create product:-   http://localhost:5000/api/v1/product/

get > product details:-   http://localhost:5000/api/v1/product/64d7605d2453d933b47daee0

put > update product:-    http://localhost:5000/api/v1/product/64d7605d2453d933b47daee0

put > update-product:-    http://localhost:5000/api/v1/product/64d7605d2453d933b47daee0

delete > delete product:- http://localhost:5000/api/v1/product/64d7605d2453d933b47daee0

```

## Order

- apis

```
get > all product:-       http://localhost:5000/api/v1/Order/

post > create product:-   http://localhost:5000/api/v1/Order/

get > product details:-   http://localhost:5000/api/v1/Order/64d7881da113f13230dde49c

put > update product:-    http://localhost:5000/api/v1/Order/64d7881da113f13230dde49c

put > update-product:-    http://localhost:5000/api/v1/Order/64d7881da113f13230dde49c

delete > delete product:- http://localhost:5000/api/v1/Order/64d7881da113f13230dde49c

```

## Features

- express
- bcrypt
- cors
- jsonwebtoken
- multer
- eslint
- husky
- prettier
- typescript
- dotenv
- http-status
- mongoose
- ts-node-dev
