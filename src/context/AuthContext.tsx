import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged,
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from '../firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: any | null;
  userProfile: UserProfile | null;
  loading: boolean;
  theme: 'light';
  toggleTheme: () => void;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, fullName: string, country: string, currency: string, timezone: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  theme: 'light',
  toggleTheme: () => {},
  login: async () => {},
  signup: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updateUserProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure light mode exclusively
    document.documentElement.classList.remove('dark');
    localStorage.setItem('smartfin_theme', 'light');

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // Create default profile if missing
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              fullName: user.displayName || 'Valued User',
              country: 'United States',
              currency: 'USD ($)',
              timezone: 'UTC',
              role: user.email === 'admin@smartfin.ai' ? 'admin' : 'user',
              plan: 'free',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };
            await setDoc(docRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    // Locked to light theme as requested
  };

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signup = async (email: string, pass: string, fullName: string, country: string, currency: string, timezone: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    const user = cred.user;
    const newProfile: UserProfile = {
      uid: user.uid,
      email: user.email || email,
      fullName,
      country,
      currency,
      timezone,
      role: email === 'admin@smartfin.ai' ? 'admin' : 'user',
      plan: 'free',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(doc(db, 'users', user.uid), newProfile);
    setUserProfile(newProfile);
  };

  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    const user = cred.user;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        fullName: user.displayName || 'Google User',
        country: 'United States',
        currency: 'USD ($)',
        timezone: 'UTC',
        role: user.email === 'admin@smartfin.ai' ? 'admin' : 'user',
        plan: 'free',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(docRef, newProfile);
      setUserProfile(newProfile);
    } else {
      setUserProfile(docSnap.data() as UserProfile);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const docRef = doc(db, 'users', currentUser.uid);
    const updated = { ...data, updatedAt: serverTimestamp() };
    await updateDoc(docRef, updated);
    setUserProfile(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      userProfile,
      loading,
      theme: 'light',
      toggleTheme,
      login,
      signup,
      loginWithGoogle,
      logout,
      resetPassword,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
