import os
import re

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
    
    # Replace pagination
    old_pagination_1 = """<a-pagination 
          v-model:current="currentPage" 
          :total="50" 
          :show-size-changer="false"
          class="custom-pagination"
        />"""
    old_pagination_2 = """<a-pagination v-model:current="currentPage" :total="50" :show-size-changer="false" class="custom-pagination" />"""
    
    new_pagination = """<BasePagination 
          :current="currentPage" 
          :total="50" 
          :page-size="10"
          @change="(page) => currentPage = page"
        />"""
        
    content = content.replace(old_pagination_1, new_pagination)
    content = content.replace(old_pagination_2, new_pagination)
    
    # Add import if not exists
    if "BasePagination" not in content:
        content = content.replace(
            "import NavIcon from '../../../atoms/icons/NavIcon.vue'",
            "import NavIcon from '../../../atoms/icons/NavIcon.vue'\nimport BasePagination from '../../../atoms/display/BasePagination.vue'"
        )
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Pagination fixed")
