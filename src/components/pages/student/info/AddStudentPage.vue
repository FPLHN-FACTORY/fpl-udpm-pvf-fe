<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Thêm mới học viên">
      <StudentForm 
        mode="add" 
        @back="handleBack"
        @submit="handleFormSubmit"
      />
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import AdminPage from '@/components/templates/AdminPage.vue';
import AdminCard from '@/components/molecules/AdminCard.vue';
import StudentForm from '@/components/organisms/student/StudentForm.vue';
import { studentService } from '@/services/home/student';

const router = useRouter();

const breadcrumbs = [
  { title: 'Quản lý học viên', path: '#' },
  { title: 'Thông tin học viên', path: '/student/info' },
  { title: 'Thêm mới', path: '/student/info/add' }
];

const handleBack = () => {
  router.push('/student/info');
};

const handleFormSubmit = async (data: any) => {
  try {
    await studentService.create({
      ...data,
      fullName: 'Học viên ' + data.studentId, // Logic mock
      dob: '01/01/2010',
      email: 'student@example.com',
      status: 'active'
    });
    message.success('Thêm mới học viên thành công!');
    router.push('/student/info');
  } catch (error) {
    message.error('Đã xảy ra lỗi khi lưu dữ liệu!');
  }
};
</script>
