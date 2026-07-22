import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lname: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('remove', async function (next) {
  try {
    await this.model('Course').updateMany(
      { _id: { $in: this.courses } },
      { $pull: { students: this._id } }
    );
    next();
  } catch (error) {
    next(error);
  }
});


const User = mongoose.model('User', userSchema);
export default User;
