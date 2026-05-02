export interface SchoolYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  status: 'active' | 'inactive';
  isCurrent: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SchoolYearFilter {
  search?: string;
  status?: 'active' | 'inactive';
}

export interface CreateSchoolYearRequest {
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  status: 'active' | 'inactive';
}

export interface UpdateSchoolYearRequest extends Partial<CreateSchoolYearRequest> {
  id: string;
}
