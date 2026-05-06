// Giả lập độ trễ mạng
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getLivingFeeBalance = async (studentId: string) => {
  await delay();
  return '10.000.000 VND';
};

export const getLivingFeeRequests = async (studentId: string) => {
  await delay();
  return [
    { id: '1', index: 1, date: '10/01/2025', amount: 'Số tiền', purpose: 'Mua dụng cụ học tập', balanceAfter: '10.000.000 VND', handler: 'Trần Minh Quân', status: 'Đã duyệt' },
    { id: '2', index: 2, date: '10/01/2025', amount: 'Số tiền', purpose: 'Mua dụng cụ học tập', balanceAfter: '10.000.000 VND', handler: 'Trần Minh Quân', status: 'Đã duyệt' },
    { id: '3', index: 3, date: '10/01/2025', amount: 'Số tiền', purpose: 'Mua dụng cụ học tập', balanceAfter: '10.000.000 VND', handler: 'Trần Minh Quân', status: 'Đã duyệt' },
  ];
};

export const getLivingFeeRequestDetail = async (requestId: string) => {
  await delay();
  return {
    id: 'HS001',
    student: 'HV001 - Nguyễn Xuân An',
    contract: 'HĐ PVF 2025',
    amount: '2.000.000 VND',
    purpose: 'Mục đích',
    file: 'file.pdf',
    status: 'Đã duyệt',
    balanceBefore: '10.000.000 VND',
    balanceAfter: '8.000.000 VND',
    createdAt: '10/01/2025 09:00',
    processedAt: '12/01/2025 14:30',
    handler: 'Admin A',
    note: 'Hóa đơn hợp lệ'
  };
};

export const getLivingFeeRequestHistory = async (requestId: string) => {
  await delay();
  return [
    { id: '1', index: '#6979', time: 'Apr 15, 2023, 10:21', userName: 'Cristine Easom', userEmail: 'ceasomw@theguardian.com', userAvatar: 'https://i.pravatar.cc/150?u=1', actionType: 'Tạo', objectType: 'USER', object: 'U001_NguyenVanA' },
    { id: '2', index: '#6624', time: 'Apr 17, 2023, 6:43', userName: 'Fayre Screech', userEmail: 'fscreechs@army.mil', userAvatar: 'https://i.pravatar.cc/150?u=2', actionType: 'Duyệt', objectType: 'USER', object: 'U001_NguyenVanA' },
    { id: '3', index: '#9305', time: 'Apr 17, 2023, 8:05', userName: 'Pauline Pfaffe', userEmail: 'ppfaffell@wikia.com', userAvatar: 'https://i.pravatar.cc/150?u=3', actionType: 'Duyệt', objectType: 'Admin', object: 'U001_NguyenVanA' },
  ];
};

// --- DỤNG CỤ (EQUIPMENT) ---

