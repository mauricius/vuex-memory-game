import { mount } from "@vue/test-utils";
import Overlay from "@/components/Overlay.vue";

describe("Overlay.vue", () => {

  it("renders the defaul slot", () => {
    const wrapper = mount(Overlay, {
       slots: {
        default: '<p>Slot</p>'
       }
    })

    expect(wrapper.html()).toContain("<p>Slot</p>");
  });
});