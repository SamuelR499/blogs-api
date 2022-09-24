const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    return res.status(201).json({});
};

module.exports = {
    login,
};