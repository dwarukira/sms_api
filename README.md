
# SMS-Management-Application-API
SMS Management Application API is a simple appliaction that enables users to send and receive text messages. 


**Technologies
 - [Nodejs](https://nodejs.org/) - Javascript runtime
 - [Typescript](https://www.typescriptlang.org/) - A typed superset of Javascript 
 - [Express](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework.
 - [Postgres](https://www.postgresql.org/) - PostgreSQL is a powerful, open source object-relational database system.

**How to set up locally**
* clone the repo
     
     `git clone git@github.com:dwarukira/sms_api.git`

     
* Install postgres and create database  both for development and testing
* Copy `.env.example` to `.env` and update the values.
* Install dependencies

     `yarn`
     
* Run database migrations

     `yarn db:migrate`
     
* start the application with 

     `yarn watch`
     
* Run the tests

     `yarn test`

**API features**
* creating contacts
* sending and recieving sms

**Endpoints exposed by the API**


Endpoint                    |  Functionality
 ------------------------   |   ------------------------ 
GET /contacts               | get all contacts
GET /contacts/:id           | get contact with the given id
POST /contacts              | create contact
DELETE /contacts/:id        | delete contact with the given id
GET /sms                    | get all sms 
GET /sms/:id                | get sms with the given id
POST /sms                   | send an sms
DELETE /sms/:id             | delete sms with the given id


**Endpoint payload**

* POST /contacts
```
{
  "name": "name",
  "phone_number": "phone number"
}
```

* POST /sms
** The sender and receiver contacts have to be existing for successful
message sending**

```
{
  "sender": "the phone number of the sender",
  "receiver": "the phone number of message reciepient",
  "message": "message to send"
}
```

