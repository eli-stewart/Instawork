'use client';

import { useRouter } from 'next/navigation';
import apiClient from '../../utils/api';
import TeamMemberForm from '../../components/TeamMemberForm';

export default function AddMember() {
  const router = useRouter();

  const handleAdd = async (data: any) => {
    await apiClient.post('/members/', data);
    router.push('/');
  };

  return (
    <TeamMemberForm
      onSubmit={handleAdd}
      title="Add a Team Member"
      subtitle="Set email, phone and role"
    />
  );
}
