const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = Date.now();

        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: { ...user._doc, password: undefined },
        });
    } catch (error) {
        console.log("🚀 ~ login ~ error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
