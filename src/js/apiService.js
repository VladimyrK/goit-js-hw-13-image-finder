export default async function getFetch(search, page) {
  // const page = '1';
  const perPage = '12';
  const promise = await fetch(
    `https://pixabay.com/api/?key=23604393-9751c4fdb7943747aa1d7afad&q=${search}&page=${page}&per_page=${perPage}&image_type=photo`,
  );
  if (!promise.ok) {
    throw new Error(promise.status);
  }
  const data = await promise.json();
  console.log(promise);
  return data.hits;
}
