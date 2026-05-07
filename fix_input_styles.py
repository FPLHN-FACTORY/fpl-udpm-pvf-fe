import os
import re

base_dir = r"d:\fve\fpl-udpm-pvf-fe\src\components\pages\recruitment\admission-period"
files = ["AdmissionPeriodCreatePage.vue", "AdmissionPeriodEditPage.vue"]

css_styles = """
<style scoped>
:deep(.ant-input),
:deep(.ant-select-selector), 
:deep(.ant-picker) {
  height: 42px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
  color: #566a7f !important;
  box-shadow: none !important;
}

:deep(.ant-input:hover),
:deep(.ant-input:focus),
:deep(.ant-select-selector:hover), 
:deep(.ant-picker:hover),
:deep(.ant-select-focused .ant-select-selector), 
:deep(.ant-picker-focused) {
  border-color: #696cff !important;
  box-shadow: none !important;
}

:deep(.ant-select-selection-item), 
:deep(.ant-picker-input > input) {
  color: #566a7f !important;
}

:deep(.ant-select-arrow) {
  color: #a1acb8 !important;
}

:deep(.ant-picker-suffix) {
  color: #a1acb8 !important;
}
</style>
"""

for filename in files:
    filepath = os.path.join(base_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Update z-10 to z-50 for labels to ensure they cover borders
    content = content.replace("z-10", "z-50")
    
    # 2. Add some classes to a-input just in case
    content = content.replace('class="!h-[42px] !rounded-md"', 'class="w-full !h-[42px] !border-[#d9dee3] rounded-md transition-all text-[#566a7f]"')
    
    # 3. Replace the existing <style scoped> block
    style_pattern = r'<style scoped>.*?</style>'
    content = re.sub(style_pattern, css_styles.strip(), content, flags=re.DOTALL)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Fixed styling for labels and inputs")
