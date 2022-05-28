# Library-Demo

A management software for a non-profit public library which provides a low-cost SaaS solution used by the users of that library to get information
about books and authors.: 

Includes the following transactional entities and actions:

Entities:

1. User - A user can have issued multiple books. A user can issue more than one books
at a time. A user can login and search for new books to issue and
should also be able to view all issued books.

2. Book - A book represents each book in the library system. A book can have more
than one authors.

3. Author - A book author. An author can have published more than one books.
Create the following endpoints for your service:

Actions:

1. User Login API: Allows user to login with username and password . Passport JWT
Auth for authentication.

2. User Book List API: Allows user to return a list of all books issued by them.

3. User Issue Book API: Allows user to issue a book.

4. User Return Book API: Allows user to return an issued book.

5. Book Search API: Allows user to case-insensitive search a book by full or partial name.

6. Author Search API: Allows user to case-insensitive search a author by full or partial
name.

Sample Endpoint requests and Technical Constraints:

URL: /api/login
Method: POST
Content-Type: application/json
Body: {"username": "test", "password": "test123"}
Response: {"token": "test-auth-token"}

URL: /users/books
Method: GET
Headers:
Authorization: Bearer test-auth-token
Response: {"books": [{"id": 1, "title": "Head First SQL"}]}

URL: /api/users/books/issue
Method: POST
Content-Type: application/json
Headers:
Authorization: Bearer test-auth-token
Body: {"book_id": 2}
Response for case 1, when book is issued successfully:
{"issued": true}
Response for case 2, when book is already issued by someone else:
{"issued": false}

URL: /api/users/books/return
Method: POST
Content-Type: application/json
Headers:
Authorization: Bearer test-auth-token
Body: {"book_id": 2}
Response for case 1, when book is returned successfully:
{"returned": true}
Response for case 2, in case of a failure to return:
{"returned": false}

URL: /books?q=django
Method: GET
Headers:
Authorization: Bearer test-auth-token
Response: {"search_results": [{"id": 2, "title": "Django for
Beginners"}, {"id": 3, "title": "Lightweight Django"}]}

URL: /authors?q=martin
Method: GET
Headers:
Authorization: Bearer test-auth-token
Response: {"search_results": [{"id": 4, "full_name": "Robert C.
Martin"]}

Postgresql 10.x is the database for this project.
This project is should implemented in NodeJS using Express.js as the web
framework.

