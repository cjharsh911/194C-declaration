import React from 'react';
import { FormData } from '../types';

interface DeclarationPreviewProps {
  formData: FormData;
}

export const DeclarationPreview: React.FC<DeclarationPreviewProps> = ({ formData }) => {
  const firmPrefix = formData.capacity === 'Proprietor' ? '' : 'M/s ';

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg border" style={{ fontFamily: 'Trebuchet MS, Arial, sans-serif' }}>
      <div className="space-y-6 text-sm leading-relaxed text-justify">
        {/* Header */}
        <div>
          <div className="font-medium">To</div>
          <div className="mt-2">
            <div className="font-medium">{formData.companyName || '[Company Name]'}</div>
            <div className="mt-1 whitespace-pre-line">{formData.companyAddress || '[Company Address]'}</div>
          </div>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-lg font-bold text-center">Declaration</h2>
        </div>

        {/* Main Declaration */}
        <div className="space-y-4">
          <p>
            I, <strong>{formData.declarantName || '[Declarant Name]'}</strong>, {formData.capacity || '[Capacity]'} of {firmPrefix}<strong>{formData.firmName || '[Firm Name]'}</strong>, having its registered address at {formData.firmAddress || '[Firm Address]'}, (hereinafter referred to as "The Contractor"), do hereby solemnly declare as under, in compliance with Section 194C(6) of the Income-tax Act, 1961:
          </p>

          <div className="space-y-3 pl-4">
            <p>
              <strong>1.</strong> That I, {formData.declarantName || '[Declarant Name]'}, am duly authorized to make this declaration in the capacity of {formData.capacity || '[Capacity]'} of the said concern.
            </p>

            <p>
              <strong>2.</strong> That the Contractor has been engaged by the payer for hiring or leasing of goods carriage(s) for its business.
            </p>

            <p>
              <strong>3.</strong> That the Contractor does not own more than ten (10) goods carriage vehicles as on date.
            </p>

            <p>
              <strong>4.</strong> That in case the number of goods carriages owned by the Contractor exceeds ten (10) at any time during the previous year {formData.financialYear || '[Financial Year]'}, the Contractor shall immediately, in writing, intimate the payer of this fact.
            </p>

            <p>
              <strong>5.</strong> That the Permanent Account Number (PAN) of the Contractor is <strong>{formData.panNumber?.toUpperCase() || '[PAN Number]'}</strong>. A self-attested copy of the PAN card is enclosed herewith.
            </p>
          </div>
        </div>

        {/* Verification */}
        <div className="space-y-4">
          <h3 className="font-bold">Verification</h3>
          <p>
            I, the above-named Declarant, do hereby verify that the contents of paragraphs (1) to (5) above are true and correct to the best of my knowledge and belief, and that nothing material has been concealed therein.
          </p>
        </div>

        {/* Signature Section */}
        <div className="flex justify-between items-end pt-8">
          <div>
            <div>Place: {formData.place || '[Place]'}</div>
            <div>Date: {formData.date || '[Date]'}</div>
          </div>
          <div className="text-right space-y-1">
            <div className="h-12 border-b border-gray-400 w-40 mb-2"></div>
            <div>Signature of Declarant</div>
            <div>({formData.declarantName || '[Declarant Name]'})</div>
            <div>({formData.capacity || '[Capacity]'})</div>
            <div>{firmPrefix}{formData.firmName || '[Firm Name]'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};