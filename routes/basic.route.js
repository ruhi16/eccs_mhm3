const express = require('express');
const router = express.Router();
const createError = require('http-errors');


const { FinancialYear, Bank, School, Member } = require('../models/all.model');

const { financialYearSchema, financialYearUpdateSchema, financialYearDeleteSchema } = require('../utils/basic_entity.model');
const { bankSchema, bankUpdateSchema, bankDeleteSchema } = require('../utils/basic_entity.model');
const { schoolSchema, schoolUpdateSchema, schoolDeleteSchema } = require('../utils/basic_entity.model');
 




// ../api/basics
router.get('/', (req, res)=>{
    res.send({
        status: 200, 
        message: "This is for Basics: FinYr, Bank, School,  Member"
    });
});



router.get('/financialyears', async(req,res,next)=>{
    try{
        const financialYears = await FinancialYear.find({});

        if(!financialYears){
            throw createError.Conflict(`This FinancialYear expired.`);
        }


        res.send({
            status: 200,
            financialYears: financialYears
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/financialyears', async(req,res,next)=>{
    try{
        // console.log(req.body);
        const result = await financialYearSchema.validateAsync(req.body);
        // console.log(result);

        const doesExist = await FinancialYear.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This financial year with id '${result.emp_id}' has been already taken.`);
        }

        const financialYear = new FinancialYear(result);
        const savedFinancialYear = await financialYear.save();
        
        res.send({
            status: 200,
            financialYears: savedFinancialYear
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/financialyears', async(req,res,next)=>{
    try{
        // console.log("before",req.body);
        const result = await financialYearUpdateSchema.validateAsync(req.body);
        // console.log("after: ",result);        

        const updatedFinancialYear = await FinancialYear.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "financialYear_name": 1, "status": 1 });

        // console.log("updated Financial Year: ", updatedFinancialYear);

        if(!updatedFinancialYear){
            throw createError.Conflict(`This updatedFinancialYear '${result.full_name}' does not exists.`);
        }
        
        res.send({
            status: 200,
            financialYears: updatedFinancialYear
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/financialyears', async(req,res,next)=>{
    try{
        // console.log("before", req.body);
        const result = await financialYearDeleteSchema.validateAsync(req.body);
        // console.log("after: ", result);   

        const deletedFinancialYear = await FinancialYear.findOneAndDelete(
            {_id: result._id}
        ).select({ "financialYear_name": 1, "start_date": 1,"end_date": 1, "status": 1 });

        // console.log("updated Financial Year: ", deletedFinancialYear);

        if(!deletedFinancialYear){
            throw createError.Conflict(`This updatedFinancialYear '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            financialYears: deletedFinancialYear
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});











router.get('/banks', async(req,res,next)=>{
    try{
        const banks = await Bank.find({});

        if(!banks){
            throw createError.Conflict(`This Bank is expired.`);
        }


        res.send({
            status: 200,
            bank: banks
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/banks', async(req, res, next)=>{
    try{        
        const result = await bankSchema.validateAsync(req.body);
        
        const doesExist = await Bank.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This Bank with id '${result._id}' has been already taken.`);
        }

        const bank = await new Bank(result);
        const savedBank = await bank.save();
        
        res.send({
            status: 200,
            bank: savedBank
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/banks', async(req,res,next)=>{
    try{        
        const result = await bankUpdateSchema.validateAsync(req.body);
        
        const updatedBank = await Bank.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "name": 1, "email": 1, "status": 1 });


        if(!updatedBank){
            throw createError.Conflict(`This Bank '${result.name}' does not exists.`);
        } 

        res.send({
            status: 200,
            updatedBank: updatedBank,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/banks', async(req,res,next)=>{
    try{        
        const result = await bankDeleteSchema.validateAsync(req.body);        

        const deletedBank = await Bank.findOneAndDelete(
            {_id: result._id}
        ).select({ "name": 1, "email": 1, "status": 1 });
        

        if(!deletedBank){
            throw createError.Conflict(`This deleted Bank '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            bank: deletedBank
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});












router.get('/schools', async(req, res, next)=>{
    try{
        const schools = await School.find({});

        if(!schools){
            throw createError.Conflict(`This School is expired.`);
        }

        res.send({
            status: 200,
            schools: schools
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/schools', async(req, res, next)=>{
    try{        
        const result = await schoolSchema.validateAsync(req.body);
        
        const doesExist = await Bank.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This School with id '${result._id}' has been already taken.`);
        }

        const school = new School(result);
        const savedSchool = await school.save();
        
        res.send({
            status: 200,
            school: savedSchool
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/schools', async(req, res, next)=>{
    try{        
        const result = await schoolUpdateSchema.validateAsync(req.body);
        
        const updatedSchool = await School.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "name": 1, "email": 1, "dise": 1, "status": 1 });


        if(!updatedSchool){
            throw createError.Conflict(`This School '${result.name}' does not exists.`);
        } 

        res.send({
            status: 200,
            updatedSchool: updatedSchool,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/schools', async(req, res, next)=>{
    try{        
        const result = await schoolDeleteSchema.validateAsync(req.body);        

        const deletedSchool = await School.findOneAndDelete(
            {_id: result._id}
        ).select({ "name": 1, "email": 1, "status": 1 });
        

        if(!deletedSchool){
            throw createError.Conflict(`This School '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            deletedschool: deletedSchool,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }

});



























module.exports = router