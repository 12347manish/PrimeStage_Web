// demo-booking-data.js
const demoBookings = [
    {
      id: "BK-001",
      customerName: "John Smith",
      customerEmail: "john.smith@example.com",
      customerPhone: "+1 (555) 123-4567",
      date: "2025-04-10",
      time: "09:00 AM",
      duration: 60, // in minutes
      service: "Consultation",
      status: "confirmed",
      notes: "First-time client, needs comprehensive overview",
      paymentStatus: "paid",
      amount: 150.00,
      createdAt: "2025-04-01T14:23:10Z"
    },
    {
      id: "BK-002",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.j@example.com",
      customerPhone: "+1 (555) 987-6543",
      date: "2025-04-10",
      time: "11:30 AM",
      duration: 45, // in minutes
      service: "Follow-up",
      status: "confirmed",
      notes: "Second session, focus on progress review",
      paymentStatus: "pending",
      amount: 75.00,
      createdAt: "2025-04-02T09:12:45Z"
    },
    {
      id: "BK-003",
      customerName: "Michael Wong",
      customerEmail: "mwong@example.com",
      customerPhone: "+1 (555) 234-5678",
      date: "2025-04-11",
      time: "02:00 PM",
      duration: 90, // in minutes
      service: "Extended Session",
      status: "pending",
      notes: "Requires specialized equipment",
      paymentStatus: "unpaid",
      amount: 225.00,
      createdAt: "2025-04-02T16:45:22Z"
    },
    {
      id: "BK-004",
      customerName: "Emily Rodriguez",
      customerEmail: "e.rodriguez@example.com",
      customerPhone: "+1 (555) 345-6789",
      date: "2025-04-12",
      time: "10:00 AM",
      duration: 60, // in minutes
      service: "Standard Session",
      status: "cancelled",
      notes: "Client requested cancellation due to illness",
      paymentStatus: "refunded",
      amount: 150.00,
      createdAt: "2025-04-03T11:32:08Z",
      cancelledAt: "2025-04-08T09:15:30Z"
    },
    {
      id: "BK-005",
      customerName: "David Lee",
      customerEmail: "david.lee@example.com",
      customerPhone: "+1 (555) 456-7890",
      date: "2025-04-12",
      time: "03:30 PM",
      duration: 30, // in minutes
      service: "Quick Check-in",
      status: "confirmed",
      notes: "Brief follow-up from last month's session",
      paymentStatus: "paid",
      amount: 50.00,
      createdAt: "2025-04-03T14:56:10Z"
    },
    {
      id: "BK-006",
      customerName: "Olivia Martinez",
      customerEmail: "olivia.m@example.com",
      customerPhone: "+1 (555) 567-8901",
      date: "2025-04-14",
      time: "01:00 PM",
      duration: 120, // in minutes
      service: "Premium Consultation",
      status: "confirmed",
      notes: "New client, comprehensive assessment needed",
      paymentStatus: "partial",
      amount: 300.00,
      amountPaid: 150.00,
      createdAt: "2025-04-04T08:23:45Z"
    },
    {
      id: "BK-007",
      customerName: "James Wilson",
      customerEmail: "jwilson@example.com",
      customerPhone: "+1 (555) 678-9012",
      date: "2025-04-15",
      time: "11:00 AM",
      duration: 60, // in minutes
      service: "Standard Session",
      status: "rescheduled",
      notes: "Rescheduled from April 9th",
      paymentStatus: "paid",
      amount: 150.00,
      createdAt: "2025-03-30T13:42:18Z",
      originalDate: "2025-04-09",
      originalTime: "10:00 AM"
    },
    {
      id: "BK-008",
      customerName: "Sophia Kim",
      customerEmail: "sophia.kim@example.com",
      customerPhone: "+1 (555) 789-0123",
      date: "2025-04-15",
      time: "04:00 PM",
      duration: 45, // in minutes
      service: "Follow-up",
      status: "confirmed",
      notes: "Third session in treatment plan",
      paymentStatus: "paid",
      amount: 75.00,
      createdAt: "2025-04-05T16:12:30Z"
    },
    {
      id: "BK-009",
      customerName: "Robert Taylor",
      customerEmail: "robert.t@example.com",
      customerPhone: "+1 (555) 890-1234",
      date: "2025-04-16",
      time: "09:30 AM",
      duration: 60, // in minutes
      service: "Consultation",
      status: "no-show",
      notes: "Client did not appear for appointment",
      paymentStatus: "charged",
      amount: 75.00, // 50% of full price
      createdAt: "2025-04-06T10:05:12Z"
    },
    {
      id: "BK-010",
      customerName: "Emma Davis",
      customerEmail: "emma.davis@example.com",
      customerPhone: "+1 (555) 901-2345",
      date: "2025-04-17",
      time: "02:30 PM",
      duration: 90, // in minutes
      service: "Extended Session",
      status: "pending",
      notes: "Waiting for confirmation from client",
      paymentStatus: "unpaid",
      amount: 225.00,
      createdAt: "2025-04-07T15:34:56Z"
    }
  ];
  
  export default demoBookings;