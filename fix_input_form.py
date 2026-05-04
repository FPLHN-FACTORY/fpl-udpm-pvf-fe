import os

base_dir = r"d:\fve\fpl-udpm-pvf-fe\src\components\pages\recruitment\admission-period"
files = ["AdmissionPeriodCreatePage.vue", "AdmissionPeriodEditPage.vue"]

import re

def replace_input_form(match):
    label = match.group(1)
    inner_content = match.group(2)
    
    return f"""<div class="relative w-full">
            <label class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-10 font-medium">{label}</label>
            {inner_content.strip()}
          </div>"""

for filename in files:
    filepath = os.path.join(base_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We use regex to find <InputForm label="..."> ... </InputForm>
    # Note: re.DOTALL makes . match newlines
    pattern = r'<InputForm label="([^"]+)" :required="false">\s*(.*?)\s*</InputForm>'
    
    content = re.sub(pattern, replace_input_form, content, flags=re.DOTALL)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Replaced InputForm tags")
