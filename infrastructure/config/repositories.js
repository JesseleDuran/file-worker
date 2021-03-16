import pg from 'pg'
import SQLLocationRepository from "../repository/SQLLocationRepository.js";

export const createRepository = async ({DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT}) => new Promise((resolve, reject) => {
    const pool = new pg.Pool({
        user: DB_USER,
        host: DB_HOST,
        database: DB_NAME,
        password: DB_PASSWORD,
        port: DB_PORT
    });
    const repository = new SQLLocationRepository(pool);
    resolve(repository);
});
