import { QrCode, CreditCard, Loader } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import html2pdf from "html2pdf.js";
import ViewInvoice from "../../components/ViewInvoice";
import { toast } from "react-toastify";
import { useGetUserOrdersQuery } from "../../../../services/userApi";

const Invoice = ({ order }) => {

  const { id } = useParams();
  const location = useLocation();
  const { data: ordersResponse, isLoading } = useGetUserOrdersQuery('all');

  // Priority: 1. Navigation State, 2. RTK Query Cache, 3. Null
  const data = location.state || ordersResponse?.data?.find(o => o.id === id);

  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <div className="flex flex-col items-center gap-2">
          <Loader className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-amber-600 font-medium">Fetching invoice data...</p>
        </div>
      </div>
    );
  }

  if (!data && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
          <p className="text-xl font-bold text-gray-800 mb-2">Invoice Not Found</p>
          <p className="text-gray-600 mb-6">No order data found for ID: {id}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

const currentPath = location.pathname;

// Fix: Remove :id from the string check - :id is a parameter, not part of the actual URL
const isInvoice = currentPath.includes("/user/dashboard/invoice/");
const isViewInvoice = currentPath.includes("/user/dashboard/modal/invoice/"); 
 
console.log(data,"data has been recieved");
console.log("Current Path:", currentPath);
console.log("isInvoice:", isInvoice);
console.log("isViewInvoice:", isViewInvoice);

const printRef = useRef();

// PDF download logic - ONLY run if it's the invoice path (not view invoice)
useEffect(() => {
  // Only trigger download if we're on the invoice page
  if (!isInvoice) {
    console.log("Not invoice page, skipping PDF download");
    toast.error("Not invoice page, skipping PDF download");
    return;
  }
  
  console.log("Invoice page detected, generating PDF...");
  
  const timer = setTimeout(() => {
    if (!printRef.current) return;

    const opt = {
      margin: 0,
      filename: `Invoice-${data.id || id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(printRef.current).save();
  }, 500);

  return () => clearTimeout(timer);
}, [isInvoice, data, id]); // Add dependencies

  // Default values in case order is undefined
  const defaultOrder = {
    id: 'N/A',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    serviceName: 'Service',
    customerName: 'Customer Name',
    status: 'pending',
    paymentStatus: 'pending',
    amount: 0,
    paymentMethod: 'N/A',
    priest: 'N/A',
    location: 'N/A',
    type: 'offline',
    items: [
      { name: 'Service Charge', quantity: 1, price: 0 }
    ]
  };

  const invoiceOrder = data || defaultOrder;

  // Calculate totals
  const calculateSubtotal = () => {
    if (invoiceOrder.items && invoiceOrder.items.length > 0) {
      return invoiceOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    return invoiceOrder.amount || 0;
  };

  const subtotal = calculateSubtotal();
  const gstRate = 18;
  const gstAmount = (subtotal * gstRate) / 100;
  const grandTotal = subtotal + gstAmount;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Generate invoice number
  const invoiceNumber = `INV-${invoiceOrder.id}-${new Date().getFullYear()}`;

  return (
    <>
      {/* Show Invoice component only for invoice path */}
      {isInvoice && (
        <div className="bg-gray-300 py-10 print:bg-white relative min-h-screen">
          <div ref={printRef} className="max-w-4xl mx-auto bg-white p-6 text-gray-800 text-sm print:shadow-none print:p-2 rounded-[2px] shadow-lg relative overflow-hidden">
            
            {/* CANCELLED Overlay */}
            {(invoiceOrder.status === 'cancelled' || invoiceOrder.paymentStatus === 'refunded') && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                <div className="absolute inset-0 bg-red-50 opacity-40"></div>
                <div className="relative transform rotate-[-30deg]">
                  <span className="text-7xl font-bold text-red-900 opacity-40 border-8 border-red-900 px-8 py-4 rounded-2xl">
                    CANCELLED
                  </span>
                </div>
              </div>
            )}

            {/* Watermark for Print */}
            <div className="watermark-print hidden print:block absolute opacity-5 text-8xl font-bold rotate-[-30deg] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
              ACHARYA JI
            </div>

            <table className="w-full border-collapse">
              <tbody>
                {/* ================= HEADER ================= */}
                <tr>
                  <td className="p-1 pl-4 align-top w-1/2">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="pr-4 w-20 ">
                            <img
                              src="/logo.png"
                              alt="Acharya Ji Logo"
                              className="w-[80px] h-[70px] object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/80?text=Acharya+Ji';
                              }}
                            />
                          </td>
                          <td>
                            <p className="text-2xl font-bold text-amber-700 leading-tight">Acharya Ji</p>
                            <p className="text-[10px] text-gray-600 font-medium uppercase tracking-wider">Pure Spiritual & Vedic Services</p>
                            <p className="text-[9px] text-gray-500 mt-1">ESTD. 2020</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td className="text-right p-4 align-top w-1/2">
                    <p className="text-[28px] font-black tracking-widest text-amber-800 leading-none">
                      TAX INVOICE
                    </p>
                    <p className="text-[10px] text-gray-500 mt-2 uppercase font-bold tracking-tighter">Original Copy for Recipient</p>
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <hr className="my-4 border-t-2 border-amber-200" />
                  </td>
                </tr>

                {/* ================= SOLD BY ================= */}
                <tr>
                  <td colSpan="2" className="px-4 py-2">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="w-1/3 align-top">
                            <p className="font-bold text-amber-700 mb-1 text-[10px] uppercase tracking-wider">Vendor Information:</p>
                            <p className="font-bold text-gray-900 text-sm">Acharya Ji Online Services</p>
                            <p className="text-xs text-gray-600 leading-relaxed">A-45, 3rd Floor, Knowledge Park III<br/>Greater Noida, Uttar Pradesh<br/>India - 201310</p>
                            <div className="mt-2 space-y-0.5">
                              <p className="text-[10px] text-gray-500 font-bold">GSTIN: <span className="text-gray-800">09ACHJI1234F1Z5</span></p>
                              <p className="text-[10px] text-gray-500 font-bold">PAN: <span className="text-gray-800">ACHJI1234F</span></p>
                            </div>
                          </td>

                          <td className="w-1/3 align-top text-center border-l border-r border-gray-100 px-2">
                            <p className="font-bold text-amber-700 mb-1 text-[10px] uppercase tracking-wider">Place of Supply:</p>
                            <p className="text-xs text-gray-800 font-bold">{invoiceOrder.location?.split(',').pop()?.trim() || 'Uttar Pradesh'}</p>
                            <p className="text-xs text-gray-500 font-medium">(State Code: 09)</p>
                          </td>

                          <td className="w-1/3 align-top text-end">
                            <div className="inline-block border-2 border-amber-600/20 p-2 rounded-xl bg-amber-50/50 shadow-sm hover:border-amber-500/40 transition-all duration-300">
                              <div className="text-center">
                                <QRCode
                                    value={JSON.stringify({
                                      id: invoiceOrder.id,
                                      customer: invoiceOrder.customerName,
                                      total: formatCurrency(grandTotal),
                                      date: invoiceOrder.date,
                                      ref: invoiceOrder.transactionId || 'INTERNAL'
                                    })}
                                    size={85}
                                    level="H"
                                />
                                <p className="text-[7px] text-amber-800 font-black mt-1.5 uppercase tracking-widest leading-none">Secured Data Hash</p>
                                <p className="text-[6px] text-gray-400 font-bold uppercase mt-0.5 tracking-tighter">Verified by Acharya Ji</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <hr className="my-4 border-t border-gray-100" />
                  </td>
                </tr>

                {/* ================= BILLING & SHIPPING ================= */}
                <tr>
                  <td className="p-4 w-1/2 border-r border-gray-100 align-top">
                    <p className="font-bold text-amber-700 mb-3 flex items-center gap-1 text-[10px] uppercase tracking-widest">
                      <span className="w-1 h-3 bg-amber-500 rounded-full "></span>
                      Bill To:
                    </p>
                    <p className="font-black text-gray-900 text-sm text-amber-900 capitalize">{invoiceOrder.customerName}</p>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">{invoiceOrder.location || 'Location shared at time of booking'}</p>
                    <p className="text-xs text-gray-800 mt-2 font-bold"><span className="text-gray-500 font-medium">Contact:</span> {invoiceOrder.customerMobile || 'N/A'}</p>
                  </td>

                  <td className="p-4 w-1/2 align-top">
                    <p className="font-bold text-amber-700 mb-3 flex items-center gap-1 text-[10px] uppercase tracking-widest">
                      <span className="w-1 h-3 bg-amber-500 rounded-full "></span>
                      Service Destination:
                    </p>
                    <p className="font-black text-gray-900 text-sm capitalize">{invoiceOrder.customerName}</p>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">{invoiceOrder.location || 'Registered supply location'}</p>
                    <p className="text-[10px] text-gray-400 mt-3 font-bold italic tracking-tighter">(Verified Digital Destination)</p>
                  </td>
                </tr>

                <tr className="bg-gray-50/80">
                  <td colSpan="2" className="border-t border-b border-gray-200">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="px-6 py-4 divide-y divide-gray-100 w-1/2">
                            <div className="flex justify-between py-1.5">
                              <span className="text-[10px] text-gray-500 font-bold uppercase">Order Reference:</span>
                              <span className="text-xs font-black text-gray-800">#{invoiceOrder.id}</span>
                            </div>
                            <div className="flex justify-between py-1.5">
                              <span className="text-[10px] text-gray-500 font-bold uppercase">Invoice Number:</span>
                              <span className="text-xs font-bold text-amber-700">{invoiceNumber}</span>
                            </div>
                            <div className="flex justify-between py-1.5">
                              <span className="text-[10px] text-gray-500 font-bold uppercase">Booking Date:</span>
                              <span className="text-xs font-bold text-gray-800">{invoiceOrder.date}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 divide-y divide-gray-100 w-1/2 border-l border-gray-200">
                            <div className="flex justify-between py-1.5">
                              <span className="text-[10px] text-gray-500 font-bold uppercase">Delivery Channel:</span>
                              <span className="text-xs font-black text-amber-600 uppercase italic">{invoiceOrder.type}</span>
                            </div>
                            <div className="flex justify-between py-1.5">
                              <span className="text-[10px] text-gray-500 font-bold uppercase">Auth Priest:</span>
                              <span className="text-xs font-bold text-gray-800">{invoiceOrder.priest}</span>
                            </div>
                            <div className="flex justify-between py-1.5 items-center">
                              <span className="text-[10px] text-gray-500 font-bold uppercase">Financial Status:</span>
                              <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                                invoiceOrder.paymentStatus === 'paid' ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'
                              }`}>
                                {invoiceOrder.paymentStatus}
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                {/* ================= ITEM TABLE ================= */}
                <tr>
                  <td colSpan="2" className="px-4 py-8">
                    <p className="font-bold text-amber-800 mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-ping"></span>
                      Service Assessment Details:
                    </p>

                    <table className="w-full border border-gray-200 border-collapse rounded-xl overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-amber-800 text-white font-black uppercase text-[9px] tracking-[0.15em]">
                          <th className="p-4 text-left border-r border-amber-700 w-12">#</th>
                          <th className="p-4 text-left border-r border-amber-700">Description of Vedic Service</th>
                          <th className="p-4 text-center border-r border-amber-700 w-24">Unit Qty</th>
                          <th className="p-4 text-right border-r border-amber-700 w-36">Base Unit Rate (₹)</th>
                          <th className="p-4 text-right w-36">Net Taxable (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(!invoiceOrder.items || invoiceOrder.items.length === 0) ? (
                          <tr className="hover:bg-amber-50/50 transition-colors">
                            <td className="border-b border-r border-gray-100 p-4 text-center text-xs font-bold text-gray-400 font-mono">01</td>
                            <td className="border-b border-r border-gray-100 p-4">
                              <div className="text-xs font-black text-gray-900">{invoiceOrder.serviceName}</div>
                              <div className="text-[9px] text-gray-500 font-bold mt-1 uppercase italic tracking-tighter">Vedic spiritual assistance via {invoiceOrder.type} platform</div>
                            </td>
                            <td className="border-b border-r border-gray-100 p-4 text-center text-xs font-black text-gray-600 font-mono">01</td>
                            <td className="border-b border-r border-gray-100 p-4 text-right text-xs font-bold text-gray-700">{formatCurrency(invoiceOrder.amount).replace('₹', '')}</td>
                            <td className="border-b p-4 text-right text-xs font-black text-gray-900">{formatCurrency(invoiceOrder.amount).replace('₹', '')}</td>
                          </tr>
                        ) : (
                          invoiceOrder.items.map((item, index) => (
                            <tr key={index} className="hover:bg-amber-50/50 transition-colors">
                              <td className="border-b border-r border-gray-100 p-4 text-center text-xs font-bold text-gray-400 font-mono">{String(index + 1).padStart(2, '0')}</td>
                              <td className="border-b border-r border-gray-100 p-4">
                                <div className="text-xs font-black text-gray-900">{item.name}</div>
                                <div className="text-[9px] text-gray-500 font-bold mt-1 uppercase italic tracking-tighter">{item.category || 'Vedic Item'} Supply</div>
                              </td>
                              <td className="border-b border-r border-gray-100 p-4 text-center text-xs font-black text-gray-600 font-mono">{String(item.quantity).padStart(2, '0')}</td>
                              <td className="border-b border-r border-gray-100 p-4 text-right text-xs font-bold text-gray-700">{formatCurrency(item.price).replace('₹', '')}</td>
                              <td className="border-b p-4 text-right text-xs font-black text-gray-900">{formatCurrency(item.price * item.quantity).replace('₹', '')}</td>
                            </tr>
                          ))
                        )}

                        {/* Calculations Section */}
                        <tr className="bg-gray-50/50">
                          <td colSpan="4" className="p-3 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest border-r border-gray-200">
                            Net Taxable Value Subtotal:
                          </td>
                          <td className="p-3 text-right text-xs font-black text-gray-900">
                            {formatCurrency(subtotal).replace('₹', '')}
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="4" className="p-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest border-r border-gray-200">
                            Integrated GST @ 18%:
                          </td>
                          <td className="p-3 text-right text-xs font-bold text-gray-700 font-mono">
                            {formatCurrency(gstAmount).replace('₹', '')}
                          </td>
                        </tr>

                        <tr className="bg-amber-900 text-white">
                          <td colSpan="4" className="p-4 text-right text-xs font-black uppercase tracking-[0.2em]">
                            Total Invoice Value:
                          </td>
                          <td className="p-4 text-right text-sm font-black italic">
                            {formatCurrency(grandTotal).replace('₹', '')}
                          </td>
                        </tr>

                        <tr className="bg-white">
                          <td colSpan="5" className="p-4 text-[10px] text-amber-900 text-center font-black uppercase tracking-widest border-t-2 border-amber-900 italic">
                            Amount in Words: {convertNumberToWords(grandTotal)} Indian Rupees Only
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                {/* ================= PAYMENT SUMMARY ================= */}
                <tr>
                  <td className="px-4 py-4 align-top w-1/2">
                    <div className="bg-amber-50/30 p-5 rounded-2xl border-2 border-amber-100 shadow-inner">
                      <p className="font-black text-amber-800 mb-4 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-amber-600" />
                        Billing Ledger:
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] text-gray-500 font-bold uppercase italic">Assessed Value:</span>
                          <span className="text-xs text-gray-900 font-black">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-amber-100 pb-2">
                          <span className="text-[10px] text-gray-500 font-bold uppercase italic">Tax Liability:</span>
                          <span className="text-xs text-gray-900 font-black">{formatCurrency(gstAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xs font-black text-amber-900 uppercase">Grand Total:</span>
                          <span className="text-xl font-black text-amber-900 decoration-double underline decoration-amber-500 underline-offset-8">
                            {formatCurrency(grandTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 align-top w-1/2">
                    <div className="bg-gray-900 p-5 rounded-2xl shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-amber-500/20 transition-all duration-500"></div>
                      <p className="font-black text-amber-500 mb-4 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                        <QrCode className="w-5 h-5" />
                        Auth Logs:
                      </p>
                      <div className="space-y-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Gateway Provider</span>
                          <span className="text-[11px] font-black text-white italic">{invoiceOrder.paymentMethod}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Digital Ref Hash</span>
                          <span className="text-[9px] font-black text-amber-400 font-mono break-all">{invoiceOrder.transactionId}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${invoiceOrder.paymentStatus === 'paid' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)] animate-bounce'}`}></div>
                                <span className="text-[10px] font-black text-white uppercase tracking-tighter">{invoiceOrder.paymentStatus}</span>
                            </div>
                            <span className="text-[8px] text-gray-500 font-black font-mono">{invoiceOrder.date}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* ================= FOOTER ================= */}
                <tr>
                  <td colSpan="2" className="text-center text-gray-500 px-4 py-10">
                    <div className="mb-6">
                      <img src="/logo.png" className="w-10 h-10 mx-auto opacity-20 grayscale hover:opacity-100 transition-opacity duration-700" alt="footer-logo" />
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">Digitally Generated Tax Document - Signature Exempted under IT Act 2000</p>
                    <div className="flex justify-center items-center gap-8 text-[9px] font-black text-amber-700/60 uppercase tracking-[0.2em] mb-8">
                      <span className="hover:text-amber-800 cursor-pointer">Noida Jurisdiction</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                      <span className="hover:text-amber-800 cursor-pointer">Non-Transferable</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                      <span className="hover:text-amber-800 cursor-pointer">Standard VAT Compliant</span>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200 inline-block px-12">
                      <p className="text-[11px] font-black text-gray-900 flex items-center justify-center gap-3">
                        <span className="text-amber-600 uppercase tracking-tighter">Support Core:</span> 
                        <span className="bg-amber-100 px-2 py-1 rounded text-amber-900">billing@acharyaji.com</span> 
                        <span className="text-gray-300">|</span> 
                        <span className="font-mono text-xs">+91 999 000 7777</span>
                      </p>
                    </div>
                    <p className="text-[9px] mt-10 text-gray-400 font-bold italic tracking-widest leading-relaxed">
                      "Wishing you eternal peace and prosperity. Thank you for making Acharya Ji a part of your spiritual quest."
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Print Styles */}
            <style jsx>{`
              @media print {
                body { background: white; -webkit-print-color-adjust: exact; }
                .no-print { display: none; }
                .bg-gray-300 { background: white !important; }
                .shadow-lg, .shadow-xl { shadow: none !important; }
                .rounded-[2px] { border-radius: 0 !important; }
              }
            `}</style>
          </div>
        </div>
      )}
      
      {/* Show ViewInvoice component only for view invoice path */}
      {isViewInvoice && <ViewInvoice />}
    </>
  );
};

// Helper function to convert number to words (basic implementation)
function convertNumberToWords(num) {
  if (num === 0) return 'Zero';
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const numToWords = (n) => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
    if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
    if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + numToWords(n % 100000) : '');
    return numToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + numToWords(n % 10000000) : '');
  };
  
  return numToWords(Math.floor(num));
}

export default Invoice;