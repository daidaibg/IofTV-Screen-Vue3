<!-- eslint-disable vue/valid-template-root -->
<template></template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
//挂载在 window 方便与在js中使用
window['$message'] = ElMessage
</script>
