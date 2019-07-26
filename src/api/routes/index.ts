import express from "express"
import { listContacts, createContact, getContactById, createSms, deleteContact, listSms, deleteSms, getSmsById } from '../controller'


const  router= express.Router();

import swaggerUi  from 'swagger-ui-express';
import swaggerDocument from "../../../docs/swagger.json"


router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.get('/status', (req, res) => {
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});



router.get("/contacts", listContacts )
router.post("/contacts", createContact )
router.get("/contacts/:id", getContactById)
router.delete("/contacts/:id", deleteContact)

router.get('/sms', listSms)
router.post('/sms', createSms)
router.get('/sms/:id', getSmsById)
router.delete('/sms/:id', deleteSms)



export default router