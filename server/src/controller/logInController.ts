import { Request, Response } from 'express';
import { User } from '../model/user';
import db from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    // Validation: Check if required fields are provided
    if (!name || !password) {
        return res.status(400).json({ message: 'Name and password are required' });
    }

    // Retrieve user from the database by name
    const sql = 'SELECT * FROM registration WHERE name = ?';
    db.get(sql, [name], (err, row: any) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).json({ message: 'Log In error' });
        }

        /*if (!row) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }*/

        if(row.length > 0) {
            // Check password using bcrypt
            bcrypt.compare(password.toString(), row.password, (err, response) => {
                if (err) {
                    console.error('Password comparison error:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                if(response) {
                    const name = row.name;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                } else {
                    return res.json({Error: "Password not matched"});
                }

                // Password is correct, generate session token (JWT)
                /*const id = row.id;
                const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
                res.cookie('token', token);

                // Return user information and token
                const user = new User(row.id, row.name, row.email, row.password); // Assuming User class needs id, name, and email
                return res.status(200).json({ id: row.id, user, token });*/
            });
        } else {
            return res.json({Error: "No email existed"});
        }
        // Password is correct, return user information
        //return res.status(200).json({ id: row.id, name: row.name, email: row.email });
    });
};
