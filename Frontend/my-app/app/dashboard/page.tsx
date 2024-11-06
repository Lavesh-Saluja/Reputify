// pages/dashboard.js
"use client"
// pages/dashboard.js

// pages/dashboard.js

// pages/dashboard.js

// pages/dashboard.js

// pages/dashboard.js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import styles from '../styles/Dashboard.module.css';
import useLoggedIn from '../hooks/useLoggedIn';  // Import the custom hook

const Dashboard = () => {
  const initialOrganizations = [
    { id: 1, name: 'OpenAI', logo: 'https://openai.com/favicon.ico' },
    { id: 2, name: 'Google', logo: 'https://www.google.com/favicon.ico' },
    { id: 3, name: 'Facebook', logo: 'https://www.facebook.com/favicon.ico' },
    { id: 4, name: 'Twitter', logo: 'https://twitter.com/favicon.ico' },
  ];

  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [orgName, setOrgName] = useState('');
  const [orgLogo, setOrgLogo] = useState('');

  const { loggedIn, loading } = useLoggedIn();
  const router = useRouter();

  const handleAddOrganization = () => {
    if (orgName && orgLogo) {
      const newOrg = {
        id: organizations.length + 1,
        name: orgName,
        logo: orgLogo,
      };
      setOrganizations([...organizations, newOrg]);
      setOrgName('');
      setOrgLogo('');
    }
  };

  const handleCardClick = (id: number) => {
    router.push(`/feedback/${id}`);
  };

  useEffect(() => {
     console.log(loading," ",loggedIn)
    // Redirect to /register if not logged in and loading is complete
    if (!loading && !loggedIn) {
      router.replace('/signup');
    }
  }, [loading, loggedIn, router]);
if (loading) return <p>Loading...</p>;
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>Add Organization</h2>
        <Link href="/organization/register">
          <button onClick={handleAddOrganization} className={styles.button}>Add</button>
        </Link>
        
             
        
        <h2>User Settings</h2>
        {/* Add more user settings here */}
      </div>

      <div className={styles.main}>
        <h2 className='text-slate-950'>Registered Organizations</h2>
        <div className={styles.cards}>
          {organizations.length > 0 ? (
            organizations.map((org) => (
              <div 
                key={org.id} 
                className={styles.card} 
                onClick={() => handleCardClick(org.id)}
                style={{ cursor: 'pointer' }} // Makes it clear that the card is clickable
              >
                <img src={org.logo} alt={`${org.name} logo`} className={styles.logo} />
                <h3 className={styles.orgName}>{org.name}</h3>
              </div>
            ))
          ) : (
            <p>No organizations registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
