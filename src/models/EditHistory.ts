// src/models/EditHistory.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IEditHistory extends Document {
  userId: Types.ObjectId;
  prompt: string;
  images: string[]; // Original images (1-3)
  resultUrl?: string; // Result image URL
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  requestId?: string; // API request ID
  createdAt: Date;
  updatedAt: Date;
}

const EditHistorySchema = new Schema<IEditHistory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length >= 1 && v.length <= 3,
        message: 'Images array must contain 1-3 items',
      },
    },
    resultUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
      index: true,
    },
    error: {
      type: String,
    },
    requestId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.EditHistory || mongoose.model<IEditHistory>('EditHistory', EditHistorySchema);
