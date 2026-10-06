-- Digital Flow Perú: esquema MySQL para reseñas y contactos compartidos.
CREATE DATABASE IF NOT EXISTS digital_flow_peru
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE digital_flow_peru;

CREATE TABLE reviews (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  description VARCHAR(500) NOT NULL,
  project VARCHAR(160) NULL,
  language ENUM('es','en') NOT NULL DEFAULT 'es',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT reviews_rating_range CHECK (rating BETWEEN 1 AND 7),
  INDEX idx_reviews_created_at (created_at)
) ENGINE=InnoDB;

CREATE TABLE contact_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact_created_at (created_at)
) ENGINE=InnoDB;

-- Consultas principales para una futura API:
-- SELECT * FROM reviews ORDER BY created_at DESC;
-- INSERT INTO reviews (name, email, rating, description, project)
-- VALUES (?, ?, ?, ?, ?);
-- INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?);
