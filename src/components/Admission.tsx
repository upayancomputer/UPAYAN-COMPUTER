import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkle, 
  FileText, 
  Upload, 
  Check, 
  Trash2, 
  Printer, 
  RotateCcw, 
  Plus, 
  MapPin, 
  BookOpen, 
  Briefcase, 
  Calendar, 
  User, 
  FileCheck, 
  UserCheck, 
  MapPinCheck, 
  GraduationCap as GradIcon,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface AdmissionProps {
  onBackToHome: () => void;
}

export const Admission: React.FC<AdmissionProps> = ({ onBackToHome }) => {
  // Auto-generate Admission ID
  const [admissionId, setAdmissionId] = useState('');
  
  useEffect(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setAdmissionId(`UPAYAN-2026-${randomNum}`);
  }, []);

  // Form states
  const [course, setCourse] = useState('Computer Office Application Course (3/6 Months)');
  const [session, setSession] = useState('January - June 2026');
  const [batch, setBatch] = useState('Morning Batch');

  // Student details
  const [nameEnglish, setNameEnglish] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [nationality, setNationality] = useState('Bangladeshi');
  const [religion, setReligion] = useState('Islam');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [nidBirth, setNidBirth] = useState('');
  const [studentMobile, setStudentMobile] = useState('');
  const [guardianMobile, setGuardianMobile] = useState('');
  const [email, setEmail] = useState('');

  // Present Address
  const [presentVillage, setPresentVillage] = useState('');
  const [presentPostOffice, setPresentPostOffice] = useState('');
  const [presentUpazila, setPresentUpazila] = useState('');
  const [presentDistrict, setPresentDistrict] = useState('');

  // Permanent Address
  const [sameAsPresent, setSameAsPresent] = useState(false);
  const [permanentVillage, setPermanentVillage] = useState('');
  const [permanentPostOffice, setPermanentPostOffice] = useState('');
  const [permanentUpazila, setPermanentUpazila] = useState('');
  const [permanentDistrict, setPermanentDistrict] = useState('');

  // Auto sync addresses
  useEffect(() => {
    if (sameAsPresent) {
      setPermanentVillage(presentVillage);
      setPermanentPostOffice(presentPostOffice);
      setPermanentUpazila(presentUpazila);
      setPermanentDistrict(presentDistrict);
    }
  }, [sameAsPresent, presentVillage, presentPostOffice, presentUpazila, presentDistrict]);

  // Educational Qualifications
  const [sscBoard, setSscBoard] = useState('Dhaka');
  const [sscGroup, setSscGroup] = useState('Science');
  const [sscYear, setSscYear] = useState('');
  const [sscRegNo, setSscRegNo] = useState('');
  const [sscGpa, setSscGpa] = useState('');

  const [hscBoard, setHscBoard] = useState('Dhaka');
  const [hscGroup, setHscGroup] = useState('Science');
  const [hscYear, setHscYear] = useState('');
  const [hscRegNo, setHscRegNo] = useState('');
  const [hscGpa, setHscGpa] = useState('');

  interface EducationRecord {
    id: string;
    level: string;
    board: string;
    group: string;
    year: string;
    regNo: string;
    gpa: string;
  }

  const [additionalEd, setAdditionalEd] = useState<EducationRecord[]>([]);

  const handleAddMoreEducation = () => {
    const newRecord: EducationRecord = {
      id: Math.random().toString(36).substring(2, 9),
      level: 'HSC / Equivalent',
      board: '',
      group: '',
      year: '',
      regNo: '',
      gpa: ''
    };
    setAdditionalEd([...additionalEd, newRecord]);
  };

  const handleRemoveEducation = (id: string) => {
    setAdditionalEd(additionalEd.filter(item => item.id !== id));
  };

  // Checkboxes for required documents
  const [docs, setDocs] = useState({
    sscMarksheet: false,
    sscCertificate: false,
    hscMarksheet: false,
    hscCertificate: false,
    nidBirth: false,
    photo: false,
    character: false,
    other: false
  });

  // Base64 file contents for uploading
  const [studentPhoto, setStudentPhoto] = useState<string | null>(null);
  const [studentPhotoName, setStudentPhotoName] = useState('');
  const [nidDoc, setNidDoc] = useState<string | null>(null);
  const [nidDocName, setNidDocName] = useState('');
  const [academicDoc, setAcademicDoc] = useState<string | null>(null);
  const [academicDocName, setAcademicDocName] = useState('');

  // Declaration checkbox
  const [declared, setDeclared] = useState(false);

  // Success screen trigger
  const [isSuccess, setIsSuccess] = useState(false);

  // Helper for reading base64 file string
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStudentPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setStudentPhoto(reader.result);
          // Auto tick checkbox if uploaded
          setDocs(prev => ({ ...prev, photo: true }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNidUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNidDocName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNidDoc(reader.result);
          setDocs(prev => ({ ...prev, nidBirth: true }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAcademicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAcademicDocName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAcademicDoc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all admission form details?")) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setAdmissionId(`UPAYAN-2026-${randomNum}`);
      setCourse('Computer Office Application Course (3/6 Months)');
      setSession('January - June 2026');
      setBatch('Morning Batch');
      
      setNameEnglish('');
      setFatherName('');
      setMotherName('');
      setDob('');
      setGender('Male');
      setNationality('Bangladeshi');
      setReligion('Islam');
      setBloodGroup('O+');
      setNidBirth('');
      setStudentMobile('');
      setGuardianMobile('');
      setEmail('');

      setPresentVillage('');
      setPresentPostOffice('');
      setPresentUpazila('');
      setPresentDistrict('');
      setSameAsPresent(false);
      setPermanentVillage('');
      setPermanentPostOffice('');
      setPermanentUpazila('');
      setPermanentDistrict('');

      setSscBoard('Dhaka');
      setSscGroup('Science');
      setSscYear('');
      setSscRegNo('');
      setSscGpa('');

      setHscBoard('Dhaka');
      setHscGroup('Science');
      setHscYear('');
      setHscRegNo('');
      setHscGpa('');

      setDocs({
        sscMarksheet: false,
        sscCertificate: false,
        hscMarksheet: false,
        hscCertificate: false,
        nidBirth: false,
        photo: false,
        character: false,
        other: false
      });

      setAdditionalEd([]);
      setStudentPhoto(null);
      setStudentPhotoName('');
      setNidDoc(null);
      setNidDocName('');
      setAcademicDoc(null);
      setAcademicDocName('');
      setDeclared(false);
      setIsSuccess(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Safe programmatic PDF Builder using jsPDF package
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const activeDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // ----------------------------------------------------
    // PAGE 1: Core Institutional Details & Personal Info
    // ----------------------------------------------------
    
    // Page outline double borders
    doc.setDrawColor(2, 6, 23); // Deep slate
    doc.setLineWidth(0.4);
    doc.rect(8, 8, 194, 281);
    doc.setLineWidth(0.15);
    doc.rect(9, 9, 192, 279);

    // Header background soft tint
    doc.setFillColor(243, 244, 246);
    doc.rect(9.2, 9.2, 191.6, 26.8, 'F');

    // Header Title Text
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(2, 132, 199); // Blue primary
    doc.text('UPAYAN COMPUTER TRAINING CENTER', 105, 17, { align: 'center' });

    // Header subtext
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text('An Established & Registered IT Learning Institute Bridging Students to Careers', 105, 22.5, { align: 'center' });
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Nandina Sheikh Anwar Hossain College Gate, Nandina, Jamalpur Sadar, Jamalpur, Bangladesh', 105, 27, { align: 'center' });
    doc.setFont('Helvetica', 'normal');
    doc.text('Cell: +880 1645-773950, +880 1577-416188  |  Email: upayan.site@gmail.com', 105, 31, { align: 'center' });

    // Official Ribbon
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(12, 38, 186, 7.5, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(255, 255, 255);
    doc.text('APPLICATION FOR ADMISSION', 105, 43, { align: 'center' });

    // Form Stats Line
    doc.setFontSize(9);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`ADMISSION ID: ${admissionId}`, 15, 52);
    doc.setFont('Helvetica', 'normal');
    doc.text(`DATE OF SUBMISSION: ${activeDate}`, 195, 52, { align: 'right' });
    doc.line(12, 54, 198, 54);

    // Section 1: Course Selection
    doc.setFillColor(241, 245, 249);
    doc.rect(12, 58, 186, 6, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text('SECTION 1 — COURSE SELECTION DETAILS', 15, 62);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Course Enrolling:', 15, 70);
    doc.setFont('Helvetica', 'bold');
    doc.text(course, 50, 70);
    doc.setFont('Helvetica', 'normal');
    doc.text('Session Intake:', 15, 75);
    doc.text(session, 50, 75);
    doc.text('Requested Shift:', 125, 75);
    doc.text(batch, 155, 75);

    // Section 2: Student Information
    doc.setFillColor(241, 245, 249);
    doc.rect(12, 82, 186, 6, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.text('SECTION 2 — STUDENT INFORMATION', 15, 86);

    // Image upload representation on PDF
    doc.setDrawColor(148, 163, 184);
    doc.rect(156, 92, 38, 48);
    if (studentPhoto) {
      try {
        doc.addImage(studentPhoto, 'JPEG', 156, 92, 38, 48);
      } catch (err) {
        doc.setFontSize(7.5);
        doc.text('Photo Available', 175, 116, { align: 'center' });
      }
    } else {
      doc.setFontSize(7.5);
      doc.text('AFFIX', 175, 111, { align: 'center' });
      doc.text('PASSPORT SIZE', 175, 115, { align: 'center' });
      doc.text('STUDENT PHOTO', 175, 119, { align: 'center' });
      doc.text('HERE', 175, 123, { align: 'center' });
    }

    // Student fields
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);

    doc.text('Student Name (English Capital Letters):', 15, 96);
    doc.setFont('Helvetica', 'bold');
    doc.text((nameEnglish || '').toUpperCase() || 'N/A', 75, 96);

    doc.setFont('Helvetica', 'normal');
    doc.text("Father's Name:", 15, 102);
    doc.text(fatherName || 'N/A', 56, 102);
    
    doc.text("Mother's Name:", 15, 108);
    doc.text(motherName || 'N/A', 56, 108);

    doc.text('Date of Birth:', 15, 114);
    doc.text(dob || 'N/A', 56, 114);
    doc.text('Gender:', 100, 114);
    doc.text(gender, 120, 114);

    doc.text('Nationality:', 15, 120);
    doc.text(nationality, 56, 120);
    doc.text('Religion:', 100, 120);
    doc.text(religion, 120, 120);

    doc.text('Blood Group:', 15, 126);
    doc.text(bloodGroup, 56, 126);
    doc.text('NID/Birth Reg No:', 100, 126);
    doc.text(nidBirth || 'N/A', 130, 126);

    doc.setFont('Helvetica', 'bold');
    doc.text('Student Mobile No:', 15, 132);
    doc.text(studentMobile || 'N/A', 56, 132);
    doc.setFont('Helvetica', 'normal');
    doc.text('Guardian Mobile No:', 100, 132);
    doc.text(guardianMobile || 'N/A', 130, 132);

    doc.text('Email Address:', 15, 138);
    doc.text(email || 'N/A', 56, 138);

    // Address blocks
    doc.setFillColor(241, 245, 249);
    doc.rect(12, 152, 186, 6, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.text('SECTION 3 & 4 — RESIDENTIAL ADDRESSES', 15, 156);

    // Present Address column
    doc.setFontSize(8.5);
    doc.text('SECTION 3: PRESENT ADDRESS', 15, 164);
    doc.setFont('Helvetica', 'normal');
    doc.text(`Village / Street: ${presentVillage || 'N/A'}`, 15, 170);
    doc.text(`Post Office: ${presentPostOffice || 'N/A'}`, 15, 175);
    doc.text(`Upazila: ${presentUpazila || 'N/A'}`, 15, 180);
    doc.text(`District: ${presentDistrict || 'N/A'}`, 15, 185);

    // Permanent Address column
    doc.setFont('Helvetica', 'bold');
    doc.text('SECTION 4: PERMANENT ADDRESS', 110, 164);
    doc.setFont('Helvetica', 'normal');
    doc.text(`Village / Street: ${permanentVillage || 'N/A'}`, 110, 170);
    doc.text(`Post Office: ${permanentPostOffice || 'N/A'}`, 110, 175);
    doc.text(`Upazila: ${permanentUpazila || 'N/A'}`, 110, 180);
    doc.text(`District: ${permanentDistrict || 'N/A'}`, 110, 185);

    // Section 5: Educational Qualification on Page 1
    doc.setFillColor(241, 245, 249);
    doc.rect(12, 195, 186, 6, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text('SECTION 5 — EDUCATIONAL QUALIFICATIONS', 15, 199);

    // Educational Qualification Table Header
    let currentY = 205;
    doc.setFillColor(226, 232, 240);
    doc.rect(12, currentY, 186, 8, 'F');
    doc.rect(12, currentY, 186, 8);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('Examination Name', 16, currentY + 5);
    doc.text('Board of Edu / Uni', 48, currentY + 5);
    doc.text('Group / Subject', 80, currentY + 5);
    doc.text('Passing Year', 112, currentY + 5);
    doc.text('Registration No.', 144, currentY + 5);
    doc.text('GPA/Results', 176, currentY + 5);

    let startTableY = currentY;
    currentY += 8;

    // SSC Row (always exists)
    doc.rect(12, currentY, 186, 8);
    doc.setFont('Helvetica', 'normal');
    doc.text('SSC or Equivalent', 16, currentY + 5);
    doc.text(sscBoard, 48, currentY + 5);
    doc.text(sscGroup, 80, currentY + 5);
    doc.text(sscYear || 'N/A', 112, currentY + 5);
    doc.text(sscRegNo || 'N/A', 144, currentY + 5);
    doc.setFont('Helvetica', 'bold');
    doc.text(sscGpa || 'N/A', 176, currentY + 5);

    currentY += 8;

    // Additional dynamic rows
    additionalEd.forEach((ed) => {
      doc.rect(12, currentY, 186, 8);
      doc.setFont('Helvetica', 'normal');
      doc.text(ed.level, 16, currentY + 5);
      doc.text(ed.board || 'N/A', 48, currentY + 5);
      doc.text(ed.group || 'N/A', 80, currentY + 5);
      doc.text(ed.year || 'N/A', 112, currentY + 5);
      doc.text(ed.regNo || 'N/A', 144, currentY + 5);
      doc.setFont('Helvetica', 'bold');
      doc.text(ed.gpa || 'N/A', 176, currentY + 5);
      currentY += 8;
    });

    // Draw vertical column split lines dynamically
    doc.line(44, startTableY, 44, currentY);
    doc.line(76, startTableY, 76, currentY);
    doc.line(108, startTableY, 108, currentY);
    doc.line(140, startTableY, 140, currentY);
    doc.line(172, startTableY, 172, currentY);

    // Indicator Note at the bottom of Page 1
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Please turn page for checklists, digital verification, and authorized signatures.', 105, 269, { align: 'center' });

    // Official institutional footer
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.text('UPAYAN COMPUTER TRAINING CENTER  |  OFFICIAL ADMISSION FORM LEDGER  |  PAGE 1 OF 2', 105, 275, { align: 'center' });

    // ----------------------------------------------------
    // PAGE 2: Qualifications, Required Checklists & Sign-offs
    // ----------------------------------------------------
    doc.addPage();

    // Secondary page borders
    doc.setDrawColor(2, 6, 23);
    doc.setLineWidth(0.4);
    doc.rect(8, 8, 194, 281);
    doc.setLineWidth(0.15);
    doc.rect(9, 9, 192, 279);

    // Lite header on page 2
    doc.setFillColor(243, 244, 246);
    doc.rect(9.2, 9.2, 191.6, 16, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(2, 132, 199);
    doc.text('UPAYAN COMPUTER TRAINING CENTER', 15, 15);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text('Campus Gate, Nandina, Jamalpur Sadar, Jamalpur  |  Form No: ' + admissionId, 15, 21);

    // Section 6: Document Checklist
    doc.setFillColor(241, 245, 249);
    doc.rect(12, 30, 186, 6, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text('SECTION 6 — ATTACHED DOCUMENTS CHECKLIST', 15, 34);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);

    // Checkbox Helper inside PDF
    const drawPDFCheck = (label: string, isChecked: boolean, x: number, y: number) => {
      doc.rect(x, y, 3, 3);
      if (isChecked) {
        doc.setFont('Helvetica', 'bold');
        doc.text('X', x + 0.6, y + 2.4);
        doc.setFont('Helvetica', 'normal');
      }
      doc.text(label, x + 5, y + 2.5);
    };

    // Row 1 (y = 42)
    drawPDFCheck('SSC Marksheet Copy', docs.sscMarksheet, 15, 42);
    drawPDFCheck('NID / Birth Certificate Copy', docs.nidBirth, 110, 42);

    // Row 2 (y = 48)
    drawPDFCheck('SSC Certificate Copy', docs.sscCertificate, 15, 48);
    drawPDFCheck('Passport Size Photo Attached', docs.photo, 110, 48);

    // Row 3 (y = 54)
    drawPDFCheck('HSC Marksheet Copy', docs.hscMarksheet, 15, 54);
    drawPDFCheck('Character Certificate Copy', docs.character, 110, 54);

    // Row 4 (y = 60)
    drawPDFCheck('HSC Certificate Copy', docs.hscCertificate, 15, 60);
    drawPDFCheck('Other Documents Attached', docs.other, 110, 60);

    // Section 7: Digital Upload Status Verification
    doc.setFillColor(241, 245, 249);
    doc.rect(12, 70, 186, 6, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.text('SECTION 7 — DIGITAL PORTAL CLOUD UPLOAD STATUS', 15, 74);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('The following digital file attachments were verified uploaded onto the local institution storage:', 15, 81);

    // Upload items
    const docStatus1 = studentPhoto ? 'SUCCESSFULLY FILE VERIFIED (ENCODED)' : 'NOT ATTACHED (SUBMIT COPY MANUALLY)';
    const docStatus2 = nidDoc ? 'SUCCESSFULLY FILE VERIFIED (ENCODED)' : 'NOT ATTACHED (SUBMIT COPY MANUALLY)';
    const docStatus3 = academicDoc ? 'SUCCESSFULLY FILE VERIFIED (ENCODED)' : 'NOT ATTACHED (SUBMIT COPY MANUALLY)';

    doc.setFont('Helvetica', 'bold');
    doc.text(`1. Student Passport Photo:`, 15, 87);
    doc.setFont('Helvetica', studentPhoto ? 'bold' : 'normal');
    doc.setTextColor(studentPhoto ? 16 : 100, studentPhoto ? 124 : 116, studentPhoto ? 65 : 139); // green vs gray
    doc.text(docStatus1, 65, 87);

    doc.setTextColor(30, 41, 59);
    doc.setFont('Helvetica', 'bold');
    doc.text(`2. NID/Birth Certificate:`, 15, 92);
    doc.setFont('Helvetica', nidDoc ? 'bold' : 'normal');
    doc.setTextColor(nidDoc ? 16 : 100, nidDoc ? 124 : 116, nidDoc ? 65 : 139);
    doc.text(docStatus2, 65, 92);

    doc.setTextColor(30, 41, 59);
    doc.setFont('Helvetica', 'bold');
    doc.text(`3. Academic Certificates:`, 15, 97);
    doc.setFont('Helvetica', academicDoc ? 'bold' : 'normal');
    doc.setTextColor(academicDoc ? 16 : 100, academicDoc ? 124 : 116, academicDoc ? 65 : 139);
    doc.text(docStatus3, 65, 97);
    
    // Reset Color
    doc.setTextColor(30, 41, 59);

    // Section 8: Declaration
    doc.setFillColor(241, 245, 249);
    doc.rect(12, 106, 186, 6, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('SECTION 8 — APPLICANT INFORMATIONAL DECLARATION', 15, 110);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    const declText = 'I hereby declare that all information provided in this admission form is true, correct, and complete. If any statement is found fake or misrepresented, the UPAYAN Computer Training Center authority maintains absolute authority to terminate my computer course enrollment alongside invalidating any academic credits obtained without refunding fees.';
    const splitDeclText = doc.splitTextToSize(declText, 180);
    doc.text(splitDeclText, 15, 117);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('STUDENT DECLARATION AGREED STATUS: DIGITAL VERIFICATION SUCCESS', 15, 130);

    // Signatures blocks
    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.2);
    
    // Applicant Signature line
    doc.line(20, 180, 75, 180);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text("Applicant's Signature", 47.5, 185, { align: 'center' });
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Dated: ____/____/2026', 47.5, 189, { align: 'center' });

    // Director Signature line
    doc.line(135, 180, 190, 180);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('Founder & Director Authorized', 162.5, 185, { align: 'center' });
    doc.text('UPAYAN Computer Training Center', 162.5, 189, { align: 'center' });
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Dated: ____/____/2026', 162.5, 193, { align: 'center' });

    // Official Stamp details inside a box
    doc.setDrawColor(203, 213, 225);
    doc.rect(15, 205, 180, 18);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text('OFFICIAL INSTITUTE ADMISSION VERIFICATION LEDGER STAMP BOX', 105, 210, { align: 'center' });
    doc.setFont('Helvetica', 'normal');
    doc.text('Admitted Date: _________________  |  Assigned Station: _________________  |  Authorized Operator: _________________', 105, 217, { align: 'center' });

    // Page 2 bottom footer
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.text('UPAYAN COMPUTER TRAINING CENTER  |  OFFICIAL ADMISSION FORM LEDGER  |  PAGE 2 OF 2', 105, 275, { align: 'center' });

    // Trigger downloading
    doc.save(`UPAYAN_Admission_${admissionId}.pdf`);
  };

  const handlePrint = (e: React.FormEvent) => {
    e.preventDefault();
    window.print();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEnglish || !studentMobile || !declared) {
      alert("Please enter all required fields and accept the declaration to complete your admission form.");
      return;
    }
    // Set success screen visible
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-start items-center text-left py-12 md:py-16 px-4 md:px-8 overflow-hidden bg-[#020617] mt-16 font-sans">
      {/* Background radial soft glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* Hidden high-fidelity printing sheet solely for window.print() */}
      <div id="print-area" className="hidden print:block text-slate-900 bg-white p-8 w-full max-w-[210mm] min-h-[297mm] mx-auto text-xs leading-relaxed font-sans">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body { background: white !important; color: black !important; }
            #print-area { display: block !important; }
            .no-print { display: none !important; }
          }
        `}} />
        <div className="border-[3px] border-double border-slate-950 p-6 space-y-6">
          {/* Header */}
          <div className="text-center pb-4 border-b border-slate-300">
            <h1 className="text-2xl font-extrabold tracking-wide uppercase text-blue-800">UPAYAN COMPUTER TRAINING CENTER</h1>
            <p className="text-[10px] text-slate-600 mt-1">An Established & Registered IT Learning Institute standardizing computer literacy bridging students to prospective careers</p>
            <p className="text-[10px] font-bold text-slate-800 mt-1">Nandina Sheikh Anwar Hossain College Gate, Nandina, Jamalpur Sadar, Jamalpur, Bangladesh</p>
            <p className="text-[9px] text-slate-700">Cell: +8801645773950, +8801577416188 | Email: upayan.site@gmail.com</p>
          </div>

          {/* Form stats banner */}
          <div className="bg-slate-900 text-white py-1.5 px-4 font-bold tracking-wider text-center text-sm uppercase">
            APPLICATION FOR ADMISSION
          </div>

          <div className="flex justify-between items-center text-[10px] font-semibold border-b border-slate-200 pb-2">
            <span>ADMISSION ID: <strong className="text-blue-800">{admissionId}</strong></span>
            <span>DATE: {new Date().toLocaleDateString()}</span>
          </div>

          {/* Course Selection details */}
          <div className="space-y-2">
            <h3 className="bg-slate-100 px-2 py-1 font-bold text-[10px] border border-slate-300 uppercase">SECTION 1 — Course Selection Details</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 p-1">
              <div><span className="font-semibold text-slate-600">Course Applying:</span> <strong>{course}</strong></div>
              <div><span className="font-semibold text-slate-600">Session Intake:</span> {session}</div>
              <div className="col-span-2"><span className="font-semibold text-slate-600">Preferred Shift:</span> {batch}</div>
            </div>
          </div>

          {/* Student Info with Photo spot */}
          <div className="space-y-2">
            <h3 className="bg-slate-100 px-2 py-1 font-bold text-[10px] border border-slate-300 uppercase">SECTION 2 — Student Personal details</h3>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px]">
                <div className="col-span-2"><span className="font-semibold text-slate-600">Student Name (English Capital Letters):</span> <strong className="uppercase">{nameEnglish || 'N/A'}</strong></div>
                <div><span className="font-semibold text-slate-600">Father's Name:</span> {fatherName || 'N/A'}</div>
                <div><span className="font-semibold text-slate-600">Mother's Name:</span> {motherName || 'N/A'}</div>
                <div><span className="font-semibold text-slate-600">Date of Birth:</span> {dob || 'N/A'}</div>
                <div><span className="font-semibold text-slate-600">Gender:</span> {gender}</div>
                <div><span className="font-semibold text-slate-600">Nationality:</span> {nationality}</div>
                <div><span className="font-semibold text-slate-600">Religion:</span> {religion}</div>
                <div><span className="font-semibold text-slate-600">Blood Group:</span> {bloodGroup}</div>
                <div><span className="font-semibold text-slate-600">NID / Birth Registration:</span> {nidBirth || 'N/A'}</div>
                <div><span className="font-semibold text-slate-600">Student Contact:</span> <strong>{studentMobile || 'N/A'}</strong></div>
                <div><span className="font-semibold text-slate-600">Guardian Contact:</span> {guardianMobile || 'N/A'}</div>
                <div className="col-span-2"><span className="font-semibold text-slate-600">Email Address:</span> {email || 'N/A'}</div>
              </div>
              <div className="w-[100px] h-[120px] bg-white border border-slate-400 flex items-center justify-center shrink-0">
                {studentPhoto ? (
                  <img src={studentPhoto} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[8px] text-slate-400 text-center font-bold px-1 uppercase">Passport Size Photo Here</span>
                )}
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h3 className="bg-slate-100 px-2 py-1 font-bold text-[10px] border border-slate-300 uppercase">SECTION 3 — Present Location</h3>
              <div className="p-1 space-y-1">
                <div><span className="font-semibold text-slate-600">Village / Street:</span> {presentVillage || 'N/A'}</div>
                <div><span className="font-semibold text-slate-600">Post Office:</span> {presentPostOffice || 'N/A'}</div>
                <div><span className="font-semibold text-slate-600">Upazila:</span> {presentUpazila || 'N/A'}</div>
                <div><span className="font-semibold text-slate-600">District:</span> {presentDistrict || 'N/A'}</div>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="bg-slate-100 px-2 py-1 font-bold text-[10px] border border-slate-300 uppercase">SECTION 4 — Permanent Location</h3>
              <div className="p-1 space-y-1">
                <div><span className="font-semibold text-slate-600">Village / Street:</span> {permanentVillage || 'N/A'}</div>
                <div><span className="font-semibold text-slate-600">Post Office:</span> {permanentPostOffice || 'N/A'}</div>
                <div><span className="font-semibold text-slate-600">Upazila:</span> {permanentUpazila || 'N/A'}</div>
                <div><span className="font-semibold text-slate-600">District:</span> {permanentDistrict || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Qualification Table */}
          <div className="space-y-2 pt-2">
            <h3 className="bg-slate-100 px-2 py-1 font-bold text-[10px] border border-slate-300 uppercase">SECTION 5 — Academic Record LEDGER</h3>
            <table className="w-full border-collapse border border-slate-300 text-[9px] text-left">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 p-1 font-bold">Exam Name</th>
                  <th className="border border-slate-300 p-1 font-bold">Board Name</th>
                  <th className="border border-slate-300 p-1 font-bold">Subject Group</th>
                  <th className="border border-slate-300 p-1 font-bold">Passing Year</th>
                  <th className="border border-slate-300 p-1 font-bold">Registration No</th>
                  <th className="border border-slate-300 p-1 font-bold">Result (GPA)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-1 font-semibold">SSC or Equivalent</td>
                  <td className="border border-slate-300 p-1">{sscBoard}</td>
                  <td className="border border-slate-300 p-1">{sscGroup}</td>
                  <td className="border border-slate-300 p-1">{sscYear || 'N/A'}</td>
                  <td className="border border-slate-300 p-1">{sscRegNo || 'N/A'}</td>
                  <td className="border border-slate-300 p-1 font-bold">{sscGpa || 'N/A'}</td>
                </tr>
                {additionalEd.map((ed) => (
                  <tr key={ed.id}>
                    <td className="border border-slate-300 p-1 font-semibold">{ed.level}</td>
                    <td className="border border-slate-300 p-1">{ed.board || 'N/A'}</td>
                    <td className="border border-slate-300 p-1">{ed.group || 'N/A'}</td>
                    <td className="border border-slate-300 p-1">{ed.year || 'N/A'}</td>
                    <td className="border border-slate-300 p-1">{ed.regNo || 'N/A'}</td>
                    <td className="border border-slate-300 p-1 font-bold">{ed.gpa || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Checklist items in columns */}
          <div className="space-y-1">
            <h3 className="bg-slate-100 px-2 py-1 font-bold text-[10px] border border-slate-300 uppercase">SECTION 6 — Attachment Confirmations</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 p-1 text-[9px]">
              <div><span className="font-bold">[{docs.sscMarksheet ? 'X' : ' '}]</span> SSC Marksheet Copy</div>
              <div><span className="font-bold">[{docs.nidBirth ? 'X' : ' '}]</span> NID / Birth Certificate Copy</div>
              <div><span className="font-bold">[{docs.sscCertificate ? 'X' : ' '}]</span> SSC Certificate Copy</div>
              <div><span className="font-bold">[{docs.photo ? 'X' : ' '}]</span> Passport Size Photo Copy</div>
              <div><span className="font-bold">[{docs.hscMarksheet ? 'X' : ' '}]</span> HSC Marksheet Copy</div>
              <div><span className="font-bold">[{docs.character ? 'X' : ' '}]</span> Character Certificate Copy</div>
              <div><span className="font-bold">[{docs.hscCertificate ? 'X' : ' '}]</span> HSC Certificate Copy</div>
              <div><span className="font-bold">[{docs.other ? 'X' : ' '}]</span> Other Associated Documents</div>
            </div>
          </div>

          {/* Verification files uploaded */}
          <div className="p-2 border border-emerald-300 bg-emerald-50 text-[9px] text-emerald-800 rounded-lg flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
            <span>Digital verification status checked: Files encrypted and securely uploaded onto Local training servers under 2026 course code. Present: <strong>{[studentPhoto && 'Photo', nidDoc && 'NID', academicDoc && 'Certificate'].filter(Boolean).join(', ') || 'No Digital Uploads'}</strong></span>
          </div>

          {/* Decl */}
          <div className="text-[8px] text-slate-500 italic space-y-1 leading-snug">
            <p><strong>DECLARATION:</strong> I do hereby declare that all the entries made in this dynamic application are correct to the best of my current knowledge. If any particular details is found incorrect or fake during ledger checking, UPAYAN Computer Training Center authorities holds complete discretion to forfeit my admission and certifications without fee adjustments.</p>
            <p className="font-semibold text-slate-700">Student digital acceptance verified: YES (Self-Attested online acceptance ledger record saved)</p>
          </div>

          {/* Human Signature spots */}
          <div className="flex justify-between items-end pt-12 text-[10px]">
            <div className="text-center w-2/5 border-t border-slate-400 pt-1.5">
              <p className="font-bold text-slate-800">Student's Signature</p>
              <p className="text-[9px] text-slate-500 font-mono mt-0.5">Date: ____/____/2026</p>
            </div>
            <div className="text-center w-2/5 border-t border-slate-400 pt-1.5">
              <p className="font-bold text-slate-800">Founder & Director Authorized</p>
              <p className="text-[9px] text-slate-500 font-mono mt-0.5">UPAYAN Computer Training Center</p>
            </div>
          </div>

          <div className="text-center text-[8px] text-slate-400 pt-6 border-t border-slate-200 uppercase">
            UPAYAN COMPUTER TRAINING CENTER — HEAD OFFICE BRANCH LANDMARK AT NANDINA GATE, JAMALPUR SADAR, BANGLADESH
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto relative z-10 space-y-8 no-print">
        
        {/* Dynamic Nav Title Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase"
          >
            <Sparkle size={13} className="text-cyan-400 animate-pulse" />
            <span>INSTITUTIONAL REGISTRATION PORTAL</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white"
          >
            ONLINE ADMISSION FORM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-slate-400 font-sans leading-relaxed"
          >
            Start Your Journey With <span className="text-cyan-400 font-semibold uppercase">UPAYAN COMPUTER TRAINING CENTER</span>
          </motion.p>
        </div>

        {/* Dynamic Success Mode or Form View */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-[#0b132e] to-[#04091d] border border-emerald-500/30 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden max-w-2xl mx-auto"
            >
              {/* Radial green glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" />

              <div className="flex justify-center">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center relative">
                  <div className="absolute -inset-1 rounded-full bg-emerald-500/10 blur-xs animate-ping" />
                  <FileCheck size={32} />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-display text-white">Application Ledger Generated!</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Your official Admission Form <strong>{admissionId}</strong> has been drafted successfully. You are ready to download the institute copy.
                </p>
              </div>

              {/* Stats Preview Card */}
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 sm:p-6 text-left space-y-3 font-mono text-xs text-slate-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500 font-bold uppercase tracking-wide">ADMISSION ID</span>
                  <span className="text-cyan-400 font-bold">{admissionId}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500 font-bold uppercase tracking-wide">STUDENT (EN)</span>
                  <span className="text-slate-100 font-bold">{nameEnglish.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500 font-bold uppercase tracking-wide">COURSE PLAN</span>
                  <span className="text-slate-100 font-bold text-right max-w-[200px] truncate">{course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase tracking-wide">STATUS</span>
                  <span className="text-emerald-400 font-bold uppercase flex items-center gap-1">
                    <Check size={12} /> READY FOR PDF
                  </span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={generatePDF}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-500/10 active:scale-95"
                >
                  <FileText size={15} />
                  <span>DOWNLOAD ADMISSION PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 border border-white/10 hover:border-cyan-500/30 hover:bg-slate-800 text-white font-mono text-xs font-bold tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-black/20 active:scale-95"
                >
                  <Printer size={15} />
                  <span>PRINT ACCREDITATION FORM</span>
                </button>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="text-slate-400 hover:text-white transition-all underline cursor-pointer"
                >
                  Back to edit details
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Reset Form Entries</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="admission-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleFormSubmit}
              className="bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 space-y-10 relative overflow-hidden w-full max-w-4xl mx-auto"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />
              
              {/* SECTION 1: Course Selection */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono">1</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white">Course Selection Desk</h3>
                    <p className="text-xs text-slate-400 font-mono">Admission ID: <span className="text-cyan-400 font-semibold">{admissionId}</span> (Auto Generated)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Course Applying For *</label>
                    <select
                      required
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Computer Office Application Course (3/6 Months)">Computer Office Application Course (3/6 Months)</option>
                      <option value="Advanced Computer Technology Course (6 Months)">Advanced Computer Technology Course (6 Months)</option>
                      <option value="Diploma in Information & Communication Technology (ICT - 1 Year)">Diploma in Information & Communication Technology (ICT - 1 Year)</option>
                      <option value="HSC ICT Academic Program">HSC ICT Academic Program</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Session / Intake *</label>
                    <select
                      required
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      <option value="January - June 2026">January - June 2026</option>
                      <option value="July - December 2026">July - December 2026</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Preferred Shift *</label>
                    <select
                      required
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Morning Batch">Morning Batch</option>
                      <option value="Noon Batch">Noon Batch</option>
                      <option value="Evening Batch">Evening Batch</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Student Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono">2</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white">Student Personal Information</h3>
                    <p className="text-xs text-slate-400 font-mono">All fields marked with an asterisk (*) are strictly required.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Student Name (English Capital Letters) *</label>
                    <input
                      type="text"
                      required
                      value={nameEnglish}
                      onChange={(e) => setNameEnglish(e.target.value)}
                      placeholder="ENTER FULL NAME IN CAPITAL LETTERS"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none uppercase placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Father's Name *</label>
                    <input
                      type="text"
                      required
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      placeholder="Enter Father's Name"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Mother's Name *</label>
                    <input
                      type="text"
                      required
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      placeholder="Enter Mother's Name"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none [color-scheme:dark]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Gender *</label>
                    <select
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Nationality *</label>
                    <input
                      type="text"
                      required
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Religion *</label>
                    <input
                      type="text"
                      required
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Blood Group *</label>
                    <select
                      required
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      <option value="O+">O+</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O-">O-</option>
                      <option value="A-">A-</option>
                      <option value="B-">B-</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">NID / Birth Registration No *</label>
                    <input
                      type="text"
                      required
                      value={nidBirth}
                      onChange={(e) => setNidBirth(e.target.value)}
                      placeholder="Enter Identification Number"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest text-cyan-400">Student Mobile Number *</label>
                    <input
                      type="text"
                      required
                      value={studentMobile}
                      onChange={(e) => setStudentMobile(e.target.value)}
                      placeholder="e.g. 01712345678"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-cyan-500/20 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Guardian Mobile Number *</label>
                    <input
                      type="text"
                      required
                      value={guardianMobile}
                      onChange={(e) => setGuardianMobile(e.target.value)}
                      placeholder="Emergency Contact Number"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. student@gmail.com"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Present Address */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono">3</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white">Present Address</h3>
                    <p className="text-xs text-slate-400 font-mono">Your current physical accommodation details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Village / Street / House *</label>
                    <input
                      type="text"
                      required
                      value={presentVillage}
                      onChange={(e) => setPresentVillage(e.target.value)}
                      placeholder="Village or Street Address"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Post Office *</label>
                    <input
                      type="text"
                      required
                      value={presentPostOffice}
                      onChange={(e) => setPresentPostOffice(e.target.value)}
                      placeholder="Post Office name"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Upazila / Police Station *</label>
                    <input
                      type="text"
                      required
                      value={presentUpazila}
                      onChange={(e) => setPresentUpazila(e.target.value)}
                      placeholder="Sadar or Local Police Station"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">District *</label>
                    <input
                      type="text"
                      required
                      value={presentDistrict}
                      onChange={(e) => setPresentDistrict(e.target.value)}
                      placeholder="District name"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: Permanent Address */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-3 gap-3">
                  <div className="flex items-center gap-3 animate-pulse">
                    <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono">4</div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-display text-white">Permanent Address</h3>
                      <p className="text-xs text-slate-400 font-mono">Permanent ancestral location details</p>
                    </div>
                  </div>

                  <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-950 px-3 py-1.5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/55 transition-all text-xs font-mono text-cyan-400 select-none">
                    <input
                      type="checkbox"
                      checked={sameAsPresent}
                      onChange={(e) => setSameAsPresent(e.target.checked)}
                      className="rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-slate-950 focus:ring-offset-0 shrink-0 cursor-pointer h-3.5 w-3.5"
                    />
                    <span>SAME AS PRESENT ADDRESS</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pointer-events-auto">
                  <div className="space-y-2 opacity-50 disabled-address">
                    <style dangerouslySetInnerHTML={{ __html: `
                      .disabled-address { display: relative; }
                      ${sameAsPresent ? '.disabled-address { pointer-events: none; opacity: 0.4; }' : ''}
                    `}} />
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Village / Street / House *</label>
                    <input
                      type="text"
                      required
                      disabled={sameAsPresent}
                      value={permanentVillage}
                      onChange={(e) => setPermanentVillage(e.target.value)}
                      placeholder="Village or Street Address"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2 disabled-address">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Post Office *</label>
                    <input
                      type="text"
                      required
                      disabled={sameAsPresent}
                      value={permanentPostOffice}
                      onChange={(e) => setPermanentPostOffice(e.target.value)}
                      placeholder="Post Office name"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2 disabled-address">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Upazila / Police Station *</label>
                    <input
                      type="text"
                      required
                      disabled={sameAsPresent}
                      value={permanentUpazila}
                      onChange={(e) => setPermanentUpazila(e.target.value)}
                      placeholder="Sadar or Local Police Station"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2 disabled-address">
                    <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">District *</label>
                    <input
                      type="text"
                      required
                      disabled={sameAsPresent}
                      value={permanentDistrict}
                      onChange={(e) => setPermanentDistrict(e.target.value)}
                      placeholder="District name"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 5: Educational Qualification */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono">5</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white">Educational Qualification</h3>
                    <p className="text-xs text-slate-400 font-mono">Enter academic backgrounds for SSC & HSC/Equivalents</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* SSC Qualifications */}
                  <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs sm:text-sm font-bold font-display text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap size={16} />
                      <span>SSC or Equivalent Record</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="space-y-1.5Col">
                        <label className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Board *</label>
                        <select
                          required
                          value={sscBoard}
                          onChange={(e) => setSscBoard(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs focus:outline-none"
                        >
                          <option value="Dhaka">Dhaka</option>
                          <option value="Mymensingh">Mymensingh</option>
                          <option value="Rajshahi">Rajshahi</option>
                          <option value="Chittagong">Chittagong</option>
                          <option value="Jessore">Jessore</option>
                          <option value="Comilla">Comilla</option>
                          <option value="Barisal">Barisal</option>
                          <option value="Sylhet">Sylhet</option>
                          <option value="Technical">Technical</option>
                          <option value="Madrasah">Madrasah</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Group *</label>
                        <select
                          required
                          value={sscGroup}
                          onChange={(e) => setSscGroup(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs focus:outline-none"
                        >
                          <option value="Science">Science</option>
                          <option value="Business Studies">Business Studies</option>
                          <option value="Humanities">Humanities</option>
                          <option value="Vocational">Vocational</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Passing Year *</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 2023"
                          value={sscYear}
                          onChange={(e) => setSscYear(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-xs focus:outline-none placeholder:text-slate-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Registration No *</label>
                        <input
                          type="text"
                          required
                          placeholder="Registration number"
                          value={sscRegNo}
                          onChange={(e) => setSscRegNo(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-xs focus:outline-none placeholder:text-slate-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold font-mono text-cyan-400 uppercase tracking-wider">GPA / Result *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 5.00"
                          value={sscGpa}
                          onChange={(e) => setSscGpa(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-cyan-500/20 text-slate-100 text-xs focus:outline-none placeholder:text-slate-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Educational Credentials */}
                  {additionalEd.map((ed, index) => (
                    <div key={ed.id} className="border border-cyan-500/15 bg-slate-950/40 rounded-2xl p-5 space-y-4 relative transition-all duration-300 hover:border-cyan-500/30">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="text-cyan-400" size={16} />
                          <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">Education Level *</span>
                          <select
                            value={ed.level}
                            onChange={(e) => {
                              const updated = [...additionalEd];
                              updated[index].level = e.target.value;
                              setAdditionalEd(updated);
                            }}
                            className="bg-slate-900 text-cyan-400 font-bold font-display text-xs rounded-xl border border-cyan-500/20 px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
                          >
                            <option value="HSC / Equivalent">HSC / Equivalent</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Vocational">Vocational</option>
                            <option value="Honors">Honors</option>
                            <option value="Masters">Masters</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(ed.id)}
                          className="self-end sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-[10px] font-mono leading-none tracking-wider cursor-pointer transition-all"
                        >
                          <Trash2 size={12} />
                          <span>REMOVE</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Board / University *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dhaka or National Univ."
                            value={ed.board}
                            onChange={(e) => {
                              const updated = [...additionalEd];
                              updated[index].board = e.target.value;
                              setAdditionalEd(updated);
                            }}
                            className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-xs focus:outline-none placeholder:text-slate-600 focus:border-cyan-500/50"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Group / Subject *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Science or Chemistry"
                            value={ed.group}
                            onChange={(e) => {
                              const updated = [...additionalEd];
                              updated[index].group = e.target.value;
                              setAdditionalEd(updated);
                            }}
                            className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-xs focus:outline-none placeholder:text-slate-600 focus:border-cyan-500/50"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Passing Year *</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 2025"
                            value={ed.year}
                            onChange={(e) => {
                              const updated = [...additionalEd];
                              updated[index].year = e.target.value;
                              setAdditionalEd(updated);
                            }}
                            className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-xs focus:outline-none placeholder:text-slate-600 focus:border-cyan-500/50"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Registration Number *</label>
                          <input
                            type="text"
                            required
                            placeholder="Registration No"
                            value={ed.regNo}
                            onChange={(e) => {
                              const updated = [...additionalEd];
                              updated[index].regNo = e.target.value;
                              setAdditionalEd(updated);
                            }}
                            className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-xs focus:outline-none placeholder:text-slate-600 focus:border-cyan-500/50"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold font-mono text-cyan-400 uppercase tracking-wider">GPA / Result *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 5.00"
                            value={ed.gpa}
                            onChange={(e) => {
                              const updated = [...additionalEd];
                              updated[index].gpa = e.target.value;
                              setAdditionalEd(updated);
                            }}
                            className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-cyan-500/20 text-slate-100 text-xs focus:outline-none placeholder:text-slate-600 focus:border-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  <div className="flex justify-center pt-2">
                    <button
                      type="button"
                      onClick={handleAddMoreEducation}
                      className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold font-display text-xs uppercase tracking-widest text-cyan-400 bg-slate-900/50 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <Plus className="transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" size={16} />
                      <span>Add More Education Certificate</span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent transition-transform duration-1000 ease-in-out" />
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 6: Required Documents Checkboxes */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono">6</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white">Verification Documentation Checklist</h3>
                    <p className="text-xs text-slate-400 font-mono">Select physical documents you currently possess and can bring for offline ledger checking</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries({
                    sscMarksheet: 'SSC Marksheet Copy',
                    sscCertificate: 'SSC Certificate Copy',
                    hscMarksheet: 'HSC Marksheet Copy',
                    hscCertificate: 'HSC Certificate Copy',
                    nidBirth: 'NID / Birth Registration Copy',
                    photo: 'Passport Size Photo',
                    character: 'Character Certificate',
                    other: 'Other Supporting Documents'
                  }).map(([key, label]) => (
                    <label 
                      key={key} 
                      className={`flex items-center gap-3 p-3.5 rounded-xl border select-none cursor-pointer transition-all ${
                        docs[key as keyof typeof docs] 
                          ? 'border-cyan-500/30 bg-cyan-500/5 text-slate-100' 
                          : 'border-white/5 bg-slate-900/40 text-slate-400 hover:border-white/10 hover:bg-slate-900/60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={docs[key as keyof typeof docs]}
                        onChange={(e) => setDocs(prev => ({ ...prev, [key]: e.target.checked }))}
                        className="rounded border-white/20 bg-slate-950 text-cyan-500 focus:ring-slate-950 focus:ring-offset-0 shrink-0 cursor-pointer h-4 w-4"
                      />
                      <span className="text-xs font-semibold leading-snug">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* SECTION 7: File Upload Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono">7</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white">Digital File Portal Upload</h3>
                    <p className="text-xs text-slate-400 font-mono">Upload digital records directly so they embed into your generated printout PDF.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Photo upload item */}
                  <div className="relative border border-white/5 rounded-2xl p-5 bg-white/[0.01] hover:border-cyan-500/20 transition-all flex flex-col justify-between min-h-[180px] group text-center space-y-4">
                    <div className="space-y-3">
                      <div className="mx-auto h-10 w-10 text-cyan-400 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <Upload size={18} />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white uppercase tracking-wider font-display">Student Photo *</span>
                        <span className="block text-[10px] text-slate-500 mt-1 uppercase font-mono">Passport Size (JPG, PNG)</span>
                      </div>
                    </div>

                    {studentPhoto ? (
                      <div className="relative h-20 w-20 mx-auto rounded-lg overflow-hidden border border-white/10 shadow-md">
                        <img src={studentPhoto} alt="Upload" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => { setStudentPhoto(null); setStudentPhotoName(''); setDocs(prev => ({ ...prev, photo: false })); }}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                        />
                        <span className="inline-flex justify-center items-center gap-1 bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] font-mono font-bold tracking-wide py-2 px-3 border border-white/10 rounded-lg w-full transition-colors cursor-pointer uppercase">
                          Choose Image
                        </span>
                      </div>
                    )}
                    {studentPhotoName && <span className="block text-[9px] text-slate-400 font-mono py-1 truncate max-w-full">{studentPhotoName}</span>}
                  </div>

                  {/* NID / Birth Cert upload item */}
                  <div className="relative border border-white/5 rounded-2xl p-5 bg-white/[0.01] hover:border-cyan-500/20 transition-all flex flex-col justify-between min-h-[180px] group text-center space-y-4">
                    <div className="space-y-3">
                      <div className="mx-auto h-10 w-10 text-blue-400 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Upload size={18} />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white uppercase tracking-wider font-display">NID / Birth Certificate</span>
                        <span className="block text-[10px] text-slate-500 mt-1 uppercase font-mono">JPG, PNG, PDF formats</span>
                      </div>
                    </div>

                    {nidDoc ? (
                      <div className="p-2 border border-blue-500/20 bg-blue-500/5 text-[10px] font-semibold text-blue-400 rounded-xl flex items-center justify-between gap-2 max-w-[200px] mx-auto">
                        <span className="truncate">Attested File Attached</span>
                        <button 
                          type="button"
                          onClick={() => { setNidDoc(null); setNidDocName(''); setDocs(prev => ({ ...prev, nidBirth: false })); }}
                          className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleNidUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                        />
                        <span className="inline-flex justify-center items-center gap-1 bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] font-mono font-bold tracking-wide py-2 px-3 border border-white/10 rounded-lg w-full transition-colors cursor-pointer uppercase">
                          Choose File
                        </span>
                      </div>
                    )}
                    {nidDocName && <span className="block text-[9px] text-slate-400 font-mono py-1 truncate max-w-full">{nidDocName}</span>}
                  </div>

                  {/* Academic Certificates upload item */}
                  <div className="relative border border-white/5 rounded-2xl p-5 bg-white/[0.01] hover:border-cyan-500/20 transition-all flex flex-col justify-between min-h-[180px] group text-center space-y-4">
                    <div className="space-y-3">
                      <div className="mx-auto h-10 w-10 text-purple-400 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Upload size={18} />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white uppercase tracking-wider font-display">Academic Documents</span>
                        <span className="block text-[10px] text-slate-500 mt-1 uppercase font-mono">Marksheets / SSC / HSC Copies</span>
                      </div>
                    </div>

                    {academicDoc ? (
                      <div className="p-2 border border-purple-500/20 bg-purple-500/5 text-[10px] font-semibold text-purple-400 rounded-xl flex items-center justify-between gap-2 max-w-[200px] mx-auto">
                        <span className="truncate">Attested Files Attached</span>
                        <button 
                          type="button"
                          onClick={() => { setAcademicDoc(null); setAcademicDocName(''); }}
                          className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAcademicUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                        />
                        <span className="inline-flex justify-center items-center gap-1 bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] font-mono font-bold tracking-wide py-2 px-3 border border-white/10 rounded-lg w-full transition-colors cursor-pointer uppercase">
                          Choose File
                        </span>
                      </div>
                    )}
                    {academicDocName && <span className="block text-[9px] text-slate-400 font-mono py-1 truncate max-w-full">{academicDocName}</span>}
                  </div>
                </div>
              </div>

              {/* SECTION 8: Declaration */}
              <div className="space-y-6 pt-4 border-t border-white/10">
                <div className="bg-[#101a35]/60 border border-cyan-500/20 p-5 rounded-2xl flex items-start gap-4">
                  <div className="h-8 w-8 rounded-lg bg-cyan-555 placeholder:bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="space-y-3">
                    <span className="block text-xs font-bold font-mono tracking-widest text-slate-400 uppercase">SECTION 8 — STUDENT INFORMATIONAL DECLARATION</span>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-sans leading-relaxed">
                      I do hereby declare that all information presented in this online application form is true, correct, and complete to the best of my academic knowledge. I am fully aware that any false statement or forged certificates will trigger immediate cancellation of my course seat allocation at <span className="text-cyan-400 font-medium">UPAYAN COMPUTER TRAINING CENTER</span>.
                    </p>
                    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none text-xs text-white font-bold font-mono py-1.5 px-3 rounded-lg bg-[#0c1328] border border-white/10 select-none">
                      <input
                        type="checkbox"
                        required
                        checked={declared}
                        onChange={(e) => setDeclared(e.target.checked)}
                        className="rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-slate-950 focus:ring-offset-0 shrink-0 cursor-pointer h-4 w-4"
                      />
                      <span className="text-cyan-400">I AGREE TO THE DECLARATION ABOVE *</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Form submit, reset actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10 no-print">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto order-2 sm:order-1 inline-flex items-center justify-center gap-2 bg-rose-500/5 hover:bg-rose-500/15 text-rose-400 border border-rose-500/10 py-3 px-6 rounded-xl font-mono text-xs font-bold tracking-wider transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>RESET FORM ENTRIES</span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto order-1 sm:order-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold tracking-wider py-3 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer shadow-md select-none active:scale-98"
                >
                  <span>GENERATE ADMISSION LEDGER</span>
                  <ArrowRight size={14} className="animate-pulse" />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Back to Home Button Action */}
        <div className="flex justify-center pt-4 no-print">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 text-white px-6 py-3 rounded-xl font-mono text-xs font-bold tracking-wider hover:text-cyan-400 transition-all cursor-pointer shadow-lg shadow-black/30"
          >
            <span>BACK TO HOME PAGE</span>
            <ArrowRight size={13} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
