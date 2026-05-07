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
    
    # Fix the broken action column
    broken_html = """            <template v-else-if="column.key === 'actions'">
              </div>
        <div class="flex items-center gap-2">"""
    fixed_html = """            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">"""
    
    content = content.replace(broken_html, fixed_html)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Fixed broken HTML")
