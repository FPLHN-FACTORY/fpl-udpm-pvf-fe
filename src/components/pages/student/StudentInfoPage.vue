<template>
  <div class="space-y-4">
    <!-- Breadcrumb -->
    <div class="flex items-center text-sm text-gray-500 gap-2 px-1">
      <span>Quản lý học viên</span>
      <span>/</span>
      <span class="text-gray-900">Thông tin học viên</span>
    </div>
    <template v-if="currentView === 'list'">
      <StudentStatsCards :stats="stats" />
      
      <StudentTable 
        :students="activeStudents" 
        @viewTrash="handleViewTrash"
        @addNew="handleAddNew"
        @view="handleView"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </template>

    <template v-else-if="currentView === 'add' || currentView === 'edit'">
      <StudentForm 
        :mode="currentView" 
        :initial-data="selectedStudent"
        @back="currentView = 'list'"
        @submit="handleFormSubmit"
      />
    </template>

    <template v-else-if="currentView === 'trash'">
      <StudentTrashTable 
        :students="deletedStudents"
        @back="currentView = 'list'"
        @restore="handleRestore"
        @hardDelete="handleHardDelete"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StudentStatsCards from '../../organisms/student/StudentStatsCards.vue';
import StudentTable from '../../organisms/student/StudentTable.vue';
import StudentForm from '../../organisms/student/StudentForm.vue';
import StudentTrashTable from '../../organisms/student/StudentTrashTable.vue';
import type { Student, StudentStats } from '../../../types/student';
import { message, Modal } from 'ant-design-vue';
import { 
  getActiveStudents, 
  getDeletedStudents, 
  getStudentStats, 
  addStudent, 
  updateStudent, 
  softDeleteStudent, 
  restoreStudent, 
  hardDeleteStudent 
} from '../../../services/home/student';

type ViewMode = 'list' | 'add' | 'edit' | 'trash';

// State
const currentView = ref<ViewMode>('list');
const selectedStudent = ref<Student | null>(null);

const activeStudents = ref<Student[]>([]);
const deletedStudents = ref<Student[]>([]);
const stats = ref<StudentStats>({
  total: 0,
  active: { count: 0, percent: 0 },
  graduated: { count: 0, percent: 0 },
  suspended: { count: 0, percent: 0 }
});
const isFetching = ref(false);

// Load Data
const fetchData = async () => {
  isFetching.value = true;
  try {
    activeStudents.value = await getActiveStudents();
    deletedStudents.value = await getDeletedStudents();
    stats.value = await getStudentStats();
  } catch (error) {
    message.error('Có lỗi xảy ra khi tải dữ liệu!');
  } finally {
    isFetching.value = false;
  }
};

onMounted(() => {
  fetchData();
});



// Handlers for List
const handleViewTrash = () => {
  currentView.value = 'trash';
};

const handleAddNew = () => {
  selectedStudent.value = null;
  currentView.value = 'add';
};

const handleView = (record: Student) => {
  message.info(`Xem chi tiết học viên: ${record.fullName}`);
};

const handleEdit = (record: Student) => {
  selectedStudent.value = record;
  currentView.value = 'edit';
};

const handleDelete = async (record: Student) => {
  try {
    await softDeleteStudent(record.id);
    message.success(`Đã chuyển ${record.fullName} vào thùng rác!`);
    await fetchData();
  } catch (error) {
    message.error('Lỗi khi xóa học viên');
  }
};

// Handlers for Form
const handleFormSubmit = async (data: any) => {
  try {
    if (currentView.value === 'add') {
      await addStudent({
        studentId: data.studentId,
        fullName: 'Nguyễn Văn ' + data.studentId, // Giả lập tên
        dob: '01/01/2000',
        email: `test@example.com`,
        status: 'active',
        contractVersion: data.contractVersion,
        startDate: data.startDate,
        endDate: data.endDate,
        years: data.years
      });
      message.success('Thêm mới học viên thành công!');
    } else {
      if (selectedStudent.value) {
        await updateStudent(selectedStudent.value.id, data);
        message.success('Cập nhật thông tin học viên thành công!');
      }
    }
    await fetchData();
    currentView.value = 'list';
  } catch (error) {
    message.error('Đã xảy ra lỗi khi lưu dữ liệu!');
  }
};

// Handlers for Trash
const handleRestore = async (record: Student) => {
  try {
    await restoreStudent(record.id);
    message.success(`Đã khôi phục học viên: ${record.fullName}`);
    await fetchData();
  } catch (error) {
    message.error('Lỗi khi khôi phục học viên');
  }
};

const handleHardDelete = (record: Student) => {
  Modal.confirm({
    title: 'Xóa vĩnh viễn học viên',
    content: `Bạn có chắc chắn muốn xóa vĩnh viễn học viên "${record.fullName}" không? Hành động này không thể hoàn tác.`,
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    onOk: async () => {
      try {
        await hardDeleteStudent(record.id);
        message.success(`Đã xóa vĩnh viễn học viên: ${record.fullName}`);
        await fetchData();
      } catch (error) {
        message.error('Lỗi khi xóa vĩnh viễn học viên');
      }
    }
  });
};
</script>
