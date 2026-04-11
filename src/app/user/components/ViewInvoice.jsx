import React, { useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import QRCode from "react-qr-code";
import html2pdf from "html2pdf.js";
import { Download } from 'lucide-react';

const ViewInvoice = () => {
    const { id } = useParams();              
    const location = useLocation();
    const data = location.state;
    
    if (!data) {
        return <p>No order data found for ID: {id}</p>;
    }
    
    console.log(data, "data has been received");
    
    const printRef = useRef();
    
    // Function to handle PDF download on button click
    const handleDownloadPDF = () => {
        if (!printRef.current) {
            console.error("Print reference not found");
            return;
        }

        const opt = {
            margin: 0,
            filename: `Invoice-${data?.id || id}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(opt).from(printRef.current).save();
    };

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
        if (!invoiceOrder.items) return invoiceOrder.amount || 0;
        return invoiceOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const subtotal = calculateSubtotal();
    const gstRate = 18;
    const gstAmount = (invoiceOrder.subtotal || invoiceOrder.amount * gstRate) / 100;
    const grandTotal = (invoiceOrder.amount || subtotal) + gstAmount;

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount).replace('₹', '₹');
    };

    // Generate invoice number
    const invoiceNumber = `INV-${invoiceOrder.id}-${new Date().getFullYear()}`;

    return (
        <div>
            <div className="bg-gray-300 pb-10 pt-3 print:bg-white ">
                <div className='flex justify-end px-24 pb-3'> 
                    <button 
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-amber-700 text-sm font-medium transition-colors duration-200 group relative"
                        title="Download Invoice"
                    >
                        <Download size={18} className="group-hover:animate-pulse" /> 
                        <span className="relative">
                            Download Invoice
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"></span>
                        </span>
                    </button>
                </div>
                <div ref={printRef} className="max-w-4xl mx-auto bg-white p-6 text-gray-800 text-sm print:shadow-none print:p-2 rounded-[2px] shadow-lg">
                    {/* Watermark for Print */}
                    <div className="print:block hidden absolute opacity-5 text-8xl font-bold rotate-[-30deg] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
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
                                                <td className="pr-2 w-20 ">
                                                    <img
                                                        src="/logo.png"
                                                        alt="Acharya Ji Logo"
                                                        className="w-[64px] h-[56px] object-fill"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://via.placeholder.com/80?text=Acharya+Ji';
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <p className="text-xl font-bold text-amber-700">Acharya Ji</p>
                                                    <p className="text-xs text-gray-600">Online Spiritual Services</p>
                                                    <p className="text-xs text-gray-500 mt-1">Since 2020</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>

                                <td className="text-right p-4 align-top w-1/2">
                                    <p className="text-[24px] font-bold tracking-widest text-amber-700">
                                        TAX INVOICE
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Original for Recipient</p>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2">
                                    <hr className="my-2 border-t-2 border-amber-200" />
                                </td>
                            </tr>

                            {/* ================= SOLD BY ================= */}
                            <tr>
                                <td colSpan="2" className="px-4 py-2">
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td className="w-1/3 align-top">
                                                    <p className="font-semibold text-amber-700 mb-1">Sold By:</p>
                                                    <p className="font-medium">Acharya Ji Online Services</p>
                                                    <p className="text-xs text-gray-600">123, Spiritual Complex</p>
                                                    <p className="text-xs text-gray-600">Sector 62, Noida</p>
                                                    <p className="text-xs text-gray-600">Uttar Pradesh - 201309</p>
                                                    <p className="text-xs text-gray-600 mt-1"><span className="text-xs font-semibold">GSTIN:</span> 09ABCDE1234F1Z5</p>
                                                    <p className="text-xs text-gray-600"><span className="text-xs font-semibold">PAN:</span> ABCDE1234F</p>
                                                </td>

                                                <td className="w-1/3 align-top text-center">
                                                    <p className="font-semibold text-amber-700 mb-1">Place of Supply:</p>
                                                    <p className="text-xs text-gray-600">Uttar Pradesh</p>
                                                    <p className="text-xs text-gray-600">State Code: 09</p>
                                                </td>

                                                <td className="w-1/3 align-top text-end">
                                                    <div className="inline-block border border-gray-200 p-1 rounded">
                                                        <div className="w-[100px] h-[100px] bg-gray-100 flex items-center justify-center text-[6px] text-gray-400">
                                                            <div className="text-center">
                                                                <QRCode
                                                                    value={`http://localhost:8080/user/dashboard/invoice/${data.id}`}
                                                                    size={90}
                                                                />
                                                            </div>
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
                                    <hr className="my-2 border-t border-gray-200" />
                                </td>
                            </tr>

                            {/* ================= BILLING & SHIPPING ================= */}
                            <tr>
                                <td className="p-4 w-1/2 border-r border-gray-200 align-top">
                                    <p className="font-semibold text-amber-700 mb-2 flex items-center gap-1 ">
                                        <span className="w-1 h-4 bg-amber-500 rounded-full "></span>
                                        Billing Address:
                                    </p>
                                    <p className="font-medium">{invoiceOrder.customerName}</p>
                                    <p className="text-xs text-gray-600">{invoiceOrder.location || 'Address not available'}</p>
                                    <p className="text-xs text-gray-600">Uttar Pradesh - 201301</p>
                                    <p className="text-xs text-gray-600">Phone: +91 98765 43210</p>
                                </td>

                                <td className="p-4 w-1/2 align-top">
                                    <p className="font-semibold text-amber-700 mb-2 flex items-center gap-1 ">
                                        <span className="w-1 h-4 bg-amber-500 rounded-full "></span>
                                        Shipping Address:
                                    </p>
                                    <p className="font-medium">{invoiceOrder.customerName}</p>
                                    <p className="text-xs text-gray-600">{invoiceOrder.location || 'Address not available'}</p>
                                    <p className="text-xs text-gray-600">Uttar Pradesh - 201301</p>
                                    <p className="text-xs text-gray-600">Same as Billing Address</p>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2">
                                    <hr className="my-2 border-t border-gray-200" />
                                </td>
                            </tr>

                            {/* ================= ORDER INFO ================= */}
                            <tr>
                                <td className="px-4 py-2 align-top w-1/2">
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td className="text-xs text-gray-500">Order ID:</td>
                                                <td className="text-xs font-medium">{invoiceOrder.id}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-xs text-gray-500">Invoice No:</td>
                                                <td className="text-xs font-medium">{invoiceNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-xs text-gray-500">Order Date:</td>
                                                <td className="text-xs font-medium">{invoiceOrder.date}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-xs text-gray-500">Order Time:</td>
                                                <td className="text-xs font-medium">{invoiceOrder.time}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>

                                <td className="px-4 py-2 align-top w-1/2">
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td className="text-xs text-gray-500">Service Type:</td>
                                                <td className="text-xs font-medium capitalize">{invoiceOrder.type}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-xs text-gray-500">Priest:</td>
                                                <td className="text-xs font-medium">{invoiceOrder.priest}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-xs text-gray-500">Invoice Date:</td>
                                                <td className="text-xs font-medium">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-xs text-gray-500">Due Date:</td>
                                                <td className="text-xs font-medium">{invoiceOrder.paymentStatus === 'paid' ? 'Paid' : 'Upon Receipt'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2">
                                    <hr className="my-2 border-t border-gray-200" />
                                </td>
                            </tr>

                            {/* ================= ITEM TABLE ================= */}
                            <tr>
                                <td colSpan="2" className="px-4 py-2">
                                    <p className="font-semibold text-amber-700 mb-2 flex items-center gap-1 ">
                                        <span className="w-1 h-4 bg-amber-500 rounded-full "></span>
                                        Item Details:
                                    </p>

                                    <table className="w-full border border-gray-300 border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-amber-50">
                                                <th className="border p-2 text-left text-xs font-semibold text-gray-700">#</th>
                                                <th className="border p-2 text-left text-xs font-semibold text-gray-700">Item / Service</th>
                                                <th className="border p-2 text-center text-xs font-semibold text-gray-700">Qty</th>
                                                <th className="border p-2 text-right text-xs font-semibold text-gray-700">Unit Price (₹)</th>
                                                <th className="border p-2 text-right text-xs font-semibold text-gray-700">Total (₹)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoiceOrder.category === "service" ? ( 
                                                <>
                                                    <tr className="hover:bg-gray-50">
                                                        <td className="border p-2 text-center text-xs">1</td>
                                                        <td className="border p-2 text-xs">{invoiceOrder.serviceName}</td>
                                                        <td className="border p-2 text-center text-xs">{invoiceOrder.quantity}</td>
                                                        <td className="border p-2 text-right text-xs">{formatCurrency(invoiceOrder.amount).replace('₹', '')}</td>
                                                        <td className="border p-2 text-right text-xs">{formatCurrency(invoiceOrder.amount * 1).replace('₹', '')}</td>
                                                    </tr>
                                                </>
                                            ) : ( 
                                                <>
                                                    {invoiceOrder.items?.map((item, index) => (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="border p-2 text-center text-xs">{index + 1}</td>
                                                            <td className="border p-2 text-xs">{item.name} </td>
                                                            <td className="border p-2 text-center text-xs">{item.quantity}</td>
                                                            <td className="border p-2 text-right text-xs">{formatCurrency(item.price).replace('₹', '')}</td>
                                                            <td className="border p-2 text-right text-xs">{formatCurrency(item.price * item.quantity).replace('₹', '')}</td>
                                                        </tr>
                                                    ))}
                                                </>
                                            )}

                                            {/* Subtotal Row */}
                                            <tr className="bg-gray-50">
                                                <td colSpan="4" className="border p-2 text-right text-xs font-medium">
                                                    Subtotal:
                                                </td>
                                                <td className="border p-2 text-right text-xs font-medium">
                                                    {formatCurrency(subtotal).replace('₹', '')}
                                                </td>
                                            </tr>

                                            {/* GST Row */}
                                            <tr>
                                                <td colSpan="4" className="border p-2 text-right text-xs">
                                                    GST (18%):
                                                </td>
                                                <td className="border p-2 text-right text-xs">
                                                    {formatCurrency(gstAmount).replace('₹', '')}
                                                </td>
                                            </tr>

                                            {/* Grand Total Row */}
                                            <tr className="bg-amber-50">
                                                <td colSpan="4" className="border p-2 text-right text-xs font-bold">
                                                    Grand Total:
                                                </td>
                                                <td className="border p-2 text-right text-xs font-bold text-amber-700">
                                                    {formatCurrency(grandTotal).replace('₹', '')}
                                                </td>
                                            </tr>

                                            {/* Amount in Words */}
                                            <tr>
                                                <td colSpan="5" className="border p-2 text-xs text-gray-600 italic">
                                                    Amount in words: {convertNumberToWords(grandTotal)} Rupees only
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2">
                                    <hr className="my-2 border-t border-gray-200" />
                                </td>
                            </tr>

                            {/* ================= PAYMENT SUMMARY ================= */}
                            <tr>
                                <td className="px-4 py-2 align-top w-1/2">
                                    <p className="font-semibold text-amber-700 mb-2 flex items-center gap-1 ">
                                        <span className="w-1 h-4 bg-amber-500 rounded-full "></span>
                                        Payment Summary:
                                    </p>
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td className="text-xs text-gray-600 py-1">Subtotal:</td>
                                                <td className="text-xs text-right font-medium">{formatCurrency(subtotal)}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-xs text-gray-600 py-1">GST (18%):</td>
                                                <td className="text-xs text-right font-medium">{formatCurrency(gstAmount)}</td>
                                            </tr>
                                            <tr className="border-t border-gray-200">
                                                <td className="text-xs font-bold py-1">Grand Total:</td>
                                                <td className="text-xs font-bold text-right text-amber-700">{formatCurrency(grandTotal)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>

                                <td className="px-4 py-2 align-top w-1/2">
                                    <p className="font-semibold text-amber-700 mb-2 flex items-center gap-1 ">
                                        <span className="w-1 h-4 bg-amber-500 rounded-full "></span>
                                        Transaction Details:
                                    </p>
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td className="text-xs text-gray-600 py-1">Payment Method:</td>
                                                <td className="text-xs font-medium text-right">{invoiceOrder.paymentMethod}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-xs text-gray-600 py-1">Transaction ID:</td>
                                                <td className="text-xs font-medium text-right">TXN{invoiceOrder.id}123</td>
                                            </tr>
                                            <tr>
                                                <td className="text-xs text-gray-600 py-1">Payment Status:</td>
                                                <td className="text-xs text-right">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                        invoiceOrder.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                                                        invoiceOrder.paymentStatus === 'pending' ? 'bg-amber-50 text-amber-600' :
                                                        'bg-red-50 text-red-600'
                                                    }`}>
                                                        {invoiceOrder.paymentStatus?.toUpperCase()}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-xs text-gray-600 py-1">Payment Date:</td>
                                                <td className="text-xs font-medium text-right">{invoiceOrder.paymentStatus === 'paid' ? invoiceOrder.date : 'Pending'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2">
                                    <hr className="my-4 border-t-2 border-amber-200" />
                                </td>
                            </tr>

                            {/* ================= FOOTER ================= */}
                            <tr>
                                <td colSpan="2" className="text-center text-gray-500 px-4 py-2">
                                    <p className="text-xs">This is a computer-generated invoice and does not require a physical signature.</p>
                                    <div className="flex justify-center items-center gap-4 mt-2 text-[10px] flex-wrap">
                                        <span>Terms & Conditions Apply</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span>Subject to Noida Jurisdiction</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span>Thank you for your business!</span>
                                    </div>
                                    <p className="text-[10px] mt-2 text-gray-400">For any queries, contact support@acharyaji.com or call +91 98765 43210</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Print Styles - FIXED: Removed 'jsx' attribute */}
                    <style>{`
                        @media print {
                            body { background: white; }
                            .no-print { display: none; }
                            .print\\:shadow-none { box-shadow: none; }
                            .bg-gray-300 { background: white; }
                        }
                    `}</style>
                </div>
            </div>
        </div>
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

export default ViewInvoice;