'use client';

import { useState, forwardRef } from 'react';
import styles from '../styles/TeamMemberForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface TeamMemberFormProps {
  member?: TeamMember;
  onSubmit: (data: TeamMember) => void;
  onDelete?: () => void;
  isEditing?: boolean;
  title: string;
  subtitle: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z]+$/;

// Reusable InputField component
interface InputFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valid: boolean;
  errorMessage: string;
}

const InputField = ({
  name,
  placeholder,
  value,
  onChange,
  valid,
  errorMessage,
}: InputFieldProps) => (
  <div className={styles.inputWrapper}>
    <input
      type="text"
      name={name}
      className={`${styles.input} ${valid ? styles.valid : ''}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {valid && (
      <FontAwesomeIcon icon={faCheckCircle} className={styles.checkmarkIcon} />
    )}
    <p className={styles.errorMessage}>{value && !valid ? errorMessage : ''}</p>
  </div>
);

export default function TeamMemberForm({
  member,
  onSubmit,
  onDelete,
  isEditing,
  title,
  subtitle,
}: TeamMemberFormProps) {
  const [firstName, setFirstName] = useState(member?.first_name || '');
  const [lastName, setLastName] = useState(member?.last_name || '');
  const [phoneNumber, setPhoneNumber] = useState(member?.phone_number || '+1');
  const [email, setEmail] = useState(member?.email || '');
  const [role, setRole] = useState(member?.role || 'regular');

  const firstNameValid =
    firstName.length > 0 &&
    nameRegex.test(firstName) &&
    firstName.length <= 100;
  const lastNameValid =
    lastName.length > 0 && nameRegex.test(lastName) && lastName.length <= 100;
  const phoneNumberValid = isPossiblePhoneNumber(phoneNumber);
  const emailValid =
    email.length > 0 && emailRegex.test(email) && email.length <= 100;

  const allFieldsValid =
    firstNameValid && lastNameValid && phoneNumberValid && emailValid;

  const handleSubmit = () => {
    if (allFieldsValid) {
      onSubmit({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        role,
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>

      {/* Info Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Info</h3>

        {/* First Name */}
        <InputField
          name="first_name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          valid={firstNameValid}
          errorMessage="First name must contain only letters, be non-empty, and under 100 characters."
        />

        {/* Last Name */}
        <InputField
          name="last_name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          valid={lastNameValid}
          errorMessage="Last name must contain only letters, be non-empty, and under 100 characters."
        />

        {/* Email */}
        <InputField
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          valid={emailValid}
          errorMessage="Enter a valid email that is non-empty and under 100 characters."
        />

        {/* Phone Number */}
        <div className={styles.inputWrapper}>
          <PhoneInput
            defaultCountry="US"
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value || '')}
            className={styles.inputField}
          />
          {phoneNumberValid && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={styles.checkmarkIcon}
            />
          )}
          <p className={styles.errorMessage}>
            {phoneNumber && !phoneNumberValid
              ? 'Phone number must be a valid international number'
              : ''}
          </p>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button
          onClick={handleSubmit}
          disabled={!allFieldsValid}
          className={styles.submitButton}
        >
          {isEditing ? 'Update Member' : 'Add Member'}
        </button>
        {isEditing && (
          <button onClick={onDelete} className={styles.deleteButton}>
            Delete Member
          </button>
        )}
      </div>
    </div>
  );
}
