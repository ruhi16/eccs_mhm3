const mongoose = require('mongoose');


const thfundParticularsSchema = new mongoose.Schema({
    id: {type: Number},
    short_name: {type: String, required: true},
    full_name: {type: String},
    description: {type: String},
    type: {type: String}, //assign or payment
    

    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const ThfundParticular = mongoose.model('ThfundParticular', thfundParticularsSchema);



const thfundParticularSpecificationsSchema = new mongoose.Schema({    
    id: {type: Number},
    thfundParticularId: {type: mongoose.Schema.Types.ObjectId, ref: 'ThfundParticular'},
    
    thfundParticularId: {type: mongoose.Schema.Types.ObjectId, ref: 'ThfundParticular'},
    thfundParticularDetail: {
        thfundMonthlyAmount: {type: mongoose.Number},
        thfundYearlyROI: {type: mongoose.Number},
    },

    // rate_of_interest: {type: mongoose.Schema.Types.double},     // how many roi
    // rate_of_interest_of: {type: mongoose.Schema.Types.double},  // roi of what
    // fixedAmount: {type: mongoose.Schema.Types.double},          // fixed amount
    
    // is_fixedAmount: {type: mongoose.Schema.Types.Boolean, required: true, default: false},
    // is_roi: {type: mongoose.Schema.Types.Boolean, required: true, default: false},

    // type_of_collection: {type: String, required: true}, //monthly, once,
    // specification_type: {type: String}, // Regular, Yearly, Once on demand, Now and continue f
        




    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const ThfundParticularSpecification = mongoose.model('ThfundParticularSpecification', thfundParticularSpecificationsSchema);





const thfundMemberAssignsSchema = new mongoose.Schema({
    id: {type: Number},
    memberId: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},

    // attached with the slab and corr monthly amount and roi
    thfundParticularSpecificationId: {type: mongoose.Schema.Types.ObjectId, ref: 'ThfundParticularSpecification'},





    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},
}, {timestamps: true});
const ThfundMemberAssign =  mongoose.model('ThfundMemberAssign', thfundMemberAssignsSchema);




const thfundMandatesSchema = new mongoose.Schema({
    id: {type: Number},







    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},
}, {timestamps: true});
const ThfundMandate =  mongoose.model('ThfundMandate', thfundMandatesSchema);



const thfundMonthCollections =  new mongoose.Schema({
    id: {type: Number},





    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},
}, {timestamps: true});
const ThfundMonthCollection = mongoose.model('ThfundMonthCollection', thfundMonthCollections);



const thfundYearlyMasterCollectionsSchema = new mongoose.Schema({
    id: {type: Number},




    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},
}, {timestamps: true});
const ThfundYearlyMasterCollection = mongoose.model('ThfundYearlyMasterCollection', thfundYearlyMasterCollectionsSchema);








module.exports = {
    ThfundParticular,
    ThfundParticularSpecification,

    ThfundMemberAssign,

    ThfundMandate,

    ThfundMonthCollection,
    ThfundYearlyMasterCollection,
}