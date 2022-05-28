CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    issued_status BOOLEAN NOT NULL DEFAULT FALSE,
    username_issued VARCHAR(25) REFERENCES users ON DELETE CASCADE
);

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL
);

CREATE TABLE books_authors (
    book_id INTEGER NOT NULL REFERENCES books,
    author_id INTEGER NOT NULL REFERENCES authors,
    PRIMARY KEY (book_id, author_id)
);
