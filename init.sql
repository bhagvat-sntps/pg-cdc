ALTER SYSTEM SET wal_level = logical;
ALTER SYSTEM SET max_wal_senders = 10;
ALTER SYSTEM SET max_replication_slots = 10;

-- Create test table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

-- Replication role for Debezium
CREATE ROLE replicator WITH LOGIN REPLICATION PASSWORD 'replicator';
GRANT ALL PRIVILEGES ON TABLE users TO replicator;


