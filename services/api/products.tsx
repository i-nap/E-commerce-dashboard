export const getAllProducts = () => {
  return fetch(`${process.env.SERVER_URL}/products`, { cache: "no-store" }).then((res) => res.json());
}