DROP DATABASE IF EXISTS taskboard;
CREATE DATABASE taskboard;
USE taskboard;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(30) NOT NULL UNIQUE,
    passwordHash CHAR(60) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE boards (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description TEXT NULL,
    ownerId INT UNSIGNED NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isDeleted TINYINT NOT NULL DEFAULT 0,
    deletedAt DATETIME NULL,
    deletedById INT UNSIGNED NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id),
    FOREIGN KEY (deletedById) REFERENCES users(id)
);

CREATE TABLE tasks (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NULL,
    status ENUM('todo', 'in_progress', 'done') NOT NULL DEFAULT 'todo',
    priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
    deadline DATE NULL,
    boardId INT UNSIGNED NOT NULL,
    assigneeId INT UNSIGNED NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isDeleted TINYINT NOT NULL DEFAULT 0,
    deletedAt DATETIME NULL,
    deletedById INT UNSIGNED NULL,
    FOREIGN KEY (boardId) REFERENCES boards(id),
    FOREIGN KEY (assigneeId) REFERENCES users(id),
    FOREIGN KEY (deletedById) REFERENCES users(id)
);