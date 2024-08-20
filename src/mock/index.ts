import Mock from 'mockjs'
import type { MockParams } from "./index.d";
import MockIndex from "./mock-index"
Mock.setup({
    timeout: "300",
});
const mocks = [...MockIndex];
export function mockXHR() {
    let i: MockParams;
    for (i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || "get", i.response);
    }
}
