<template>
  <div class="space-y-5">
    <div class="text-[11px] leading-4 text-[#a1acb8]">
      Học tập văn hoá
      <span class="mx-1">/</span>
      Đơn xin phép nghỉ học
    </div>

    <section class="rounded-[10px] border border-gray-100 bg-white px-5 py-4 shadow-sm">
      <div class="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 class="text-[18px] font-bold text-[#566a7f]">Chi tiết Đơn xin phép nghỉ học</h2>
        <div class="flex items-center gap-2">
          <ButtonBack @click="$router.push('/cultural/absence')" />
          <ButtonEditNoIcon text="Chỉnh Sửa" @click="$router.push(`/cultural/absence/edit/${request.id}`)" />
        </div>
      </div>

      <div class="overflow-hidden rounded-md border border-gray-100">
        <div v-for="row in detailRows" :key="row.title" class="flex min-h-[46px] border-b border-gray-100 last:border-b-0">
          <div class="w-[230px] border-r border-gray-100 bg-white px-4 py-3 text-[12px] font-bold text-[#566a7f]">
            {{ row.title }}
          </div>
          <div class="flex flex-1 items-center justify-between gap-4 px-4 py-3 text-[12px] text-[#697a8d]">
            <template v-if="row.type === 'status'">
              <span class="absence-status-chip">{{ row.value }}</span>
            </template>
            <template v-else-if="row.type === 'file'">
              <span>{{ row.value }}</span>
              <button class="text-[#8592a3]">
                <NavIcon name="BxShow" size="16" />
              </button>
            </template>
            <template v-else>
              <span>{{ row.value }}</span>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '../../../atoms/buttons/ButtonEditNoIcon.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import { buildAbsenceDetailRows, findAbsenceRequestById } from './absenceData'

const route = useRoute()
const request = computed(() => findAbsenceRequestById(route.params.id as string))
const detailRows = computed(() => buildAbsenceDetailRows(request.value))
</script>

<style scoped>
.absence-status-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 12px;
  border-radius: 4px;
  background: rgba(113, 221, 55, 0.16);
  color: #71dd37;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
}
</style>
