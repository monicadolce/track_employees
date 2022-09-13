SELECT *
FROM role
JOIN employee ON employee.role_id = role.id;