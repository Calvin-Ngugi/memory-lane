export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <p className="text-2xl lg:text-3xl !leading-tight mx-auto max-w-xl text-center">
        Welcome to memory lane, where you get to create albums and take a trip down memory lane
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
