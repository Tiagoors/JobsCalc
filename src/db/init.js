const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,  
    hours_per_day INT,
    days_per_week INT,
    vacation_per_year INT,
    value_hour INT 
);`);

    await db.exec(`CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_At DATETIME
);`);

    await db.run(`INSERT INTO profile(
    name, 
    avatar, 
    monthly_budget, 
    hours_per_day, 
    days_per_week, 
    vacation_per_year, 
    value_hour
) VALUES (
    'Tiago',
    'https://github.com/kidanmi.png',
    3000,
    5,
    5,
    4,
    75
);`);

    await db.run(`INSERT INTO jobs (
    name, 
    daily_hours, 
    total_hours, 
    created_At
) VALUES (
    'Pizzaria Guloso',
    2,
    1,
    1617514376018
);`);

    await db.run(`INSERT INTO jobs (
    name, 
    daily_hours, 
    total_hours, 
    created_At
) VALUES (
    'OneTwo Projects',
    3,
    47,
    1617514376018
);`);

    await db.close();
  },
};

initDb.init();
