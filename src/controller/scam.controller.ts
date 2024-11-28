
import { Request, Response } from "express";
import { Scam } from "../models/Scam";

export const reportScam = async (req: Request, res: Response) => {
    try {
        const { type, value, details } = req.body;
        let scam = await Scam.findOne({ type, value });

        if (scam) {
            scam.reports += 1;
            await scam.save();
        } else {
            scam = new Scam({ type, value, details });
            await scam.save();
        }

        response(req, res, "Scam Reporting", 'Level-3', 'Report-Scam', true, 201, {}, "Scam reported successfully.");
    } catch (error) {
        response(req, res, "Scam Reporting", 'Level-3', 'Report-Scam', false, 500, {}, "Failed to report scam.", error.message);
    }
};

export const getScamList = async (req: Request, res: Response) => {
    try {
        const scams = await Scam.find().sort({ reports: -1 }).limit(10);
        response(req, res, "Scam List Retrieval", 'Level-3', 'Get-Scam-List', true, 200, { scams }, "Scam list retrieved successfully.");
    } catch (error) {
        response(req, res, "Scam List Retrieval", 'Level-3', 'Get-Scam-List', false, 500, {}, "Failed to retrieve scam list.", error.message);
    }
};

export const checkScamStatus = async (req: Request, res: Response) => {
    try {
        const { value } = req.query;
        const scam = await Scam.findOne({ value });

        if (!scam) {
            return response(req, res, "Scam Status Check", 'Level-3', 'Check-Scam-Status', true, 200, { isScam: false, reports: 0 }, "No scam found.");
        }

        response(req, res, "Scam Status Check", 'Level-3', 'Check-Scam-Status', true, 200, { isScam: true, reports: scam.reports }, "Scam details found.");
    } catch (error) {
        response(req, res, "Scam Status Check", 'Level-3', 'Check-Scam-Status', false, 500, {}, "Failed to check scam status.", error.message);
    }
};

