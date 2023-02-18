CREATE TABLE users
(
    user_id  serial PRIMARY KEY,
    name     VARCHAR(255)        NOT NULL,
    surname  VARCHAR(255),
    password VARCHAR(50)         NOT NULL,
    email    VARCHAR(255) UNIQUE NOT null,
    active   boolean
);

CREATE TABLE roles
(
    role_id   serial PRIMARY KEY,
    role_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_roles
(
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE categories
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(10) NOT NULL -- 'expense' or 'income'
);

CREATE TABLE expenses
(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER        NOT NULL REFERENCES users (user_id),
    description TEXT           NOT NULL,
    amount      NUMERIC(10, 2) NOT NULL,
    date        DATE           NOT NULL,
    category_id INTEGER        NOT NULL REFERENCES categories (id)
);

CREATE TABLE incomes
(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER        NOT NULL REFERENCES users (user_id),
    description TEXT           NOT NULL,
    amount      NUMERIC(10, 2) NOT NULL,
    date        DATE           NOT NULL,
    category_id INTEGER        NOT NULL REFERENCES categories (id)
);
