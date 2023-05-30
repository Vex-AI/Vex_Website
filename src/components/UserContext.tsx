import { createContext, ReactNode, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../classes/firebase";

interface UserInfo {
  displayName: string;
  email: string;
  photoURL: string;
}

interface UserContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  logOutGoogle: () => void;
  signInGoogle: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logOutGoogle: () => {},
  signInGoogle: () => {},
});

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const [user, setUser] = useState<UserInfo | null>(null);

  const signInGoogle = () => {
    
    signInWithPopup(auth, provider)
      .then((result:any) => {
        const user = result.user;
        if (user) {
          const {
            displayName,
          email,
          photoURL} = user;
          setUser({ displayName, email, photoURL });
        }
      })
      .catch((error:any) =>  {
        console.log("Erro ao fazer login:", error);
      });
  };

  const logOutGoogle = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error:any) => {
        console.log("Erro ao fazer logout:", error);
      });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logOutGoogle, signInGoogle }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
