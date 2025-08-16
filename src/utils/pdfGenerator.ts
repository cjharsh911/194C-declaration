import jsPDF from 'jspdf';
import { FormData } from '../types';

export const generatePDF = (formData: FormData): void => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Set font to Trebuchet MS (fallback to helvetica if not available)
  pdf.setFont('helvetica'); // jsPDF doesn't support Trebuchet MS directly, using helvetica as fallback
  
  let yPosition = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);

  // Header - To section
  pdf.setFontSize(12);
  pdf.text('To', margin, yPosition);
  yPosition += 8;
  
  pdf.setFontSize(11);
  pdf.text(formData.companyName, margin, yPosition);
  yPosition += 6;
  
  // Split and add company address
  const addressLines = pdf.splitTextToSize(formData.companyAddress, contentWidth);
  addressLines.forEach((line: string) => {
    pdf.text(line, margin, yPosition);
    yPosition += 6;
  });
  
  yPosition += 10;

  // Title
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Declaration', margin, yPosition);
  yPosition += 15;

  // Body paragraphs
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');

  // Paragraph 1
  const firmPrefix = formData.capacity === 'Proprietor' ? '' : 'M/s ';
  const para1 = `I, ${formData.declarantName}, ${formData.capacity} of ${firmPrefix}${formData.firmName}, having its registered address at ${formData.firmAddress}, (hereinafter referred to as "The Contractor"), do hereby solemnly declare as under, in compliance with Section 194C(6) of the Income-tax Act, 1961:`;
  const para1Lines = pdf.splitTextToSize(para1, contentWidth);
  para1Lines.forEach((line: string) => {
    pdf.text(line, margin, yPosition);
    yPosition += 6;
  });
  yPosition += 8;

  // Declaration points
  const points = [
    `That I, ${formData.declarantName}, am duly authorized to make this declaration in the capacity of ${formData.capacity} of the said concern.`,
    'That the Contractor has been engaged by the payer for hiring or leasing of goods carriage(s) for its business.',
    'That the Contractor does not own more than ten (10) goods carriage vehicles as on date.',
    `That in case the number of goods carriages owned by the Contractor exceeds ten (10) at any time during the previous year ${formData.financialYear}, the Contractor shall immediately, in writing, intimate the payer of this fact.`,
    `That the Permanent Account Number (PAN) of the Contractor is ${formData.panNumber.toUpperCase()}. A self-attested copy of the PAN card is enclosed herewith.`
  ];

  points.forEach((point, index) => {
    const pointText = `${index + 1}. ${point}`;
    const pointLines = pdf.splitTextToSize(pointText, contentWidth - 10);
    pointLines.forEach((line: string) => {
      pdf.text(line, margin, yPosition);
      yPosition += 6;
    });
    yPosition += 5;
  });

  yPosition += 10;

  // Verification section
  pdf.setFont('helvetica', 'bold');
  pdf.text('Verification', margin, yPosition);
  yPosition += 10;

  pdf.setFont('helvetica', 'normal');
  const verification = `I, the above-named Declarant, do hereby verify that the contents of paragraphs (1) to (5) above are true and correct to the best of my knowledge and belief, and that nothing material has been concealed therein.`;
  const verificationLines = pdf.splitTextToSize(verification, contentWidth);
  verificationLines.forEach((line: string) => {
    pdf.text(line, margin, yPosition);
    yPosition += 6;
  });

  yPosition += 15;

  // Place and Date
  pdf.text(`Place: ${formData.place}`, margin, yPosition);
  pdf.text(`Date: ${formData.date}`, pageWidth - margin - 50, yPosition);
  
  yPosition += 30;

  // Signature section
  pdf.text('Signature of Declarant', pageWidth - margin - 60, yPosition);
  yPosition += 6;
  pdf.text(`(${formData.declarantName})`, pageWidth - margin - 60, yPosition);
  yPosition += 6;
  pdf.text(`(${formData.capacity})`, pageWidth - margin - 60, yPosition);
  yPosition += 6;
  pdf.text(`${firmPrefix}${formData.firmName}`, pageWidth - margin - 60, yPosition);
  yPosition += 15;
  pdf.text('(Seal / Stamp of Firm, if any)', pageWidth - margin - 70, yPosition);

  // Save the PDF
  pdf.save('Section_194C_Declaration.pdf');
};