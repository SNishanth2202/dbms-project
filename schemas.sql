-- 1. Owners Table
CREATE TABLE Owners (
    owner_id INT PRIMARY KEY,
    owner_name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(15)
);

-- 2. Vehicles Table
CREATE TABLE Vehicles (
    vehicle_id INT PRIMARY KEY,
    owner_id INT,
    vehicle_type VARCHAR(50),
    registration_number VARCHAR(20) UNIQUE,
    model VARCHAR(50),
    FOREIGN KEY (owner_id) REFERENCES Owners(owner_id)
);

-- 3. Registrations Table
CREATE TABLE Registrations (
    registration_id INT PRIMARY KEY,
    vehicle_id INT,
    registration_date DATE,
    expiry_date DATE,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id)
);

-- 4. Offices Table
CREATE TABLE Offices (
    office_id INT PRIMARY KEY,
    office_name VARCHAR(100),
    location VARCHAR(100)
);
