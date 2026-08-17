# SQL Basics: The Queries Every Beginner Should Know

URL: https://techpulzo.in/sql-basics-the-queries-every-beginner-should-actually-know
Category: Tutorials | Status: Published | Quality Score: 6 | Editorial Decision: IMPROVE
Editorial Reason: Real, runnable, correct SQL code — genuinely more concrete than most of the catalog — but its own indexing section pre-empts the dedicated database-indexes article and needs trimming/cross-linking.
Subtitle: Ten queries that cover most of what you'll use day to day, with runnable examples
Keywords: sql basics, sql for beginners, learn sql, sql queries tutorial

---

You don't need to be a backend developer to benefit from SQL — a marketer who can pull their own numbers, a product manager who can check a user count directly, and a data analyst all lean on the same handful of queries. Here are the ten that cover most real-world use.

[IMAGE: Key points: Setting Up a Free Practice Database, 1. SELECT — Get Data From a Table, 2. WHERE — Filter Rows, 3. ORDER BY — Sort Results, 4. LIMIT — Cap the Results]

## Setting Up a Free Practice Database
You don't need to install anything to start. SQLite's online playground, or a free PostgreSQL instance on a platform like Neon or Supabase, both let you run real queries against sample data in a browser within minutes.

## 1. SELECT — Get Data From a Table
SELECT name, email FROM users;Pulls specific columns instead of everything. Avoid SELECT * in real applications — it pulls columns you don't need and breaks silently if the table structure changes later.

## 2. WHERE — Filter Rows
SELECT * FROM orders WHERE status = 'delivered';Combine conditions with AND / OR: WHERE status = 'delivered' AND total > 500.

## 3. ORDER BY — Sort Results
SELECT * FROM products ORDER BY price DESC;DESC for highest first, ASC (the default) for lowest first.

## 4. LIMIT — Cap the Results
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;Combined with ORDER BY, this is how you get "the 10 most recent" anything — one of the most common real query patterns.

## 5. COUNT, SUM, AVG — Aggregate Functions
SELECT COUNT(*) FROM orders WHERE status = 'delivered';
SELECT SUM(total) FROM orders WHERE status = 'delivered';
SELECT AVG(total) FROM orders;Answers "how many," "how much in total," and "what's the average" — the three questions behind most basic reporting.

## 6. GROUP BY — Aggregate Per Category
SELECT status, COUNT(*) FROM orders GROUP BY status;Instead of one total, this returns a count for each distinct status — delivered, pending, cancelled — in one query.

## 7. JOIN — Combine Data From Two Tables
SELECT orders.id, users.name
FROM orders
JOIN users ON orders.user_id = users.id;Real data is rarely in one table. This pulls the customer's name alongside their order by matching user_id in orders to id in users — the single most-used query type once your data has any real structure.

## 8. DISTINCT — Remove Duplicates
SELECT DISTINCT country FROM users;Returns each unique value once — useful for answering "which countries do we have users in" without a repeated row per user.

## 9. INSERT, UPDATE, DELETE — Changing Data
INSERT INTO users (name, email) VALUES ('Asha', 'asha@example.com');
UPDATE users SET email = 'new@example.com' WHERE id = 42;
DELETE FROM users WHERE id = 42;Always pair UPDATE and DELETE with a specific WHERE clause. Running either without one changes or removes every row in the table. I've watched a teammate do exactly this on a staging database, and the panic in the room while we restored from backup is not something I want to repeat on production.

## 10. Subqueries — A Query Inside a Query
SELECT name FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 5000);Finds users who have at least one order over ₹5,000, by nesting an "orders" query inside a "users" query. This is where SQL starts feeling less like memorized syntax and more like a genuine problem-solving tool.

## A Practice Exercise to Try
Using a sample orders/users database (most free SQL playgrounds include one), try writing: "the top 5 customers by total amount spent." It requires a JOIN, a GROUP BY, a SUM, an ORDER BY, and a LIMIT — nearly everything above, in one query.

## Mistakes Beginners Make
- Forgetting WHERE on an UPDATE or DELETE — always run a SELECT with the same condition first to confirm which rows you're about to affect
- Using SELECT * in real applications instead of naming the columns you need
- Mixing up WHERE and HAVING — WHERE filters rows before grouping, HAVING filters after a GROUP BY
- Not indexing columns used in WHERE and JOIN clauses on large tables, which slows queries down as data grows

## Understanding Indexes, Briefly
Queries filtering or joining on a column without an index force the database to scan every row to find matches — fine on a table with a few hundred rows, painfully slow on one with millions. An index is a separate, sorted structure the database maintains alongside the table, letting it jump directly to matching rows instead of scanning all of them. As a beginner rule of thumb: any column you frequently filter with WHERE or join with JOIN on a large table is a candidate for an index, added with a simple CREATE INDEX statement.

## NULL Values Trip Up Beginners Constantly
A column with no value is NULL, not zero and not an empty string, and standard comparison operators behave unexpectedly around it — WHERE column = NULL never matches anything, even for rows where the column has no value. Use WHERE column IS NULL or WHERE column IS NOT NULL instead. This single gotcha causes more silently wrong query results for beginners than almost any other SQL quirk.

## INNER JOIN vs LEFT JOIN, Since People Always Ask
An INNER JOIN (the default kind of JOIN) only returns rows that match in both tables, so a user with zero orders wouldn't show up at all. A LEFT JOIN keeps every row from the first table regardless of whether it matched, filling in NULL for anything from the second table that didn't. That's the one to reach for when you want to see users with zero orders, not just the ones with at least one. And no, you don't need to memorize any of this before you can use SQL on the job. Most day-to-day SQL work is looking up exact syntax for something you rarely use, while the ten patterns above become second nature just from repetition. Understanding what each clause does to the data matters far more than memorizing edge cases.

## Reading a Query Plan, Briefly
Most databases support an EXPLAIN command placed before any query, which shows how the database intends to execute it — whether it's using an index or scanning the full table, and roughly how expensive that plan is. You don't need to master this immediately, but knowing it exists is useful the first time a query that used to be fast suddenly feels slow on a growing table; it's the standard first diagnostic step.

## Next Steps
These ten queries cover the majority of what I write day to day on the job, backend developer or not. From here, practice against a real dataset rather than reading more syntax — writing queries against actual messy data is what makes the concepts stick.