-- Seed Practice Locations
INSERT INTO practice_locations (name, address, city, state, zip_code) VALUES
('Downtown Medical', '123 Main St', 'New York', 'NY', '10001'),
('Westside Clinic', '456 West Ave', 'Los Angeles', 'CA', '90001'),
('North Medical Center', '789 North Blvd', 'Chicago', 'IL', '60601');

-- Seed Providers
INSERT INTO providers (name, specialty, practice_location_id) VALUES
('Dr. Ashley Smith', 'General Medicine', 1),
('Dr. Julia Johnson', 'Pediatrics', 2),
('Dr. Rafael Martinez', 'Cardiology', 3),
('Dr. Joseph Brown', 'Family Medicine', 1);

-- Seed Insurance Companies
INSERT INTO insurance_companies (name, payer_id) VALUES
('Blue Cross', 'BC001'),
('Aetna', 'AET001'),
('UnitedHealth', 'UNT001'),
('Cigna', 'CIG001');

-- Seed Patients (100 records)
INSERT INTO patients (first_name, last_name, date_of_birth, insurance_id)
SELECT 
    'Patient' || generate_series,
    'LastName' || generate_series,
    CURRENT_DATE - (INTERVAL '1 day' * (random() * 20000)::integer),
    (random() * 3 + 1)::integer
FROM generate_series(1, 100);

-- Seed Claims (100 records)
INSERT INTO claims (
    practice_location_id,
    provider_id,
    insurance_id,
    patient_id,
    service_date,
    bill_number,
    charge_amount,
    insurance_amount,
    submission_type,
    bill_status,
    claim_status
)
SELECT 
    (random() * 2 + 1)::integer as practice_location_id,
    (random() * 3 + 1)::integer as provider_id,
    (random() * 3 + 1)::integer as insurance_id,
    generate_series as patient_id,
    CURRENT_DATE - (INTERVAL '1 day' * (random() * 365)::integer) as service_date,
    'BILL-' || to_char(generate_series, 'FM000') as bill_number,
    (random() * 1000 + 50)::numeric(10,2) as charge_amount,
    (random() * 1000 + 50)::numeric(10,2) as insurance_amount,
    CASE (random() * 2)::integer
        WHEN 0 THEN 'Electronic'
        WHEN 1 THEN 'Paper'
        ELSE 'Manual'
    END as submission_type,
    CASE (random() * 4)::integer
        WHEN 0 THEN 'Open'
        WHEN 1 THEN 'In Process'
        WHEN 2 THEN 'Completed'
        WHEN 3 THEN 'On Hold'
        ELSE 'Pending'
    END as bill_status,
    CASE (random() * 5)::integer
        WHEN 0 THEN 'Created'
        WHEN 1 THEN 'Submitted'
        WHEN 2 THEN 'Rejected'
        WHEN 3 THEN 'Accepted'
        WHEN 4 THEN 'Action Required'
        ELSE 'Processed'
    END as claim_status
FROM generate_series(1, 100);

-- Seed Claim Status History
INSERT INTO claim_status_history (claim_id, status, notes, created_by)
SELECT 
    id,
    claim_status,
    'Initial status set',
    'System'
FROM claims;