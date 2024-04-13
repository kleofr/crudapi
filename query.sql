CREATE DATABASE 'users';

CREATE TABLE users_table (
    id INT,
    name VARCHAR(45),
    email VARCHAR(45),
);

INSERT INTO users_table(id, name, email)
VALUES(1,'Himanish More', 'morehimanish@gmail.com');

UPDATE users_table
SET email = 'himanish_more_it@moderncoe.edu.in'
WHERE id = 1;

DELETE FROM users_table WHERE name='Himanish More';