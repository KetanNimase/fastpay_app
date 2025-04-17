-- Claims table
CREATE TABLE claims (
  id SERIAL PRIMARY KEY,
  practice_location VARCHAR(255),
  provider_name VARCHAR(255),
  service_date DATE,
  bill_number VARCHAR(50),
  patient_name VARCHAR(255),
  charge_amount DECIMAL(10,2),
  insurance_amount DECIMAL(10,2),
  claim_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insurance Eligibility table
CREATE TABLE insurance_eligibility (
  id SERIAL PRIMARY KEY,
  patient_name VARCHAR(255),
  appointment_date DATE,
  status VARCHAR(50),
  policy_expiry DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AR/Denials table
CREATE TABLE ar_denials (
  id SERIAL PRIMARY KEY,
  claim_id INTEGER REFERENCES claims(id),
  type VARCHAR(50),
  status VARCHAR(50),
  follow_up_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);