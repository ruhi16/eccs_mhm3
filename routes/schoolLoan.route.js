const { result } = require('@hapi/joi/lib/base');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

// Modle
const { 
    SchoolLoanParticular, 
    SchoolLoanParticularSpecifications,
    SchoolLoanAssignDetails,
    SchoolLoanAssign,
    SchoolLoanPaymentDetails,
    SchoolLoanPayment 
} = require('../models/schoolLoan.model');

// Joi Validation Schema
const { schoolLoanParticularSchema, schoolLoanParticularUpdatedSchema, schoolLoanParticularDeletedSchema } = require('../utils/schoolLoan_validation_schema');
const { schoolLoanParticularsSpecificationSchema, schoolLoanParticularsSpecificationUpdatedSchema, schoolLoanParticularsSpecificationDeletedSchema } = require('../utils/schoolLoan_validation_schema');

const { 
    schoolLoanAssignDetailsSchema,
    schoolLoanAssignDetailsUpdatedSchema,
    schoolLoanAssignDetailsDeletedSchema,
} = require('../utils/schoolLoan_validation_schema');

// '/api/schoolLoan'
router.get('/', (req, res)=>{
    res.send({
        status: 200, 
        message: "This is for School Loan Pages."
    });
});

router.get('/schoolLoanParticulars', async (req, res)=>{
    try{        
        const schoolLoanParticulars = await SchoolLoanParticular.find({});
        // console.log(schoolLoanParticulars);
        if(!schoolLoanParticulars){
            throw createError.Conflict(`This SchoolLoan Particular expired.`);
        }
        // console.log(req.body);
        res.send({
            status: 200, 
            schoolLoanParticular: schoolLoanParticulars
        });
    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/schoolLoanParticulars', async (req, res)=>{
    try{
        const result = await schoolLoanParticularSchema.validateAsync(req.body);

        const doesExist = await SchoolLoanParticular.findOne({_id: result._id});
        if(doesExist){
            throw createError.Conflict(`This SchoolLoan Particular with id '${result._id}' has been already taken.`);
        }

        const schoolLoanParticular = new SchoolLoanParticular(result);
        const savedSchoolLoanParticular = await schoolLoanParticular.save();


        res.send({
            status: 200, 
            schoolLoanParticular: savedSchoolLoanParticular
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/schoolLoanParticulars', async (req, res)=>{
    try{
        // console.log("bofore:", req.body);
        const result = await schoolLoanParticularUpdatedSchema.validateAsync(req.body);
        // console.log("after:", result);

        const updateSchoolLoanParticular = await SchoolLoanParticular.findOneAndUpdate(
            {_id: result._id}, result, {new:true}
        ).select({"short_name": 1, "type": 1, "status": 1});
        
        if(!updateSchoolLoanParticular){
            throw createError.Conflict(`This updateSchoolLoanParticular '${result.short_name}' does not exists.`);
        }
        
        res.send({
            status: 200,
            updateSchoolLoanParticular: updateSchoolLoanParticular
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }

});

router.delete('/schoolLoanParticulars', async (req, res)=>{
    try{
        const result = await schoolLoanParticularDeletedSchema.validateAsync(req.body);

        const deletedSchoolLoanParticular = await SchoolLoanParticular.findOneAndDelete(
            {_id: result._id}
        ).select({"short_name": 1, "type": 1, "status": 1});

        if(!deletedSchoolLoanParticular){
            throw createError.Conflict(`This deletedSchoolLoanParticular '${result._id}' does not exists.`);
        }



        res.send({
            status: 200,
            deletedSchoolLoanParticular: deletedSchoolLoanParticular
        });
    }catch(error){
        console.log(error.message);
        next(error);  
    } 
});





router.get('/schoolLoanParticularsSpecifications', async (req, res)=>{
    const schoolLoanParticularsSpecifications = await SchoolLoanParticularSpecifications.find({});
    if(!schoolLoanParticularsSpecifications){
        throw createError.Conflict(`This SchoolLoanParticularSpecifications has been expired.`);
    }

    res.send({
        status: 200, 
        schoolLoanParticularsSpecifications: schoolLoanParticularsSpecifications
    });
});

router.post('/schoolLoanParticularsSpecifications', async (req, res)=>{
    try{
        // console.log(req.body);
        const result = await schoolLoanParticularsSpecificationSchema.validateAsync(req.body);
        // console.log(result);

        const doesExist = await SchoolLoanParticularSpecifications.findOne({_id: result._id});        
        if(doesExist){
            throw createError.Conflict(`This SchoolLoanParticularUpdatedSchema with id '${result._id}' has been already taken.`);
        }

        const schoolLoanParticularSpecifications = new SchoolLoanParticularSpecifications(result);
        const savedSchoolLoanParticularSpecifications = await schoolLoanParticularSpecifications.save();

        res.send({
            status: 200, 
            savedSchoolLoanParticularSpecifications: savedSchoolLoanParticularSpecifications
        });
    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/schoolLoanParticularsSpecifications', async (req, res)=>{
    try{
        // console.log(req.body);
        const result = await schoolLoanParticularsSpecificationUpdatedSchema.validateAsync(req.body);
        // console.log(result);

        const updatedSchoolLoanParticularSpecifications = await SchoolLoanParticularSpecifications.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({"schoolLoanAssignId": 1, "previous_balance": 1, "current_balance": 1});

        if(!updatedSchoolLoanParticularSpecifications){
            throw createError.Conflict(`This updatedSchoolLoanParticularSpecifications with id '${result._id}' has been already taken.`);
        }
        
        res.send({
            status: 200, 
            updatedSchoolLoanParticularSpecifications: updatedSchoolLoanParticularSpecifications         
        });
    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/schoolLoanParticularsSpecifications', async (req, res)=>{
    try{        
        const result = await schoolLoanParticularsSpecificationDeletedSchema.validateAsync(req.body);        

        const deletedSchoolLoanParticularSpecifications = await SchoolLoanParticularSpecifications.findOneAndDelete(
            {_id: result._id}
        ).select({"schoolLoanAssignId": 1, "previous_balance": 1, "current_balance": 1});

        if(!deletedSchoolLoanParticularSpecifications){
            throw createError.Conflict(`This updateSchoolLoanParticularSpecifications with id '${result._id}' has been already taken.`);
        }
        
        res.send({
            status: 200, 
            deletedSchoolLoanParticularSpecifications: deletedSchoolLoanParticularSpecifications
        });
    }catch(error){
        console.log(error.message);
        next(error);  
    }
});






router.get('/schoolLoanAssignDetails', async (req, res)=>{
    const schoolLoanAssignDetails = await SchoolLoanAssignDetails.find({});
    if(!schoolLoanAssignDetailsSchema){
        throw createError.Conflict(`This schoolLoanAssignDetailsSchema has been expired`)
    }

    res.send({
        status:200,
        schoolLoanAssignDetails: schoolLoanAssignDetails
    });
});

router.post('/schoolLoanAssignDetails', async (req, res)=>{

});

router.put('/schoolLoanAssignDetails', async (req, res)=>{

});

router.delete('/schoolLoanAssignDetails', async (req, res)=>{

});








router.get('/schoolLoanAssign', async (req, res)=>{
    const schoolLoanAssign = await SchoolLoanAssign.find({});
    if(!schoolLoanAssign){
        throw createError.Conflict(`This schoolLoanAssign has been expired`)
    }

    res.send({
        status:200,
        schoolLoanAssign: schoolLoanAssign
    });
});

router.post('/schoolLoanAssign', async (req, res)=>{

});

router.put('/schoolLoanAssign', async (req, res)=>{

});

router.delete('/schoolLoanAssign', async (req, res)=>{

});








router.get('/schoolLoanPayments', async (req, res)=>{
    const schoolLoanPayments = await SchoolLoanPayment.find({});
    if(!schoolLoanPayments){
        throw createError.Conflict(`This schoolLoanPayments has been expired`)
    }

    res.send({
        status:200,
        schoolLoanPayments: schoolLoanPayments
    });
});

router.post('/schoolLoanPayments', async (req, res)=>{

});

router.put('/schoolLoanPayments', async (req, res)=>{

});

router.delete('/schoolLoanPayments', async (req, res)=>{

});








router.get('/schoolLoanPaymentDetails', async (req, res)=>{
    const schoolLoanPaymentDetails = await SchoolLoanPaymentDetails.find({});
    if(!schoolLoanPaymentDetails){
        throw createError.Conflict(`This schoolLoanPaymentDetails has been expired`)
    }

    res.send({
        status:200,
        schoolLoanPaymentDetails: schoolLoanPaymentDetails
    });
});

router.post('/schoolLoanPaymentDetails', async (req, res)=>{

});

router.put('/schoolLoanPaymentDetails', async (req, res)=>{

});

router.delete('/schoolLoanPaymentDetails', async (req, res)=>{

});





module.exports = router