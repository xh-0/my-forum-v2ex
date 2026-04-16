<template>
  <div class="space-y-4">
    <div
      class="bg-white border border-gray-200 rounded-sm px-4 py-3 shadow-sm flex items-center text-sm"
    >
      <router-link to="/" class="text-blue-500 hover:underline"
        >DUSK2</router-link
      >
      <span class="mx-2 text-gray-400">›</span>
      <span class="text-gray-600 font-medium">创作新话题</span>
    </div>

    <t-card :bordered="false" class="shadow-sm !rounded-sm">
      <t-form
        ref="form"
        :data="formData"
        :rules="rules"
        label-align="top"
        @submit="onSubmit"
      >
        <t-form-item name="title" label="话题标题">
          <t-input
            v-model="formData.title"
            placeholder="请输入话题标题，如果标题能够表达完整内容，正文可以为空"
            size="large"
            class="!bg-gray-50 border-none"
          />
        </t-form-item>

        <t-form-item name="content" label="正文内容">
          <t-textarea
            v-model="formData.content"
            placeholder="请输入正文内容"
            :autosize="{ minRows: 8, maxRows: 15 }"
            class="!bg-gray-50"
          />
        </t-form-item>

        <div
          class="mt-6 flex items-center justify-between border-t border-gray-100 pt-4"
        >
          <div class="text-xs text-gray-400">
            <p>• 请尽量发布对他人有帮助的内容</p>
            <p>• 保持友善，尊重他人的观点</p>
          </div>
          <div class="flex gap-3">
            <t-button variant="outline" theme="default" @click="$router.back()">
              取消
            </t-button>
            <t-button
              theme="primary"
              type="submit"
              :loading="submitting"
              class="!bg-[#333] !border-none"
            >
              发布话题
            </t-button>
          </div>
        </div>
      </t-form>
    </t-card>

    <div class="bg-yellow-50 border border-yellow-100 rounded-sm p-4">
      <h4
        class="text-yellow-800 text-sm font-bold mb-2 flex items-center gap-1"
      >
        <t-icon name="info-circle-filled" size="small" />
        发帖提示
      </h4>
      <ul class="text-xs text-yellow-700/80 space-y-1 list-disc list-inside">
        <li>社区是一个讨论公共话题的地方，请不要发布过于私人的信息。</li>
        <li>如果是一个具体的问题，请在标题中描述清楚。</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { createPost } from "@/api/forum";
import { MessagePlugin } from "tdesign-vue-next";

const router = useRouter();
const submitting = ref(false);

const formData = reactive({
  title: "",
  content: "",
});

// 表单校验规则
const rules = {
  title: [
    { required: true, message: "标题是必填的", type: "error" },
    { max: 120, message: "标题不能超过 120 个字符", type: "error" },
  ],
  content: [{ required: true, message: "正文内容不能为空", type: "error" }],
};

const onSubmit = async ({ validateResult, firstError }: any) => {
  if (validateResult !== true) {
    MessagePlugin.warning(firstError);
    return;
  }

  submitting.value = true;
  try {
    // 调用之前封装好的 createPost 接口
    await createPost(formData);
    MessagePlugin.success("话题发布成功");
    router.push("/"); // 发布成功后跳转回首页
  } catch (err: any) {
    MessagePlugin.error(err.response?.data?.error || "发布失败，请稍后重试");
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
/* 深度修改 TDesign 表单标签样式，使其更符合 dusk2 这种硬朗风格 */
:deep(.t-form__label) {
  font-size: 13px;
  font-weight: bold;
  color: #666;
  margin-bottom: 8px;
}

:deep(.t-input),
:deep(.t-textarea__inner) {
  border-radius: 2px;
  border-color: #eee;
}

:deep(.t-input:hover),
:deep(.t-textarea__inner:hover) {
  border-color: #ccc;
}
</style>