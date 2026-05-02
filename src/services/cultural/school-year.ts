import type { SchoolYear, CreateSchoolYearRequest, UpdateSchoolYearRequest } from '../../types/school-year';

class SchoolYearService {
  private mockData: SchoolYear[] = [
    {
      id: '1',
      name: '2024-2025',
      startDate: '2024-09-05',
      endDate: '2025-05-31',
      description: 'Năm học hiện tại',
      status: 'active',
      isCurrent: true,
      isDeleted: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: '2023-2024',
      startDate: '2022-09-05',
      endDate: '2023-05-31',
      description: 'Năm học cũ',
      status: 'active',
      isCurrent: false,
      isDeleted: false,
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
    },
    {
      id: '3',
      name: '2022-2023',
      startDate: '2021-09-05',
      endDate: '2022-05-31',
      description: 'Năm học đã xóa 1',
      status: 'inactive',
      isCurrent: false,
      isDeleted: true,
      deletedAt: '2025-02-01 08:30:00',
      createdAt: '2021-01-01T00:00:00Z',
      updatedAt: '2021-01-01T00:00:00Z',
    },
    {
      id: '4',
      name: '2021-2022',
      startDate: '2020-09-05',
      endDate: '2021-05-31',
      description: 'Năm học đã xóa 2',
      status: 'inactive',
      isCurrent: false,
      isDeleted: true,
      deletedAt: '2024-02-01 08:30:00',
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2020-01-01T00:00:00Z',
    },
    {
      id: '5',
      name: '2020-2021',
      startDate: '2019-09-05',
      endDate: '2020-05-31',
      description: 'Năm học đã xóa 3',
      status: 'inactive',
      isCurrent: false,
      isDeleted: true,
      deletedAt: '2023-02-01 08:30:00',
      createdAt: '2019-01-01T00:00:00Z',
      updatedAt: '2019-01-01T00:00:00Z',
    },
  ];

  async getAll(): Promise<SchoolYear[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.mockData];
  }

  async getById(id: string): Promise<SchoolYear | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockData.find(item => item.id === id);
  }

  async create(data: CreateSchoolYearRequest): Promise<SchoolYear> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newYear: SchoolYear = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.mockData.unshift(newYear);
    return newYear;
  }

  async update(data: UpdateSchoolYearRequest): Promise<SchoolYear> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = this.mockData.findIndex(item => item.id === data.id);
    if (index === -1) throw new Error('Không tìm thấy năm học');
    
    const updatedYear = {
      ...this.mockData[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.mockData[index] = updatedYear;
    return updatedYear;
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.mockData = this.mockData.filter(item => item.id !== id);
  }
}

export const schoolYearService = new SchoolYearService();
