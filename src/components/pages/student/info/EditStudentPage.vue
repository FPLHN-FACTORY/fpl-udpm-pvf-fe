<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Điều chỉnh thông tin học viên">
      <div v-if="loading" class="flex justify-center py-12">
        <a-spin />
      </div>
      <StudentForm 
        v-else-if="student"
        mode="edit" 
        :initial-data="student"
        @back="handleBack"
        @submit="handleFormSubmit"
      />
      <div v-else class="text-center py-12 text-gray-500">
        Không tìm thấy thông tin học viên
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import AdminPage from '@/components/templates/AdminPage.vue';
import AdminCard from '@/components/molecules/AdminCard.vue';
import StudentForm from '@/components/organisms/student/StudentForm.vue';
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
  { title: 'Điều chỉnh', path: route.path }
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

const handleFormSubmit = async (data: any) => {
  try {
    await studentService.update(studentId, data);
    message.success('Cập nhật thông tin học viên thành công!');
    router.push('/student/info');
  } catch (error) {
    message.error('Đã xảy ra lỗi khi lưu dữ liệu!');
  }
};
</script>
