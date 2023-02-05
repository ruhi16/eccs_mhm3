const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { Member } = require('../models/all.model');

const { memberSchema, memberUpdateSchema, memberDeleteSchema } = require('../utils/basic_entity.model');


// ../api/members
router.get('/', (req, res)=>{


    res.send({
        status: 200, 
        message: "This is Member."
    });
});

router.get('/members', async(req,res,next)=>{
    try{
        const members = await Member.find({});

        if(!members){
            throw createError.Conflict(`This link of url has been verified or expired.`);
        }


        res.send({
            status: 200,
            users: members
        })

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});


router.post('/members', async(req,res,next)=>{
    try{
        // console.log(req.body);
        const result = await memberSchema.validateAsync(req.body);
        // console.log(is_verified_member);
        const doesExist = await Member.findOne({emp_id: result.emp_id});
        
        if(doesExist){
            throw createError.Conflict(`This employee with id '${result.emp_id}' has been already taken.`);
        }

        const member = await new Member(result);
        const savedMember = await member.save();        
        

        res.send({
            status: 200,
            user: savedMember
        })

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/members', async(req,res,next)=>{
    try{
        // console.log("before Joi Validation: ", req.body);
        // validation by Joi
        const result = await memberUpdateSchema.validateAsync(req.body);
        // console.log("after Joi Validation: ", result);

        // The default is to return the original, unaltered document. 
        // If you want the new, updated document to be returned 
        // you have to pass an additional argument: an object 
        // with the new property set to true.

        // console.log("_id: ", result._id);
        const updatedMember = await Member.findOneAndUpdate(
                {_id: result._id}, result, {new: true}
            ).select({ "financialYear_name": 1, "status": 1 });

        if(!updatedMember){
            throw createError.Conflict(`This user '${result.full_name}' does not exists.`);
        }        
        res.send({
            updatedMember: updatedMember,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);        
    }
});

router.delete('/members', async(req,res,next)=>{
    try{
        console.log("before Joi Validation: ", req.body);
      
        const result = await memberDeleteSchema.validateAsync(req.body);
        console.log("after Joi Validation: ", result);
        
        const deletedMember = await Member.findOneAndDelete(
                {_id: result._id}
            ).select({ "full_name": 1, "account_no": 1, "status": 1 });

        console.log("deleted Member: ", deletedMember);

        if(!deletedMember){
            throw createError.Conflict(`This user '${result.full_name}' does not exists.`);
        }        
        res.send({
            deletedMember: deletedMember,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);        
    }
});











































module.exports = router