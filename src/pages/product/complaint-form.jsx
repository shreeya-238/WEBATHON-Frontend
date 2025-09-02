import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, AlertCircle, AlertTriangle, Upload, X } from "lucide-react";

const ComplaintForm = () => {
  const { id } = useParams(); // productId
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    productId: id,
    userId: "",
    companyId: "",
    productName: "",
    selectedIssues: [],
    severityLevel: "Medium",
    incidentDate: "",
    description: "",
    batchNumber: "",
    location: "",
    evidenceFiles: [],
    purchaseVerification: null,
    contactInfo: {
      name: "",
      email: "",
      phone: ""
    }
  });

  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [purchaseFile, setPurchaseFile] = useState(null);

  const complaintTypes = ["Misleading", "Quality", "Fraud", "Safety"];
  const severityLevels = ["Low", "Medium", "High", "Critical"];

  useEffect(() => {
    // Mock: load user and product
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (user) {
      setCurrentUser(user);
      setFormData((prev) => ({ 
        ...prev, 
        userId: user._id || "",
        contactInfo: {
          name: user.name || user.firstName + " " + user.lastName || "",
          email: user.email || "",
          phone: user.phone || ""
        }
      }));
    }

    const fetchProduct = async () => {
      try {
        // TODO: Replace with API call
        const mockProduct = {
          _id: id,
          name: "Organic Almond Milk",
          brand: "GreenHarvest",
          companyId: "12345",
        };
        setProduct(mockProduct);
        setFormData((prev) => ({
          ...prev,
          productName: mockProduct.name,
          companyId: mockProduct.companyId,
        }));
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contactInfo.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [field]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (issue) => {
    setFormData((prev) => {
      const issues = prev.selectedIssues.includes(issue)
        ? prev.selectedIssues.filter((i) => i !== issue)
        : [...prev.selectedIssues, issue];
      return { ...prev, selectedIssues: issues };
    });
  };

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    
    if (type === 'evidence') {
      const validFiles = files.filter(file => {
        const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
        return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
      });
      
      setEvidenceFiles(prev => [...prev, ...validFiles]);
      
      const fileData = validFiles.map(file => ({
        fileUrl: URL.createObjectURL(file), // Temporary URL for preview
        fileType: file.type,
        fileSize: file.size,
        file: file // Keep original file for upload
      }));
      
      setFormData(prev => ({
        ...prev,
        evidenceFiles: [...prev.evidenceFiles, ...fileData]
      }));
    } else if (type === 'purchase') {
      const file = files[0];
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      
      if (file && validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024) { // 5MB limit
        setPurchaseFile(file);
        setFormData(prev => ({
          ...prev,
          purchaseVerification: {
            fileUrl: URL.createObjectURL(file),
            fileType: file.type,
            fileSize: file.size,
            file: file
          }
        }));
      } else {
        setError('Invalid file type or size for purchase verification. Please upload JPEG, PNG, or PDF under 5MB.');
      }
    }
  };

  const removeEvidenceFile = (index) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((_, i) => i !== index)
    }));
  };

  const removePurchaseFile = () => {
    setPurchaseFile(null);
    setFormData(prev => ({ ...prev, purchaseVerification: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description || formData.description.length < 50) {
      setError("Description must be at least 50 characters.");
      return;
    }

    if (!formData.incidentDate) {
      setError("Please select an incident date.");
      return;
    }

    if (formData.selectedIssues.length === 0) {
      setError("Please select at least one issue type.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      // TODO: Replace with real API
      console.log("Submitting complaint:", formData);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitted(true);

      setTimeout(() => {
        navigate(`/product/${id}`);
      }, 2000);
    } catch (err) {
      setError("Failed to submit complaint. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  if (submitted)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-green-600">
          Complaint Submitted!
        </h2>
        <p>Redirecting to product page...</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-6">
        <Link
          to={`/product/${id}`}
          className="flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Product
        </Link>
      </div>

      {product && (
        <div className="mb-6 border p-4 rounded bg-white shadow">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">by {product.brand}</p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        {/* Complaint Types */}
        <div>
          <label className="block mb-2 font-medium">Select Issues *</label>
          <div className="flex flex-wrap gap-4">
            {complaintTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={type}
                  checked={formData.selectedIssues.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Severity Level */}
        <div>
          <label className="block mb-2 font-medium">Severity Level *</label>
          <select
            name="severityLevel"
            value={formData.severityLevel}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            {severityLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Incident Date */}
        <div>
          <label className="block mb-2 font-medium">Incident Date *</label>
          <input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="5"
            minLength="50"
            required
          />
          <p className="text-sm text-gray-500">
            Minimum 50 characters ({formData.description.length}/50)
          </p>
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Batch Number (Optional)</label>
            <input
              type="text"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter batch number if available"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Location (Optional)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Where did the incident occur?"
            />
          </div>
        </div>

        {/* Evidence Files */}
        <div>
          <label className="block mb-2 font-medium">Evidence Files (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,video/mp4"
              onChange={(e) => handleFileUpload(e, 'evidence')}
              className="hidden"
              id="evidence-upload"
            />
            <label htmlFor="evidence-upload" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Upload images or videos (JPEG, PNG, MP4)</span>
              <span className="text-xs text-gray-500">Max 10MB per file</span>
            </label>
          </div>
          
          {/* Evidence File Previews */}
          {formData.evidenceFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {formData.evidenceFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center space-x-2">
                    {file.fileType.startsWith('image/') ? (
                      <img src={file.fileUrl} alt="Evidence" className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center text-xs">
                        VIDEO
                      </div>
                    )}
                    <span className="text-sm">{file.file?.name || 'Evidence file'}</span>
                    <span className="text-xs text-gray-500">({(file.fileSize / 1024 / 1024).toFixed(1)}MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEvidenceFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Verification */}
        <div>
          <label className="block mb-2 font-medium">Purchase Verification (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={(e) => handleFileUpload(e, 'purchase')}
              className="hidden"
              id="purchase-upload"
            />
            <label htmlFor="purchase-upload" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Upload receipt or proof of purchase</span>
              <span className="text-xs text-gray-500">JPEG, PNG, or PDF - Max 5MB</span>
            </label>
          </div>
          
          {/* Purchase File Preview */}
          {formData.purchaseVerification && (
            <div className="mt-3 flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-xs">
                  {formData.purchaseVerification.fileType === 'application/pdf' ? 'PDF' : 'IMG'}
                </div>
                <span className="text-sm">{formData.purchaseVerification.file?.name || 'Purchase verification'}</span>
                <span className="text-xs text-gray-500">
                  ({(formData.purchaseVerification.fileSize / 1024 / 1024).toFixed(1)}MB)
                </span>
              </div>
              <button
                type="button"
                onClick={removePurchaseFile}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div>
          <label className="block mb-4 font-medium">Contact Information *</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm">Name *</label>
              <input
                type="text"
                name="contactInfo.name"
                value={formData.contactInfo.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Email *</label>
              <input
                type="email"
                name="contactInfo.email"
                value={formData.contactInfo.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Phone *</label>
              <input
                type="tel"
                name="contactInfo.phone"
                value={formData.contactInfo.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Contact information is auto-filled from your account but can be modified if needed.
          </p>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Link
            to={`/product/${id}`}
            className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Submit Complaint</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;
