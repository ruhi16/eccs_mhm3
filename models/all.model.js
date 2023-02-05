const mongoose = require('mongoose');



const financialYearSchema = new mongoose.Schema({
    id: {type: Number},
    financialYear_name:  {type: String, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},

    status: {type: String, required: true, default: 'inactive'},
    remarks: {type: String},

    // created_at: { type: Date, default: Date.now },
    // updated_at: { type: Date, default: Date.now },
}, {timestamps: true});
const FinancialYear = mongoose.model('FinancialYear', financialYearSchema);


const bankSchema = new mongoose.Schema({
    id: {type: Number},
    name: {type: String, required: true},
    bank_code: {type: String},    
        
    schedule_time: {type: String, required: true}, // 10:30am to 4:30pm
    
    vill: {type: String},
    post: {type: String},
    ps: {type: String},
    dist: {type: String},
    pin: {type: String},

    email: {type: String, required: true, lowercase: true},
    mobile: [{type: String, required: true}],
    imgurl: [{type: String}],

    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

    // created_at: { type: Date, default: Date.now },
    // updated_at: { type: Date, default: Date.now },
}, {timestamps: true});
const Bank = mongoose.model('Bank', bankSchema);


const schoolSchema = new mongoose.Schema({
    id: {type: Number},
    name: {type: String, required: true},
    dise: {type: String},
    grade: {type: String, required: true},  // primary, junior-high, high, higher secondary
    eccs_name: {type: String, required: true},
    
    schedule_time: {type: String, required: true}, // 10:30am to 4:30pm
    
    vill: {type: String},
    post: {type: String},
    ps: {type: String},
    dist: {type: String},
    pin: {type: String},

    email: {type: String, required: true, lowercase: true},
    mobile: [{type: String, required: true}],
    imgurl: [{type: String}],

    banklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},

    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
const School = mongoose.model('School', schoolSchema);


const memberSchema = new mongoose.Schema({
    id: {type: Number},
    eccs_member_id: {type: String},
    imgurl:[{type: String}], 
    emp_id: {type: String},

    vill: {type: String},
    post: {type: String},
    ps: {type: String},
    dist: {type: String},
    pin: {type: String},    
    mobile: [{type: String, required: true}],
    
    full_name: {type: String, required: true},    
    account_no: {type: String, required: true},    
    bank_name: {type: String, required: true},    
    branch_name: {type: String, required: true},    
    branch_address: {type: String, required: true},    
    branch_ifsc: {type: String, required: true},      
    
    dob: { type: Date },
    doj: { type: Date },
    dor: { type: Date },
    
    adhaar: {type: String},
    epic: {type: String},
    pan: {type: String},

    schoolId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

    // created_at: { type: Date, default: Date.now },
    // updated_at: { type: Date, default: Date.now },
}, {timestamps: true});
const Member = mongoose.model('Member', memberSchema);

//MonthSchedule
//MonthScheduleActions
//MonthCollectionDetails




module.exports = {
    FinancialYear,
    Bank,    
    School,
    Member,

    // BankLoanSpecification,    
    // BankLoanReceived,
    // BankLoanPayments,

    
    // MonthAction,
    // MonthActionSchedule,
    // MonthActionScheduleLog,


};


