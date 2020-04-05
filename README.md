# Student score

SELECT STUDENT.ID, STUDENT.NAME FROM STUDENT
GROUP BY STUDENT.ID, STUDENT.NAME, STUDENT.SCORE
HAVING STUDENT.SCORE > (SELECT AVG(STUDENT.SCORE) FROM STUDENT)
ORDER BY STUDENT.ID;

# Students and departments

SELECT d.NAME, count(s.NAME) AS COUNT_OF_STUDENTS_IN_THE_DEPARTMENT
FROM DEPARTMENT d LEFT JOIN STUDENT s
ON d.ID = s.DEPT_ID
GROUP BY d.NAME
ORDER BY count(s.NAME) desc, d.name ASC

# Double size

see doubleSize.js

# IP address validation

Was not careful with edge cases and it took me ages to figure out that I was missing the address :: for IPv6

IPv4
008 and 08 both worked.

IPv6
What I tested before O got there

::x
::ipv4 address (that passes)

# Country population

# Movie Titles

# Todo List

# Enhanced Flexible Grid

