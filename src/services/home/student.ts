import type { Student, StudentStats } from '../../types/student';

// --- VIRTUAL DATABASE ---
// Dữ liệu này sẽ chỉ tồn tại trong bộ nhớ ảo khi ứng dụng chạy.
let virtualDb: Student[] = Array.from({ length: 25 }).map((_, index) => {
  const isDeleted = index >= 21; // 4 học viên cuối bị xóa
  let status: Student['status'] = 'active';
  
  if (!isDeleted) {
    if (index === 19) status = 'graduated';
    else if (index === 20) status = 'suspended';
  }

  return {
    id: `UUID-${1000 + index}`,
    studentId: `HD00${(index % 5) + 1}`,
    fullName: `TH12345 - Nguyễn Văn ${String.fromCharCode(65 + (index % 26))}`,
    dob: '15/06/2010',
    email: `student.${index}@example.com`,
    status,
    isDeleted,
    deletedAt: isDeleted ? '01/1/2025 7:00' : undefined,
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
