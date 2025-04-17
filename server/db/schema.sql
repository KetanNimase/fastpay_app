CREATE TABLE claims (
    id SERIAL PRIMARY KEY,
    practice_location VARCHAR(255),
    provider_name VARCHAR(255),
    insurance_name VARCHAR(255),
    service_date DATE,
    bill_number VARCHAR(50),
    patient_name VARCHAR(255),
    charge_amount DECIMAL(10,2),
    insurance_amount DECIMAL(10,2),
    submission_type VARCHAR(50),
    bill_status VARCHAR(50),
    claim_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    submitted_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_claims_practice_location ON claims(practice_location);
CREATE INDEX idx_claims_provider_name ON claims(provider_name);
CREATE INDEX idx_claims_insurance_name ON claims(insurance_name);
CREATE INDEX idx_claims_service_date ON claims(service_date);


-- Practice Locations table
CREATE TABLE practice_locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Providers table
CREATE TABLE providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(100),
    practice_location_id INTEGER REFERENCES practice_locations(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insurance Companies table
CREATE TABLE insurance_companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    payer_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Patients table
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    insurance_id INTEGER REFERENCES insurance_companies(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enhance the claims table with foreign keys
ALTER TABLE claims 
ADD COLUMN practice_location_id INTEGER REFERENCES practice_locations(id),
ADD COLUMN provider_id INTEGER REFERENCES providers(id),
ADD COLUMN insurance_id INTEGER REFERENCES insurance_companies(id),
ADD COLUMN patient_id INTEGER REFERENCES patients(id);

-- Create a table for claim status history
CREATE TABLE claim_status_history (
    id SERIAL PRIMARY KEY,
    claim_id INTEGER REFERENCES claims(id),
    status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100)
);

-- Create a table for claim attachments
CREATE TABLE claim_attachments (
    id SERIAL PRIMARY KEY,
    claim_id INTEGER REFERENCES claims(id),
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    file_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT NOW(),
    uploaded_by VARCHAR(100)
);

-- Create indexes for the new foreign keys
CREATE INDEX idx_claims_practice_location_id ON claims(practice_location_id);
CREATE INDEX idx_claims_provider_id ON claims(provider_id);
CREATE INDEX idx_claims_insurance_id ON claims(insurance_id);
CREATE INDEX idx_claims_patient_id ON claims(patient_id);
CREATE INDEX idx_claim_status_history_claim_id ON claim_status_history(claim_id);
CREATE INDEX idx_claim_attachments_claim_id ON claim_attachments(claim_id);

-- Create a view for claims with related information
CREATE VIEW claims_view AS
SELECT 
    c.id,
    pl.name as practice_location,
    p.name as provider_name,
    ic.name as insurance_name,
    CONCAT(pt.first_name, ' ', pt.last_name) as patient_name,
    c.service_date,
    c.bill_number,
    c.charge_amount,
    c.insurance_amount,
    c.submission_type,
    c.bill_status,
    c.claim_status,
    c.created_at,
    c.updated_at,
    c.submitted_at
FROM claims c
LEFT JOIN practice_locations pl ON c.practice_location_id = pl.id
LEFT JOIN providers p ON c.provider_id = p.id
LEFT JOIN insurance_companies ic ON c.insurance_id = ic.id
LEFT JOIN patients pt ON c.patient_id = pt.id;