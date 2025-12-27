export async function GET(req, { params }) {
  const { path } = await params

  return Response.json({ path }, { status: 200 })
}