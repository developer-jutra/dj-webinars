import pool from './database';

/**
 * Returns a list of all vehicles.
 * Each vehicle includes all columns from the vehicles table.
 */
export async function getAllVehicles() {
  const result = await pool.query('SELECT * FROM vehicles ORDER BY id');
  return result.rows;
}

export async function getAllVehiclesWithDriver() {
  const result = await pool.query(`
    SELECT
      v.*,
      CONCAT(e.first_name, ' ', e.last_name) AS driver_name
    FROM vehicles v
    LEFT JOIN vehicle_employee ve ON v.id = ve.vehicle_id
    LEFT JOIN employees e ON ve.employee_id = e.id
    ORDER BY v.id;
  `);
  return result.rows;
}

/**
 * Returns a list of all employees.
 * Each employee includes all columns from the employees table.
 */
export async function getAllEmployees() {
  const result = await pool.query('SELECT * FROM employees ORDER BY id');
  return result.rows;
}

/**
 * Lists all drivers currently assigned to at least one vehicle, including assignment details.
 * Returns driver info, vehicle license plate, and assignment period.
 */
export async function getDriversWithVehicles() {
  const result = await pool.query(`
    SELECT
      e.id AS driver_id,
      CONCAT(e.first_name, ' ', e.last_name) AS driver_name,
      v.license_plate AS vehicle,
      v.last_maintenance_date,
      ve.since_date AS assigned_since,
      ve.planned_leave_date AS assigned_until
    FROM
      employees e
    JOIN vehicle_employee ve ON e.id = ve.employee_id
    JOIN vehicles v ON ve.vehicle_id = v.id
    WHERE
      e.employee_role = 'driver'
      AND (ve.since_date <= CURRENT_DATE AND (ve.planned_leave_date IS NULL OR ve.planned_leave_date >= CURRENT_DATE))
    ORDER BY
      CONCAT(e.first_name, ' ', e.last_name), ve.since_date;
  `);
  return result.rows;
}

/**
 * Lists all drivers who currently have no active vehicle assignments.
 * Returns driver id and name.
 */
export async function getDriversWithoutVehicles() {
  const result = await pool.query(`
    SELECT
      e.id AS driver_id,
      CONCAT(e.first_name, ' ', e.last_name) AS driver_name
    FROM
      employees e
    WHERE
      e.employee_role = 'driver'
      AND NOT EXISTS (
        SELECT 1
        FROM vehicle_employee ve
        WHERE ve.employee_id = e.id
          AND (ve.since_date <= CURRENT_DATE AND (ve.planned_leave_date IS NULL OR ve.planned_leave_date >= CURRENT_DATE))
      )
    ORDER BY
      CONCAT(e.first_name, ' ', e.last_name);
  `);
  return result.rows;
}

/**
 * Returns the total number of employees with the role 'driver'.
 */
export async function getTotalDrivers() {
  const result = await pool.query(`
    SELECT COUNT(*) AS total_drivers
    FROM employees
    WHERE employee_role = 'driver';
  `);
  return Number(result.rows[0].total_drivers);
}

/**
 * Returns the total number of drivers with at least one current vehicle assignment.
 */
export async function getDriversWithVehiclesCount() {
  const result = await pool.query(`
    SELECT COUNT(DISTINCT e.id) AS drivers_with_vehicles
    FROM employees e
    JOIN vehicle_employee ve ON e.id = ve.employee_id
    WHERE e.employee_role = 'driver'
      AND (ve.since_date <= CURRENT_DATE AND (ve.planned_leave_date IS NULL OR ve.planned_leave_date >= CURRENT_DATE));
  `);
  return Number(result.rows[0].drivers_with_vehicles);
}

/**
 * Returns the total number of drivers without any current vehicle assignment.
 */
export async function getDriversWithoutVehiclesCount() {
  const result = await pool.query(`
    SELECT COUNT(*) AS drivers_without_vehicles
    FROM employees e
    WHERE employee_role = 'driver'
      AND NOT EXISTS (
        SELECT 1
        FROM vehicle_employee ve
        WHERE ve.employee_id = e.id
          AND (ve.since_date <= CURRENT_DATE AND (ve.planned_leave_date IS NULL OR ve.planned_leave_date >= CURRENT_DATE))
      );
  `);
  return Number(result.rows[0].drivers_without_vehicles);
}
