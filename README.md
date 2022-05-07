### Node -Mongo

- Gracias por usar mi API. Para más servicios mandar email a: ekiolivier@gmail.com

# Endpoints

Verb  | Path | Results | What I need
--- | --- | --- | ---
GET  | api/v1/users | Get all users registered | Bearer Token obteined from Login
GET  | api/v1/products | Get all products registered | Bearer Token obteined from Login
POST  | api/v1/users/register | User register | An object with email and password
POST  | api/v1/users/login| User login | An object with email and password
POST  | api/v1/image/upload | Upload avatar profile | An image with 'avatar' name as property
POST  | api/v1/products | Create a new product | Bearer Token obteined from Login and an object with title:string, price:number, description:string, category:string, rate:number, count:numer, image:file





###Gracias
