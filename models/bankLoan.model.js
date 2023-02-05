const mongoose = require('mongoose');
require('mongoose-Double')(mongoose); 



const bankLoanParticularsSchema = new mongoose.Schema({

    id: {type: Number},
    short_name: {type: String, required: true},
    full_name: {type: String},
    description: {type: String},
    type: {type: String}, //assign or payment

    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanParticular = mongoose.model('BankLoanParticular', bankLoanParticularsSchema)



const bankLoanParticularsSpecificationsSchema = new mongoose.Schema({
    id: {type: Number},
    bankLoanParticularId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanParticular'},
    rate_of_interest: {type: mongoose.Schema.Types.double},

    amount: {type: mongoose.Schema.Types.double},
    
    type_of_collection: {type: String, required: true}, //monthly, once,
    //specification_type: {type: String}, // Regular, Yearly, Once on demand, Now and continue f
    
    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanParticularSpecification = mongoose.model('BankLoanParticularSpecification', bankLoanParticularsSpecificationsSchema);






const bankLoanReceivedDetailsSchema = new mongoose.Schema({
    id: {type: Number},
    bankLoanParticularSpecificationId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanParticularSpecification'},
    bankLoanReceivedId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanReceived'},
    
    collection_type: { type: String }, // Regular, Yearly, Once on demand, Now and continue for n term or last
    ref_from_date: { type: Date },     // If Once on demand, Now and continue for n term or last
    ref_to_date: { type: Date },       // If Once on demand, Now and continue for n term or last
    ref_total_days: { type: Number },  // If Once on demand, Now and continue for n term or last
    isPaid: {type: mongoose.Schema.Types.Boolean, required: true, default: false},


    BankLoanAssignId: [{type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanAssign'}],

    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanReceivedDetail = mongoose.model('BankLoanReceivedDetail', bankLoanReceivedDetailsSchema)





const bankLoanReceivedSchema = new mongoose.Schema({

    id: {type: Number},
    memberId: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},    
    
    loan_amount: {type: mongoose.Schema.Types.double},
    loan_date: { type: Date, default: Date.now },    
    loan_total_terms: {type: Number},    
    
    current_balance: {type: mongoose.Schema.Types.double},
    loan_last_term_paid: {type: Number},

    loan_close_date: { type: Date },
    
    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanReceived = mongoose.model('BankLoanReceived', bankLoanReceivedSchema);





const bankLoanPaymentsSchema = new mongoose.Schema({

    id: {type: Number},
    BankLoanReceivedId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanReceived'},
    
    loan_installment_total: {type: mongoose.Schema.Types.double},
    current_balance: {type: mongoose.Schema.Types.double},
    loan_last_term_paid: {type: Number},
    
    loan_close_date: { type: Date },
    
    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanPayment = mongoose.model('BankLoanPayment', bankLoanPaymentsSchema)





const bankLoanPaymentDetailsSchema = new mongoose.Schema({

    id: {type: Number},
    bankLoanReceivedId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanReceived'},
    bankLoanReceivedDetailId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanReceivedDetail'},


    amount: {type: mongoose.Schema.Types.double},
    loan_particular_from_date: { type: Date },
    loan_particular_to_date: { type: Date },
    loan_particular_total_days: {type: Number},
    

    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanPaymentDetail = mongoose.model('BankLoanPaymentDetail', bankLoanPaymentDetailsSchema)









module.exports = {
    
    BankLoanParticular,
    BankLoanParticularSpecification,

    BankLoanReceivedDetail,
    BankLoanReceived,

    BankLoanPaymentDetail,
    BankLoanPayment,
    
}