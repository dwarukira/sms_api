import express from 'express';
import bodyParser from "body-parser";
import path from 'path';

import routes from "./api/routes";
import { sequelize } from './sequelize';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', routes);

;
app.use("*", (req, res) => res.sendFile(path.join(__dirname+'/../docs/index.html')));


app.listen(process.env.PORT, async() => {
    // await sequelize.sync({force: true});
    await sequelize.sync({force:false})
    console.log('SMS app listening on port 3000!')
});

export default app