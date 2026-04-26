import React from "react";
import { ShieldCheck, Upload, CreditCard, Landmark, FileCheck, Sparkles, CheckCircle, X } from "lucide-react";

const INDIAN_BANKS = [
  "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank",
  "Bank of Baroda", "Canara Bank", "Union Bank of India", "IndusInd Bank", "Kotak Mahindra Bank",
  "Bank of India", "Central Bank of India", "Indian Bank", "UCO Bank", "IDBI Bank",
  "Yes Bank", "Federal Bank", "South Indian Bank", "Karnataka Bank", "Bandhan Bank",
  "Standard Chartered Bank", "IDFC First Bank", "AU Small Finance Bank"
].sort();

const DocumentUploadSection = ({ formData, handleInputChange, handleFileChange, errors, vendorType }) => {

  // Helper for IFSC validation feedback
  const getIfscError = (code) => {
    if (!code) return null;
    if (code.length !== 11) return "IFSC must be 11 characters";
    const pattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!pattern.test(code)) return "Invalid format (e.g. SBIN0012345)";
    return null;
  };

  const ifscError = getIfscError(formData.ifscCode);

  // Helper: get the selected file name for a given field
  const getFileName = (fieldName) => {
    const file = formData[fieldName];
    if (!file) return null;
    // If it's a File object
    if (file instanceof File) return file.name;
    // If it's a string (existing URL from DB)
    if (typeof file === 'string' && file.length > 0) return file.split('/').pop();
    return null;
  };

  // Helper: render the upload label with file status
  const renderUploadArea = (fieldName, inputId, labelText) => {
    const fileName = getFileName(fieldName);
    const isUploaded = !!fileName;

    return (
      <div className="relative group">
        <input
          type="file"
          name={fieldName}
          accept=".pdf, image/*"
          onChange={handleFileChange}
          className="hidden"
          id={inputId}
        />
        <label
          htmlFor={inputId}
          className={`flex items-center justify-center gap-2 p-2.5 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
            isUploaded
              ? "border-green-400 bg-green-50 hover:bg-green-100"
              : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
          }`}
        >
          {isUploaded ? (
            <>
              <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-green-700 truncate max-w-[200px]">
                {fileName}
              </span>
              <span className="text-[10px] text-green-500 ml-1 flex-shrink-0">(Change)</span>
            </>
          ) : (
            <>
              <Upload size={14} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">{labelText}</span>
            </>
          )}
        </label>
      </div>
    );
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center gap-2 pb-2 border-b border-orange-100">
        <ShieldCheck className="text-orange-500 w-5 h-5" />
        <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wider">Documents & Verification</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Identity Proof */}
        <div className="space-y-3 p-4 bg-orange-50/30 rounded-xl border border-orange-100">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <CreditCard size={16} className="text-orange-600" />
            Identity Proof (Aadhar Card)
          </label>
          <div className="space-y-2">
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber || ""}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12);
                handleInputChange(e);
              }}
              maxLength={12}
              placeholder="12-digit Aadhar Number"
              className="w-full bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-500 outline-none"
            />
            {renderUploadArea("aadharFile", "aadhar-upload", "Upload Aadhar Copy")}
            {errors.aadharNumber && <p className="text-[10px] text-red-500">{errors.aadharNumber}</p>}
          </div>
        </div>

        {/* PAN Proof */}
        <div className="space-y-3 p-4 bg-orange-50/30 rounded-xl border border-orange-100">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileCheck size={16} className="text-orange-600" />
            Taxation Proof (PAN Card)
          </label>
          <div className="space-y-2">
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber || ""}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                handleInputChange(e);
              }}
              maxLength={10}
              placeholder="PAN Number"
              className="w-full bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-500 outline-none"
            />
            {renderUploadArea("panFile", "pan-upload", "Upload PAN Copy")}
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="p-4 bg-orange-50/30 rounded-xl border border-orange-100 space-y-4">
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Landmark size={16} className="text-orange-600" />
          Bank Details (for payouts)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <select
              name="bankName"
              value={formData.bankName || ""}
              onChange={handleInputChange}
              className="w-full bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-500 outline-none appearance-none"
            >
              <option value="">Select Bank Name</option>
              {INDIAN_BANKS.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
              <option value="Other">Other Bank</option>
            </select>
          </div>

          <div className="space-y-1">
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber || ""}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
                handleInputChange(e);
              }}
              placeholder="Account Number"
              className="w-full bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode || ""}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase().slice(0, 11);
                handleInputChange(e);
              }}
              placeholder="IFSC Code (e.g. HDFC0001234)"
              className={`w-full bg-white border-2 rounded-lg px-3 py-2 text-sm outline-none transition-colors ${
                ifscError ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-orange-500"
              }`}
            />
            {ifscError && <p className="text-[10px] text-red-500 font-medium ml-1">{ifscError}</p>}
            {!ifscError && formData.ifscCode?.length === 11 && (
              <p className="text-[10px] text-green-600 font-medium ml-1">Valid IFSC Format</p>
            )}
          </div>
        </div>
      </div>

      {/* Professional Qualification - Conditional */}
      {(vendorType === 'pandit' || vendorType === 'astrologer' || vendorType === 'vedicScholar') && (
        <div className="p-4 bg-orange-50/30 rounded-xl border border-orange-100 space-y-3">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Sparkles size={16} className="text-orange-600" />
            Professional Qualification / Shashtri Certificate
          </label>
          {renderUploadArea("qualificationFile", "qualification-upload", "Upload Educational / Experience Certificate")}
        </div>
      )}
    </div>
  );
};

export default DocumentUploadSection;
