const mongoose = require('mongoose');
//require('mongoose-Double')(mongoose); 



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




const bankLoanReceivedSchema = new mongoose.Schema({
    id: {type: Number},
    // memberId: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},   

    loan_amount: {type: mongoose.Schema.Types.double},
    loan_date: { type: Date, default: Date.now },    
    loan_total_terms: {type: Number},
    

    current_balance: {type: mongoose.Schema.Types.double},
    loan_last_term_paid: {type: Number},

    loan_close_date: { type: Date },    // mention only when last payment made
    
    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanReceived = mongoose.model('BankLoanReceived', bankLoanReceivedSchema);




const bankLoanReceivedDetailsSchema = new mongoose.Schema({
    id: {type: Number},
    bankLoanReceivedId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanReceived'},
    bankLoanParticularSpecificationId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanParticularSpecification'},
    bankLoanParticularAmount: {type: Number},

    //type_of_collection: {type: String}, //monthly or once
    for_loan_term_no_paid: {type: Number}, //if it is once
    collection_type: { type: String }, // Regular, Yearly, Once on demand, Now and continue for n term or last
    ref_from_date: { type: Date },     // If Once on demand, Now and continue for n term or last
    ref_to_date: { type: Date },       // If Once on demand, Now and continue for n term or last
    ref_total_days: { type: Number },  // If Once on demand, Now and continue for n term or last
    isPaid: {type: mongoose.Schema.Types.Boolean, required: true, default: false},


    // schoolLoanAssignIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanAssign'}],

    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanReceivedDetail = mongoose.model('BankLoanReceivedDetail', bankLoanReceivedDetailsSchema)








const bankLoanPaymentMandates = new mongoose.Schema({
    id: {type: Number},
    bankLoanAssignId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanAssign'},
    // schoolLoanPaymentId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanPayment'},

    // schoolLoanAssignDetailId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanAssignDetail'},
    bankLoanParticularSpecificationId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanParticularSpecification'},
    bankLoanParticularAmount: {type: Number},     // calculated and assigned
    mandateType: {type: String},    // Monthly, Yearly, Once

    loan_mandate_from_date: { type: Date },     // assigned
    loan_mandate_to_date: { type: Date },       // assigned
    loan_mandate_total_days: {type: Number},    // calculated

    
    
    is_done: {type: mongoose.Schema.Types.Boolean, default: false},     // when 'schoolLoanParticularAmount' is confirmed by member, then it will be true    
    // is_payment_closed: {type: mongoose.Schema.Types.Boolean, default: false},   // when bank deduction is done

    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanPaymentMandate = mongoose.model('BankLoanPaymentMandate', bankLoanPaymentMandates)






const bankLoanPaymentDetailsSchema = new mongoose.Schema({
    id: {type: Number},
    bankLoanReceivedId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanReceived'},
    bankLoanReceivedPaymentId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanReceivedPayment'},

    bankLoanReceivedDetailId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanReceivedDetail'},
    bankLoanReceivedParticularSpecificationId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanReceivedParticularSpecification'},
    bankLoanParticularAmount: {type: Number},
    
    loan_particular_from_date: { type: Date },
    loan_particular_to_date: { type: Date },
    loan_particular_total_days: {type: Number},
    


    is_done: {type: mongoose.Schema.Types.Boolean, default: false},     // when 'schoolLoanParticularAmount' is confirmed by member, then it will be true    
    is_payment_closed: {type: mongoose.Schema.Types.Boolean, default: false},   // when bank deduction is done

    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanPaymentDetail = mongoose.model('BankLoanPaymentDetail', bankLoanPaymentDetailsSchema)





const bankLoanPaymentsSchema = new mongoose.Schema({
    id: {type: Number},
    BankLoanReceivedId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankLoanReceived'},
    previous_balance: {type: Number},     // copied and assigned (auto)
    loan_last_term_no_paid: {type: Number}, 
    
    loan_installment_total: {type: mongoose.Schema.Types.double},


    current_balance: {type: mongoose.Schema.Types.double},
    loan_last_term_no_paid: {type: Number},
    
    is_done: {type: mongoose.Schema.Types.Boolean, default: false},// when all calculated is done, back-ref should maintaind
    schoolLoanPaymentDetailIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanPaymentDetail'}],
        
    is_payment_closed: {type: mongoose.Schema.Types.Boolean, default: false},   // when bank deduction is done
    

    
    BanklId: {type: mongoose.Schema.Types.ObjectId, ref: 'Bank'},
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const BankLoanPayment = mongoose.model('BankLoanPayment', bankLoanPaymentsSchema)











module.exports = {
    
    BankLoanParticular,
    BankLoanParticularSpecification,

    BankLoanReceivedDetail,
    BankLoanReceived,

    BankLoanPaymentMandate,
    BankLoanPaymentDetail,
    BankLoanPayment,
    
}