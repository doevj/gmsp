export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  console.log({ id });
  return (
    <div className="w-full p-10 relative ">
      <h1>Course Page</h1>
      <p>Course details will be displayed here.</p>
    </div>
  );
}