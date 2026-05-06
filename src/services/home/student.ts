import type { Student, StudentStats } from '../../types/student';

// --- VIRTUAL DATABASE ---
// Dữ liệu này sẽ chỉ tồn tại trong bộ nhớ ảo khi ứng dụng chạy.
const LAST_NAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Đặng', 'Bùi'];
const FIRST_NAMES = ['Văn An', 'Văn Bình', 'Văn Cường', 'Thị Dung', 'Văn Đức', 'Thị Hương', 'Văn Khoa', 'Thị Lan', 'Văn Minh', 'Thị Nga'];
const BIRTHPLACES = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ'];
const GUARDIANS = ['Nguyễn Văn Bình', 'Trần Thị Mai', 'Lê Văn Hùng', 'Phạm Thị Hoa', 'Hoàng Văn Long'];
const ISSUED_BY = ['Cục Cảnh sát QLHC về TTXH - Hà Nội', 'Cục Cảnh sát QLHC về TTXH - TP.HCM', 'Cục Cảnh sát QLHC về TTXH - Đà Nẵng'];

let virtualDb: Student[] = Array.from({ length: 25 }).map((_, index) => {
  const isDeleted = index >= 21;
  let status: Student['status'] = 'active';

  if (!isDeleted) {
    if (index === 19) status = 'graduated';
    else if (index === 20) status = 'suspended';
  }

  const lastName = LAST_NAMES[index % LAST_NAMES.length];
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
  const fullDisplayName = `${lastName} ${firstName}`;
  const cccdBase = `0${String(123456780 + index).padStart(11, '0')}`;

  return {
    id: `UUID-${1000 + index}`,
    studentId: `HV${String(index + 1).padStart(3, '0')}`,
    fullName: `TH12345 - ${fullDisplayName}`,
    dob: `${String((index % 28) + 1).padStart(2, '0')}/06/2010`,
    email: `${firstName.toLowerCase().replace(' ', '.')}.${index}@example.com`,
    status,
    isDeleted,
    deletedAt: isDeleted ? '01/01/2025 7:00' : undefined,

    recruitmentCode: `HS2025_${String(index + 1).padStart(3, '0')}`,
    birthplace: BIRTHPLACES[index % BIRTHPLACES.length],
    phoneStudent: `09${String(10000000 + index * 123456).slice(0, 8)}`,
    phoneParent: `09${String(20000000 + index * 654321).slice(0, 8)}`,
    guardian: GUARDIANS[index % GUARDIANS.length],

    cccdNumber: cccdBase,
    cccdIssueDate: '10/01/2023',
    cccdExpiryDate: '10/01/2033',
    cccdIssuedBy: ISSUED_BY[index % ISSUED_BY.length],

    passportNumber: index % 3 === 0 ? `P${String(1000000 + index).padStart(7, '0')}` : undefined,
    passportIssueDate: index % 3 === 0 ? '15/03/2022' : undefined,
    passportExpiryDate: index % 3 === 0 ? '15/03/2032' : undefined,
    passportIssuedBy: index % 3 === 0 ? 'Cục Quản lý xuất nhập cảnh' : undefined,
    passportNationality: index % 3 === 0 ? 'Việt Nam' : undefined,

    contractVersion: 'Phiên bản hợp đồng 2024',
    startDate: '01/01/2024',
    endDate: '01/01/2029',
    years: 5
  };
});

// Giả lập độ trễ mạng (Network Delay)
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// --- API MOCK SERVICES ---

/**
 * Lấy danh sách toàn bộ học viên
 */
export const getStudents = async (): Promise<Student[]> => {
  await delay();
  // Trả về bản sao của DB để tránh bị mutate trực tiếp từ UI
  return [...virtualDb];
};

/**
 * Lấy danh sách học viên đang hoạt động (chưa bị xóa)
 */
export const getActiveStudents = async (): Promise<Student[]> => {
  await delay();
  return virtualDb.filter(s => !s.isDeleted);
};

/**
 * Lấy danh sách học viên đã xóa (thùng rác)
 */
export const getDeletedStudents = async (): Promise<Student[]> => {
  await delay();
  return virtualDb.filter(s => s.isDeleted);
};

/**
 * Thống kê học viên (chỉ tính những người chưa bị xóa)
 */
export const getStudentStats = async (): Promise<StudentStats> => {
  await delay();
  const activeStudents = virtualDb.filter(s => !s.isDeleted);
  const total = activeStudents.length;
  
  const active = activeStudents.filter(s => s.status === 'active').length;
  const graduated = activeStudents.filter(s => s.status === 'graduated').length;
  const suspended = activeStudents.filter(s => s.status === 'suspended').length;

  const getPercent = (count: number) => total > 0 ? Math.round((count / total) * 100) : 0;

  return {
    total,
    active: { count: active, percent: getPercent(active) },
    graduated: { count: graduated, percent: getPercent(graduated) },
    suspended: { count: suspended, percent: getPercent(suspended) }
  };
};

/**
 * Thêm học viên mới
 */
export const addStudent = async (studentData: Omit<Student, 'id' | 'isDeleted'>): Promise<Student> => {
  await delay();
  const newStudent: Student = {
    ...studentData,
    id: `UUID-${Date.now()}`,
    isDeleted: false
  };
  virtualDb.unshift(newStudent); // Thêm lên đầu danh sách
  return newStudent;
};

/**
 * Cập nhật học viên
 */
export const updateStudent = async (id: string, updateData: Partial<Student>): Promise<Student> => {
  await delay();
  const index = virtualDb.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Student not found');
  
  virtualDb[index] = { ...virtualDb[index], ...updateData };
  return virtualDb[index];
};

/**
 * Đưa học viên vào thùng rác (Soft Delete)
 */
export const softDeleteStudent = async (id: string): Promise<void> => {
  await delay();
  const index = virtualDb.findIndex(s => s.id === id);
  if (index !== -1) {
    virtualDb[index].isDeleted = true;
    virtualDb[index].deletedAt = new Date().toLocaleString();
  }
};

/**
 * Khôi phục học viên từ thùng rác
 */
export const restoreStudent = async (id: string): Promise<void> => {
  await delay();
  const index = virtualDb.findIndex(s => s.id === id);
  if (index !== -1) {
    virtualDb[index].isDeleted = false;
    virtualDb[index].deletedAt = undefined;
  }
};

/**
 * Xóa vĩnh viễn học viên
 */
export const hardDeleteStudent = async (id: string): Promise<void> => {
  await delay();
  virtualDb = virtualDb.filter(s => s.id !== id);
};
