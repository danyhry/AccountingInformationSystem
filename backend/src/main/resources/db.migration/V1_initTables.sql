CREATE TABLE roles
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users
(
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(255)        NOT NULL,
    surname    VARCHAR(255),
    password   VARCHAR(255)        NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    role_id    INTEGER             NOT NULL REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE,
    address_id INTEGER REFERENCES address (id) ON DELETE CASCADE ON UPDATE CASCADE
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


CREATE TABLE address
(
    id             SERIAL PRIMARY KEY,
    user_id        BIGINT       NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    city           VARCHAR(100) NOT NULL
);

CREATE TABLE utility_type
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE utilities
(
    id              SERIAL PRIMARY KEY,
    user_id         BIGINT       NOT NULL,
    address_id      BIGINT,
    utility_type_id BIGINT       NOT NULL,
    personal_number VARCHAR(100) NOT NULL,
    previous_value  BIGINT       NOT NULL,
    current_value   BIGINT       NOT NULL,
    tariff          BIGINT       NOT NULL,
    usage           BIGINT,
    amount_to_pay   BIGINT,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (address_id) REFERENCES address (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (utility_type_id) REFERENCES utility_type (id) ON DELETE CASCADE ON UPDATE CASCADE
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
