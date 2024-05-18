import TextImprover from "@/components/TextImprover";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-7xl justify-between text-sm lg:flex flex-col gap-2 h-full">
        <h1 className="text-3xl">Text improver.</h1>
        <div className="w-full h-full">
          <TextImprover />
        </div>
      </div>
    </main>
  );
}
