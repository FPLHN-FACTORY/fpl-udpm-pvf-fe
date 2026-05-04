<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h1 class="text-xl font-bold text-gray-800 tracking-tight">Thêm Hồ sơ thí sinh</h1>
          <div class="flex gap-3">
            <a-button
              class="flex items-center gap-1 !bg-green-500 !border-green-500 !text-white hover:!bg-green-600 font-semibold"
              @click="handleImportExcel">
              <template #icon><upload-outlined /></template>
              Nhập Bảng Excel
            </a-button>
            <a-button @click="handleBack" class="flex items-center gap-1 !text-gray-500 !border-gray-300 !bg-[#ebedf0]">
              <template #icon><arrow-left-outlined /></template>
              Quay Lại
            </a-button>
          </div>
        </div>

        <!-- Form -->
        <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical" class="px-6 py-5 space-y-4">
          <!-- Row 1: Họ, Tên, Ngày sinh -->
          <div class="grid grid-cols-3 gap-4">
            <a-form-item name="ho" class="!mb-0">
              <a-input v-model:value="formState.ho" placeholder="Họ của thí sinh" size="large" class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="ten" class="!mb-0">
              <a-input v-model:value="formState.ten" placeholder="Tên của thí sinh" size="large" class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="ngaySinh" class="!mb-0">
              <a-date-picker v-model:value="formState.ngaySinh" placeholder="Ngày sinh của thí sinh" size="large"
                class="!w-full !rounded-lg" format="DD/MM/YYYY" />
            </a-form-item>
          </div>

          <!-- Row 2: Email, SĐT, Nơi sinh -->
          <div class="grid grid-cols-3 gap-4">
            <a-form-item name="email" class="!mb-0">
              <a-input v-model:value="formState.email" placeholder="Địa chỉ email của thí sinh" size="large"
                class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="soDienThoai" class="!mb-0">
              <a-input v-model:value="formState.soDienThoai" placeholder="Số điện thoại của thí sinh" size="large"
                class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="noiSinh" class="!mb-0">
              <a-input v-model:value="formState.noiSinh" placeholder="Nơi sinh của thí sinh" size="large"
                class="!rounded-lg" />
            </a-form-item>
          </div>

          <!-- Row 3: CCCD thí sinh -->
          <div class="grid grid-cols-3 gap-4">
            <a-form-item name="soCCCD" class="!mb-0">
              <a-input v-model:value="formState.soCCCD" placeholder="Số CCCD của thí sinh" size="large"
                class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="ngayCapCCCD" class="!mb-0">
              <a-date-picker v-model:value="formState.ngayCapCCCD" placeholder="Ngày cấp CCCD của thí sinh" size="large"
                class="!w-full !rounded-lg" format="DD/MM/YYYY" />
            </a-form-item>
            <a-form-item name="noiCapCCCD" class="!mb-0">
              <a-input v-model:value="formState.noiCapCCCD" placeholder="Nơi cấp CCCD của thí sinh" size="large"
                class="!rounded-lg" />
            </a-form-item>
          </div>

          <!-- Row 4: Người giám hộ (2 cols) -->
          <div class="grid grid-cols-2 gap-4">
            <a-form-item name="hoTenGiamHo" class="!mb-0">
              <a-input v-model:value="formState.hoTenGiamHo" placeholder="Họ tên của người giám hộ" size="large"
                class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="sdtGiamHo" class="!mb-0">
              <a-input v-model:value="formState.sdtGiamHo" placeholder="Số điện thoại của người giám hộ" size="large"
                class="!rounded-lg" />
            </a-form-item>
          </div>

          <!-- Row 5: Bố (4 cols) -->
          <div class="grid grid-cols-4 gap-4">
            <a-form-item name="hoTenBo" class="!mb-0">
              <a-input v-model:value="formState.hoTenBo" placeholder="Họ tên của bố" size="large" class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="soCCCDBo" class="!mb-0">
              <a-input v-model:value="formState.soCCCDBo" placeholder="Số CCCD của bố" size="large"
                class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="ngayCapCCCDBo" class="!mb-0">
              <a-date-picker v-model:value="formState.ngayCapCCCDBo" placeholder="Ngày cấp CCCD bố" size="large"
                class="!w-full !rounded-lg" format="DD/MM/YYYY" />
            </a-form-item>
            <a-form-item name="noiCapCCCDBo" class="!mb-0">
              <a-input v-model:value="formState.noiCapCCCDBo" placeholder="Nơi cấp CCCD bố" size="large"
                class="!rounded-lg" />
            </a-form-item>
          </div>

          <!-- Row 6: Mẹ (4 cols) -->
          <div class="grid grid-cols-4 gap-4">
            <a-form-item name="hoTenMe" class="!mb-0">
              <a-input v-model:value="formState.hoTenMe" placeholder="Họ tên của mẹ" size="large" class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="soCCCDMe" class="!mb-0">
              <a-input v-model:value="formState.soCCCDMe" placeholder="Số CCCD của mẹ" size="large"
                class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="ngayCapCCCDMe" class="!mb-0">
              <a-date-picker v-model:value="formState.ngayCapCCCDMe" placeholder="Ngày cấp CCCD mẹ" size="large"
                class="!w-full !rounded-lg" format="DD/MM/YYYY" />
            </a-form-item>
            <a-form-item name="noiCapCCCDMe" class="!mb-0">
              <a-input v-model:value="formState.noiCapCCCDMe" placeholder="Nơi cấp CCCD mẹ" size="large"
                class="!rounded-lg" />
            </a-form-item>
          </div>

          <!-- Row 7: Địa chỉ (2 cols) -->
          <div class="grid grid-cols-2 gap-4">
            <a-form-item name="diaChiThuongTru" class="!mb-0">
              <a-input v-model:value="formState.diaChiThuongTru" placeholder="Địa chỉ thường trú" size="large"
                class="!rounded-lg" />
            </a-form-item>
            <a-form-item name="diaChiTamTru" class="!mb-0">
              <a-input v-model:value="formState.diaChiTamTru" placeholder="Địa chỉ tạm trú" size="large"
                class="!rounded-lg" />
            </a-form-item>
          </div>

          <!-- Row 8: Upload files (4 cols) -->
          <div class="grid grid-cols-4 gap-4">
            <a-form-item name="giayKhaiSinh" class="!mb-0">
              <a-upload v-model:file-list="formState.giayKhaiSinh" :max-count="1" :before-upload="() => false"
                class="upload-field w-full">
                <a-button size="large" class="!w-full !rounded-lg !text-left !justify-between upload-btn">
                  <span class="text-gray-400 text-sm">Giấy khai sinh bản sao</span>
                  <upload-outlined class="text-gray-400" />
                </a-button>
              </a-upload>
            </a-form-item>
            <a-form-item name="giayKetTapTrung" class="!mb-0">
              <a-upload v-model:file-list="formState.giayKetTapTrung" :max-count="1" :before-upload="() => false"
                class="upload-field w-full">
                <a-button size="large" class="!w-full !rounded-lg !text-left !justify-between upload-btn">
                  <span class="text-gray-400 text-sm">Giấy cam kết tập trung</span>
                  <upload-outlined class="text-gray-400" />
                </a-button>
              </a-upload>
            </a-form-item>
            <a-form-item name="bienBanThanhLy" class="!mb-0">
              <a-upload v-model:file-list="formState.bienBanThanhLy" :max-count="1" :before-upload="() => false"
                class="upload-field w-full">
                <a-button size="large" class="!w-full !rounded-lg !text-left !justify-between upload-btn">
                  <span class="text-gray-400 text-sm">Biên bản thanh lý hợp đồng cũ</span>
                  <upload-outlined class="text-gray-400" />
                </a-button>
              </a-upload>
            </a-form-item>
            <a-form-item name="giayToBoSung" class="!mb-0">
              <a-upload v-model:file-list="formState.giayToBoSung" :max-count="1" :before-upload="() => false"
                class="upload-field w-full">
                <a-button size="large" class="!w-full !rounded-lg !text-left !justify-between upload-btn">
                  <span class="text-gray-400 text-sm">Giấy tờ bổ sung</span>
                  <upload-outlined class="text-gray-400" />
                </a-button>
              </a-upload>
            </a-form-item>
          </div>
        </a-form>

        <!-- Footer actions -->
        <div class="flex justify-center gap-4 py-6 border-t border-gray-100">
          <a-button type="primary" danger size="large" class="!px-7 !font-semibold !rounded-lg" :loading="submitting"
            @click="handleSubmit">
            Thêm Mới
          </a-button>
          <a-button size="large"
            class="!px-7 !font-semibold !rounded-lg !bg-yellow-400 !border-yellow-400 !text-white hover:!bg-yellow-500 hover:!border-yellow-500"
            @click="handleReset">
            Đặt Lại
          </a-button>
        </div>
      </div>
    </div>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { FormInstance, UploadFile } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import { useRouter } from 'vue-router'
