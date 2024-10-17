const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.registerStudent = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const student = await Student.create({ name, email, password });
        const token = generateToken(student._id);
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ message: 'Student registered successfully', token });
    } catch (error) {
        res.status(400).json({ error: 'Email already exists' });
    }
};

exports.loginStudent = async (req, res) => {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student || !(await student.matchPassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(student._id);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Logged in successfully', token });
};
