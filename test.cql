create table if not exists human (
  id uuid,
  name text,
  primary key (id)
) with clustering order by (something asc) and id = 'something';
