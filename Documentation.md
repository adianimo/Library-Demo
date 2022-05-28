# Library Documentation

## User Login
    **Endpoint and Action** 
    URL: /api/login
    Method: POST

    **Headers**
    Content-Type: application/json

    **Body**
    Body: {"username": "test", "password": "test123"}
    
    **Response**
    Response: {"token": "test-auth-token"}

## User Book List
    **Endpoint and Action** 
    URL: /users/books
    Method: GET

    **Headers**
    Authorization: Bearer test-auth-token

    **Response**
    Response: {"books": [{"id": 1, "title": "Head First SQL"}]}

## Issue Book
    **Endpoint and Action**
    URL: /api/users/books/issue
    Method: POST

    **Headers**
    Content-Type: application/json
    Authorization: Bearer test-auth-token

    **Body**
    Body: {"book_id": 2}

    **Response**
    If book is issued successfully:
    {"issued": true}
    If book is already issued by someone else:
    {"issued": false}

## Return Book
    **Endpoint and action**
    URL: /api/users/books/return
    Method: POST

    **Headers**
    Content-Type: application/json
    Authorization: Bearer test-auth-token

    **Body**
    Body: {"book_id": 2}

    **Response**
    If book is returned successfully:
    {"returned": true}
    If failure to return:
    {"returned": false}

## Search for a book
    **Endpoint and action**
    URL: /books?q=django
    Method: GET

    **Headers**
    Authorization: Bearer test-auth-token

    **Response**
    Response: {"search_results": [{"id": 2, "title": "Django for
    Beginners"}, {"id": 3, "title": "Lightweight Django"}]}

## Search for author
    **Endpoint and action**
    URL: /authors?q=martin
    Method: GET

    **Headers**
    Authorization: Bearer test-auth-token

    **Response**
    Response: {"search_results": [{"id": 4, "full_name": "Robert C.
    Martin"]}