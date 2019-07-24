import { DataType, Model, Table, Column, HasMany, DefaultScope } from "sequelize-typescript";
import { Sms } from "./sms.model";


@DefaultScope({
    include: [
        {

            as: "sent",
            model: () => Sms,
        },
        {

            as: "recieved",
            model: () => Sms,
        },
    ]
})
@Table
export class Contact extends Model<Contact> {

    @Column
    name: String

    @Column
    phone: String

    @HasMany(() => Sms, 'toId')
    sent: Sms[]

    @HasMany(() => Sms, 'fromId')
    recieved: Sms[]



}