export const getEquipmentList = async (studentId: string) => {
  await delay();
  return [
    { id: '1', index: 1, name: 'Áo tập luyện', description: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày', status: 'Đang sử dụng' },
    { id: '2', index: 2, name: 'Áo tập luyện', description: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày', status: 'Đang sử dụng' },
  ];
};

export const getEquipmentRequests = async (studentId: string) => {
  await delay();
  return [
    { id: '1', index: 1, name: 'Áo tập luyện', description: 'Trang phục', requestDate: '2025-02-10', handler: 'Phạm Văn Hải', approvalDate: '2025-02-11', status: 'Đã duyệt' },
    { id: '2', index: 2, name: 'Áo tập luyện', description: 'Trang phục', requestDate: '2025-02-10', handler: 'Phạm Văn Hải', approvalDate: '2025-02-11', status: 'Đã duyệt' },
    { id: '3', index: 3, name: 'Áo tập luyện', description: 'Trang phục', requestDate: '2025-02-10', handler: 'Phạm Văn Hải', approvalDate: '2025-02-11', status: 'Đã duyệt' },
  ];
};

export const getEquipmentRequestDetail = async (requestId: string) => {
  await delay();
  return {
    id: '1',
    requestDate: '2025-01-05 08:30:00',
    equipmentName: 'Dây kháng lực',
    quantity: '1',
    status: 'Đã duyệt',
    approvalDate: '2025-01-05 08:30:00',
    handler: 'HD123 - Phạm Văn Hải',
    note: '-',
    createdAt: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45',
  };
};

// --- KỶ LUẬT KHEN THƯỞNG (DISCIPLINE) ---

export const getDisciplineList = async (studentId: string) => {
  await delay();
  return [
    { id: '1', index: 1, recordId: 'HS001', type: 'Kỷ luật', template: 'BB Khiển trách', decisionDate: '10/01/2025', reason: 'Đi học muộn nhiều lần', status: 'Đã ban hành' },
    { id: '2', index: 2, recordId: 'HS001', type: 'Kỷ luật', template: 'BB Khiển trách', decisionDate: '10/01/2025', reason: 'Đi học muộn nhiều lần', status: 'Đã ban hành' },
    { id: '3', index: 3, recordId: 'HS001', type: 'Khen thưởng', template: 'BB Khiển trách', decisionDate: '10/01/2025', reason: 'Được khen thưởng', status: 'Đã ban hành' },
    { id: '4', index: 4, recordId: 'HS001', type: 'Khen thưởng', template: 'BB Khiển trách', decisionDate: '10/01/2025', reason: 'Được khen thưởng', status: 'Đã ban hành' },
  ];
};

export const getDisciplineDetail = async (recordId: string) => {
  await delay();
  return {
    id: 'HS001',
    template: 'Nguyễn Văn An',
    decisionDate: '10/01/2025',
    decider: 'Nguyễn Minh Quân',
    reason: 'Đi học muộn nhiều lần',
    createdAt: '10/01/2025 09:00',
    updatedAt: '12/01/2025 14:30',
    status: 'Đã ban hành'
  };
};

// --- ĐÁNH GIÁ (EVALUATION) ---

export const getEvaluationList = async (studentId: string) => {
  await delay();
  return [
    { id: '1', index: 1, name: 'Sơ tuyển U13', evaluator: 'Nguyễn Minh Anh', score: 6, lockedAt: '15/03/2025 17:00', status: 'Đang diễn ra' },
    { id: '2', index: 1, name: 'Sơ tuyển U13', evaluator: 'Nguyễn Minh Anh', score: 6, lockedAt: '15/03/2025 17:00', status: 'Đang diễn ra' },
    { id: '3', index: 1, name: 'Sơ tuyển U13', evaluator: 'Nguyễn Minh Anh', score: 6, lockedAt: '15/03/2025 17:00', status: 'Đang diễn ra' },
  ];
};

export const getOverallEvaluation = async (studentId: string) => {
  await delay();
  return {
    id: 'UT1301',
    course: 'U13',
    totalScore: '7.8',
    avgScore: 'Form U13 v1.0',
    ranking: '1',
    classification: '1'
  };
};

export const getEvaluationDetail = async (evaluationId: string) => {
  await delay();
  return {
    id: 'UT1301',
    phase: 'Sơ tuyển U13',
    form: 'Form U13 v1.0',
    evaluator: 'HLV A',
    totalScore: '7.8',
    overallComment: 'Nhận xét tổng quan',
    lockedAt: '15/03/2025 17:00',
    createdAt: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45',
    status: 'Đã khóa'
  };
};

export const getEvaluationCriteria = async (evaluationId: string) => {
  await delay();
  return [
    { id: '1', index: 1, criteria: 'Thể lực', weight: '25%', score: 8, convertedScore: '2.0' },
    { id: '2', index: 2, criteria: 'Kỹ thuật', weight: '30%', score: 7, convertedScore: '2.1' },
    { id: '3', index: 3, criteria: 'Chiến thuật', weight: '15%', score: 7, convertedScore: '1.05' },
    { id: '4', index: 4, criteria: 'Tâm lý', weight: '10%', score: 8, convertedScore: '0.8' },
    { id: '5', index: 5, criteria: 'Thái độ', weight: '10%', score: 9, convertedScore: '0.9' },
    { id: '6', index: 6, criteria: 'Tiềm năng', weight: '10%', score: 8, convertedScore: '0.8' },
  ];
};
