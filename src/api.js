export async function getFoods(order = "") {
  const query = `order=${order}`;
  const response = await fetch(`https://learn.codeit.kr/9954/foods?${query}`);
  const body = await response.json();
  return body;
}
