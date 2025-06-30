CREATE TABLE IF NOT EXISTS users
(
  name String,
  email String,
  platform LowCardinality(String),
  created_at DateTime
)
ENGINE = MergeTree
ORDER BY created_at;