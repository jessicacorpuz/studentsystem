// Temporary in-memory storage
let students = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return students
    res.status(200).json(students);
  } else if (req.method === 'POST') {
    // Save students sent in body
    students = req.body;
    res.status(200).json({ message: 'Students saved' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
