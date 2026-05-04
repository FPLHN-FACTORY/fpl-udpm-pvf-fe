import os
import glob

base_dir = r"d:\fve\fpl-udpm-pvf-fe\src\components\pages\discipline\level"
files = glob.glob(os.path.join(base_dir, "*.vue"))

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    content = content.replace("import NavIcon from '../../atoms/icons/NavIcon.vue'", "import NavIcon from '../../../atoms/icons/NavIcon.vue'")
    content = content.replace("import ButtonAdd from '../../atoms/buttons/ButtonAdd.vue'", "import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'")
    content = content.replace("import ButtonSearch from '../../atoms/buttons/ButtonSearch.vue'", "import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'")
    content = content.replace("import ButtonReset from '../../atoms/buttons/ButtonReset.vue'", "import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'")
    content = content.replace("import InputSearch from '../../atoms/inputs/InputSearch.vue'", "import InputSearch from '../../../atoms/inputs/InputSearch.vue'")
    content = content.replace("import BaseTag from '../../atoms/display/BaseTag.vue'", "import BaseTag from '../../../atoms/display/BaseTag.vue'")
    
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

print("Imports fixed")
