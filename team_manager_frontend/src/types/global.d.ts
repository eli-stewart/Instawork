interface TeamMember {
  id?: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role: 'regular' | 'admin';
}

interface ApiResponse<T> {
  data: T;
  status: number;
}
