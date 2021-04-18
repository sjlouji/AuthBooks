const { blackListValidation, updateBlackListValidation, deleteBlackListValidation } = require('../../middleware/validation/blackList')
const BlackListHelper = require('../../helper/BlackListHelper');
const BlackListDataModel = require('../../model/admin/BlackListDataModel')
const { blackListError, httpResponse} = require('books-constants')

class BlackListController {
    static async blackListName(req, res, next) {
        let error = [];
        let constructError;
        let constructResponse;
        const { name } = req.body;
        const user = req.user;
        console.log(`[Blacklist Insert Payoload]: ${JSON.stringify(req.body)}`)
        //  Validate Payload
        const validation = await blackListValidation(req.body)
        if(validation.length !== 0) {
            constructError = BlackListHelper.constructErrorResponse(validation, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Blacklist Insert Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        // Check if the name exists
        const blackListName = await BlackListDataModel.findName(name.toUpperCase());
        if(blackListName !== null) {
            error.push(blackListError.BLACK02)
            constructError = BlackListHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Blacklist Insert Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        // Blacklist Name
        const insertName = await BlackListDataModel.insertName(name.toUpperCase(), user._id);
        if (!insertName) {
            console.log(`[Blacklist Insert Error]: ${JSON.stringify(insertName)}`)
            error.push(serverError.SER01)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
        }
        constructResponse = BlackListHelper.constructBlackListResponse();
        console.log(`[Blacklist Insert Success]: ${JSON.stringify(constructResponse)}`)
        return res.status(httpResponse.HTTP_OK).json(constructResponse);
    }

    static async listNames(req, res, next) {
        let error = []
        let constructResponse;
        //  Get all data from DB
        const blackListedNames = await BlackListDataModel.getBlackListedNames();
        if(!blackListedNames) {
            console.log(`[Blacklist List Error]: ${JSON.stringify(blackListedNames)}`)
            error.push(serverError.SER01)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
        }
        // Construct Response
        constructResponse = BlackListHelper.constructResponse(blackListedNames);
        console.log(`[Blacklist List Success]: ${JSON.stringify(constructResponse)}`)
        return res.status(httpResponse.HTTP_OK).json(constructResponse)
    }

    static async updateNames (req, res, next) {
        let error = []
        let constructError;
        let constructResponse;
        const { name, id } = req.body;
        const user = req.user;
        console.log(`[Blacklist Update Payoload]: ${JSON.stringify(req.body)}`)
        //  Validate Payload
        const validation = await updateBlackListValidation(req.body)
        if(validation.length !== 0) {
            constructError = BlackListHelper.constructErrorResponse(validation, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Blacklist Update Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        //  Validatie request payload
        const validatedId = await BlackListDataModel.findId(id);
        if(validatedId === null) {
            error.push(blackListError.BLACK05)
            constructError = BlackListHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Blacklist Update Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        // Check if the name exists
        const blackListName = await BlackListDataModel.findName(name.toUpperCase());
        if(blackListName !== null) {
            error.push(blackListError.BLACK02)
            constructError = BlackListHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Blacklist Update Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        // Blacklist Name
        const updateName = await BlackListDataModel.updateName(validatedId, name.toUpperCase(), user._id);
        if (!updateName) {
            console.log(`[Blacklist Update Error]: ${JSON.stringify(updateName)}`)
            error.push(serverError.SER01)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
        }
        // Construct response payload
        constructResponse = BlackListHelper.constructBlackListResponse();
        console.log(`[Blacklist Update Success]: ${JSON.stringify(constructResponse)}`)
        return res.status(httpResponse.HTTP_OK).json(constructResponse);
    }

    static async deleteName(req, res, next) {
        let error = []
        let constructError;
        let constructResponse;
        const { id } = req.body;
        console.log(`[Blacklist Delete Payoload]: ${JSON.stringify(req.body)}`)
        //  Validate Payload
        const validation = await deleteBlackListValidation(req.body)
        if(validation.length !== 0) {
            constructError = BlackListHelper.constructErrorResponse(validation, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Blacklist Delete Payoload]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        //  Validate the request ID
        const validatedId = await BlackListDataModel.findId(id);
        if(validatedId === null) {
            error.push(blackListError.BLACK05)
            constructError = BlackListHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Blacklist Delete Payoload]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        // Delete name
        const deleteName = await BlackListDataModel.deleteName(validatedId);
        if (!deleteName) {
            console.log(`[Blacklist Delete Payoload]: ${JSON.stringify(deleteName)}`);
            error.push(serverError.SER01)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
        }
        // Construct delete response
        constructResponse = BlackListHelper.constructBlackListResponse();
        console.log(`[Blacklist Success Payoload]: ${JSON.stringify(constructResponse)}`);
        return res.status(httpResponse.HTTP_OK).json(constructResponse);
    }
}

module.exports = BlackListController;