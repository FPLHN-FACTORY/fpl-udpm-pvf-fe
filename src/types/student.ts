export type StudentStatus = 'active' | 'graduated' | 'suspended';

export interface Student {
  id: string; 
  studentId: string; 
  fullName: string;
  dob: string; 
  email: string;
  status: StudentStatus;
  
  // Dành cho form thêm/sửa
  contractVersion?: string;
  startDate?: string;
  endDate?: string;
  years?: number;

  // Dành cho màn hình "Đã xóa"
  isDeleted: boolean;
  deletedAt?: string;
}

export interface StudentStats {
  total: number;
  active: { count: number; percent: number };
  graduated: { count: number; percent: number };
  suspended: { count: number; percent: number };
}
