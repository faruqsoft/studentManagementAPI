const Student = require('../models/Student');

exports.getProfile = async (req, res) => {
    const student = await Student.findById(req.user.id).select('-password');
    res.json(student);
};

exports.updateProfile = async (req, res) => {
    const { name, email } = req.body;

    try {
        const student = await Student.findById(req.user.id);

        if (student) {
            student.name = name || student.name;
            student.email = email || student.email;
            await student.save();
            res.json({ message: 'Profile updated' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating profile' });
    }
};
