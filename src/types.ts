export type UserRole = 'user' | 'admin';
export type SubscriptionPlan = 'free' | 'pro' | 'premium';

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  country: string;
  currency: string;
  timezone: string;
  photoURL?: string;
  role: UserRole;
  plan: SubscriptionPlan;
  createdAt: any;
  updatedAt: any;
}

export interface Income {
  id?: string;
  userId: string;
  title: string;
  amount: number;
  source: 'Salary' | 'Freelancing' | 'Business' | 'Investments' | 'Rental Income' | 'Other Income';
  category: string;
  date: string;
  paymentMethod: 'Cash' | 'Bank transfer' | 'Debit card' | 'Credit card' | 'Mobile wallet';
  description?: string;
  recurringFrequency: 'None' | 'Weekly' | 'Monthly' | 'Yearly';
  createdAt?: any;
}

export interface Expense {
  id?: string;
  userId: string;
  title: string;
  amount: number;
  category: 'Food' | 'Grocery' | 'Transport' | 'Shopping' | 'Education' | 'Medical' | 'Rent' | 'Electricity' | 'Internet' | 'Entertainment' | 'Travel' | 'Other';
  date: string;
  paymentMethod: 'Cash' | 'Bank transfer' | 'Debit card' | 'Credit card' | 'Mobile wallet';
  description?: string;
  recurringFrequency: 'None' | 'Weekly' | 'Monthly' | 'Yearly';
  createdAt?: any;
}

export interface Budget {
  id?: string;
  userId: string;
  category: string;
  limitAmount: number;
  month: string; // Format: "YYYY-MM"
  alertThreshold75: boolean;
  alertThreshold90: boolean;
  alertThreshold100: boolean;
  createdAt?: any;
}

export interface SavingsGoal {
  id?: string;
  userId: string;
  goalName: string;
  description?: string;
  targetAmount: number;
  currentSavedAmount: number;
  targetDate: string;
  monthlyContribution: number;
  category: string;
  createdAt?: any;
}

export interface SavingsContribution {
  id?: string;
  userId: string;
  goalId: string;
  amount: number;
  date: string;
  note?: string;
  createdAt?: any;
}

export interface NotificationItem {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: 'warning' | 'success' | 'info' | 'danger';
  isRead: boolean;
  createdAt: any;
}

export interface FinancialInsight {
  id?: string;
  userId: string;
  title: string;
  description: string;
  category: 'spending' | 'savings' | 'budget' | 'behavior';
  severity: 'low' | 'medium' | 'high';
  createdAt: any;
}

export interface ChatMessage {
  id?: string;
  sessionId: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: any;
}

export interface ChatSession {
  id?: string;
  userId: string;
  title: string;
  createdAt: any;
}

export interface SupportTicket {
  id?: string;
  userId: string;
  userEmail: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  adminReply?: string;
  createdAt: any;
}

export interface AuditLog {
  id?: string;
  userId: string;
  userEmail: string;
  action: string;
  details: string;
  ipAddress?: string;
  createdAt: any;
}
