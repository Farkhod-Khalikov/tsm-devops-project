// src/models/user.schema
import mongoose, { Schema, Document } from 'mongoose';

// Define the User interface
export interface IUser extends Document {
  username: string;
  password: string; // Will store the hashed password
  createdAt: string;
  updatedAt: string;
}

// User schema definition
const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, trim: true }, // trim is to remove blanked spaces from beginning till ending of the string
    password: { type: String, required: true },
  },
  { timestamps: true }, // Automatically adds createdAt and updatedAt fields
);

// Export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
