import React from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyPoliciesPage = () => {
      const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center" onClick={() => navigate(-1)}>
          <button className="p-2 mr-4 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-gray-600" />
            <h1 className="text-xl font-medium">Company Policies</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold">Privacy Policy</h2>
            <p className="text-gray-500 text-sm mt-1">Last updated: February 2025</p>
          </div>
          
          <div className="px-6 py-4">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-medium mb-2">1. Introduction</h3>
                <p className="text-gray-700">
                  PRIMESTAGE LIVE PVT LMT (hereinafter referred to as "we," "our," or "us") operates an online platform through a mobile application that connects users with artists for private, corporate, and public events. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our app.
                </p>
                <p className="text-gray-700 mt-2">
                  By using our app, you consent to the practices described in this policy.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">2. Information We Collect</h3>
                <p className="text-gray-700">
                  We may collect and process the following categories of personal data from you:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Personal Identification Information: Name, phone number, email address, physical address, and location.</li>
                  <li>Financial Information: For artists, we collect bank account details to facilitate payment transfers.</li>
                  <li>Event Details: Information related to your booking preferences, such as the event date, location, and artist selection.</li>
                  <li>Device Information: Data related to the device you use to access our app (e.g., IP address, browser type, device ID).</li>
                  <li>Cookies: We use cookies and similar tracking technologies to personalize advertisements, analyze user behavior, and offer tailored services. You can manage cookie preferences through your device settings.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">3. Use of Information</h3>
                <p className="text-gray-700">
                  We use the collected data for the following purposes:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>To provide services: This includes processing bookings, managing user accounts, and communicating with you regarding your bookings and inquiries.</li>
                  <li>For payment processing: Artists' financial information is used solely for transferring payments. We do not store or access your financial data except as required for the transfer.</li>
                  <li>To improve user experience: Your data helps us optimize our app, offer tailored recommendations, and improve service quality.</li>
                  <li>For marketing purposes: We may use your data to show advertisements based on your interests and preferences. This includes both in-app advertisements and external advertising channels.</li>
                  <li>To comply with legal obligations: We may use your information to meet legal or regulatory requirements.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">4. Cookies and Tracking Technologies</h3>
                <p className="text-gray-700">
                  We use cookies to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Track user activity within the app to analyze usage patterns.</li>
                  <li>Personalize and enhance your experience by delivering tailored advertisements.</li>
                  <li>Store preferences, such as language settings, and assist with login and authentication.</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  You can opt-out of personalized ads or tracking by adjusting your device or browser settings. However, doing so may limit certain functionalities of the app.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">5. Third-Party Services</h3>
                <p className="text-gray-700">
                  We utilize third-party services in some areas, particularly for payment processing and advertisement delivery. These services include but are not limited to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Payment Gateways: Your financial information may be shared with secure payment processors for completing transactions.</li>
                  <li>Analytics and Advertising: We use third-party analytics tools to track user behavior and offer personalized advertising. These tools collect information about your device, app usage, and engagement metrics.</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  We ensure that these third-party service providers comply with applicable data protection laws and protect your personal information.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">6. Data Sharing and Disclosure</h3>
                <p className="text-gray-700">
                  Your personal data is not shared, sold, or disclosed to any unauthorized third party. We only share information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>With your consent: We will seek your permission before sharing your personal data for any purpose not outlined in this policy.</li>
                  <li>Service Providers: Trusted partners involved in app operations (e.g., payment gateways, analytics providers) may access data solely to perform tasks on our behalf.</li>
                  <li>Legal Compliance: If required by law, regulation, or government request, we may disclose your data.</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">7. Data Security</h3>
                <p className="text-gray-700">
                  We take appropriate security measures to protect your personal data from unauthorized access, misuse, alteration, or destruction. This includes:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Encryption of sensitive data such as financial information.</li>
                  <li>Limiting access to personal data only to employees, contractors, and third-party service providers who need access to perform their duties.</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  Despite our efforts, no security system is impenetrable, and we cannot guarantee the complete security of your data. However, we regularly review and update our security protocols to mitigate risks.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">8. Data Retention</h3>
                <p className="text-gray-700">
                  We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Once your data is no longer needed, we securely delete or anonymize it.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">9. User Rights</h3>
                <p className="text-gray-700">
                  You have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Right to Access: You can request details of the personal data we hold about you.</li>
                  <li>Right to Rectification: You can update or correct your personal information.</li>
                  <li>Right to Deletion: You may request the deletion of your personal data, subject to legal and contractual restrictions.</li>
                  <li>Right to Object to Processing: You can object to certain data processing activities, such as direct marketing.</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  To exercise any of these rights, please contact us at support@primestage.in.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">10. In-App Advertisements</h3>
                <p className="text-gray-700">
                  We may show in-app advertisements in the future. These ads will be based on your interests and activity within the app. We use anonymized data for ad targeting and do not share any personally identifiable information with advertisers.
                </p>
                <p className="text-gray-700 mt-2">
                  You may opt out of receiving personalized ads through your app settings or by contacting us.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">11. Changes to the Privacy Policy</h3>
                <p className="text-gray-700">
                  We reserve the right to update or modify this Privacy Policy at any time. If we make significant changes, we will notify you via email or in-app notifications.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">12. Contact Us</h3>
                <p className="text-gray-700">
                  If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at:
                </p>
                <p className="text-gray-700 mt-2">
                  Email: support@primestage.in<br />
                  Address: Salogara, Solan Himachal Pradesh 173212
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

export default CompanyPoliciesPage;