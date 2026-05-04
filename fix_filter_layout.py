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
    
    # Structure we have:
    # <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
    #   <div class="w-[250px]"> ... </div>
    #   <div class="w-[200px]"> ... </div>
    #   <div class="flex items-center gap-2"> ... </div>
    # </div>
    
    old_container_start = '<div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">'
    new_container_start = '<div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">\n        <div class="flex items-center gap-3">'
    
    # We need to find the old container start, replace it.
    content = content.replace(old_container_start, new_container_start)
    
    # And then we need to close the left group wrapper right before the right group.
    # The right group is `<div class="flex items-center gap-2">`
    content = content.replace(
        '<div class="flex items-center gap-2">',
        '</div>\n        <div class="flex items-center gap-2">'
    )
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Fixed flex groups")
