
import mongoose from "mongoose";
const { Schema } = mongoose
const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Role: { type: String, default: 'Teacher' },
    // Subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    // Students: [{ type: Schema.Types.ObjectId, ref: 'Studentdata' }]

})
const TeacherData = mongoose.model('TeacherData', schema)
export default TeacherData;
