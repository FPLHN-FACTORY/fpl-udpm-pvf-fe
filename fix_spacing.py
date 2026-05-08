import os

base_dir = r"d:\fve\fpl-udpm-pvf-fe\src\components\pages\discipline\level"
files = [
    "LevelListPage.vue",
    "LevelDetailPage.vue",
    "LevelDeletedListPage.vue"
]

for filename in files:
    filepath = os.path.join(base_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace the class
    content = content.replace('class="flex-1 min-w-[200px]"', 'class="w-[250px]"')
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Fixed spacing")
