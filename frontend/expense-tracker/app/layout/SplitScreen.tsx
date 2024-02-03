interface LayoutProp {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export const SplitLayout: React.FC<LayoutProp> = ({ left, center, right }) => {
  return (
    <main className="flex justify-center">
      <section className="hidden md:block md:w-[20%] lg:w-[15%] ">{left}</section>
      <section className="w-[80%] md:block md:w-[80%] lg:w-[60%] ">{center}</section>
      <section className="hidden lg:block w-[25%] lg:w-[25%] ">{right}</section>
    </main>
  );
};
