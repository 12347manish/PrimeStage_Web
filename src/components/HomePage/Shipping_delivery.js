import React from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingsAndPerformancePage = () => {
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
            <Calendar className="h-5 w-5 mr-2 text-gray-600" />
            <h1 className="text-xl font-medium">Bookings & Performances</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold">Booking and Performance Policy</h2>
            <p className="text-gray-500 text-sm mt-1">Last updated: March 2025</p>
          </div>
          
          <div className="px-6 py-4">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-medium mb-2">1. Booking Process</h3>
                <p className="text-gray-700">
                  At PRIMESTAGE, we connect event organizers with talented artists for memorable performances. This policy outlines our booking procedures, confirmation process, and important information to ensure a smooth experience for both parties.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">2. Artist Booking Options</h3>
                <p className="text-gray-700"><strong>Standard Booking:</strong> Book an artist 14+ days in advance with standard cancellation policies. A 25% deposit is required to secure the booking.</p>
                <p className="text-gray-700 mt-2"><strong>Express Booking:</strong> Last-minute bookings (7-14 days before event) may incur additional fees and have stricter cancellation policies. A 50% deposit is required.</p>
                <p className="text-gray-700 mt-2"><strong>Premium Experience:</strong> Includes additional services like custom setlists, extended performance time, or special requests. Pricing varies based on artist and requirements.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">3. Booking Confirmation</h3>
                <p className="text-gray-700"><strong>Processing Time:</strong> Booking requests are typically processed within 24-48 hours. The artist has 48 hours to accept or decline your booking request.</p>
                <p className="text-gray-700 mt-2"><strong>Confirmation:</strong> You will receive a booking confirmation email once the artist accepts your request. This email includes all performance details and contact information.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">4. Performance Fees</h3>
                <p className="text-gray-700"><strong>Base Performance Fee:</strong> Each artist sets their own base fee for performances. This fee depends on factors such as duration, event type, and popularity of the artist.</p>
                <p className="text-gray-700 mt-2"><strong>Additional Costs:</strong> Travel expenses, accommodation (for distant venues), equipment rental, and additional band members may incur extra charges. All additional costs will be clearly outlined before confirmation.</p>
                <p className="text-gray-700 mt-2"><strong>Service Fee:</strong> PRIMESTAGE charges a service fee of 15% on all bookings, which covers platform maintenance, customer support, and payment processing.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">5. Tracking Your Booking</h3>
                <p className="text-gray-700"><strong>Booking Status:</strong> You can track the status of your booking in your account dashboard under "My Bookings." Status updates include: Pending, Confirmed, In Progress, and Completed.</p>
                <p className="text-gray-700 mt-2"><strong>Communication:</strong> Our platform provides a messaging system to communicate directly with the artist after booking confirmation. All communication should be done through our platform for record-keeping purposes.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">6. Event Details</h3>
                <p className="text-gray-700"><strong>Venue Information:</strong> It is your responsibility to provide accurate and complete venue details, including address, stage dimensions, available equipment, and venue restrictions.</p>
                <p className="text-gray-700 mt-2"><strong>Technical Requirements:</strong> Each artist profile lists their technical requirements. Organizers must ensure these requirements are met or make alternative arrangements with the artist before the event.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">7. Booking Restrictions</h3>
                <p className="text-gray-700"><strong>Location Restrictions:</strong> Some artists may only perform within certain geographical areas or may require additional compensation for travel beyond their specified radius.</p>
                <p className="text-gray-700 mt-2"><strong>Event Type Restrictions:</strong> Artists may have restrictions on the types of events they perform at. These restrictions will be clearly noted on their profile page.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">8. Cancellations and Changes</h3>
                <p className="text-gray-700"><strong>Organizer Cancellation:</strong> If you cancel more than 14 days before the event, you will receive a 75% refund. Cancellations within 7-14 days receive a 50% refund. Cancellations less than 7 days before the event are non-refundable.</p>
                <p className="text-gray-700 mt-2"><strong>Artist Cancellation:</strong> If an artist cancels, you will receive a full refund. We will also assist you in finding a replacement artist if desired.</p>
                <p className="text-gray-700 mt-2"><strong>Rescheduling:</strong> Rescheduling requests must be made at least 7 days before the event and are subject to artist availability.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">9. Performance Standards</h3>
                <p className="text-gray-700"><strong>Artist Responsibilities:</strong> Artists are expected to arrive at least 60 minutes before their scheduled performance time, perform the agreed-upon set duration, and maintain professional conduct throughout the event.</p>
                <p className="text-gray-700 mt-2"><strong>Performance Quality:</strong> While we curate quality artists on our platform, PRIMESTAGE does not guarantee subjective satisfaction with any performance. We encourage reviewing artist samples before booking.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">10. Special Requests</h3>
                <p className="text-gray-700"><strong>Custom Requirements:</strong> Special requests such as specific songs, attire, or performance elements should be discussed and agreed upon with the artist before confirming the booking.</p>
                <p className="text-gray-700 mt-2"><strong>Equipment Provision:</strong> Clear agreements about who provides what equipment should be established during the booking process. Any changes must be communicated and confirmed in writing through our platform.</p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">11. Emergency Situations</h3>
                <p className="text-gray-700">
                  In case of unavoidable circumstances such as severe weather events, artist illness, or other emergencies, both parties should communicate promptly. Our support team is available to assist with resolving such situations, including finding replacement artists when possible.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">12. Contact Information</h3>
                <p className="text-gray-700">
                  If you have any questions about our booking and performance policies or need assistance with a specific booking, please contact our customer support team:
                </p>
                <p className="text-gray-700 mt-2">
                  Email: bookings@primestage.in<br />
                  Phone: +91 98765 43210<br />
                  Customer Support Hours: Monday to Saturday, 10:00 AM to 7:00 PM IST
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

export default BookingsAndPerformancePage;