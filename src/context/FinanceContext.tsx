import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  db, 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from '../firebase';
import { useAuth } from './AuthContext';
import { 
  Income, 
  Expense, 
  Budget, 
  SavingsGoal, 
  SavingsContribution, 
  NotificationItem, 
  FinancialInsight, 
  ChatSession, 
  ChatMessage 
} from '../types';

interface FinanceContextType {
  incomes: Income[];
  expenses: Expense[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  notifications: NotificationItem[];
  insights: FinancialInsight[];
  chatSessions: ChatSession[];
  currentChatMessages: ChatMessage[];
  activeSessionId: string | null;
  loadingData: boolean;
  
  // CRUD Income
  addIncome: (income: Omit<Income, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  updateIncome: (id: string, income: Partial<Income>) => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;

  // CRUD Expense
  addExpense: (expense: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  updateExpense: (id: string, expense: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;

  // CRUD Budget
  saveBudget: (budget: Omit<Budget, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;

  // CRUD Savings
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  updateSavingsGoal: (id: string, goal: Partial<SavingsGoal>) => Promise<void>;
  deleteSavingsGoal: (id: string) => Promise<void>;
  contributeToGoal: (goalId: string, amount: number, note?: string) => Promise<void>;

  // Notifications
  markNotificationRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;

  // AI & Chat
  generateAIInsights: () => Promise<void>;
  createChatSession: (title: string) => Promise<string>;
  setActiveSessionId: (id: string | null) => void;
  sendChatMessage: (text: string) => Promise<void>;
  deleteChatSession: (sessionId: string) => Promise<void>;

  refreshData: () => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType>({
  incomes: [],
  expenses: [],
  budgets: [],
  savingsGoals: [],
  notifications: [],
  insights: [],
  chatSessions: [],
  currentChatMessages: [],
  activeSessionId: null,
  loadingData: false,
  addIncome: async () => {},
  updateIncome: async () => {},
  deleteIncome: async () => {},
  addExpense: async () => {},
  updateExpense: async () => {},
  deleteExpense: async () => {},
  saveBudget: async () => {},
  deleteBudget: async () => {},
  addSavingsGoal: async () => {},
  updateSavingsGoal: async () => {},
  deleteSavingsGoal: async () => {},
  contributeToGoal: async () => {},
  markNotificationRead: async () => {},
  deleteNotification: async () => {},
  generateAIInsights: async () => {},
  createChatSession: async () => '',
  setActiveSessionId: () => {},
  sendChatMessage: async () => {},
  deleteChatSession: async () => {},
  refreshData: async () => {},
});

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentChatMessages, setCurrentChatMessages] = useState<ChatMessage[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  const refreshData = useCallback(async () => {
    if (!currentUser) {
      setIncomes([]);
      setExpenses([]);
      setBudgets([]);
      setSavingsGoals([]);
      setNotifications([]);
      setInsights([]);
      setChatSessions([]);
      setCurrentChatMessages([]);
      return;
    }

    setLoadingData(true);
    try {
      const uid = currentUser.uid;

      // Fetch Incomes
      const incSnap = await getDocs(collection(db, 'users', uid, 'incomes'));
      const incList = incSnap.docs.map(d => ({ id: d.id, ...d.data() } as Income));
      setIncomes(incList);

      // Fetch Expenses
      const expSnap = await getDocs(collection(db, 'users', uid, 'expenses'));
      const expList = expSnap.docs.map(d => ({ id: d.id, ...d.data() } as Expense));
      setExpenses(expList);

      // Fetch Budgets
      const budSnap = await getDocs(collection(db, 'users', uid, 'budgets'));
      const budList = budSnap.docs.map(d => ({ id: d.id, ...d.data() } as Budget));
      setBudgets(budList);

      // Fetch Savings Goals
      const savSnap = await getDocs(collection(db, 'users', uid, 'savingsGoals'));
      const savList = savSnap.docs.map(d => ({ id: d.id, ...d.data() } as SavingsGoal));
      setSavingsGoals(savList);

      // Fetch Notifications
      const notifSnap = await getDocs(collection(db, 'users', uid, 'notifications'));
      const notifList = notifSnap.docs.map(d => ({ id: d.id, ...d.data() } as NotificationItem));
      setNotifications(notifList);

      // Fetch Insights
      const insSnap = await getDocs(collection(db, 'users', uid, 'financialInsights'));
      const insList = insSnap.docs.map(d => ({ id: d.id, ...d.data() } as FinancialInsight));
      setInsights(insList);

      // Fetch Chat Sessions
      const chatSnap = await getDocs(query(collection(db, 'users', uid, 'chatSessions'), orderBy('createdAt', 'desc')));
      const chatList = chatSnap.docs.map(d => ({ id: d.id, ...d.data() } as ChatSession));
      setChatSessions(chatList);
      if (chatList.length > 0 && !activeSessionId) {
        setActiveSessionId(chatList[0].id || null);
      }

      // If completely empty, seed demo data for an amazing first experience!
      if (incList.length === 0 && expList.length === 0 && savList.length === 0) {
        await seedDemoData(uid);
        await refreshData();
      }

    } catch (err) {
      console.error('Error fetching financial data:', err);
    } finally {
      setLoadingData(false);
    }
  }, [currentUser]);

  const seedDemoData = async (uid: string) => {
    try {
      // Add default Incomes
      await addDoc(collection(db, 'users', uid, 'incomes'), {
        userId: uid,
        title: 'Monthly Salary',
        amount: 5500,
        source: 'Salary',
        category: 'Primary Job',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'Bank transfer',
        description: 'Tech Corp Monthly Salary',
        recurringFrequency: 'Monthly',
        createdAt: serverTimestamp()
      });
      await addDoc(collection(db, 'users', uid, 'incomes'), {
        userId: uid,
        title: 'Freelance UI Project',
        amount: 1200,
        source: 'Freelancing',
        category: 'Design',
        date: new Date(Date.now() - 5*86400000).toISOString().split('T')[0],
        paymentMethod: 'Mobile wallet',
        description: 'Dashboard UI design contract',
        recurringFrequency: 'None',
        createdAt: serverTimestamp()
      });

      // Add default Expenses
      await addDoc(collection(db, 'users', uid, 'expenses'), {
        userId: uid,
        title: 'Luxury Apartment Rent',
        amount: 1800,
        category: 'Rent',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'Bank transfer',
        description: 'Downtown monthly rent',
        recurringFrequency: 'Monthly',
        createdAt: serverTimestamp()
      });
      await addDoc(collection(db, 'users', uid, 'expenses'), {
        userId: uid,
        title: 'Whole Foods Market',
        amount: 340,
        category: 'Grocery',
        date: new Date(Date.now() - 2*86400000).toISOString().split('T')[0],
        paymentMethod: 'Credit card',
        description: 'Weekly organic groceries',
        recurringFrequency: 'None',
        createdAt: serverTimestamp()
      });
      await addDoc(collection(db, 'users', uid, 'expenses'), {
        userId: uid,
        title: 'Fine Dining & Coffee',
        amount: 210,
        category: 'Food',
        date: new Date(Date.now() - 3*86400000).toISOString().split('T')[0],
        paymentMethod: 'Credit card',
        description: 'Restaurants and cafes',
        recurringFrequency: 'None',
        createdAt: serverTimestamp()
      });
      await addDoc(collection(db, 'users', uid, 'expenses'), {
        userId: uid,
        title: 'Uber Rides & Transit',
        amount: 120,
        category: 'Transport',
        date: new Date(Date.now() - 4*86400000).toISOString().split('T')[0],
        paymentMethod: 'Mobile wallet',
        description: 'Monthly rideshare and metro',
        recurringFrequency: 'None',
        createdAt: serverTimestamp()
      });

      // Add default Savings Goal
      await addDoc(collection(db, 'users', uid, 'savingsGoals'), {
        userId: uid,
        goalName: 'MacBook Pro M3 Max',
        description: 'Upgrade for professional development & AI engineering',
        targetAmount: 3500,
        currentSavedAmount: 1400,
        targetDate: '2026-08-30',
        monthlyContribution: 500,
        category: 'Technology',
        createdAt: serverTimestamp()
      });
      await addDoc(collection(db, 'users', uid, 'savingsGoals'), {
        userId: uid,
        goalName: 'Emergency Fund',
        description: '6 months of living expenses',
        targetAmount: 15000,
        currentSavedAmount: 8500,
        targetDate: '2026-12-31',
        monthlyContribution: 1000,
        category: 'Savings',
        createdAt: serverTimestamp()
      });

      // Add default Budget
      const currentMonth = new Date().toISOString().slice(0, 7);
      await addDoc(collection(db, 'users', uid, 'budgets'), {
        userId: uid,
        category: 'Grocery',
        limitAmount: 500,
        month: currentMonth,
        alertThreshold75: true,
        alertThreshold90: true,
        alertThreshold100: true,
        createdAt: serverTimestamp()
      });
      await addDoc(collection(db, 'users', uid, 'budgets'), {
        userId: uid,
        category: 'Food',
        limitAmount: 400,
        month: currentMonth,
        alertThreshold75: true,
        alertThreshold90: true,
        alertThreshold100: true,
        createdAt: serverTimestamp()
      });

      // Add default Notification
      await addDoc(collection(db, 'users', uid, 'notifications'), {
        userId: uid,
        title: 'Welcome to SmartFin AI!',
        message: 'Your account has been successfully initialized with sample data. Explore your dashboard to track wealth.',
        type: 'success',
        isRead: false,
        createdAt: serverTimestamp()
      });

      // Add initial Chat Session
      const chatRef = await addDoc(collection(db, 'users', uid, 'chatSessions'), {
        userId: uid,
        title: 'Financial Strategy Chat',
        createdAt: serverTimestamp()
      });
      await addDoc(collection(db, 'users', uid, 'chatSessions', chatRef.id, 'messages'), {
        sessionId: chatRef.id,
        sender: 'ai',
        text: 'Hello! I am SmartFin AI Advisor. How can I help you optimize your budget and grow your wealth today?',
        timestamp: serverTimestamp()
      });

    } catch (err) {
      console.error('Error seeding demo data:', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, [currentUser, refreshData]);

  // Load chat messages when activeSessionId changes
  useEffect(() => {
    if (!currentUser || !activeSessionId) {
      setCurrentChatMessages([]);
      return;
    }
    const fetchMessages = async () => {
      try {
        const msgSnap = await getDocs(query(collection(db, 'users', currentUser.uid, 'chatSessions', activeSessionId, 'messages'), orderBy('timestamp', 'asc')));
        const msgs = msgSnap.docs.map(d => ({ id: d.id, ...d.data() } as ChatMessage));
        setCurrentChatMessages(msgs);
      } catch (err) {
        console.error('Error fetching chat messages:', err);
      }
    };
    fetchMessages();
  }, [currentUser, activeSessionId]);

  // CRUD Income
  const addIncome = async (inc: Omit<Income, 'id' | 'userId' | 'createdAt'>) => {
    if (!currentUser) return;
    await addDoc(collection(db, 'users', currentUser.uid, 'incomes'), {
      ...inc,
      userId: currentUser.uid,
      createdAt: serverTimestamp()
    });
    await refreshData();
  };

  const updateIncome = async (id: string, inc: Partial<Income>) => {
    if (!currentUser) return;
    await updateDoc(doc(db, 'users', currentUser.uid, 'incomes', id), inc);
    await refreshData();
  };

  const deleteIncome = async (id: string) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'incomes', id));
    await refreshData();
  };

  // CRUD Expense
  const addExpense = async (exp: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => {
    if (!currentUser) return;
    await addDoc(collection(db, 'users', currentUser.uid, 'expenses'), {
      ...exp,
      userId: currentUser.uid,
      createdAt: serverTimestamp()
    });
    await refreshData();
  };

  const updateExpense = async (id: string, exp: Partial<Expense>) => {
    if (!currentUser) return;
    await updateDoc(doc(db, 'users', currentUser.uid, 'expenses', id), exp);
    await refreshData();
  };

  const deleteExpense = async (id: string) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'expenses', id));
    await refreshData();
  };

  // CRUD Budget
  const saveBudget = async (bgt: Omit<Budget, 'id' | 'userId' | 'createdAt'>) => {
    if (!currentUser) return;
    await addDoc(collection(db, 'users', currentUser.uid, 'budgets'), {
      ...bgt,
      userId: currentUser.uid,
      createdAt: serverTimestamp()
    });
    await refreshData();
  };

  const deleteBudget = async (id: string) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'budgets', id));
    await refreshData();
  };

  // CRUD Savings
  const addSavingsGoal = async (goal: Omit<SavingsGoal, 'id' | 'userId' | 'createdAt'>) => {
    if (!currentUser) return;
    await addDoc(collection(db, 'users', currentUser.uid, 'savingsGoals'), {
      ...goal,
      userId: currentUser.uid,
      createdAt: serverTimestamp()
    });
    await refreshData();
  };

  const updateSavingsGoal = async (id: string, goal: Partial<SavingsGoal>) => {
    if (!currentUser) return;
    await updateDoc(doc(db, 'users', currentUser.uid, 'savingsGoals', id), goal);
    await refreshData();
  };

  const deleteSavingsGoal = async (id: string) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'savingsGoals', id));
    await refreshData();
  };

  const contributeToGoal = async (goalId: string, amount: number, note?: string) => {
    if (!currentUser) return;
    const goal = savingsGoals.find(g => g.id === goalId);
    if (!goal) return;
    const newSaved = (goal.currentSavedAmount || 0) + amount;
    await updateDoc(doc(db, 'users', currentUser.uid, 'savingsGoals', goalId), {
      currentSavedAmount: newSaved
    });
    await addDoc(collection(db, 'users', currentUser.uid, 'savingsContributions'), {
      userId: currentUser.uid,
      goalId,
      amount,
      date: new Date().toISOString().split('T')[0],
      note,
      createdAt: serverTimestamp()
    });
    await refreshData();
  };

  const markNotificationRead = async (id: string) => {
    if (!currentUser) return;
    await updateDoc(doc(db, 'users', currentUser.uid, 'notifications', id), { isRead: true });
    await refreshData();
  };

  const deleteNotification = async (id: string) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'notifications', id));
    await refreshData();
  };

  const generateAIInsights = async () => {
    if (!currentUser) return;
    try {
      const totalInc = incomes.reduce((sum, i) => sum + i.amount, 0);
      const totalExp = expenses.reduce((sum, e) => sum + e.amount, 0);
      const financialData = { totalInc, totalExp, incomes, expenses, budgets, savingsGoals };

      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ financialData })
      });
      const data = await res.json();
      if (data.insights && Array.isArray(data.insights)) {
        // Clear old insights and save new ones
        for (const ins of data.insights) {
          await addDoc(collection(db, 'users', currentUser.uid, 'financialInsights'), {
            userId: currentUser.uid,
            title: ins.title,
            description: ins.description,
            category: ins.category || 'spending',
            severity: ins.severity || 'medium',
            createdAt: serverTimestamp()
          });
        }
        await refreshData();
      }
    } catch (err) {
      console.error('Error generating AI insights:', err);
    }
  };

  const createChatSession = async (title: string): Promise<string> => {
    if (!currentUser) return '';
    const ref = await addDoc(collection(db, 'users', currentUser.uid, 'chatSessions'), {
      userId: currentUser.uid,
      title,
      createdAt: serverTimestamp()
    });
    await addDoc(collection(db, 'users', currentUser.uid, 'chatSessions', ref.id, 'messages'), {
      sessionId: ref.id,
      sender: 'ai',
      text: `Hello! I am your SmartFin AI Assistant. Let's discuss "${title}". How can I help?`,
      timestamp: serverTimestamp()
    });
    await refreshData();
    setActiveSessionId(ref.id);
    return ref.id;
  };

  const sendChatMessage = async (text: string) => {
    if (!currentUser || !activeSessionId) return;
    const uid = currentUser.uid;
    const sessionRef = activeSessionId;

    // Save user message
    await addDoc(collection(db, 'users', uid, 'chatSessions', sessionRef, 'messages'), {
      sessionId: sessionRef,
      sender: 'user',
      text,
      timestamp: serverTimestamp()
    });

    // Optimistically update UI
    const userMsg: ChatMessage = { sender: 'user', text, timestamp: new Date(), sessionId: sessionRef };
    setCurrentChatMessages(prev => [...prev, userMsg]);

    try {
      const totalInc = incomes.reduce((s, i) => s + i.amount, 0);
      const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
      const financialContext = { totalInc, totalExp, incomes, expenses, budgets, savingsGoals };

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          financialContext,
          chatHistory: currentChatMessages
        })
      });
      const data = await res.json();
      const reply = data.reply || 'I am sorry, I could not generate a response right now.';

      await addDoc(collection(db, 'users', uid, 'chatSessions', sessionRef, 'messages'), {
        sessionId: sessionRef,
        sender: 'ai',
        text: reply,
        timestamp: serverTimestamp()
      });

      const aiMsg: ChatMessage = { sender: 'ai', text: reply, timestamp: new Date(), sessionId: sessionRef };
      setCurrentChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errMsg: ChatMessage = { sender: 'ai', text: 'Sorry, connection error with AI service.', timestamp: new Date(), sessionId: sessionRef };
      setCurrentChatMessages(prev => [...prev, errMsg]);
    }
  };

  const deleteChatSession = async (sessionId: string) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'chatSessions', sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
    }
    await refreshData();
  };

  return (
    <FinanceContext.Provider value={{
      incomes,
      expenses,
      budgets,
      savingsGoals,
      notifications,
      insights,
      chatSessions,
      currentChatMessages,
      activeSessionId,
      loadingData,
      addIncome,
      updateIncome,
      deleteIncome,
      addExpense,
      updateExpense,
      deleteExpense,
      saveBudget,
      deleteBudget,
      addSavingsGoal,
      updateSavingsGoal,
      deleteSavingsGoal,
      contributeToGoal,
      markNotificationRead,
      deleteNotification,
      generateAIInsights,
      createChatSession,
      setActiveSessionId,
      sendChatMessage,
      deleteChatSession,
      refreshData
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
