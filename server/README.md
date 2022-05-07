# animene-BE
The back-end server for auth and social pages

# Current API Endpoints:

## Auth

**[POST]**  ```/auth/login```  &nbsp;&nbsp;  Login user
<br>

**[POST]**  ```/auth/signup```  &nbsp;&nbsp;  Signup user
<br>

**[POST]**  ```/auth/reset-password```  &nbsp;&nbsp;  Reset user password
<br>

<br>

## User

**[GET]**  ```/user?page=1&perPage=50```  &nbsp;&nbsp;  Get a list of users
<br>

**[GET]**  ```/user/:id```  &nbsp;&nbsp;  Get a user by id
<br>

**[PUT]**  ```/user/:id```  &nbsp;&nbsp;  Update the current user
<br>

**[DELETE]**  ```/user/:id```  &nbsp;&nbsp;  Delete the current user
<br>

<br>

**[GET]**  ```/user/:id/favorites?page=1&perPage=50```  &nbsp;&nbsp;  Get a list of user favorites media
<br>

**[POST]**  ```/user/:id/favorites```  &nbsp;&nbsp;  Create a new favorites media
<br>

**[DELETE]**  ```/user/:id/favorites/:media_id```  &nbsp;&nbsp;  Delete the current favorites media
<br>

<br>

<!-- ## Post

**[GET]**  ```/post?page=1&perPage=50```  &nbsp;&nbsp;  Get a list of posts
<br>

**[GET]**  ```/post/:id```  &nbsp;&nbsp;  Get a post by id
<br>

**[PUT]**  ```/post/:id```  &nbsp;&nbsp;  Update the current post
<br>

**[DELETE]**  ```/post/:id```  &nbsp;&nbsp;  Delete the current post
<br> -->

<br>

## Favorites

**[GET]**  ```/favorites?page=1&perPage=50```  &nbsp;&nbsp;  Get a list of all favorites media
<br>

<br>

## Category

**[GET]**  ```/category?page=1&perPage=50```  &nbsp;&nbsp;  Get a list of categories
<br>

**[GET]**  ```/category/:id```  &nbsp;&nbsp;  Get a category by id
<br>

**[POST]**  ```/category/```  &nbsp;&nbsp;  Create a new category
<br>

**[PUT]**  ```/category/:id```  &nbsp;&nbsp;  Update the current category
<br>

**[DELETE]**  ```/category/:id```  &nbsp;&nbsp;  Delete the current category
<br>
