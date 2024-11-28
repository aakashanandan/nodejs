export interface ScamDocument extends Document {
    type: "phone" | "email";
    value: string;
    details: string;
    reports: number;
}

const scamSchema = new mongoose.Schema({
    type: { type: String, enum: ["phone", "email"], required: true },
    value: { type: String, required: true },
    details: { type: String, required: true },
    reports: { type: Number, default: 1 },
}, { timestamps: true });

export const Scam = mongoose.model("Scam", scamSchema);