import { Sequelize } from 'sequelize'

const db = new Sequelize('anime_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db