export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="px-2">{children}</div>
    </div>
  );
}
