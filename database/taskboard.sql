DROP DATABASE IF EXISTS taskboard;
CREATE DATABASE taskboard CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE taskboard;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(30) NOT NULL UNIQUE,
    passwordHash CHAR(60) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `login`, `passwordHash`, `firstName`, `lastName`) VALUES
(1, 'testuser', '$2b$10$abcdefghijklmnopqrstuVWXYZabcdefghijklmnopqrstuvwx', 'Anna', 'Kowalska');

INSERT INTO `boards` (`id`, `name`, `description`, `ownerId`) VALUES
(1, 'Główna tablica', 'Tablica do zadań testowych', 1);

INSERT INTO `tasks` (`id`, `title`, `description`, `status`, `priority`, `deadline`, `boardId`, `assigneeId`, `createdAt`, `isDeleted`, `deletedAt`, `deletedById`) VALUES
(1, 'Zadanie pierwsze', 'Opis pierwszego zadania', 'todo', 'medium', '2026-12-01', 1, 1, '2026-11-01 10:00:00', 0, NULL, NULL),
(2, 'Zadanie stare', 'To zadanie jest starsze niż 30 dni', 'done', 'low', '2026-10-15', 1, 1, '2026-10-01 12:00:00', 0, NULL, NULL),
(3, 'Zadanie trzecie', 'Opis w trakcie', 'in_progress', 'high', '2026-12-05', 1, 1, '2026-11-10 14:00:00', 0, NULL, NULL),
(4, 'Zadanie czwarte', 'Zwykłe zadanie', 'todo', 'medium', '2026-12-10', 1, 1, '2026-11-12 09:30:00', 0, NULL, NULL),
(5, 'Zadanie piąte', 'Zadanie zrobione', 'done', 'high', '2026-11-20', 1, 1, '2026-11-14 16:15:00', 0, NULL, NULL),
(6, 'Zadanie szóste', 'Kolejne zadanie', 'todo', 'low', '2026-12-15', 1, 1, '2026-11-15 11:00:00', 0, NULL, NULL),
(7, 'Zadanie siódme', 'Ważne zadanie w toku', 'in_progress', 'high', '2026-12-08', 1, 1, '2026-11-16 13:20:00', 0, NULL, NULL),
(8, 'Zadanie ósme', 'Zwykłe zadanie do zrobienia', 'todo', 'medium', '2026-12-20', 1, 1, '2026-11-17 08:45:00', 0, NULL, NULL),
(9, 'Stare usunięte zadanie', 'Usunięte ponad 30 dni temu', 'todo', 'low', '2026-09-01', 1, 1, '2026-09-01 10:00:00', 1, '2026-09-10 12:00:00', 1);