DROP TABLE confirmation_token;
DROP TABLE review;
DROP TABLE location;
DROP TABLE business_account;
DROP TABLE user_account;
DROP TABLE account;
DROP TABLE business_type;
DROP TABLE location_type;

/*DROP USER DogFriendlyWebApp;
CREATE USER DogFriendlyWebApp WITH PASSWORD '7uoKJ^ELvooKHd^py#V*';*/

CREATE TABLE account
(
    account_id INT GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    bio VARCHAR(200) NOT NULL,
    user_role VARCHAR(10) NOT NULL,
    locked boolean NOT NULL,
    enabled boolean NOT NULL,
    PRIMARY KEY (account_id),
    UNIQUE (email)
);

CREATE TABLE user_account
(
    username VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    account_id INT NOT NULL,
    PRIMARY KEY (account_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id),
    UNIQUE (username)
);

CREATE TABLE location_type
(
    location_type_id INT GENERATED ALWAYS AS IDENTITY,
    location_type VARCHAR(30) NOT NULL,
    PRIMARY KEY (location_type_id),
    UNIQUE (location_type)
);

CREATE TABLE confirmation_token
(
    confirmation_token_id INT GENERATED ALWAYS AS IDENTITY,
    confirmation_token VARCHAR(36) NOT NULL,
    created_date DATE NOT NULL,
    account_id INT NOT NULL,
    PRIMARY KEY (confirmation_token_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE business_type
(
    business_type_id INT GENERATED ALWAYS AS IDENTITY,
    business_type VARCHAR(30) NOT NULL,
    PRIMARY KEY (business_type_id),
    UNIQUE (business_type)
);

CREATE TABLE business_account
(
    business_name VARCHAR(30) NOT NULL,
    oib CHAR(11) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    account_id INT NOT NULL,
    business_type_id INT NOT NULL,
    PRIMARY KEY (account_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id),
    FOREIGN KEY (business_type_id) REFERENCES business_type(business_type_id),
    UNIQUE (oib)
);

CREATE TABLE location
(
    longitude NUMERIC(8,5) NOT NULL,
    latitude NUMERIC(8,5) NOT NULL,
    address VARCHAR(50) NOT NULL,
    location_id INT GENERATED ALWAYS AS IDENTITY,
    location_name VARCHAR(30) NOT NULL,
    location_description VARCHAR(200) NOT NULL,
    promoted boolean NOT NULL,
    dog_friendly boolean NOT NULL,
    account_id INT NOT NULL,
    location_type_id INT NOT NULL,
    PRIMARY KEY (location_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id),
    FOREIGN KEY (location_type_id) REFERENCES location_type(location_type_id),
    CHECK(latitude BETWEEN -90 AND 90),
    CHECK(longitude BETWEEN -180 AND 180)
);

CREATE TABLE review
(
    stars NUMERIC(2,1) NOT NULL,
    message VARCHAR(200) NOT NULL,
    account_id INT NOT NULL,
    location_id INT NOT NULL,
    PRIMARY KEY (account_id, location_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id),
    FOREIGN KEY (location_id) REFERENCES location(location_id),
    CHECK(stars BETWEEN 1 and 5)
);

--ACCESS DB
REVOKE CONNECT ON DATABASE dogfriendly FROM PUBLIC;
GRANT CONNECT ON DATABASE dogfriendly TO DogFriendlyWebApp;

--ACCESS SCHEMA
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO DogFriendlyWebApp;

--ACCESS TABLES
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO DogFriendlyWebApp;