import AdminPage from '@/components/templates/AdminPage.vue'

const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Hồ sơ thí sinh', path: '#' },
  { title: 'Danh sách hồ sơ', path: '/recruitment/candidate-profile/list' },
]

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  ho: string
  ten: string
  ngaySinh: Dayjs | null
  email: string
  soDienThoai: string
  noiSinh: string
  soCCCD: string
  ngayCapCCCD: Dayjs | null
  noiCapCCCD: string
  hoTenGiamHo: string
  sdtGiamHo: string
  hoTenBo: string
  soCCCDBo: string
  ngayCapCCCDBo: Dayjs | null
  noiCapCCCDBo: string
  hoTenMe: string
  soCCCDMe: string
  ngayCapCCCDMe: Dayjs | null
  noiCapCCCDMe: string
  diaChiThuongTru: string
  diaChiTamTru: string
  giayKhaiSinh: UploadFile[]
  giayKetTapTrung: UploadFile[]
  bienBanThanhLy: UploadFile[]
  giayToBoSung: UploadFile[]
}

// ─── State ────────────────────────────────────────────────────────────────────
const formRef = ref<FormInstance>()
const submitting = ref(false)

const formState = reactive<FormState>({
  ho: '', ten: '', ngaySinh: null,
  email: '', soDienThoai: '', noiSinh: '',
  soCCCD: '', ngayCapCCCD: null, noiCapCCCD: '',
  hoTenGiamHo: '', sdtGiamHo: '',
  hoTenBo: '', soCCCDBo: '', ngayCapCCCDBo: null, noiCapCCCDBo: '',
  hoTenMe: '', soCCCDMe: '', ngayCapCCCDMe: null, noiCapCCCDMe: '',
  diaChiThuongTru: '', diaChiTamTru: '',
  giayKhaiSinh: [], giayKetTapTrung: [], bienBanThanhLy: [], giayToBoSung: [],
})

