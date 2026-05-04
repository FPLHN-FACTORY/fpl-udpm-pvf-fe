import os

base_dir = r"d:\fve\fpl-udpm-pvf-fe\src\components\pages\recruitment\admission-period"
files = [
    "AdmissionPeriodListPage.vue",
    "AdmissionPeriodCreatePage.vue",
    "AdmissionPeriodEditPage.vue",
    "AdmissionPeriodDetailPage.vue",
    "AdmissionPeriodDeletedListPage.vue"
]

for filename in files:
    filepath = os.path.join(base_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace the outer wrapper
    old_wrapper = '<div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">'
    new_wrapper = '<div class="flex flex-col gap-6">'
    
    content = content.replace(old_wrapper, new_wrapper)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Fixed layout wrapper")
