
# CloudSEK-PostCommentSystem

A simple Post - Comment system which allows user to add a post and comments in their space, with the functionality of n-level comments.


## Tech Stack
Javascript with **Node.js** as Backend , **Express** as Framework and **PostgreSQL** as Database

## Features

- User registration and login with JWT authentication
- Posting comments on posts
- Hierarchical comment system
- Fetching all posts and comments related to a user
- Protected Routes


## Prerequisites
- Node.js installed on your machine
- PostgreSQL database set up

## Installation

1.Clone Repository

```bash
  git clone https://github.com/Harshpal007/CloudSEK-PostCommentSystem.git
```
2.Navigate to the project directory:

```bash
  cd CloudSEK-PostCommentSystem
```

3.Install dependencies:

```bash
  npm i
```
4.Set up environment variables:

Create a .env file in the project root and define the following variables:

```bash
  JWT_SECRET="test"
```

5.Database Configuration

Set up the below configuration and make the same changes in db.js in root folder
```bash
    DB_USER=your_postgres_username
    DB_PASSWORD=your_postgres_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=your_database_name

```

6.Manual Table Creation

Tables Creation:

```bash

    //User Table 

    CREATE TABLE users (
    id PRIMARY KEY,
    name VARCHAR(50) NOT NULL
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    );

    //Post table 

    CREATE TABLE posts (
    id  PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    userid INT REFERENCES users(id),
    );

    //Before creating comments table run the following command to install LTREE extension

    CREATE EXTENSION IF NOT EXISTS ltree;


    //Comment Table

    CREATE TABLE comments (
    id PRIMARY KEY,
    content TEXT,
    path LTREE
    userid INT REFERENCES users(id),
    postid INT REFERENCES posts(id),
    parentcommentid INT REFERENCES comments(id),
    );
```

7.Start Server

```bash
    npm start
```

The Server will run at  http://localhost:3000




    
## API Reference

#### Register User

```http
  POST /users/register
```

| Body items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | Your Name |
| `username` | `string` | Its should be unique|
| `password` | `string` | **Required**.|

Response

| Response items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | Unique identifier of the user|

#### User Login

```http
  POST /users/login
```

| Body items | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | Unique username used when registering |
| `password`      | `string` | **Required**.  |

Response

| Response items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `JWT TOKEN` | `string` | Should be used in all other API calls for authentication|

####  All the Posts & Comments of a User

```http
  POST /users/posts-comments/:userId
```

| Header items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | Use your JWT token generated at the time of login |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userid` | `integer` | unique id generated at the time of registering |

Response
| Response items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Posts` | `Array of Objects` | All the posts made by the user |
| `Comments` | `Array of Objects` | All the comments made by the user |

####  Add Post

```http
  POST /posts/addPost
```

| Body items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |Title of the post|
| `content` | `string` | Content of Post|
| `userId` | `integer` | Unique ID of the user making the post|

Response

| Response items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | Unique identifier of the post|

####  Get Post by ID

```http
  GET /posts/
```

| Body items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `postid` | `integer` | unique id generated at the time of creating post |

Response

Response
| Response items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Post` | `Array of Objects` | Contains all the details of the post |
| `Comments` | `Array of Objects` | All the comments on the post |

####  Add Comment

```http
  POST /comments/addComment
```

| Body items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `postID` | `integer` |Unique ID of the post|
| `content` | `string` | Content of Post|
| `userId` | `integer` | Unique ID of the user making the post|
| `parentCommentId` | `integer` | Unique ID of the comment. Can be NULL|

Response

| Response items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | Unique identifier of the comment|

#### Get all the comments of a post

```http
  GET /comments/:postid
```

| Body items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `postid` | `integer` | unique id generated at the time of creating post |


Response
| Response items | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Comments` | `Array of Objects` | All the comments on the post |















## Architecture

- **Server Side**

    The server-side of the application handles logic, database interactions, authentication, and serves APIs to the client-side.
    
    1.**Node.js with Express.js**: Utilizes Node.js as the server-side runtime environment and Express.js as the web application framework for handling routing, middleware, and request/response handling.

    2.**Controllers**: Contains logic for each route or API endpoint. Interacts with models to fetch or update data and sends responses back to the client.

    3.**Models**: Represents the data entities in the application (e.g., Post, Comment). Utilizes ltree for managing hierarchical comment data efficiently within PostgreSQL.

    4.**Database (PostgreSQL)**: Utilizes PostgreSQL as the RDBMS to store data. Tables are created to store users, posts, and comments. ltree is used to store hierarchical comment paths, simplifying retrieval of nested comments.

    5.**Authentication**: Implements user authentication using JWT tokens. Upon login, a token is generated and sent to the client, which is then included in subsequent requests for authentication.

- **Database**

    The PostgreSQL database stores the application data in a structured manner and efficiently manages hierarchical comment data.

    -**Tables**: Tables are created to store users, posts, and comments. Relationships between tables are established, and ltree is utilized for managing hierarchical comment paths.

- **Conclusion** 

    The architecture utilizes PostgreSQL's ltree extension to efficiently manage hierarchical comment data within the database, reducing workload on the application logic and providing a scalable and maintainable solution for the post comment system. With clear separation of server-side components, the architecture enables efficient development, testing, and deployment of the application.
