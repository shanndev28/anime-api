import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import db from './library/config/Database.js'
import sequelizeStore from 'connect-session-sequelize'

import Fav from './library/routes/Fav.js'
import History from './library/routes/History.js'
import SearchAnime from './library/routes/SearchAnime.js'

dotenv.config()
const app = express()

// async function as() {
//     await db.sync();
// }

// as()

const sessionStore = sequelizeStore(session.Store)
const store = new sessionStore({ db: db })

app.set("json spaces", 3)

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://shann.cloud', 'https://www.shann.cloud']
}))

app.use(session({
    resave: false,
    secret: process.env.SESS_SECRET,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: "auto",
        maxAge: 31557600000
    }
}))

app.use(Fav)
app.use(History)
app.use(SearchAnime)

// store.sync()
app.listen(process.env.APP_PORT, () => console.log("Server up and running on " + process.env.APP_PORT))



// import axios from 'axios'
// import cheerio from 'cheerio'

// const getAnimeOngoing = async () => {
//     await axios.get("https://oploverz.co.id/ongoing/")
//         .then(({ data }) => {
//             let $ = cheerio.load(data)

//             $("div.main-col > div.xrelated").get().map(async (a, b) => {
//                 let url = $(a).find("a").attr("href")

//                 console.log(url)
//             })
//         })
// }

// getAnimeOngoing()