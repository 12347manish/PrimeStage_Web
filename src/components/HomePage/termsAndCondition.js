import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditionsPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <button 
            className="p-2 mr-4 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-gray-600" />
            <h1 className="text-xl font-medium">Terms & Conditions</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold">Terms and Conditions</h2>
            <p className="text-gray-500 text-sm mt-1">Last updated: February 2025</p>
          </div>
          
          <div className="px-6 py-4">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-medium mb-2">1. Introduction</h3>
                <p className="text-gray-700">
                  Welcome to PRIMESTAGE LIVE PVT LMT. By using our app, you agree to these Terms and Conditions. Please read them carefully before using our services. If you do not agree with any part of these terms, you must not use our app.
                </p>
                <p className="text-gray-700 mt-2">
                  These Terms and Conditions govern your access to and use of our app, which provides a platform for users to book artists for private, corporate, and public events.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">2. Definitions</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>"App" refers to PRIMESTAGE, including the website, mobile application, and associated services.</li>
                  <li>"User" refers to any individual using the app, including event organizers and artists.</li>
                  <li>"Artist" refers to performers or entertainers listed on our platform available for booking.</li>
                  <li>"Booking" refers to a confirmed agreement between a user and an artist for services to be rendered at an event.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">3. Use of the Platform</h3>
                <p className="text-gray-700"><strong>Eligibility:</strong> You must be at least 8 years old to use our app. By accessing the app, you confirm that you are of legal age to form a binding contract.</p>
                <p className="text-gray-700 mt-2"><strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your login credentials and ensuring all information provided is accurate and up to date.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">4. Artist Listings and Bookings</h3>
                <p className="text-gray-700"><strong>Artist Profiles:</strong> Artists provide information such as their names, contact details, and performance descriptions. We do not guarantee the accuracy or completeness of this information.</p>
                <p className="text-gray-700 mt-2"><strong>Bookings:</strong> Users are responsible for ensuring the event details are correct before confirming a booking. Once a booking is confirmed, a binding contract is formed between the user and the artist. We are not a party to this contract.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">5. User and Artist Conduct</h3>
                <p className="text-gray-700"><strong>Behavioral Standards:</strong> All users and artists are expected to behave professionally and respectfully during their interactions, including communication and live events. We do not take responsibility for any inappropriate, unlawful, or unprofessional behavior of either party.</p>
                <p className="text-gray-700 mt-2"><strong>Disputes:</strong> Any disputes between users and artists must be resolved between the respective parties. We may assist in resolving disputes but are not legally responsible for outcomes.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">6. Payments and Fees</h3>
                <p className="text-gray-700"><strong>Payment Process:</strong> Payments for artist bookings are processed via third-party payment gateways. By making a booking, you agree to pay the agreed-upon fees.</p>
                <p className="text-gray-700 mt-2"><strong>Refunds and Cancellations:</strong> Cancellation policies and refund eligibility vary depending on the artist and the specific booking. Users are responsible for reading and understanding the artist's cancellation terms before booking.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">7. Third-Party Services</h3>
                <p className="text-gray-700"><strong>Payment Gateways and Advertisements:</strong> We use third-party services for payment processing and advertisement delivery. We are not responsible for the performance or security of these third-party services.</p>
                <p className="text-gray-700 mt-2"><strong>Links to External Sites:</strong> Our app may contain links to external websites or services not operated by us. We are not responsible for the content, policies, or practices of any third-party services.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">8. Liability Disclaimer</h3>
                <p className="text-gray-700"><strong>No Guarantees:</strong> We provide the platform on an "as-is" basis and make no warranties, express or implied, regarding the availability, accuracy, or reliability of the services provided by artists or the app itself.</p>
                <p className="text-gray-700 mt-2"><strong>Limited Liability:</strong> To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app, including, but not limited to, disputes between users and artists, loss of revenue, or harm caused by an artist or user.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">9. Disclaimers Regarding User and Artist Behavior</h3>
                <p className="text-gray-700"><strong>No Liability for Behavior:</strong> We are not responsible for the behavior, actions, or omissions of users or artists. This includes, but is not limited to, inappropriate conduct, cancellations, failure to perform, or other disruptions at events.</p>
                <p className="text-gray-700 mt-2"><strong>Background Checks:</strong> We do not conduct background checks on artists or users. You are responsible for performing your own due diligence when booking or engaging with any individual on the platform.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">10. Intellectual Property Rights</h3>
                <p className="text-gray-700"><strong>Ownership:</strong> All content and materials on the app, including logos, design, and text, are our intellectual property and may not be used without prior written permission.</p>
                <p className="text-gray-700 mt-2"><strong>User-Generated Content:</strong> Any content provided by users (e.g., reviews or feedback) remains the property of the user, but by submitting it to our app, you grant us a non-exclusive, royalty-free license to use, display, and distribute the content.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">11. Termination of Accounts</h3>
                <p className="text-gray-700">
                  We reserve the right to terminate or suspend your account at our sole discretion if you violate any terms of this agreement or engage in unlawful or inappropriate behavior on the platform.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">12. Amendments to Terms and Conditions</h3>
                <p className="text-gray-700">
                  We reserve the right to update or modify these Terms and Conditions at any time. If changes are made, we will notify users via email or app notifications. Continued use of the app following such changes will constitute acceptance of the new terms.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">13. Governing Law and Jurisdiction</h3>
                <p className="text-gray-700">
                  These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Solan, Himachal Pradesh, India.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">14. Contact Information</h3>
                <p className="text-gray-700">
                  If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <p className="text-gray-700 mt-2">
                  Email: support@primestage.in<br />
                  Address: Salogara, Solan, Himachal Pradesh 173212
                </p>
              </section>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm pb-8">
          <p>© 2025 PRIMESTAGE LIVE PVT LTD. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditionsPage;