import mongoose, { Document, Schema } from 'mongoose';

// Interface for the User model
export interface IUser extends Document {
  name: string; 
  email: string;
  password: string;
  sessionToken?: string;
  role: 'Admin' | 'User'; 
}

// Schema for the User model
const UserSchema: Schema = new Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  sessionToken: { type: String  , nullable: true },
  role: { type: String, enum: ['Admin', 'User'], required: true }, 
});

// Interface for the Bus model
export interface IBus extends Document {
  name: string;
  description: string; 
  capacity: number; 
}

// Schema for the Bus model
const BusSchema: Schema = new Schema({
  name: { type: String, required: true }, 
  description: { type: String, required: true },
  capacity: { type: Number, required: true }, 
});

// Interface for the Ticket model
export interface ITicket extends Document {
  price: number; 
  date_time: Date;
  busId: mongoose.Types.ObjectId; 
  userId?: mongoose.Types.ObjectId; 
}

// Schema for the Ticket model
const TicketSchema: Schema = new Schema({
  price: { type: Number, required: true },
  date_time: { type: Date, required: true }, 
  busId: { type: mongoose.Types.ObjectId, ref: 'Bus', required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User' }, 
});

// Export the models
export const User = mongoose.model<IUser>('User', UserSchema);
export const Bus = mongoose.model<IBus>('Bus', BusSchema);
export const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);
