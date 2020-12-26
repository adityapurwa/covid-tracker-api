import "reflect-metadata";
import {Connection, createConnection} from "typeorm";

import * as config from 'config'

export default function initializeDatabase(): Promise<Connection> {
    return new Promise((resolve, reject) => {
        createConnection(config.get('orm')).then(async connection => {
            if(process.env.NODE_ENV === 'test'){
                await connection.synchronize(true)
            }
            resolve(connection)
        }).catch(error => reject(error));
    })
}


