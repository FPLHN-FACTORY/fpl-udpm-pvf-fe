import os
import re

base_dir = r"d:\fve\fpl-udpm-pvf-fe\src\components\pages\recruitment\admission-period"

# 1. Restore max-w-5xl for both Create and Edit pages
for filename in ["AdmissionPeriodCreatePage.vue", "AdmissionPeriodEditPage.vue"]:
    filepath = os.path.join(base_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    content = content.replace(
        '<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">',
        '<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl">'
    )
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

# 2. Add dayjs and set default dates in Edit page
edit_filepath = os.path.join(base_dir, "AdmissionPeriodEditPage.vue")
with open(edit_filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Add import dayjs
import_pattern = r"import \{ ref \} from 'vue'\nimport \{ useRouter \} from 'vue-router'"
new_imports = "import { ref } from 'vue'\nimport { useRouter } from 'vue-router'\nimport dayjs from 'dayjs'"
content = content.replace(import_pattern, new_imports)

# Set initial values
old_data = """const formData = ref<FormData>({
  facility: 'hn',
  name: 'Kỳ tuyển sinh Xuân 2025',
  startDate: undefined,
  endDate: undefined,
  status: 'active'
})"""

new_data = """const formData = ref<FormData>({
  facility: 'hn',
  name: 'Kỳ tuyển sinh Xuân 2025',
  startDate: dayjs('2025-01-15', 'YYYY-MM-DD'),
  endDate: dayjs('2025-03-31', 'YYYY-MM-DD'),
  status: 'active'
})"""
content = content.replace(old_data, new_data)

# Set reset values
old_reset = """formData.value = {
    facility: 'hn',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: undefined,
    endDate: undefined,
    status: 'active'
  }"""
new_reset = """formData.value = {
    facility: 'hn',
    name: 'Kỳ tuyển sinh Xuân 2025',
    startDate: dayjs('2025-01-15', 'YYYY-MM-DD'),
    endDate: dayjs('2025-03-31', 'YYYY-MM-DD'),
    status: 'active'
  }"""
content = content.replace(old_reset, new_reset)

# Set date format for the date pickers
content = content.replace('placeholder="Ngày bắt đầu kỳ tuyển sinh"', 'placeholder="Ngày bắt đầu kỳ tuyển sinh"\n                format="YYYY-MM-DD"')
content = content.replace('placeholder="Ngày kết thúc kỳ tuyển sinh"', 'placeholder="Ngày kết thúc kỳ tuyển sinh"\n                format="YYYY-MM-DD"')

with open(edit_filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Restored max-w-5xl and added dayjs dates to Edit page")
