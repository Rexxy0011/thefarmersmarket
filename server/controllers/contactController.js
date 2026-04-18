import Message from "../models/Message.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }
    if (!EMAIL_RE.test(email)) {
      return res.json({ success: false, message: "Invalid email address." });
    }

    await Message.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      subject: subject?.trim(),
      message: message.trim(),
    });

    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const getAllMessages = async (_req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, messages });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Message.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!updated) {
      return res.json({ success: false, message: "Message not found." });
    }
    return res.json({ success: true, message: updated });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
