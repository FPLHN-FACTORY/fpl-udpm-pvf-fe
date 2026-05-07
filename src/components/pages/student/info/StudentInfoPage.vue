<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <!-- Thống kê -->
    <div class="grid grid-cols-4 gap-4 mb-2">
      <div v-for="stat in statCards" :key="stat.label" class="bg-white py-6 px-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[13px] text-gray-400 mb-1">{{ stat.label }}</p>
          <div class="flex items-baseline gap-2">
            <span class="text-[20px] font-bold text-[#566a7f]">{{ stat.value }}</span>
            <span v-if="stat.subValue" :class="stat.subValueClass">{{ stat.subValue }}</span>
          </div>
        </div>
        <div :class="stat.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center">
          <NavIcon :name="stat.icon" :size="20" :class="stat.iconColor" />
        </div>
      </div>
    </div>

    <!-- Danh sách học viên -->
    <AdminCard :title="isDeletedView ? 'Danh sách học viên đã xóa' : 'Danh sách học viên'">
      <template #actions>
        <ButtonDeleteList 
          v-if="!isDeletedView"
          @click="toggleDeletedView"
        />
        <ButtonBack 
          v-if="isDeletedView"
          @click="toggleDeletedView"
        />
        <ButtonAdd 
          v-if="!isDeletedView"
          @click="handleCreate"
        />
        <ButtonExport 
          v-if="!isDeletedView"
          @click="handleExport"
        />
        <ButtonImport 
          v-if="!isDeletedView"
          @click="handleImport"
        />
      </template>

      <StudentFilter 
        v-model:filters="filters"
        :initial-filters="filters" 
        @search="handleSearch" 
        @reset="handleReset" 
      />


      <div class="overflow-x-auto">
        <StudentTable 
          :students="displayStudents"
          :loading="loading"
          :is-trash="isDeletedView"
          @view="handleView"
          @edit="handleEdit"
          @delete="handleDelete"
          @restore="handleRestore"
          @hard-delete="handleHardDelete"
        />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import AdminPage from '@/components/templates/AdminPage.vue';
import AdminCard from '@/components/molecules/AdminCard.vue';
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue';
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue';
import ButtonExport from '@/components/atoms/buttons/ButtonExport.vue';
import ButtonImport from '@/components/atoms/buttons/ButtonImport.vue';
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue';
import NavIcon from '@/components/atoms/icons/NavIcon.vue';
import StudentFilter from '@/components/molecules/student/StudentFilter.vue';
import StudentTable from '@/components/organisms/student/StudentTable.vue';
import { studentService } from '@/services/home/student';
import type { Student, StudentStats } from '@/types/student';

const router = useRouter();

// State
const loading = ref(false);
const students = ref<Student[]>([]);
const stats = ref<StudentStats | null>(null);
const isDeletedView = ref(false);
const filters = ref({
  search: '',
  status: undefined
});

const breadcrumbs = [
  { title: 'Quản lý học viên', path: '#' },
  { title: 'Thông tin học viên', path: '/student/info' }
];

// Computed
const displayStudents = computed(() => {
  let filtered = students.value.filter(s => s.isDeleted === isDeletedView.value);
  
  if (filters.value.search) {
    const q = filters.value.search.toLowerCase();
    filtered = filtered.filter(s => 
      s.fullName.toLowerCase().includes(q) || 
      s.studentId.toLowerCase().includes(q)
    );
  }
  
  if (filters.value.status) {
    filtered = filtered.filter(s => s.status === filters.value.status);
  }
  
  return filtered;
});


const statCards = computed(() => {
  if (!stats.value) return [];
  return [
    { label: 'Tổng số học viên', value: stats.value.total.toString(), icon: 'BxUser', iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
    { label: 'Học viên đang học', value: stats.value.active.count.toString(), subValue: `(${stats.value.active.percent}%)`, subValueClass: 'text-green-500 text-[12px]', icon: 'BxRadioCircleMarked', iconBg: 'bg-red-50', iconColor: 'text-red-500' },
    { label: 'Học viên đã tốt nghiệp', value: stats.value.graduated.count.toString(), subValue: `(${stats.value.graduated.percent}%)`, subValueClass: 'text-green-500 text-[12px]', icon: 'BxUserCheck', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
    { label: 'Học viên nghỉ / bảo lưu', value: stats.value.suspended.count.toString(), subValue: `(${stats.value.suspended.percent}%)`, subValueClass: 'text-green-500 text-[12px]', icon: 'BxUserMinus', iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500' }
  ];
});

// Handlers
const fetchData = async () => {
  loading.value = true;
  try {
    students.value = await studentService.getAll();
    stats.value = await studentService.getStats();
  } catch (error) {
    message.error('Lỗi khi tải dữ liệu học viên');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const toggleDeletedView = () => {
  isDeletedView.value = !isDeletedView.value;
};

const handleReset = () => {
  filters.value.search = '';
  filters.value.status = undefined;
};

const handleSearch = () => {
  // Logic handled by computed property
};

const handleCreate = () => {
  router.push('/student/info/add');
};

const handleExport = () => {
  message.info('Tính năng xuất danh sách đang được phát triển');
};

const handleImport = () => {
  message.info('Tính năng nhập danh sách đang được phát triển');
};

const handleView = (record: Student) => {
  router.push(`/student/info/detail/${record.id}`);
};

const handleEdit = (record: Student) => {
  router.push(`/student/info/edit/${record.id}`);
};

const handleDelete = async (record: Student) => {
  try {
    await studentService.softDelete(record.id);
    message.success(`Đã chuyển ${record.fullName} vào thùng rác!`);
    await fetchData();
  } catch (error) {
    message.error('Lỗi khi xóa học viên');
  }
};

const handleRestore = async (record: Student) => {
  try {
    await studentService.restore(record.id);
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
        await studentService.hardDelete(record.id);
        message.success(`Đã xóa vĩnh viễn học viên: ${record.fullName}`);
        await fetchData();
      } catch (error) {
        message.error('Lỗi khi xóa vĩnh viễn học viên');
      }
    }
  });
};
</script>
