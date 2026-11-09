CREATE USER 'taskboard_app'@'localhost' IDENTIFIED BY 'TaskBoardApp1!';
GRANT SELECT,INSERT,UPDATE ON taskboard.*TO 'taskboard_app'@'localhost';

CREATE USER 'taskboard_admin'@'localhost' IDENTIFIED BY 'TaskBoardApp1!';
GRANT SELECT,INSERT,UPDATE,DELETE ON taskboard.*TO 'taskboard_admin'@'localhost';

CREATE USER 'taskboard_report'@'localhost' IDENTIFIED BY 'TaskBoardApp1!';
GRANT SELECT ON taskboard.*TO 'taskboard_report'@'localhost';



CREATE USER 'taskboard_app'@'127.0.0.1' IDENTIFIED BY 'TaskBoardApp1!';
GRANT SELECT,INSERT,UPDATE ON taskboard.*TO 'taskboard_app'@'127.0.0.1';

CREATE USER 'taskboard_admin'@'127.0.0.1' IDENTIFIED BY 'TaskBoardApp1!';
GRANT SELECT,INSERT,UPDATE,DELETE ON taskboard.*TO 'taskboard_admin'@'127.0.0.1';

CREATE USER 'taskboard_report'@'127.0.0.1' IDENTIFIED BY 'TaskBoardApp1!';
GRANT SELECT ON taskboard.*TO 'taskboard_report'@'127.0.0.1';
