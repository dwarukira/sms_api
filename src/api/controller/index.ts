import express from 'express';
import { Contact } from './../models/contact.model';
import { getContactByPhone, validateContacts, validatePhoneNumber, validateSms } from '../utils';
import { Sms } from '../models/sms.model';

export const listContacts = async (req: express.Request, res: express.Response) => {
    try {
        const contacts = await Contact
            .findAll()

        if (!contacts.length) {
            return res.status(400).send("No contacts yet!")
        }
        return res.status(200).send({ contacts })

    } catch (error) {
        res.status(404).send(error)
    }
};


export const getContactById = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    try {
        const contact = await Contact.findByPk(id)

        if (contact) {
            return res.status(200).send({ contact });
        }
        return res.status(404).send({ "message": `Contact with ID ${id} is not found!` });


    } catch (error) {
        res.status(404).send(error)
    }

};

export const createContact = async (req: express.Request, res: express.Response) => {
    const validate = validateContacts(req.body);
    if (Object.keys(validate).length) {
        return res.status(400).send(validate);
    };

    const phone = req.body.phone_number;
    const name = req.body.name;
    if (!validatePhoneNumber(phone)) return res.status(400).send({ "message": "phone_number should be 10 digits" });

    const ifContactExist = await getContactByPhone(Contact, phone);

    if (ifContactExist) return res.status(400).send({ "message": "Phone number already exist." });

    return await Contact
        .create({
            phone,
            name,
        })
        .then(contact => res.status(201).send({ "message": "contact created successfully", contact }))
        .catch(error => res.status(400).send(error));
};


export const deleteContact = async (req: express.Request, res: express.Response) => {

    const id = req.params.id;

    try {
        const contact = await Contact.findByPk(id)

        if (!contact) return res.status(404).send({
            "message": `Contact with Id ${id} is not found!`
        });

        try {
            contact.destroy()
            return res.status(404).send("Successfully deleted.")
        } catch (error) {
            return res.status(400).send(error)
        }
    } catch (error) {
        res.status(400).send(error)
    }


}

export const getSmsById = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    return await Sms.findByPk(id)
        .then(sms => {
            if (sms) {
                return sms.update({
                    status: "Received"
                })
                    .then(() => res.status(200).send(sms))
                    .catch(error => res.status(400).send(error));
            }
            return res.status(404).send({ "message": `Sms with ID ${id} is not found!` });
        })
        .catch(error => res.status(404).send(error));
};

export const listSms = (req: express.Request, res: express.Response) => {
    return Sms
        .findAll()
        .then(sms => {
            if (!sms.length) {
                return res.status(200).send({ "message": "No sms yet." });
            };
            res.status(200).send({ sms });
        })
        .catch(error => res.status(400).send(error))
};

export const createSms = async (req: express.Request, res: express.Response) => {
    const validate = validateSms(req.body);

    if (Object.keys(validate).length) {
        return res.status(400).send({ "message": validate })
    }

    const { from, to, message } = req.body;
    const receiverContact = await getContactByPhone(Contact, to)
    const senderContact = await getContactByPhone(Contact, from);


    if (!senderContact) {
        return res.status(404).send({ "message": `${from} doesn't exist, please provide a valid sender phone number.` });
    };


    if (!receiverContact) {
        return res.status(404).send({ "message": `${to} doesn't exist, please provide a valid receiver phone number.` });
    };

    try {
        const sms = await Sms
            .create({
                fromId: senderContact.id,
                toId: receiverContact.id,
                message: req.body.message,
                status: "New"
            })

        return res.status(201).send({ 'status': "Message sent", "sms": sms })


    } catch (error) {
        res.status(400).send(error)
    }
}

// Delete sms
export const deleteSms = (req: express.Request, res: express.Response) => {
    return Sms.findByPk(req.params.id)
        .then(sms => {
            if (!sms) return res.status(404).send({ "message": `Sms with id ${req.params.id} doesn't exist!` });

            return sms.destroy()
                .then(() => res.status(404).send("deleted"))
                .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
};
