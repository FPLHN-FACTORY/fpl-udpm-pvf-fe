export type StudentStatus = 'active' | 'graduated' | 'suspended';

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  dob: string;
  email: string;
  status: StudentStatus;

  // Thông tin cá nhân mở rộng
  recruitmentCode?: string;  // Mã hồ sơ tuyển sinh
  birthplace?: string;       // Nơi sinh
  phoneStudent?: string;     // SĐT học viên
  phoneParent?: string;      // SĐT phụ huynh
  guardian?: string;         // Người giám hộ

  // Thông tin CCCD
  cccdNumber?: string;
  cccdIssueDate?: string;
  cccdExpiryDate?: string;
  cccdIssuedBy?: string;

  // Thông tin Hộ chiếu
  passportNumber?: string;
  passportIssueDate?: string;
  passportExpiryDate?: string;
  passportIssuedBy?: string;
  passportNationality?: string;

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
