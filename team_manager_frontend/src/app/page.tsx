'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MemberCard from '../components/MemberCard';
import apiClient from '../utils/api';
import styles from '../styles/MembersList.module.css';

export default function MembersList() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await apiClient.get('/members/');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Team Members</h1>
        <p className={styles.subtitle}>
          You have {members.length} team member{members.length !== 1 ? 's' : ''}
          .
        </p>
        <Link href="/add" className={styles.addButton}>
          + Add
        </Link>
      </header>
      <div className={styles.memberList}>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
