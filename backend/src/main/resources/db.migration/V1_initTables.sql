CREATE TABLE users
(
    user_id  serial PRIMARY KEY,
    name     VARCHAR(255)        NOT NULL,
    surname  VARCHAR(255),
    password VARCHAR(50)         NOT NULL,
    email    VARCHAR(255) UNIQUE NOT null,
    role     INTEGER
);

CREATE TABLE incomes
(
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT      NOT NULL REFERENCES users (id),
    description VARCHAR(50) NOT NULL,
    amount      BIGINT      NOT NULL,
    date        DATE        NOT NULL
);

CREATE TABLE expenses
(
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT      NOT NULL REFERENCES users (id),
    description VARCHAR(50) NOT NULL,
    amount      BIGINT      NOT NULL,
    date        DATE        NOT NULL
);



