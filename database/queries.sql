
-- 1. Zadania o priorytecie high według terminu
SELECT * FROM tasks 
WHERE priority = 'high' AND isDeleted = 0 
ORDER BY deadline ASC;

-- 2. Zadania po terminie i niezakończone
SELECT * FROM tasks 
WHERE deadline < CURDATE() AND status != 'done' AND isDeleted = 0;

-- 3. Zadanie z nazwą tablicy i loginem osoby (JOIN trzech tabel)
SELECT t.title, b.name AS boardName, u.login AS assigneeLogin 
FROM tasks t
JOIN boards b ON t.boardId = b.id
LEFT JOIN users u ON t.assigneeId = u.id
WHERE t.isDeleted = 0;

-- 4. Liczba zadań w każdym statusie dla wybranej tablicy (GROUP BY)
SELECT status, COUNT(*) AS taskCount 
FROM tasks 
WHERE boardId = 1 AND isDeleted = 0 
GROUP BY status;

-- 5. Usunięte zadania z loginem osoby, która je usunęła
SELECT t.title, u.login AS deletedByLogin, t.deletedAt 
FROM tasks t
JOIN users u ON t.deletedById = u.id
WHERE t.isDeleted = 1;

-- 6. Użytkownicy bez żadnego zadania (LEFT JOIN)
SELECT u.* 
FROM users u
LEFT JOIN tasks t ON u.id = t.assigneeId AND t.isDeleted = 0
WHERE t.id IS NULL;

-- 7. Zadania z tytułem zawierającym słowo (LIKE)
SELECT * FROM tasks 
WHERE title LIKE '%design%' AND isDeleted = 0;

-- 8. Zmiana statusu zadania (UPDATE)
UPDATE tasks 
SET status = 'in_progress' 
WHERE id = 5;

-- 9. Soft delete zadania
UPDATE tasks 
SET isDeleted = 1, deletedAt = NOW(), deletedById = 1 
WHERE id = 6;

-- 10. Trwałe usunięcie zadań usuniętych ponad 30 dni temu (DELETE, konto administratora)
DELETE FROM tasks 
WHERE isDeleted = 1 AND deletedAt < (NOW() - INTERVAL 30 DAY);