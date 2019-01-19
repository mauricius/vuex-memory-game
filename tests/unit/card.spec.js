import { mount } from "@vue/test-utils";
import Card from "@/components/Card.vue";

describe("Card.vue", () => {

  it("renders image with the passed url", () => {
    const id = 1;
    const flipped = false;
    const discovered = false;
    const url = "http://site.com/image.jpg";

    const wrapper = mount(Card, {
      propsData: { id, flipped, discovered, url }
    });
    expect(wrapper.html()).toContain(`<img src="${url}"`);
  });

  it("renders the card with flipped class when the card is flipped", () => {
    const id = 1;
    const flipped = false;
    const discovered = false;
    const url = "http://site.com/image.jpg";

    const wrapper = mount(Card, {
      propsData: { id, flipped, discovered, url }
    });
    expect(wrapper.classes()).not.toContain("flipped");

    wrapper.setProps({ flipped: true });

    expect(wrapper.classes()).toContain("flipped");
  });


});
