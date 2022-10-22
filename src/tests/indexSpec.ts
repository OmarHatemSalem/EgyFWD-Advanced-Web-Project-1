import routes from '../routes';
import images from '../routes/api/images';

it('expect Hello World', () => {
  expect(routes.get("/")).toEqual("Hello World");
})


it('expect new image with size 300x200', () => {
  expect(images.get('filename=hippo&width=200&height=300')).toBeTruthy();
})