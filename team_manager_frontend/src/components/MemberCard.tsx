import Link from 'next/link';
import styles from '../styles/MemberCard.module.css';
import { formatPhoneNumber } from 'react-phone-number-input';

interface MemberCardProps {
  member: TeamMember;
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export default function MemberCard({ member }: MemberCardProps) {
  const truncatedFirstName = truncateText(member.first_name, 25);
  const truncatedLastName = truncateText(member.last_name, 25);
  const formatedPhone = formatPhoneNumber(member.phone_number);
  const truncatedEmail = truncateText(member.email, 30);

  return (
    <Link href={`/${member.id}`} className={styles.card}>
      <h2 className={styles.name}>
        {truncatedFirstName} {truncatedLastName}{' '}
        {member.role === 'admin' ? '(admin)' : ''}
      </h2>
      <p className={styles.detail}>
        <strong>{formatedPhone}</strong>
      </p>
      <p className={styles.detail}>{truncatedEmail}</p>
    </Link>
  );
}
