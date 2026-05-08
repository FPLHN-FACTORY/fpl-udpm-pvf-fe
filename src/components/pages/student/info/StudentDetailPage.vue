<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div v-if="loading" class="flex justify-center py-4">
      <a-spin />
    </div>
    <StudentDetailView
      v-else-if="student"
      :student="student"
      @back="handleBack"
      @edit="handleEdit"
    />
    <div v-else class="text-center py-4 text-gray-500 bg-white rounded-xl">
      Không tìm thấy thông tin học viên
    </div>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import AdminPage from '@/components/templates/AdminPage.vue';
import StudentDetailView from '@/components/organisms/student/StudentDetailView.vue';
import { studentService } from '@/services/home/student';
import type { Student } from '@/types/student';

const router = useRouter();
const route = useRoute();
const studentId = route.params.id as string;

const loading = ref(true);
const student = ref<Student | null>(null);

const breadcrumbs = [
  { title: 'Quản lý học viên', path: '#' },
  { title: 'Thông tin học viên', path: '/student/info' },
  { title: 'Chi tiết', path: route.path }
];

const fetchStudent = async () => {
  loading.value = true;
  try {
    const data = await studentService.getById(studentId);
    if (data) {
      student.value = data;
    } else {
      message.error('Không tìm thấy học viên!');
    }
  } catch (error) {
    message.error('Lỗi khi tải thông tin học viên');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStudent);

const handleBack = () => {
  router.push('/student/info');
};

const handleEdit = (record: Student) => {
  router.push(`/student/info/edit/${record.id}`);
};
</script>
