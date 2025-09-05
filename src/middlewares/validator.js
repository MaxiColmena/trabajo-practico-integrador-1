import { validationResult } from "express-validator";

export const aplicateValidation = (req, res, next) => {
    const errors = validationResult(req);

    //devuelve los errores de express validator 

    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});
    next();
};

//si es que no hay un errores, isEmpty verifica que error contengo un error entonces hace el return del error