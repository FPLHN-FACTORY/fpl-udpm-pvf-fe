<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <AdminCard title="Chi tiết Bộ tiêu chí gốc">
      <template #actions>
        <ButtonBackNoIcon @click="goBack" />
        <ButtonEditNoIcon v-if="record" @click="goToEdit" />
      </template>

      <div v-if="record" class="space-y-5 p-5">
        <section class="rounded-lg border border-[#ebeef3] bg-white p-6 shadow-[0_2px_12px_rgba(67,89,113,0.08)]">
          <h2 class="mb-4 text-[18px] font-bold text-[#566a7f]">Thông tin bộ tiêu chí</h2>

          <div class="overflow-hidden rounded-lg border border-gray-100">
            <div
              v-for="field in detailFields"
              :key="field.label"
              class="flex min-h-[58px] border-b border-gray-100 last:border-b-0"
            >
              <div class="flex w-[180px] items-center border-r border-gray-100 bg-[#fcfcfd] px-4 text-[13px] font-semibold text-[#566a7f] md:w-[220px]">
                {{ field.label }}
              </div>
              <div class="flex flex-1 items-center px-4 text-[13px] text-[#697a8d]">
                <BaseTag v-if="field.type === 'status'" :type="field.tagType ?? 'default'">
                  {{ field.value }}
                </BaseTag>
                <span v-else>{{ field.value }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-lg border border-[#ebeef3] bg-white p-6 shadow-[0_2px_12px_rgba(67,89,113,0.08)]">
          <div class="mb-4 flex items-center justify-between gap-3">
            <h2 class="text-[18px] font-bold text-[#566a7f]">Các tiêu chí</h2>
            <ButtonAddNoIcon text="Thêm Mới" @click="handleAddCriterion" />
          </div>

          <div class="overflow-x-auto rounded-lg border border-gray-100">
            <table class="min-w-full border-collapse">
              <thead>
                <tr class="bg-white">
                  <th class="w-[60px] border-b border-gray-100 px-4 py-3 text-center text-[12px] font-bold uppercase text-[#8592a3]">#</th>
                  <th class="border-b border-l border-gray-100 px-4 py-3 text-left text-[12px] font-bold uppercase text-[#8592a3]">Tên tiêu chí</th>
                  <th class="w-[110px] border-b border-l border-gray-100 px-4 py-3 text-left text-[12px] font-bold uppercase text-[#8592a3]">Trọng số</th>
                  <th class="border-b border-l border-gray-100 px-4 py-3 text-left text-[12px] font-bold uppercase text-[#8592a3]">Mô tả</th>
                  <th class="w-[120px] border-b border-l border-gray-100 px-4 py-3 text-center text-[12px] font-bold uppercase text-[#8592a3]">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="criterion in criteriaRows"
                  :key="criterion.id"
                  class="border-b border-gray-100 last:border-b-0"
                >
                  <td class="px-4 py-3 text-center text-[13px] font-medium text-[#696cff]">
                    {{ criterion.index }}
                  </td>
                  <td class="border-l border-gray-100 px-4 py-3 text-[13px] text-[#566a7f]">
                    {{ criterion.name }}
                  </td>
                  <td class="border-l border-gray-100 px-4 py-3 text-[13px] text-[#697a8d]">
                    {{ criterion.weight }}
                  </td>
                  <td class="border-l border-gray-100 px-4 py-3 text-[13px] text-[#697a8d]">
                    {{ criterion.description }}
                  </td>
                  <td class="border-l border-gray-100 px-4 py-3">
                    <div class="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        class="text-[#a1acb8] transition-colors hover:text-[#71dd37]"
                        @click="handleEditCriterion(criterion.id)"
                      >
                        <NavIcon name="BxEdit" :size="18" />
                      </button>
                      <button
                        type="button"
                        class="text-[#a1acb8] transition-colors hover:text-[#ff3e1d]"
                        @click="handleDeleteCriterion(criterion.id)"
                      >
                        <NavIcon name="BxTrash" :size="18" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="rounded-lg border border-[#ebeef3] bg-white p-6 shadow-[0_2px_12px_rgba(67,89,113,0.08)]">
          <h2 class="mb-4 text-[18px] font-bold text-[#566a7f]">
            Các kỳ tuyển sinh đang sử dụng bộ tiêu chí
          </h2>

          <div class="overflow-x-auto rounded-lg border border-gray-100">
            <table class="min-w-full border-collapse">
              <thead>
                <tr class="bg-white">
                  <th class="w-[60px] border-b border-gray-100 px-4 py-3 text-center text-[12px] font-bold uppercase text-[#8592a3]">#</th>
                  <th class="border-b border-l border-gray-100 px-4 py-3 text-left text-[12px] font-bold uppercase text-[#8592a3]">Cơ sở đào tạo</th>
                  <th class="border-b border-l border-gray-100 px-4 py-3 text-left text-[12px] font-bold uppercase text-[#8592a3]">Tên kỳ tuyển sinh</th>
                  <th class="w-[140px] border-b border-l border-gray-100 px-4 py-3 text-left text-[12px] font-bold uppercase text-[#8592a3]">Ngày tuyển</th>
                  <th class="w-[140px] border-b border-l border-gray-100 px-4 py-3 text-left text-[12px] font-bold uppercase text-[#8592a3]">Ngày kết thúc</th>
                  <th class="w-[160px] border-b border-l border-gray-100 px-4 py-3 text-left text-[12px] font-bold uppercase text-[#8592a3]">Trạng thái</th>
                  <th class="w-[120px] border-b border-l border-gray-100 px-4 py-3 text-center text-[12px] font-bold uppercase text-[#8592a3]">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="usage in usageRows"
                  :key="usage.id"
                  class="border-b border-gray-100 last:border-b-0"
                >
                  <td class="px-4 py-3 text-center text-[13px] font-medium text-[#696cff]">
                    {{ usage.index }}
                  </td>
                  <td class="border-l border-gray-100 px-4 py-3 text-[13px] text-[#566a7f]">
                    {{ usage.facilityName }}
                  </td>
                  <td class="border-l border-gray-100 px-4 py-3 text-[13px] text-[#566a7f]">
                    {{ usage.admissionName }}
                  </td>
                  <td class="border-l border-gray-100 px-4 py-3 text-[13px] text-[#697a8d]">
                    {{ usage.admissionDate }}
                  </td>
                  <td class="border-l border-gray-100 px-4 py-3 text-[13px] text-[#697a8d]">
                    {{ usage.endDate }}
                  </td>
                  <td class="border-l border-gray-100 px-4 py-3">
                    <BaseTag :type="usage.tagType">{{ usage.status }}</BaseTag>
                  </td>
                  <td class="border-l border-gray-100 px-4 py-3">
                    <div class="flex items-center justify-center">
                      <button
                        type="button"
                        class="text-[#a1acb8] transition-colors hover:text-[#696cff]"
                        @click="handleViewUsage(usage.id)"
                      >
                        <NavIcon name="BxEditAlt" :size="18" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div v-else-if="!loading" class="px-5 py-14 text-center">
        <p class="text-base font-semibold text-gray-700">Không tìm thấy bộ tiêu chí cần xem.</p>
        <ButtonBackNoIcon class="mt-6" @click="goBack" text="Về danh sách" />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message, Modal } from "ant-design-vue";
import ButtonAddNoIcon from "@/components/atoms/buttons/ButtonAddNoIcon.vue";
import ButtonBackNoIcon from "@/components/atoms/buttons/ButtonBackNoIcon.vue";
import ButtonEditNoIcon from "@/components/atoms/buttons/ButtonEditNoIcon.vue";
import BaseTag from "@/components/atoms/display/BaseTag.vue";
import NavIcon from "@/components/atoms/icons/NavIcon.vue";
import AdminCard from "@/components/molecules/AdminCard.vue";
import AdminPage from "@/components/templates/AdminPage.vue";
import {
  getMasterCriteriaStatusLabel,
  masterCriteriaService,
  type MasterCriteriaRecord,
  type SaveMasterCriteriaInput,
} from "@/services/recruitment/masterCriteria";

interface DetailField {
  label: string;
  value: string;
  type?: "text" | "status";
  tagType?: "success" | "default";
}

interface CriterionRow {
  id: number;
  index: number;
  name: string;
  weight: string;
  description: string;
}

interface UsageRow {
  id: number;
  index: number;
  facilityName: string;
  admissionName: string;
  admissionDate: string;
  endDate: string;
  status: string;
  tagType: "success" | "default";
}

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const record = ref<MasterCriteriaRecord>();

const currentId = computed(() => Number(route.params.id) || 1);

const breadcrumbs = [
  { title: "Quản lý tuyển sinh" },
  { title: "Bộ tiêu chí gốc" },
];

const detailFields = computed<DetailField[]>(() => {
  if (!record.value) return [];

  return [
    { label: "Tên bộ tiêu chí", value: record.value.name },
    {
      label: "Trạng thái",
      value: getMasterCriteriaStatusLabel(record.value.status),
      type: "status",
      tagType: record.value.status === "ACTIVE" ? "success" : "default",
    },
    { label: "Mô tả", value: record.value.description },
    { label: "Thời gian tạo", value: record.value.createdAt },
    { label: "Thời gian cập nhật", value: record.value.updatedAt },
  ];
});

const criteriaRows = computed<CriterionRow[]>(() =>
  (record.value?.criteria ?? []).map((criterion, index) => ({
    id: criterion.id,
    index: index + 1,
    name: criterion.name,
    weight: `${criterion.weight}%`,
    description: criterion.description,
  })),
);

const usageRows = computed<UsageRow[]>(() =>
  (record.value?.usages ?? []).map((usage, index) => ({
    id: usage.id,
    index: index + 1,
    facilityName: usage.facilityName,
    admissionName: usage.admissionName,
    admissionDate: usage.admissionDate,
    endDate: usage.endDate,
    status: getMasterCriteriaStatusLabel(usage.status),
    tagType: usage.status === "ACTIVE" ? "success" : "default",
  })),
);

const loadRecord = async () => {
  loading.value = true;
  try {
    const response = await masterCriteriaService.getById(currentId.value);
    record.value = response.data;
  } catch (error) {
    record.value = undefined;
  } finally {
    loading.value = false;
  }
};

const goBack = () => router.push({ name: "master-criteria" });

const goToEdit = () => {
  router.push({ name: "master-criteria-edit", params: { id: currentId.value } });
};

const buildUpdatePayload = (criteria: MasterCriteriaRecord["criteria"]): SaveMasterCriteriaInput | undefined => {
  if (!record.value) return undefined;

  return {
    name: record.value.name,
    description: record.value.description,
    status: record.value.status,
    criteria: criteria.map((criterion) => ({
      name: criterion.name,
      description: criterion.description,
      weight: criterion.weight,
    })),
  };
};

const handleAddCriterion = () => {
  router.push({ name: "master-criteria-edit", params: { id: currentId.value } });
};

const handleEditCriterion = (_id: number) => {
  router.push({ name: "master-criteria-edit", params: { id: currentId.value } });
};

const handleDeleteCriterion = (id: number) => {
  if (!record.value) return;

  if (record.value.criteria.length <= 1) {
    message.warning("Bộ tiêu chí phải có ít nhất một tiêu chí.");
    return;
  }

  Modal.confirm({
    title: "Xác nhận xóa tiêu chí",
    content: "Bạn có chắc chắn muốn xóa tiêu chí này khỏi bộ tiêu chí gốc?",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    async onOk() {
      const nextCriteria = (record.value?.criteria ?? []).filter((criterion) => criterion.id !== id);
      const payload = buildUpdatePayload(nextCriteria);

      if (!payload) {
        message.error("Không thể cập nhật bộ tiêu chí.");
        return;
      }

      try {
        await masterCriteriaService.update(currentId.value, payload);
        await loadRecord();
        message.success("Xóa tiêu chí thành công");
      } catch (error) {
        message.error("Xóa tiêu chí thất bại");
      }
    }
  });
};

const handleViewUsage = (id: number) => {
  router.push({ name: "admission-period-detail", params: { id } });
};

onMounted(loadRecord);
</script>
