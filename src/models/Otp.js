import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      index: true
    },
    otpHash: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // TTL index
    },
    attempts: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Ensure only one active OTP per mobile
otpSchema.index({ mobile: 1 }, { unique: true });

export const Otp = mongoose.model("Otp", otpSchema);
