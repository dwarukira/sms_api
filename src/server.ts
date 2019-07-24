import express from 'express';
import bodyParser from "body-parser";


import routes from "./api/routes";
import { sequelize } from './api/sequelize';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));


app.use('/api', routes);

app.listen(3000, async() => {
    // await sequelize.sync({force: true});
    await sequelize.sync({force:false})
    console.log('SMS app listening on port 3000!')
});