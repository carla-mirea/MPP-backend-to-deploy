import db from "../db";
import { Review } from "../model/review";
import { Request, Response } from 'express';

// Get all reviews
export const getReviews = (req: Request, res: Response) => {
    db.all('SELECT * FROM reviews', (err, rows) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(rows);
    });
};

// Get review by ID
export const getReviewById = async (req: Request, res: Response) => {
    const id = req.params.id;
    db.get('SELECT * FROM reviews WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error fetching review by ID:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (!row) {
            return res.status(404).send('Review not found');
        }
        res.json(row);
    });
};

// Add a new review
export const addReview = async (req: Request, res: Response) => {
    const { monitorId, rating, comment } = req.body;
    if (!monitorId || !rating || !comment) {
        return res.status(400).json({ message: 'Invalid review data' });
    }
    db.run('INSERT INTO reviews (monitorId, rating, comment) VALUES (?, ?, ?)', [monitorId, rating, comment], function(err) {
        if (err) {
            console.error('Error adding review:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        const newReviewId = this.lastID;
        const newReview = new Review(newReviewId, monitorId, rating, comment);
        return res.status(201).json(newReview);
    });
};

// Delete a review by ID
export const deleteReview = async (req: Request, res: Response) => {
    const id = req.params.id;
    db.run('DELETE FROM reviews WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Error deleting review:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (this.changes === 0) {
            return res.status(404).send('Review not found');
        }
        res.status(204).send();
    });
};

// Update a review by ID
export const updateReview = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { monitorId, rating, comment } = req.body;
    db.run('UPDATE reviews SET monitorId = ?, rating = ?, comment = ? WHERE id = ?', [monitorId, rating, comment, id], function(err) {
        if (err) {
            console.error('Error updating review:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (this.changes === 0) {
            return res.status(404).send('Review not found');
        }
        res.json({ id, monitorId, rating, comment });
    });
};
