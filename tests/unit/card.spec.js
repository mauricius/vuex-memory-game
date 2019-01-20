import { mount } from "@vue/test-utils";
import Card from "@/components/Card.vue";

describe("Card.vue", () => {

  let wrapper;

  beforeEach(() => {
    const id = 1;
    const flipped = false;
    const discovered = false;
    const url = "http://site.com/image.jpg";

    wrapper = mount(Card, {
      propsData: { id, flipped, discovered, url }
    });
  });

  it("renders image with the passed url", () => {
    expect(wrapper.html()).toContain(`<img src="http://site.com/image.jpg"`);
  });

  it("renders the card with 'flipped' class when the card is flipped", () => {
    expect(wrapper.classes()).not.toContain("flipped");

    wrapper.setProps({ flipped: true });

    expect(wrapper.classes()).toContain("flipped");
  });

  it("renders the card with 'pulse' class when the card is discovered", () => {
    expect(wrapper.classes()).not.toContain("pulse");

    wrapper.setProps({ discovered: true });

    expect(wrapper.classes()).toContain("pulse");
  });

  it("should emit the 'flip' event when the card is clicked", () => {
    wrapper.trigger('click');

    expect(wrapper.emitted().flip).toBeTruthy()
    expect(wrapper.emitted().flip[0]).toEqual([1]);
  });
});
