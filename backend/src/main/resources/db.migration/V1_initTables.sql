CREATE TABLE roles
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users
(
    id       BIGSERIAL PRIMARY KEY,
    name     VARCHAR(255)        NOT NULL,
    surname  VARCHAR(255),
    password VARCHAR(255)        NOT NULL,
    email    VARCHAR(255) UNIQUE NOT NULL,
    role_id  INTEGER             NOT NULL REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_roles
(
    user_id BIGINT  NOT NULL REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    role_id INTEGER NOT NULL REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE categories
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE incomes
(
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE,
    description VARCHAR(50) NOT NULL,
    amount      BIGINT      NOT NULL,
    date        DATE        NOT NULL
);

CREATE TABLE expenses
(
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE,
    description VARCHAR(50) NOT NULL,
    amount      BIGINT      NOT NULL,
    date        DATE        NOT NULL
);



CREATE OR REPLACE FUNCTION update_user_roles() RETURNS TRIGGER AS
$$
BEGIN
    UPDATE user_roles SET role_id = NEW.role_id WHERE user_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_roles_trigger
    AFTER UPDATE OF role_id
    ON users
    FOR EACH ROW
EXECUTE FUNCTION update_user_roles();
