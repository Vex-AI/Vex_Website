import { createContext, ReactNode, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../classes/firebase";

interface UserInfo {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
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
      .then((result: any) => {
        const user = result.user;

        if (user) {
          const { displayName, email, photoURL, uid } = user;
          setUser({ displayName, email, photoURL, uid });

          user.getIdToken().then((token: any) => {
            localStorage.setItem("authToken", token);
          });
        }
      })
      .catch((error: any) => {
        console.log("Erro ao fazer login:", error);
      });
  };

  const logOutGoogle = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("authToken");
      })
      .catch((error: any) => {
        console.log("Erro ao fazer logout:", error);
      });
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const { displayName, email, photoURL, uid } = user;
          setUser({ displayName, email, photoURL, uid });
        }
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logOutGoogle, signInGoogle }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
