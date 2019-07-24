
export const getContactByPhone = async (model: any, phone: string) => {
    try{
      const contact = await model.findOne({
        where: { phone }
      });
      return contact ? contact : null;
    }
    catch(error) {
        console.log(error)
      throw new Error(error);
    }
  }
  
  const validateBody = (requiredFields: any, payload: any) => {
    const errors: any = {}
    requiredFields.forEach((field: string | number) => {
      if(!payload[field]){
        errors[field] = `error, ${field} is required`
      } else if (!payload[field].trim().length) {
        errors[field] = `error, ${field} can not be blank`
      }
    })
    return errors
  }
  
  export const validateContacts = ( payload: any ) => {
    const requiredFields = ['phone_number', 'name'];
    console.log(payload)
    return validateBody(requiredFields, payload);
  };
  
  export const validateSms = ( payload: any ) => {
    const requiredFields = ['to', 'from', 'message'];
    return validateBody(requiredFields, payload);
  };
  
  export const validatePhoneNumber = (phone: { match: (arg0: RegExp) => { length: number; }; }) => {
      return phone.match(/\d/g).length===10;
  };
  