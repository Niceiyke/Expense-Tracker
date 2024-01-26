interface LayoutProp {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export const SplitLayout: React.FC<LayoutProp> = ({ left, center, right }) => {
  return (
    <main className="flex">
      <section className="w-[15%]">{left}</section>
      <section className="w-[60%]">{center}</section>
      <section className="w-[25%]">{right}</section>
    </main>
  );
};
