import React, { useState, useEffect } from 'react';
import { ReportData } from '../types';
import { formatReportWithEmployees, sendViaWhatsApp } from '../utils/reportUtils';

interface ReportPreviewProps {
  reportData: ReportData;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ reportData }) => {
  const [reportText, setReportText] = useState('');
  
  useEffect(() => {
    setReportText(formatReportWithEmployees(reportData));
  }, [reportData]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-medium text-green-600 mb-3">Report Preview</h3>
      
      <div className="mb-4">
        <textarea
          value={reportText}
          readOnly
          className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none font-mono text-sm"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => {
            navigator.clipboard.writeText(reportText);
            alert('Report copied to clipboard!');
          }}
          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Copy to Clipboard
        </button>
        
        <button
          onClick={() => sendViaWhatsApp(reportText)}
          className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Send via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ReportPreview;