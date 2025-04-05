<template>
  <el-card>
    <el-form ref="form" :inline="true">
      <el-form-item label="一级分类">
        <el-select style="width: 250px" v-model="c1Id" @change="handleC2List">
          <el-option
            v-for="item in c1List"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select style="width: 250px" v-model="c2Id" @change="handleC3List">
          <el-option
            v-for="item in c2List"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类"
        ><el-select style="width: 250px" v-model="c3Id" @change="c3Change">
          <el-option
            v-for="item in c3List"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
defineProps<{
  c1List: any[];
  c2List: any[];
  c3List: any[];
}>();

const c1Id = ref("");
const c2Id = ref("");
const c3Id = ref("");

const emit = defineEmits(["c1Change", "c2Change", "getCId"]);

const handleC2List = () => {
  c2Id.value = "";
  c3Id.value = "";
  emit("c1Change", c1Id.value);
  emit("getCId", [c1Id.value, c2Id.value, c3Id.value]);
};
const handleC3List = () => {
  c3Id.value = "";
  emit("c2Change", c2Id.value);
  emit("getCId", [c1Id.value, c2Id.value, c3Id.value]);
};

const c3Change = () => {
  emit("getCId", [c1Id.value, c2Id.value, c3Id.value]);
};
</script>

<style scoped></style>
