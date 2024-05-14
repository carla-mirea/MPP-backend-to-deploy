import { Request, Response } from 'express';
import { User } from '../model/user';
import db from '../db';
import bcrypt from 'bcrypt';
/*

const saltRounds = 10;

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user into the database
        const sql = 'INSERT INTO registration (name, email, password) VALUES (?, ?, ?)';
        const values = [name, email, hashedPassword];

        db.run(sql, values, function (err) {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).json({ message: 'Failed to register user' });
            }

            const userId = this.lastID;
            const newUser = new User(userId, name, email, hashedPassword); // Create new User instance

            return res.status(201).json({ id: userId, user: newUser });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Helper function to get user by email
const getUserByEmail = (email: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM registration WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err) {
                console.error('Error fetching user by email:', err);
                return reject(err);
            }
            if (!row) {
                return resolve(null);
            }
            // Create User instance from database row
            const { id, name, email, password } = row as { id: number; name: string; email: string; password: string };
            const user = new User(id, name, email, password); // Create User instance
            resolve(user);
        });
    });
};*/
const salt = 10;

/*
export const registerUser = async (req: Request, res: Response) => {
    const sql = "INSERT INTO registration (`name`,`email`,`password`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash
         ]
         db.run(sql, [values], (err: any, result: any) => {
            if(err) return res.json({Error: "Inserting data Error in server"});
            return res.json({Status: "Success"});
         })

    }) 
}*/

export const registerUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash
         ]
         db.run('INSERT INTO registration (name, email, password) VALUES (?, ?, ?)', [name, email, password], function(err) {
            if (err) {
                console.error('Error registering user', err);
                return res.status(500).json({ message: 'Server error' });
            }
            const newUserId = this.lastID;
            const newUser = new User(newUserId, name, email, password);
            return res.status(201).json(newUser);
        });

    }) 

}
