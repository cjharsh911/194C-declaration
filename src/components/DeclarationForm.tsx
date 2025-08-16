import React, { useState } from 'react';
import { FileText, Download, Eye, EyeOff } from 'lucide-react';
import { FormData, FormErrors } from '../types';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { DeclarationPreview } from './DeclarationPreview';
import { validateForm } from '../utils/validation';
import { generatePDF } from '../utils/pdfGenerator';
import { getCurrentFinancialYear, getTodayDate } from '../utils/dateUtils';

export const DeclarationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    companyAddress: '',
    declarantName: '',
    capacity: '',
    firmName: '',
    firmAddress: '',
    panNumber: '',
    financialYear: getCurrentFinancialYear(),
    place: '',
    date: getTodayDate(),
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const capacityOptions = [
    { value: 'Proprietor', label: 'Proprietor' },
    { value: 'Partner', label: 'Partner' },
    { value: 'Director', label: 'Director' },
  ];

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGeneratePDF = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsGenerating(true);
    try {
      generatePDF(formData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert('Please fill in all required fields before printing.');
      return;
    }
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Section 194C(6) Declaration</h1>
          </div>
          <p className="text-gray-600">Income-tax Act, 1961 - Declaration Form Generator (created by Harsh C)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Declaration Details</h2>
              
              <div className="space-y-6">
                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Payer Information</h3>
                  
                  <FormInput
                    id="companyName"
                    label="Company Name"
                    value={formData.companyName}
                    onChange={(value) => updateFormData('companyName', value)}
                    error={errors.companyName}
                    required
                    placeholder="Enter payer company name"
                  />

                  <FormInput
                    id="companyAddress"
                    label="Company Address"
                    value={formData.companyAddress}
                    onChange={(value) => updateFormData('companyAddress', value)}
                    error={errors.companyAddress}
                    required
                    rows={3}
                    placeholder="Enter complete address of payer company"
                  />
                </div>

                {/* Declarant Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Declarant Information</h3>
                  
                  <FormInput
                    id="declarantName"
                    label="Name of Declarant (Vehicle Owner)"
                    value={formData.declarantName}
                    onChange={(value) => updateFormData('declarantName', value)}
                    error={errors.declarantName}
                    required
                    placeholder="Enter full name of declarant"
                  />

                  <FormSelect
                    id="capacity"
                    label="Capacity"
                    value={formData.capacity}
                    onChange={(value) => updateFormData('capacity', value)}
                    options={capacityOptions}
                    error={errors.capacity}
                    required
                  />
                </div>

                {/* Contractor Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Contractor Information</h3>
                  
                  <FormInput
                    id="firmName"
                    label="Name of Firm / Company"
                    value={formData.firmName}
                    onChange={(value) => updateFormData('firmName', value)}
                    error={errors.firmName}
                    required
                    placeholder="Enter name of contracting firm/company"
                  />

                  <FormInput
                    id="firmAddress"
                    label="Address of Firm / Company"
                    value={formData.firmAddress}
                    onChange={(value) => updateFormData('firmAddress', value)}
                    error={errors.firmAddress}
                    required
                    rows={3}
                    placeholder="Enter registered address of firm/company"
                  />

                  <FormInput
                    id="panNumber"
                    label="PAN of Contractor"
                    value={formData.panNumber}
                    onChange={(value) => updateFormData('panNumber', value.toUpperCase())}
                    error={errors.panNumber}
                    required
                    placeholder="ABCDE1234F"
                  />
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Additional Details</h3>
                  
                  <FormInput
                    id="financialYear"
                    label="Financial Year"
                    value={formData.financialYear}
                    onChange={(value) => updateFormData('financialYear', value)}
                    placeholder="YYYY-YYYY"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      id="place"
                      label="Place (City)"
                      value={formData.place}
                      onChange={(value) => updateFormData('place', value)}
                      error={errors.place}
                      required
                      placeholder="Enter city name"
                    />

                    <FormInput
                      id="date"
                      label="Date"
                      type="date"
                      value={formData.date.split('/').reverse().join('-')}
                      onChange={(value) => {
                        const formatted = value.split('-').reverse().join('/');
                        updateFormData('date', formatted);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>

                <button
                  onClick={handleGeneratePDF}
                  disabled={isGenerating}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Download PDF'}
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 print:hidden"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Print
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Declaration Preview</h2>
                <DeclarationPreview formData={formData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};