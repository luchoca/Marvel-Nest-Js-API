import * as Joi from 'joi';


//crear validation schema

export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3007),
    DEFAULT_LIMIT: Joi.number().default(10),
    DEFAULT_OFFSET:Joi.number().default(20),
})


///se usa en el app module en
//Imports[ validationSchema: y el nombre del JOi que hayamos creado, en este caso seria JoiValidationSchema]