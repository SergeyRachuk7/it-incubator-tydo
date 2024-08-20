
describe('addItemForm', () => {
  it('base example, visually looks correct', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=additemform-component--additem-form-base-example&viewMode=story');
    expect(image).toMatchImageSnapshot();
  });
});


