import { DropDownSelector } from "@/common/components";

type Props = {
  params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="w-full h-screen p-10 relative ">
      <div className="mb-10" />
      <DropDownSelector />
      <div className="mb-10" />
    </div>
  );
}

