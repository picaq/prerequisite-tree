-- test sql queries: Typecasting into json
-- no trailing commas
-- ::json outside of quotes!
INSERT INTO tasks (links)
     VALUES (
  '[
    { "source": 0, "target": 0 },
    { "source": 1, "target": 0 },
    { "source": 2, "target": 0 },
    { "source": 3, "target": 0 },
    { "source": 4, "target": 0 },
    { "source": 5, "target": 0 },
    { "source": 6, "target": 0 },
    { "source": 7, "target": 1 },
    { "source": 8, "target": 1 },
    { "source": 9, "target": 2 },
    { "source": 10, "target": 2 },
    { "source": 10, "target": 3 },
    { "source": 10, "target": 4 },
    { "source": 10, "target": 5 },
    { "source": 11, "target": 6 },
    { "source": 9, "target": 11 },
    { "source": 12, "target": 3 },
    { "source": 12, "target": 3 },
    { "source": 13, "target": 10 },
    { "source": 14, "target": 13 }
    ]'
  ::json
     );