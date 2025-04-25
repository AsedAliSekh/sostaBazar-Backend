const mongoose = require('mongoose');
const { Schema } = mongoose;


const brandSchema = new Schema({
    label: { type: String, required: true, unique: true },
    value: { type: String, required: true, unique: true },
});

// virtual for converting _id: into id: for better refarence
const virtual = brandSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
brandSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Brand = mongoose.model('Brand', brandSchema);