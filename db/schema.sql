DROP DATABASE IF EXISTS codegigs_db;
CREATE DATABASE codegigs_db;
USE codegigs_db;

CREATE TABLE gigs (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200),
    technologies VARCHAR(200),
    budget VARCHAR(20),
    description TEXT,
    contact_email VARCHAR(200),
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP,
    PRIMARY KEY (id)
);