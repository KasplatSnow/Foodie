CREATE TABLE user (
  userID int NOT NULL AUTO_INCREMENT,
  username varchar(45) NOT NULL,
  role enum('USER','BUSINESS','ADMIN') NOT NULL,
  password varchar(45) NOT NULL,
  email varchar(45) DEFAULT NULL,
  address varchar(45) DEFAULT NULL,
  phone_number varchar(45) DEFAULT NULL,
  PRIMARY KEY (userID)
);

CREATE TABLE restaurant (
  restaurantID int NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  ownerID int NOT NULL,
  address varchar(45) DEFAULT NULL,
  zip_code varchar(45) DEFAULT NULL,
  phone_number varchar(45) DEFAULT NULL,
  hours varchar(45) DEFAULT NULL,
  description varchar(45) DEFAULT NULL,
  rating float DEFAULT NULL,
  price int DEFAULT NULL,
  email varchar(45) DEFAULT NULL,
  lng double DEFAULT NULL,
  lat double DEFAULT NULL,
  PRIMARY KEY (restaurantID),
  KEY userID_idx (ownerID),
  CONSTRAINT userID FOREIGN KEY (ownerID) REFERENCES user (userID)
);

CREATE TABLE review (
  reviewID int NOT NULL AUTO_INCREMENT,
  review_text text NOT NULL,
  rating float NOT NULL,
  userID int DEFAULT NULL,
  restaurantID int DEFAULT NULL,
  PRIMARY KEY (reviewID),
  KEY userID (userID),
  KEY restaurantID (restaurantID),
  CONSTRAINT review_ibfk_1 FOREIGN KEY (userID) REFERENCES user (userID) ON DELETE CASCADE,
  CONSTRAINT review_ibfk_2 FOREIGN KEY (restaurantID) REFERENCES restaurant (restaurantID) ON DELETE CASCADE
);

CREATE TABLE cuisine (
  id bigint NOT NULL AUTO_INCREMENT,
  restaurantID int NOT NULL,
  cuisine varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY restaurantID (restaurantID),
  CONSTRAINT cuisine_ibfk_1 FOREIGN KEY (restaurantID) REFERENCES restaurant (restaurantID) ON DELETE CASCADE
);

CREATE TABLE photo (
  id bigint NOT NULL AUTO_INCREMENT,
  restaurantID int NOT NULL,
  photo varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY restaurantID (restaurantID),
  CONSTRAINT photo_ibfk_1 FOREIGN KEY (restaurantID) REFERENCES restaurant (restaurantID) ON DELETE CASCADE
);