import mongoose from "mongoose";
const { Schema } = mongoose
const schema = new Schema({
    SubjectName: { type: String, required: true },
    Description: { type: String, required: true },
    TeachearName: { type: String, required: true },
    TeacherId: { type: Schema.Types.ObjectId, ref: 'TeacherData' },
}, { Timestamps: true })
const Subject = mongoose.model('Sub', schema)
export default Subject;