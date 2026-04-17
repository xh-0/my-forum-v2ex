<template>
  <div class="max-w-4xl mx-auto p-6">
    <t-card
      title="节点（标签）字典管理"
      :bordered="false"
      class="shadow-sm !rounded-sm"
    >
      <template #actions>
        <t-button variant="outline" @click="handleOpenAdd">
          <template #icon><t-icon name="add" /></template>
          新增节点
        </t-button>
      </template>

      <t-table
        row-key="id"
        :data="categoryList"
        :columns="columns"
        :loading="loading"
        size="small"
        hover
      >
        <template #operation="{ row }">
          <t-link theme="primary" @click="handleEdit(row)" class="mr-3"
            >编辑</t-link
          >
          <t-popconfirm
            content="删除节点不会删除帖子，但可能导致分类显示异常，确定吗？"
            @confirm="handleDelete(row.id)"
          >
            <t-link theme="danger">删除</t-link>
          </t-popconfirm>
        </template>
      </t-table>
    </t-card>

    <t-dialog
      v-model:visible="visible"
      :header="editingId ? '编辑节点' : '创建新节点'"
      :confirm-btn="loading ? '处理中...' : '保存'"
      @confirm="submitForm"
      @closed="resetForm"
    >
      <t-form :data="formData" label-align="top" class="mt-4">
        <t-form-item
          label="节点 Key (URL/存储用)"
          name="key"
          help="例如: tech, qna (创建后建议不要修改)"
        >
          <t-input
            v-model="formData.key"
            placeholder="英文小写"
            :disabled="!!editingId"
          />
        </t-form-item>
        <t-form-item label="节点名称 (页面显示)" name="value">
          <t-input v-model="formData.value" placeholder="例如: 技术" />
        </t-form-item>
        <t-form-item label="显示权重" name="order" help="数字越大越靠前">
          <t-input-number v-model="formData.order" :min="0" class="w-full" />
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import { Icon as TIcon } from "tdesign-icons-vue-next";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/api/forum";

const categoryList = ref([]);
const loading = ref(false);
const visible = ref(false);
const editingId = ref<number | null>(null);

// { id: number; key: string; value: string; order: number; }
const initialForm = { id: "", key: "", value: "", order: 0 };
const formData = ref({ ...initialForm });

const columns = [
  { colKey: "id", title: "序号", width: 50, align: "center" },
  { colKey: "key", title: "Key", width: 120 },
  { colKey: "value", title: "名称" },
  { colKey: "order", title: "权重", width: 100, align: "center" },
  // createdAt updatedAt
  { colKey: "createdAt", title: "创建时间", width: 200, align: "center" },
  { colKey: "updatedAt", title: "更新时间", width: 200, align: "center" },
  { colKey: "operation", title: "操作", width: 120, fixed: "right" },
];

const fetchCategories = async () => {
  loading.value = true;
  try {
    const res = await getCategories();
    categoryList.value = res as any;
  } catch (err) {
    MessagePlugin.error("加载字典失败");
  } finally {
    loading.value = false;
  }
};

// 打开新增
const handleOpenAdd = () => {
  editingId.value = null;
  formData.value = { ...initialForm };
  visible.value = true;
};

// 打开编辑 - 需要回填数据
const handleEdit = (row: any) => {
  editingId.value = row.id;
  formData.value = {
    id: row.id,
    key: row.key,
    value: row.value,
    order: row.order,
  };
  visible.value = true;
};

const resetForm = () => {
  formData.value = { ...initialForm };
  editingId.value = null;
};

const submitForm = async () => {
  if (!formData.value.key || !formData.value.value) {
    return MessagePlugin.warning("请完整填写 Key 和名称");
  }

  loading.value = true;
  try {
    if (editingId.value) {
      // 这里的接口建议改为 PUT 或根据 id 更新
      await updateCategory(formData.value);
      MessagePlugin.success("节点更新成功");
    } else {
      await addCategory(formData.value);
      MessagePlugin.success("节点创建成功");
    }
    visible.value = false;
    fetchCategories();
  } catch (err) {
    MessagePlugin.error("保存失败，Key 可能已存在");
  } finally {
    loading.value = false;
  }
};

const handleDelete = async (id: number) => {
  try {
    await deleteCategory(id);
    MessagePlugin.success("已删除");
    fetchCategories();
  } catch (err) {
    MessagePlugin.error("删除失败");
  }
};

onMounted(fetchCategories);
</script>