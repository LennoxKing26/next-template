// src/types/mongoose.d.ts
import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: ReturnType<typeof mongoose.connect> | null;
  };
}

export {};
