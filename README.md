### Query Fragment
```
query Query($userId: Int) {
  user(id: $userId) {
    ...userComplete
  }
  users {
    ...userComplete
  }
}

fragment userComplete on User {
  id
  name
  email
  age
  salary
  vip
  role {
    id
    name
  }
}
```
