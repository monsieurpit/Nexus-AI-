import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('sql', slug, title, keywords, content);

export const CODE_SQL = [
  c('queries', 'SQL queries: SELECT, WHERE, ORDER BY, LIMIT, aggregates, GROUP BY, HAVING, NULL', ['sql select', 'sql where', 'sql group by', 'sql having', 'sql count sum avg', 'sql order by', 'sql limit offset', 'sql null', 'sql like', 'sql case when', 'sql distinct'],
    `SELECT name, email FROM users WHERE active = TRUE AND created_at >= '2026-01-01' ORDER BY name ASC LIMIT 20 OFFSET 40;
Logical order of execution: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT (so WHERE can't use SELECT aliases; ORDER BY can).
Filters: =, <> (or !=), <, >=, BETWEEN 1 AND 10 (inclusive), IN ('a', 'b'), NOT IN (beware NULLs in the list), LIKE 'An%' (% any chars, _ one char; ILIKE in Postgres = case-insensitive), IS NULL / IS NOT NULL (never = NULL), EXISTS (subquery).
NULL means unknown: NULL = NULL is not true; aggregates ignore NULLs; COALESCE(nickname, name) picks the first non-null; NULLIF(a, b).
Aggregates: COUNT(*) (rows), COUNT(col) (non-null values), COUNT(DISTINCT col), SUM, AVG, MIN, MAX.
SELECT country, COUNT(*) AS users, AVG(age) AS avg_age FROM users GROUP BY country HAVING COUNT(*) > 100 ORDER BY users DESC; — every selected non-aggregate column must be in GROUP BY. WHERE filters rows before grouping, HAVING filters groups after.
CASE: SELECT name, CASE WHEN score >= 90 THEN 'A' WHEN score >= 80 THEN 'B' ELSE 'F' END AS grade FROM results; conditional counting: SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) or COUNT(*) FILTER (WHERE status = 'paid') (Postgres).
DISTINCT removes duplicate rows. Aliases: AS. String functions: CONCAT / ||, LOWER, UPPER, TRIM, LENGTH, SUBSTRING, REPLACE; dates: NOW(), CURRENT_DATE, DATE_TRUNC('month', ts) (Postgres), EXTRACT(YEAR FROM ts), interval arithmetic now() - INTERVAL '7 days' (Postgres) / DATE_SUB (MySQL) / date('now', '-7 days') (SQLite). CAST(x AS INTEGER) / x::int.
Top N per group, running totals, ranks → window functions (see joins/advanced doc).`),

  c('joins-advanced', 'SQL joins, subqueries, CTEs, window functions, UNION', ['sql join', 'inner join', 'left join', 'sql subquery', 'cte with clause', 'window functions', 'row number over partition', 'sql union', 'self join', 'recursive cte', 'sql rank'],
    `Joins:
SELECT o.id, u.name, o.total FROM orders o INNER JOIN users u ON u.id = o.user_id; — only matching rows.
LEFT JOIN keeps every row from the left table (NULLs where no match): users without orders → SELECT u.* FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL;
RIGHT JOIN (mirror), FULL OUTER JOIN (all from both), CROSS JOIN (every combination), self join (employees e JOIN employees m ON e.manager_id = m.id). Filtering a LEFT-joined table in WHERE turns it into an inner join — put that condition in ON instead. Duplicated rows after a join = one-to-many; aggregate or use DISTINCT carefully.
Many-to-many through a junction table: students ↔ enrollments(student_id, course_id) ↔ courses.
Subqueries: WHERE price > (SELECT AVG(price) FROM products); WHERE id IN (SELECT user_id FROM orders); correlated: WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id); derived table in FROM.
CTEs (readable steps): WITH monthly AS (SELECT DATE_TRUNC('month', created_at) AS m, SUM(total) AS revenue FROM orders GROUP BY 1) SELECT * FROM monthly WHERE revenue > 1000; recursive CTEs for trees/hierarchies: WITH RECURSIVE tree AS (SELECT id, parent_id, name FROM categories WHERE parent_id IS NULL UNION ALL SELECT c.id, c.parent_id, c.name FROM categories c JOIN tree t ON c.parent_id = t.id) SELECT * FROM tree;
Window functions (don't collapse rows): SELECT name, dept, salary, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS r, AVG(salary) OVER (PARTITION BY dept) AS dept_avg, SUM(amount) OVER (ORDER BY day) AS running_total, LAG(amount) OVER (ORDER BY day) AS prev FROM ...; ROW_NUMBER (unique), RANK (gaps), DENSE_RANK, NTILE, LEAD/LAG, FIRST_VALUE. Top 3 per group: wrap in a CTE and WHERE r <= 3.
UNION (removes duplicates) / UNION ALL (keeps them, faster) — same number/types of columns; INTERSECT, EXCEPT.`),

  c('schema-modify', 'SQL schema and data changes: CREATE TABLE, types, constraints, keys, INSERT, UPDATE, DELETE, transactions, indexes', ['create table sql', 'sql primary key', 'foreign key', 'sql insert', 'sql update', 'sql delete', 'sql transaction', 'sql index', 'sql constraints', 'alter table', 'upsert', 'normalization'],
    `CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,   -- Postgres; MySQL: BIGINT AUTO_INCREMENT PRIMARY KEY; SQLite: INTEGER PRIMARY KEY
  email TEXT NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  age INT CHECK (age >= 13),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE orders (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, total NUMERIC(10, 2) NOT NULL, status TEXT NOT NULL DEFAULT 'pending');
Types: INTEGER/BIGINT, NUMERIC/DECIMAL (money — never FLOAT), REAL/DOUBLE, TEXT/VARCHAR(n), BOOLEAN, DATE, TIMESTAMP(TZ), UUID, JSON/JSONB (Postgres), BLOB/BYTEA.
ALTER TABLE users ADD COLUMN bio TEXT; ALTER TABLE users DROP COLUMN bio; RENAME COLUMN; DROP TABLE IF EXISTS x; TRUNCATE.
INSERT INTO users (email, name) VALUES ('a@x.com', 'Ana'), ('b@x.com', 'Ben') RETURNING id; (RETURNING in Postgres/SQLite).
Upsert: INSERT ... ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name; (Postgres/SQLite) / ON DUPLICATE KEY UPDATE (MySQL).
UPDATE users SET name = 'Ana B' WHERE id = 7; DELETE FROM users WHERE id = 7; — ALWAYS have a WHERE (run it as a SELECT first); soft delete with a deleted_at column.
Transactions: BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT; (ROLLBACK on error). ACID.
Indexes speed up WHERE/JOIN/ORDER BY on large tables (and slow writes slightly): CREATE INDEX idx_orders_user ON orders (user_id); composite (a, b) works for filters on a or a+b; UNIQUE indexes; check plans with EXPLAIN (ANALYZE). Foreign key columns usually need indexes. Functions on columns (WHERE LOWER(email) = ...) skip normal indexes — use an expression index.
Normalisation: no repeated groups, each fact stored once (users table + orders table, not user name copied in every order); denormalise only for measured performance needs.
Security: parameterised queries from code (WHERE id = $1 / ?), never string concatenation (SQL injection); least-privilege database users.
Dialects: PostgreSQL (feature-rich), MySQL/MariaDB, SQLite (embedded file), SQL Server (T-SQL: TOP 10, IDENTITY, GETDATE()), Oracle. Views: CREATE VIEW active_users AS SELECT ...;`),
];
