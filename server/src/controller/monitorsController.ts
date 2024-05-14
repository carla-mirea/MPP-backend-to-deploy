import { generateUniqueId, monitors } from "../dataStore";
import db from "../db";
import { Monitor } from "../model/monitor";

import { Request, Response } from 'express';

export const getMonitors = (req: Request, res: Response) => {
    db.all('SELECT * FROM monitors', (err, rows) => {
        if (err) {
            console.error('Error fetching monitors:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(rows);
    });
};

export const getMonitorById = async (req: Request, res: Response) => {
    const id = req.params.id;
    db.get('SELECT * FROM monitors WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error fetching monitor by ID:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (!row) {
            return res.status(404).send('Monitor not found');
        }
        res.json(row);
    });
};

export const addMonitor = async (req: Request, res: Response) => {
    const { brand, refreshRate, pictureUrl } = req.body;
    db.run('INSERT INTO monitors (brand, refreshRate, pictureUrl) VALUES (?, ?, ?)', [brand, refreshRate, pictureUrl], function(err) {
        if (err) {
            console.error('Error adding monitor:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        const newMonitorId = this.lastID;
        const newMonitor = new Monitor(newMonitorId, brand, refreshRate, pictureUrl);
        return res.status(201).json(newMonitor);
    });
}

export const deleteMonitor = async (req: Request, res: Response) => {
    const id = req.params.id;
    db.run('DELETE FROM monitors WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Error deleting monitor:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (this.changes === 0) {
            return res.status(404).send('Monitor not found');
        }
        res.status(204).send();
    });
}

export const updateMonitor = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { brand, refreshRate, pictureUrl } = req.body;
    db.run('UPDATE monitors SET brand = ?, refreshRate = ?, pictureUrl = ? WHERE id = ?', [brand, refreshRate, pictureUrl, id], function(err) {
        if (err) {
            console.error('Error updating monitor:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (this.changes === 0) {
            return res.status(404).send('Monitor not found');
        }
        res.json({ id, brand, refreshRate, pictureUrl });
    });
}

