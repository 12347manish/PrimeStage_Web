import React from 'react';
import { ArrowLeft, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RefundPolicyPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <button className="p-2 mr-4 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => navigate(-1)} >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <IndianRupee className="h-5 w-5 mr-2 text-gray-600" />
            <h1 className="text-xl font-medium">Refund Policy</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold">Refund Policy</h2>
            <p className="text-gray-500 text-sm mt-1">Last updated: February 2025</p>
          </div>
          
          <div className="px-6 py-4">
            <div className="text-gray-700 mb-6">
              <p>
                At PRIMESTAGE LIVE PVT LTD, we value customer satisfaction and aim to ensure a seamless experience for both users and artists. 
                Our refund policy outlines the terms and conditions for canceling a booking and requesting a refund. 
                Please read this policy carefully before making any bookings on our platform.
              </p>
            </div>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-medium mb-2">1. Refund Eligibility</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">Full Refund:</span> You are eligible for a full refund if the booking is canceled more than 36 hours before the scheduled performance. This includes the full amount of the booking fee, but taxes will not be refunded.
                  </li>
                  <li>
                    <span className="font-medium">70% Refund:</span> If the booking is canceled between 36 and 24 hours before the performance, 70% of the booking fee will be refunded. Taxes will not be refunded.
                  </li>
                  <li>
                    <span className="font-medium">50% Refund:</span> If the booking is canceled between 24 and 12 hours before the performance, 50% of the booking fee will be refunded. Taxes will not be refunded.
                  </li>
                  <li>
                    <span className="font-medium">No Refund:</span> Cancellations made less than 12 hours before the performance will not be eligible for a refund.
                  </li>
                  <li>
                    <span className="font-medium">Artist Cancellation:</span> If the artist cancels the booking at any time, you are eligible for a complete refund, including taxes.
                  </li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">2. Non-Refundable Taxes</h3>
                <p className="text-gray-700">
                  Please note that any applicable taxes charged at the time of booking will not be refunded for user-initiated cancellations, regardless of when the cancellation is made.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">3. Payment Processing</h3>
                <p className="text-gray-700">
                  Refunds will be processed within 5 business days of the cancellation request. The refund will be credited to the original payment method used during the booking process.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">4. Bank and Payment Gateway Issues</h3>
                <p className="text-gray-700">
                  We are not liable for any delays, errors, or issues caused by bank-side errors or payment gateway malfunctions. If we do not receive the payment or experience errors outside of our control, we cannot process the refund.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">5. How to Request a Refund</h3>
                <p className="text-gray-700">
                  To cancel a booking and request a refund, please follow these steps:
                </p>
                <ol className="list-decimal pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Log in to your account on the PrimeStage app.</li>
                  <li>Go to your bookings and select the booking you want to cancel.</li>
                  <li>Follow the on-screen instructions to cancel the booking. The applicable refund amount will be automatically calculated based on the time of cancellation.</li>
                </ol>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">6. Changes to Refund Policy</h3>
                <p className="text-gray-700">
                  We reserve the right to modify or amend this refund policy at any time. Any changes to the policy will be communicated to users via email or in-app notifications. Continued use of the app after changes to the policy implies acceptance of the updated terms.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">7. Contact Information</h3>
                <p className="text-gray-700">
                  If you have any questions or concerns about your refund, please contact our customer support team at:
                </p>
                <p className="text-gray-700 mt-2">
                  Email: support@primestage.in<br />
                  Phone: 9588179288
                </p>
              </section>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-blue-800 font-medium text-lg mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Important Note
          </h3>
          <p className="text-blue-700">
            For faster processing of your refund request, please ensure that you cancel your booking through the app following the steps mentioned above. 
            This will automatically trigger the refund process based on our policy guidelines.
          </p>
        </div>
        
        <div className="text-center text-gray-500 text-sm pb-8">
          <p>© 2025 PRIMESTAGE LIVE PVT LTD. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default RefundPolicyPage;