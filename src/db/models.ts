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

interface TimePeriod {
  // The time perdiod are thinking in 24 hours format (HH)
  // Example: start: 8 and end: 18 are the time period from 8:00 to 18:00
  start: number;
  end: number;
}
export interface IBus extends Document {
  name: string;
  description: string;
  capacity: number;
  timePeriod: TimePeriod;
}

// Schema for the Bus model
const BusSchema: Schema = new Schema({
  name: { type: String, required: true }, 
  description: { type: String, required: true },
  capacity: { type: Number, required: true }, 
  timePeriod: { start: { type: Number, required: true , min: 0, max: 23 }, end: { type: Number, required: true , min: 0, max: 23 } }
});

// Interface for the Ticket model
export interface ITicket extends Document {
  price: number; 
  busId: mongoose.Types.ObjectId; 
  userId?: mongoose.Types.ObjectId; 
}

// Schema for the Ticket model
const TicketSchema: Schema = new Schema({
  price: { type: Number, required: true },
  busId: { type: mongoose.Types.ObjectId, ref: 'Bus', required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User' }, 
});

// Export the models
export const User = mongoose.model<IUser>('User', UserSchema);
export const Bus = mongoose.model<IBus>('Bus', BusSchema);
export const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);
