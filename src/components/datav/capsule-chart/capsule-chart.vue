<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import type { DefaultConfigType } from "./index.d";
import { cloneDeep } from "lodash-es";
import { merge } from "lodash-es";
const mergedConfig = ref<any>(null);
const capsuleLength = ref<any>([]);
const capsuleValue = ref<any>([]);
const labelData = ref<any>([]);
// const labelDataLength = ref<any>([]);

const defaultConfig = reactive<DefaultConfigType>({
    // Colors (hex|rgb|rgba|color keywords) ['#000', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 1)', 'red']
    colors: [
        "#37a2da",
        "#32c5e9",
        "#67e0e3",
        "#9fe6b8",
        "#ffdb5c",
        "#ff9f7f",
        "#fb7293",
    ],
    unit: "",
    showValue: false, // Show item value
});
const props = withDefaults(
    defineProps<{
        config: object | any;
        data: Array<{
            name: string;
            value: string | number;
        }>;
    }>(),
    {
        config: () => { },
        data: () => [],
    }
);
const calcData = () => {
    mergeConfig();
    calcCapsuleLengthAndLabelData();
};
const mergeConfig = () => {
    mergedConfig.value = merge(cloneDeep(defaultConfig), props.config || {});
};
const calcCapsuleLengthAndLabelData = () => {
    if (!props.data.length) return;
    const newcapsuleValue = props.data.map((item: any) => item.value);
    const maxValue = Math.max(...newcapsuleValue);
    capsuleValue.value = newcapsuleValue;
    capsuleLength.value = newcapsuleValue.map((v: any) =>
        maxValue ? v / maxValue : 0
    );
    const oneFifth = maxValue / 5;
    const newlabelData = Array.from(
        new Set(new Array(6).fill(0).map((v, i) => Math.ceil(i * oneFifth)))
    );
    labelData.value = newlabelData;
    // labelDataLength.value = Array.from(newlabelData).map((v) =>
    //     maxValue ? v / maxValue : 0
    // );
    // console.log(labelDataLength.value);
};
watch(
    () => props.data,
    (newval: any) => {
        calcData();
    },
);
watch(
    () => props.config,
    (newval: any) => {
        calcData();
    },
);
onMounted(() => {
    calcData();
});
</script>

<template>
    <div class="dv-capsule-chart">
        <template v-if="mergedConfig">
            <div class="label-column">
                <div v-for="item in data" :key="item.name">
                    {{ item.name }}
                </div>
                <div>&nbsp;</div>
            </div>
            <div class="capsule-container">
                <div class="capsule-item" v-for="(capsule, index) in capsuleLength" :key="index">
                    <div class="capsule-item-column" :style="`width: ${capsule * 100}%; background-color: ${mergedConfig.colors[index % mergedConfig.colors.length]
                    };`">
                        <div v-if="mergedConfig.showValue" class="capsule-item-value">
                            {{ capsuleValue[index] }}
                        </div>
                    </div>
                </div>

                <div class="unit-label">
                    <div v-for="(label, index) in labelData" :key="label + index">
                        {{ label }}
                    </div>
                </div>
            </div>

            <div class="unit-text" v-if="mergedConfig.unit">
                {{ mergedConfig.unit }}
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.dv-capsule-chart {
    position: relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 10px;
    color: #fff;

    .label-column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        padding-right: 10px;
        text-align: right;
        font-size: 12px;

        div {
            height: 20px;
            line-height: 20px;
        }
    }

    .capsule-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .capsule-item {
        box-shadow: 0 0 3px #999;
        height: 10px;
        margin: 5px 0px;
        border-radius: 5px;

        .capsule-item-column {
            position: relative;
            height: 8px;
            margin-top: 1px;
            border-radius: 5px;
            transition: all 0.3s;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .capsule-item-value {
                font-size: 12px;
                transform: translateX(100%);
            }
        }
    }

    .unit-label {
        height: 20px;
        font-size: 12px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .unit-text {
        text-align: right;
        display: flex;
        align-items: flex-end;
        font-size: 12px;
        line-height: 20px;
        margin-left: 10px;
    }
}
</style>
