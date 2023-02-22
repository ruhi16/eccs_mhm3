const mongoose = require('mongoose');
// require('mongoose-Double')(mongoose); 



const schoolLoanParticulars = new mongoose.Schema({
    id: {type: Number},
    short_name: {type: String, required: true},
    full_name: {type: String}, 
    description: {type: String},
    purpose: {type: String},    // stloan mtloan 
    type: {type: String}, //assign or payment
    
    
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const SchoolLoanParticular = mongoose.model('SchoolLoanParticular', schoolLoanParticulars)




const schoolLoanParticularsSpecifications = new mongoose.Schema({
    id: {type: Number},
    schoolLoanParticularId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanParticular'},
    rate_of_interest: {type: Number},

    amount: {type: Number},

    type_of_collection: {type: String, required: true}, //monthly, once,
    
    
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

    
}, {timestamps: true});
const SchoolLoanParticularSpecifications = mongoose.model('SchoolLoanParticularSpecification', schoolLoanParticularsSpecifications)






const schoolLoanAssignDetailsSchema = new mongoose.Schema({
    id: {type: Number},     // share, insurance, others and roi, service ch roi, 
    schoolLoanAssignId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanAssign'},
    schoolLoanParticularSpecificationId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanParticularSpecification'},
    schoolLoanParticularAmount: {type: Number},
    
    //type_of_collection: {type: String}, //monthly or once
    for_loan_term_no_paid: {type: Number}, //if it is once
    collection_type: { type: String }, // Regular, Yearly, Once on demand, Now and continue for n term or last
    ref_from_date: { type: Date },     // If Once on demand, Now and continue for n term or last
    ref_to_date: { type: Date },       // If Once on demand, Now and continue for n term or last
    ref_total_days: { type: Number },  // If Once on demand, Now and continue for n term or last    
    is_done: {type: mongoose.Schema.Types.Boolean, default: false},//if it is once, and done or not

    



    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const SchoolLoanAssignDetails = mongoose.model('SchoolLoanAssignDetail', schoolLoanAssignDetailsSchema)





const schoolLoanAssignSchema = new mongoose.Schema({
    id: {type: Number},
    memberId: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
    //schoolLoanParticularId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanParticular'},
    
    loan_amount: {type: Number},
    loan_date: { type: Date, default: Date.now },    
    loan_total_month_terms: {type: Number},   //84
    
    //rate_of_interest: {type: Number},
    current_balance: {type: Number},
    loan_last_term_no_paid: {type: Number},    //term no

    loan_close_date: { type: Date },    //clear loan date

    
    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const SchoolLoanAssign = mongoose.model('SchoolLoanAssign', schoolLoanAssignSchema)





const schoolLoanPaymentMandates = new mongoose.Schema({
    id: {type: Number},
    schoolLoanAssignId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanAssign'},
    // schoolLoanPaymentId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanPayment'},

    // schoolLoanAssignDetailId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanAssignDetail'},
    schoolLoanParticularSpecificationId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanParticularSpecification'},
    schoolLoanParticularAmount: {type: Number},     // calculated and assigned
    mandateType: {type: String},    // Monthly, Yearly, Once

    loan_mandate_from_date: { type: Date },     // assigned
    loan_mandate_to_date: { type: Date },       // assigned
    loan_mandate_total_days: {type: Number},    // calculated

    
    
    is_done: {type: mongoose.Schema.Types.Boolean, default: false},     // when 'schoolLoanParticularAmount' is confirmed by member, then it will be true    
    // is_payment_closed: {type: mongoose.Schema.Types.Boolean, default: false},   // when bank deduction is done


    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const SchoolLoanPaymentMandate = mongoose.model('SchoolLoanPaymentMandate', schoolLoanPaymentMandates)






const schoolLoanPaymentDetails = new mongoose.Schema({
    id: {type: Number},
    schoolLoanAssignId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanAssign'},
    schoolLoanPaymentId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanPayment'},

    schoolLoanAssignDetailId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanAssignDetail'},
    schoolLoanParticularSpecificationId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanParticularSpecification'},
    schoolLoanParticularAmount: {type: Number},     // calculated and assigned

    loan_installment_from_date: { type: Date },     // assigned
    loan_installment_to_date: { type: Date },       // assigned
    loan_installment_total_days: {type: Number},    // calculated

    
    
    is_done: {type: mongoose.Schema.Types.Boolean, default: false},     // when 'schoolLoanParticularAmount' is confirmed by member, then it will be true    
    is_payment_closed: {type: mongoose.Schema.Types.Boolean, default: false},   // when bank deduction is done


    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const SchoolLoanPaymentDetails = mongoose.model('SchoolLoanPaymentDetail', schoolLoanPaymentDetails)





const schoolLoanPayments = new mongoose.Schema({
    id: {type: Number},
    schoolLoanAssignId: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanAssign'},    
    previous_balance: {type: Number},     // copied and assigned (auto)
    loan_last_term_no_paid: {type: Number},                     // copied max then incremented then current term no assigned (auto)

    loan_installment_total: {type: Number},   // calculated at last, then is_done: true

    
    current_balance: {type: Number},          // calculated at last, then is_done: true
    loan_last_term_no_paid: {type: Number},

    is_done: {type: mongoose.Schema.Types.Boolean, default: false},// when all calculated is done, back-ref should maintaind
    schoolLoanPaymentDetailIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'SchoolLoanPaymentDetail'}],
    
    is_payment_closed: {type: mongoose.Schema.Types.Boolean, default: false},   // when bank deduction is done
    



    schoollId: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const SchoolLoanPayment = mongoose.model('SchoolLoanPayment', schoolLoanPayments)







// var CounterSchema = Schema({
//     _id: {type: String, required: true},
//     seq: { type: Number, default: 0 }
// });
// var counter = mongoose.model('counter', CounterSchema);

// var entitySchema = mongoose.Schema({
//     testvalue: {type: String}
// });

// entitySchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.testvalue = counter.seq;
//         next();
//     });
// });






module.exports = {
    
    SchoolLoanParticular,
    SchoolLoanParticularSpecifications,

    SchoolLoanAssignDetails,
    SchoolLoanAssign,

    SchoolLoanPaymentMandate,
    SchoolLoanPaymentDetails,
    SchoolLoanPayment,

}