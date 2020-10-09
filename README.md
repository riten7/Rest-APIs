# RESTful APIs

Simple demonstration on building RESTful APIs using node, mongodb and express.

REST defines a set of conventions for creating HTTP services: 
- POST: to create a resource
- PUT: to update it
- GET: to read it
- DELETE: to delete it

Express is a simple, minimalistic and lightweight framework for building web
servers.

MongoDB is an open-source document database. 
- It stores data in flexible, JSON- like documents.
- In relational databases we have tables and rows, in MongoDB we have collections and documents. A document can contain sub-documents.
- We don’t have relationships between documents.

### Installation

Install the dependencies and start the server.

```sh
 run `npm install`
 run `npm run start`
```


### Contents in the repo

    * Build RESTful APIs with Express
    * Asynchronous Javascript
    * Storing data in MongoDB using Mongoose
    * Authentication and Authorization (JWT -> Json Web Token)
    * Input validation from the client
    * Handling Errors


### List of APIs!

  - Register User (create a user)
  - Authenticate and Authorize user usng jwt
  - Token Expiration
  - Create a course 
  - Get all Courses
  - Get Courses on user basis
  - Get Course details
  - Update Course
  - Delete Course
  - Add file/s in the course
  - Delete file from the course
