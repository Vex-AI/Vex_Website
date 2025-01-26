import { create } from 'zustand';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../classes/firebase';

interface UserInfo {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
}

interface UserStore {
  user: UserInfo | null;
  signInGoogle: () => Promise<void>;
  logOutGoogle: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  signInGoogle: async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        set({ user: { displayName, email, photoURL, uid } });
        
        const token = await user.getIdToken();
        localStorage.setItem('authToken', token);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Aqui você pode, por exemplo, disparar algum estado de erro no store ou exibir uma notificação para o usuário.
    }
  },
  logOutGoogle: async () => {
    const auth = getAuth(app);
    
    try {
      await signOut(auth);
      set({ user: null });
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Aqui você pode também tratar o erro com um estado de erro no store ou uma notificação.
    }
  },
}));