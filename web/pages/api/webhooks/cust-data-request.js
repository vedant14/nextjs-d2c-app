export default async function handler(request, response) {
  return response.status(200).send({
    data: true,
  });
}
