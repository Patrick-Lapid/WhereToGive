import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';

const UserDashboard = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {}, []);

  return <div>test</div>;
};

export default UserDashboard;
