'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import apiClient from '../../utils/api';
import TeamMemberForm from '../../components/TeamMemberForm';

export default function EditMember() {
  const router = useRouter();
  const path = usePathname();
  const id = path.split('/')?.[1];
  const [member, setMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (id) {
        try {
          const response = await apiClient.get(`/members/${id}/`);
          setMember(response.data);
        } catch (error) {
          console.error('Error fetching member details:', error);
        }
      }
    };

    fetchMember();
  }, [id]);

  const handleUpdate = (data: TeamMember) => {
    if (id) {
      apiClient.put(`/members/${id}/`, data).then(() => {
        router.push('/');
      });
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        await apiClient.delete(`/members/${id}/`);
        router.push('/');
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  if (!member) return <p>Loading...</p>;

  return (
    <TeamMemberForm
      member={member}
      onSubmit={handleUpdate}
      onDelete={handleDelete}
      isEditing={true}
      title="Edit a Team Member"
      subtitle="Edit email, phone and role"
    />
  );
}
