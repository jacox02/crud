CREATE DATABASE codealoDB;
USE codealoDB;
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id);

ALTER TABLE users
	MODIFY id INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

CREATE TABLE links (
    id INT(11) NOT NULL,
    tittle VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) 
);

ALTER TABLE links 
    MODIFY id INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE users
MODIFY username VARCHAR(10);

CREATE TABLE tasks (
    id INT(11) NOT NULL,
    tittle VARCHAR(150) NOT NULL,
    assignment TEXT NOT NULL,
    description TEXT,
    user_id INT(11),
    delivery_date timestamp NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE tasks
MODIFY COLUMN delivery_date TEXT;

ALTER TABLE tasks
    ADD PRIMARY KEY (id);

ALTER TABLE tasks
    MODIFY id INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;