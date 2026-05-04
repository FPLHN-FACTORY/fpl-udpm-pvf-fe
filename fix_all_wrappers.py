import os

base_dir = r"d:\fve\fpl-udpm-pvf-fe\src\components\pages"
to_replace = '<div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">'
new_val = '<div class="flex flex-col gap-6">'

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".vue") and file != "LoginPage.vue":
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            if to_replace in content:
                content = content.replace(to_replace, new_val)
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Fixed: {filepath}")
