import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const { DataTypes } = Sequelize

const Favorite = db.define("fav_anime", {
    uuid: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    session: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
            notEmpty: true
        }
    },
    anime_id: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    anime_title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    anime_poster: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
            notEmpty: true
        }
    },
    anime_links: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
            notEmpty: true
        }
    }
})

export default Favorite;