import { mount } from "@vue/test-utils";
import ProgressTimer from "@/components/ProgressTimer.vue";

describe("Overlay.vue", () => {

  it("renders the seconds", () => {
    const wrapper = mount(ProgressTimer)

    wrapper.setData({ now: 10 })

    expect(wrapper.html()).toContain("00 : 00 : 10");
  });

  it("renders the minutes", () => {
    const wrapper = mount(ProgressTimer)

    wrapper.setData({ now: 60 })

    expect(wrapper.html()).toContain("00 : 01 : 00");
  });

  it("renders the hours", () => {
    const wrapper = mount(ProgressTimer)

    wrapper.setData({ now: 3600 })

    expect(wrapper.html()).toContain("01 : 00 : 00");
  });
});