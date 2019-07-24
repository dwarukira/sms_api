import { Table, Column, Model, HasMany, DataType, ForeignKey, PrimaryKey, IsUUID, BelongsTo } from 'sequelize-typescript';
import Contact from './contact.model';

@Table
export class Sms extends Model<Sms> {

   
    @Column
    message: String

    @Column
    status: boolean

    @ForeignKey(() => Contact)
    @Column
    toId: number


    @ForeignKey(() => Contact)
    @Column
    fromId: number

    @BelongsTo(() => Contact, 'toId')
    to: Contact
    
    @BelongsTo(() => Contact, 'fromId')
    from: Contact 
    

}



