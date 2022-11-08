# API with NestJS #17. Offset and keyset pagination with PostgreSQL and TypeORM

implemented two types of pagination with PostgreSQL and TypeORM. We’ve pointed out the advantages and disadvantages of both the offset-based approach and the keyset pagination. While neither of them are ideal, they make a good combination that covers a variety of cases.

Since in this series we’ve also used Elasticsearch, we didn’t forget about it when implementing the pagination. While keyset pagination might not be a perfect fit with Elasticsearch, it also has other built-in methods of pagination.
