const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

function readData() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const parsed = JSON.parse(data);
    // Ensure school_enquiries array exists
    if (!parsed.school_enquiries) parsed.school_enquiries = [];
    return parsed;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { school_inquiries: [], trust_inquiries: [], school_enquiries: [] };
    }
    throw error;
  }
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getSchoolInquiries() {
  const data = readData();
  return data.school_inquiries;
}

function addSchoolInquiry(inquiry) {
  const data = readData();
  data.school_inquiries.push(inquiry);
  writeData(data);
}

function getTrustInquiries() {
  const data = readData();
  return data.trust_inquiries;
}

function addTrustInquiry(inquiry) {
  const data = readData();
  data.trust_inquiries.push(inquiry);
  writeData(data);
}

function addSchoolEnquiry(enquiry) {
  const data = readData();
  data.school_enquiries.push(enquiry);
  writeData(data);
}

module.exports = {
  getSchoolInquiries,
  addSchoolInquiry,
  getTrustInquiries,
  addTrustInquiry,
  addSchoolEnquiry
};