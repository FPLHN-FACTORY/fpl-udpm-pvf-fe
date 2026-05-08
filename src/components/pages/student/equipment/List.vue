<template>
  <div>
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <span>Quản lý học viên</span>
      <span class="sep">/</span>
      <span class="active">Dụng cụ</span>
    </nav>

    <div class="card">
      <!-- Header -->
      <div class="card-header">
        <h2 class="title">Danh sách Dụng cụ</h2>
        <div class="header-actions">
          <button class="btn btn-secondary" @click="xemDaXoa">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            Danh Sách Đã Xóa
          </button>
          <button class="btn btn-primary" @click="moModalThem">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Thêm Mới
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="search-bar">
        <div class="search-left">
            <FloatingInput class="input-wrapper"
                v-model="tuKhoa" 
                placeholder="Tìm kiếm"
                @enter="timKiem"
                />
          <div class="select-wrapper">
            <select v-model="trangThaiFilter" class="input-select">
              <option value="">Chọn trạng thái</option>
              <option value="Đang sử dụng">Đang sử dụng</option>
              <option value="Ngừng sử dụng">Ngừng sử dụng</option>
              <option value="Bảo trì">Bảo trì</option>
            </select>
            <svg class="icon-caret" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div class="search-right">
          <button class="btn btn-search" @click="timKiem">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Tìm Kiếm
          </button>
          <button class="btn btn-icon" @click="lamMoi" title="Làm mới">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="table-wrapper">
        <div v-if="loading" class="loading-overlay">
          <div class="spinner"></div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th class="col-check">
                <input type="checkbox" v-model="chonTatCa" @change="toggleChonTatCa" />
              </th>
              <th class="col-stt">#</th>
              <th class="col-ten">TÊN DỤNG CỤ</th>
              <th class="col-mota">TÊN DỤNG CỤ</th>
              <th class="col-trangthai">TRẠNG THÁI</th>
              <th class="col-action">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!loading && danhSach.length === 0">
              <td colspan="6" class="empty-row">Không có dữ liệu</td>
            </tr>
            <tr v-for="item in danhSach" :key="item.id" :class="{ selected: dsChon.includes(item.id) }">
              <td class="col-check">
                <input type="checkbox" :value="item.id" v-model="dsChon" />
              </td>
              <td class="col-stt" style="color: rgba(105, 108, 255, 1); ">{{ item.id }}</td>
              <td class="col-ten" style="color: rgba(34, 48, 62, 0.9); font-size: 13px; font-weight: 500; line-height: 22px;">{{ item.ten }}</td>
              <td class="col-mota" style="color: rgba(34, 48, 62, 0.7); font-size: 15px; font-weight: 400; line-height: 16px;">{{ item.moTa }}</td>
              <td class="col-trangthai">
                <span :class="['badge', badgeClass(item.trangThai)]">{{ item.trangThai }}</span>
              </td>
              <td class="col-action">
                <div class="action-group">
                  <button class="action-btn view" @click="xemChiTiet(item)" title="Xem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button class="action-btn edit" @click="moModalSua(item)" title="Sửa">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button class="action-btn delete" @click="xacNhanXoa(item)" title="Xóa">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="tongTrang > 1">
        <button class="page-btn" @click="doiTrang(1)" :disabled="trangHienTai === 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>
        </button>
        <button class="page-btn" @click="doiTrang(trangHienTai - 1)" :disabled="trangHienTai === 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <button
          v-for="p in dsTrang"
          :key="p"
          class="page-btn"
          :class="{ active: p === trangHienTai }"
          @click="doiTrang(p)"
        >{{ p }}</button>

        <button class="page-btn" @click="doiTrang(trangHienTai + 1)" :disabled="trangHienTai === tongTrang">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <button class="page-btn" @click="doiTrang(tongTrang)" :disabled="trangHienTai === tongTrang">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
        </button>
      </div>
    </div>

    <!-- Modal Thêm/Sửa -->
    <div v-if="showModal" class="modal-backdrop" @click.self="dongModal">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ modalMode === 'them' ? 'Thêm Dụng Cụ' : 'Cập Nhật Dụng Cụ' }}</h3>
          <button class="modal-close" @click="dongModal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Tên dụng cụ <span class="required">*</span></label>
            <input v-model="form.ten" type="text" class="form-input" placeholder="Nhập tên dụng cụ" />
          </div>
          <div class="form-group">
            <label>Mô tả</label>
            <textarea v-model="form.moTa" class="form-input" rows="3" placeholder="Nhập mô tả"></textarea>
          </div>
          <div class="form-group">
            <label>Trạng thái <span class="required">*</span></label>
            <select v-model="form.trangThai" class="form-input">
              <option value="Đang sử dụng">Đang sử dụng</option>
              <option value="Ngừng sử dụng">Ngừng sử dụng</option>
              <option value="Bảo trì">Bảo trì</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" @click="dongModal">Hủy</button>
          <button class="btn btn-primary" @click="luuDungCu" :disabled="saving">
            {{ saving ? 'Đang lưu...' : 'Lưu' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm Delete -->
    <div v-if="showConfirmXoa" class="modal-backdrop" @click.self="showConfirmXoa = false">
      <div class="modal modal-sm">
        <div class="modal-header">
          <h3>Xác nhận xóa</h3>
          <button class="modal-close" @click="showConfirmXoa = false">✕</button>
        </div>
        <div class="modal-body">
          <p>Bạn có chắc muốn xóa dụng cụ <strong>{{ itemChon?.ten }}</strong>?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" @click="showConfirmXoa = false">Hủy</button>
          <button class="btn btn-danger" @click="thucHienXoa" :disabled="deleting">
            {{ deleting ? 'Đang xóa...' : 'Xóa' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { dungCuService, type DungCu } from '../../../../services/student/equipment';
import FloatingInput from '../../../atoms/FloatingInput.vue';

export default defineComponent({
  name: 'DanhSachDungCu',
  components: {
    FloatingInput
  },

  setup() {
    // State
    const danhSach = ref<DungCu[]>([]);
    const loading = ref(false);
    const saving = ref(false);
    const deleting = ref(false);
    const tuKhoa = ref('');
    const trangThaiFilter = ref('');
    const trangHienTai = ref(1);
    const tongTrang = ref(1);
    const PAGE_SIZE = 10;

    // Selection
    const dsChon = ref<number[]>([]);
    const chonTatCa = ref(false);

    // Modal
    const showModal = ref(false);
    const modalMode = ref<'them' | 'sua'>('them');
    const itemDangSua = ref<DungCu | null>(null);
    const form = ref({ ten: '', moTa: '', trangThai: 'Đang sử dụng' as DungCu['trangThai'] });

    // Confirm delete
    const showConfirmXoa = ref(false);
    const itemChon = ref<DungCu | null>(null);

    // Pagination display
    const dsTrang = computed(() => {
      const total = tongTrang.value;
      const cur = trangHienTai.value;
      const pages: number[] = [];
      const delta = 2;
      for (let i = Math.max(1, cur - delta); i <= Math.min(total, cur + delta); i++) {
        pages.push(i);
      }
      return pages;
    });

    // Methods
    async function taiDuLieu() {
      loading.value = true;
      try {
        const res = await dungCuService.getDanhSach({
          keyword: tuKhoa.value,
          trangThai: trangThaiFilter.value,
          page: trangHienTai.value,
          pageSize: PAGE_SIZE,
        });
        danhSach.value = res.data;
        tongTrang.value = res.totalPages;
      } catch (err) {
        console.error('Lỗi tải dữ liệu:', err);
        // Fallback mock data for demo
        danhSach.value = [
          { id: 1, ten: 'Áo tập luyện', moTa: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày', trangThai: 'Đang sử dụng' },
          { id: 2, ten: 'Áo tập luyện', moTa: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày', trangThai: 'Đang sử dụng' },
          { id: 3, ten: 'Áo tập luyện', moTa: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày', trangThai: 'Đang sử dụng' },
        ];
        tongTrang.value = 6;
      } finally {
        loading.value = false;
      }
    }

    function timKiem() {
      trangHienTai.value = 1;
      taiDuLieu();
    }

    function lamMoi() {
      tuKhoa.value = '';
      trangThaiFilter.value = '';
      trangHienTai.value = 1;
      taiDuLieu();
    }

    function doiTrang(p: number) {
      if (p < 1 || p > tongTrang.value) return;
      trangHienTai.value = p;
    }

    watch(trangHienTai, taiDuLieu);

    function toggleChonTatCa() {
      dsChon.value = chonTatCa.value ? danhSach.value.map(i => i.id) : [];
    }

    function badgeClass(tt: string) {
      if (tt === 'Đang sử dụng') return 'badge-active';
      if (tt === 'Ngừng sử dụng') return 'badge-inactive';
      return 'badge-maintenance';
    }

    function moModalThem() {
      modalMode.value = 'them';
      form.value = { ten: '', moTa: '', trangThai: 'Đang sử dụng' };
      showModal.value = true;
    }

    function moModalSua(item: DungCu) {
      modalMode.value = 'sua';
      itemDangSua.value = item;
      form.value = { ten: item.ten, moTa: item.moTa, trangThai: item.trangThai };
      showModal.value = true;
    }

    function dongModal() {
      showModal.value = false;
    }

    async function luuDungCu() {
      if (!form.value.ten.trim()) return alert('Vui lòng nhập tên dụng cụ');
      saving.value = true;
      try {
        if (modalMode.value === 'them') {
          await dungCuService.themMoi(form.value);
        } else if (itemDangSua.value) {
          await dungCuService.capNhat(itemDangSua.value.id, form.value);
        }
        dongModal();
        taiDuLieu();
      } catch (err) {
        console.error('Lỗi lưu:', err);
      } finally {
        saving.value = false;
      }
    }

    function xacNhanXoa(item: DungCu) {
      itemChon.value = item;
      showConfirmXoa.value = true;
    }

    async function thucHienXoa() {
      if (!itemChon.value) return;
      deleting.value = true;
      try {
        await dungCuService.xoa(itemChon.value.id);
        showConfirmXoa.value = false;
        taiDuLieu();
      } catch (err) {
        console.error('Lỗi xóa:', err);
      } finally {
        deleting.value = false;
      }
    }

    function xemChiTiet(item: DungCu) {
      alert(`Chi tiết: ${item.ten}\n${item.moTa}`);
    }

    function xemDaXoa() {
      alert('Chuyển sang danh sách đã xóa');
    }

    onMounted(taiDuLieu);

    return {
      danhSach, loading, saving, deleting,
      tuKhoa, trangThaiFilter,
      trangHienTai, tongTrang, dsTrang,
      dsChon, chonTatCa, toggleChonTatCa,
      showModal, modalMode, form, itemDangSua,
      showConfirmXoa, itemChon,
      timKiem, lamMoi, doiTrang,
      badgeClass,
      moModalThem, moModalSua, dongModal, luuDungCu,
      xacNhanXoa, thucHienXoa,
      xemChiTiet, xemDaXoa,
    };
  },
});
</script>

<style scoped>
/* === RESET & BASE === */
* { box-sizing: border-box; margin: 0; padding: 0; }

.page-wrapper {
  font-family: 'Segoe UI', 'Be Vietnam Pro', sans-serif;
  background: #f5f6fa;
  min-height: 100vh;
  padding: 20px 28px;
  color: #1e2535;
}

/* === BREADCRUMB === */
.breadcrumb {
  font-size: 13px;
  color: #8a92a6;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.breadcrumb .sep { color: #c5cbda; }
.breadcrumb .active { color: #4a5568; font-weight: 500; }

/* === CARD === */
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  overflow: hidden;
}

/* === CARD HEADER === */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f0f2f7;
}
.title {
  color: rgba(34, 48, 62, 0.9);
  font-family: Public Sans;
font-weight: 700;
font-style: Bold;
font-size: 18px;
leading-trim: NONE;
line-height: 38px;
letter-spacing: 0px;

}
.header-actions {
  display: flex;
  gap: 10px;
}

/* === BUTTONS === */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 13.5px;
  font-weight: 500;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  transition: all 0.18s;
}
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-primary {
  background: #e53e3e;
  color: #fff;
}
.btn-primary:hover:not(:disabled) { background: #c53030; }

.btn-secondary {
  background: #8592A3;
  color: #fff;
}
.btn-secondary:hover:not(:disabled) { background: #2d3748; }

.btn-danger {
  background: #E81919;
  color: #fff;
}
.btn-danger:hover:not(:disabled) { background: #c53030; }

.btn-ghost {
  background: #f0f2f7;
  color: #4a5568;
}
.btn-ghost:hover:not(:disabled) { background: #e2e6f0; }

.btn-search {
  background: #696CFF;
  color: #fff;
}
.btn-search:hover:not(:disabled) { background: #5a67d8; }

.btn-icon {
  background: #8592A3;
  color: #FFFFFF;
  padding: 8px 10px;
}
.btn-icon:hover { background: #e2e6f0; }

/* === SEARCH BAR === */
.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  gap: 12px;
  border-bottom: 1px solid #f0f2f7;
}
.search-left {
  display: flex;
  gap: 12px;
  flex: 1;
}
.search-right {
  display: flex;
  gap: 8px;
}

.input-wrapper {
  position: relative;
  flex: 1;
  max-width: 260px;
}
.icon-search {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}
.input-search {
  width: 100%;
  padding: 8px 2px 8px 10px;
  border: 1.5px solid #e2e8f0;
  border-radius: 7px;
  font-size: 13.5px;
  color: #22303E;
  background: #fafbfd;
  outline: none;
  transition: border 0.18s;
}
.input-search:focus { border-color: #667eea; background: #fff; }
.input-search::placeholder { color: #b0bac9; }

.select-wrapper {
  position: relative;
  min-width: 180px;
}
.input-select {
  width: 100%;
  padding: 8px 32px 8px 12px;
  line-height: 21px;
  border: 1px solid rgba(34, 48, 62, 0.22);
  border-radius: 4px;
  font-size: 15px;
  color: rgba(34, 48, 62, 0.4);
  background: white;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: border 0.18s;
}
.input-select:focus { border-color: rgb(105, 108, 255);
  box-shadow: 0 0 0 2px rgb(165, 167, 255); }
.icon-caret {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  pointer-events: none;
}

/* === TABLE === */
.table-wrapper {
  position: relative;
  overflow-x: auto;
}
.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(34, 48, 62, 0.9);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-bottom: 1.5px solid #f0f2f7;
  background: #fafbfd;
  white-space: nowrap;
  
}
.table td {
  padding: 13px 16px;
  border-bottom: 1px solid #f7f8fb;
  vertical-align: middle;
  color: rgba(34, 48, 62, 0.7);
}
.table tr:last-child td { border-bottom: none; }
.table tr.selected td { background: #eef2ff; }
.table tr:hover td { background: #f8f9fe; }

.col-check { width: 40px; color: rgba(34, 48, 62, 0.4); font-size: 2px; }
.col-stt { width: 50px; border: 1px;}
.col-ten { width: 180px; }
.col-mota { }
.col-trangthai { width: 150px; }
.col-action { width: 120px; }

.empty-row {
  text-align: center;
  color: #a0aec0;
  padding: 40px 0 !important;
  font-size: 14px;
}

/* === BADGES === */
.badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 12.5px;
  font-weight: 500;
}
.badge-active {
  background: rgba(113, 221, 55, 0.16);
  color: rgba(113, 221, 55, 1);
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  
}
.badge-inactive {
  background: #fed7d7;
  color: #9b2c2c;
}
.badge-maintenance {
  background: #fefcbf;
  color: #744210;
}

/* === ACTION BUTTONS === */
.action-group {
  display: flex;
  gap: 6px;
}
.action-btn {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
}
.action-btn.view { background: #ebf4ff; color: #3182ce; }
.action-btn.view:hover { background: #bee3f8; }
.action-btn.edit { background: #f0fff4; color: #38a169; }
.action-btn.edit:hover { background: #c6f6d5; }
.action-btn.delete { background: #fff5f5; color: #e53e3e; }
.action-btn.delete:hover { background: #fed7d7; }

/* === PAGINATION === */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 24px;
}
.page-btn {
  min-width: 34px;
  height: 34px;
  padding: 0 6px;
  border-radius: 7px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  color: #4a5568;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.page-btn:hover:not(:disabled) { background: #f0f2f7; border-color: #c5cbda; }
.page-btn.active {
  background: #e53e3e;
  color: #fff;
  border-color: #e53e3e;
}
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* === MODAL === */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(2px);
}
.modal {
  background: #fff;
  border-radius: 12px;
  width: 480px;
  max-width: 95vw;
  box-shadow: 0 20px 60px rgba(0,0,0,0.18);
  overflow: hidden;
}
.modal.modal-sm { width: 360px; }
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  border-bottom: 1px solid #f0f2f7;
}
.modal-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1e2535;
}
.modal-close {
  background: none;
  border: none;
  font-size: 16px;
  color: #a0aec0;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}
.modal-close:hover { background: #f0f2f7; color: #4a5568; }
.modal-body {
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.modal-body p { font-size: 14px; color: #4a5568; line-height: 1.5; }
.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 14px 22px;
  border-top: 1px solid #f0f2f7;
  background: #fafbfd;
}

/* === FORM === */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group label {
  font-size: 13.5px;
  font-weight: 500;
  color: #4a5568;
}
.required { color: #e53e3e; }
.form-input {
  padding: 9px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 7px;
  font-size: 14px;
  color: #2d3748;
  outline: none;
  transition: border 0.18s;
  background: #fafbfd;
  resize: vertical;
  font-family: inherit;
}
.form-input:focus { border-color: #667eea; background: #fff; }

/* === CHECKBOX === */
input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #667eea;
  cursor: pointer;
}

/* === RESPONSIVE === */
@media (max-width: 700px) {
  .page-wrapper { padding: 14px; }
  .search-bar { flex-direction: column; align-items: stretch; }
  .search-left { flex-direction: column; }
  .col-mota, .col-stt { display: none; }
}
</style>