// ─── Validation rules ─────────────────────────────────────────────────────────
const rules = {
  ho: [{ required: true, message: 'Vui lòng nhập họ', trigger: 'blur' }],
  ten: [{ required: true, message: 'Vui lòng nhập tên', trigger: 'blur' }],
  ngaySinh: [{ required: true, message: 'Vui lòng chọn ngày sinh', trigger: 'change' }],
  email: [{ required: true, type: 'email', message: 'Email không hợp lệ', trigger: 'blur' }],
  soDienThoai: [{ required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' }],
}

// ─── Actions ──────────────────────────────────────────────────────────────────
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    submitting.value = true
    await new Promise(r => setTimeout(r, 800))
    message.success('Thêm mới hồ sơ thí sinh thành công!')
    handleReset()
  } catch {
    message.error('Vui lòng kiểm tra lại thông tin.')
  } finally {
    submitting.value = false
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
  formState.ngaySinh = null
  formState.ngayCapCCCD = null
  formState.ngayCapCCCDBo = null
  formState.ngayCapCCCDMe = null
  formState.giayKhaiSinh = []
  formState.giayKetTapTrung = []
  formState.bienBanThanhLy = []
  formState.giayToBoSung = []
  message.info('Đã đặt lại form.')
}

const handleBack = () => router.push({ name: "candidate-list" })
const handleImportExcel = () => message.info('Chức năng nhập Excel')
</script>

<style scoped>
/* Upload button full width */
:deep(.upload-field .ant-upload) {
  @apply w-full block;
}

:deep(.upload-btn.ant-btn) {
  @apply flex items-center justify-between w-full;
}

/* Remove default form item spacing */
:deep(.ant-form-item) {
  margin-bottom: 0;
}

/* Date picker full width */
:deep(.ant-picker) {
  @apply w-full;
}

/* Input border radius */
:deep(.ant-input-lg),
:deep(.ant-picker-large),
:deep(.ant-btn-lg) {
  @apply !rounded-lg;
}

/* Hide upload list below button */
:deep(.ant-upload-list) {
  @apply hidden;
}
</style>