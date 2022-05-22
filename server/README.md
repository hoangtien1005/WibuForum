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

<!-- **[PUT]**  ```/user/:id```  &nbsp;&nbsp;  Update the current user
<br>

**[DELETE]**  ```/user/:id```  &nbsp;&nbsp;  Delete the current user
<br> -->

<br>

## Post

**[GET]**  ```/post?page=1&perPage=50```  &nbsp;&nbsp;  Get a list of posts
<br>

**[GET]**  ```/post/:id```  &nbsp;&nbsp;  Get a post by id
<br>

**[GET]**  ```/post?author_id=1```  &nbsp;&nbsp;  Get a post by author id
<br>

**[POST]**  ```/post```  &nbsp;&nbsp;  Create a post (```author_id, content```) 
<br>

**[PUT]**  ```/post/:id```  &nbsp;&nbsp;  Update the current post (```content```)
<br>

**[DELETE]**  ```/post/:id```  &nbsp;&nbsp;  Delete the current post
<br>

<br>

## Comment

**[GET]**  ```/comment?page=1&perPage=50```  &nbsp;&nbsp;  Get a list of comments
<br>

**[GET]**  ```/comment/:id```  &nbsp;&nbsp;  Get a comment by id
<br>

**[GET]**  ```/comment?author_id=1```  &nbsp;&nbsp;  Get a comment by author id
<br>

**[GET]**  ```/comment?post_id=1```  &nbsp;&nbsp;  Get a comment by post id
<br>

**[POST]**  ```/comment```  &nbsp;&nbsp;  Create a comment (```author_id, post_id, content```)
<br>

**[PUT]**  ```/comment/:id```  &nbsp;&nbsp;  Update the current comment (```content```)
<br>

**[DELETE]**  ```/comment/:id```  &nbsp;&nbsp;  Delete the current comment
<br>

<br>

## Reaction

**[GET]**  ```/reaction?page=1&perPage=50```  &nbsp;&nbsp;  Get a list of reactions
<br>

**[GET]**  ```/reaction/:id```  &nbsp;&nbsp;  Get a reaction by id
<br>

**[GET]**  ```/reaction?author_id=1```  &nbsp;&nbsp;  Get a reaction by author id
<br>

**[GET]**  ```/reaction?post_id=1```  &nbsp;&nbsp;  Get a reaction by post id
<br>

**[POST]**  ```/reaction```  &nbsp;&nbsp;  Create a reaction (```author_id, post_id, content```)
<br>

**[DELETE]**  ```/reaction/:id```  &nbsp;&nbsp;  Delete the current reaction
<br>

<br>

## Postman example: [View here](https://documenter.getpostman.com/view/17396960/Uyxoj4o9)

<br>

## Success response format: 
```
{
  "data": {
    ...
  }
}
```

## Error response format: 
```
{
  "error": {
    "code": ...         // HTTP status code
    "message": ...      // Error message
  }
}
```