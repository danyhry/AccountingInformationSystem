CREATE TABLE users
(
    user_id  serial PRIMARY KEY,
    name     VARCHAR(255)        NOT NULL,
    surname  VARCHAR(255),
    password VARCHAR(50)         NOT NULL,
    email    VARCHAR(255) UNIQUE NOT null,
    active boolean
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
