import HtmlLangSetter from "@/components/layout/HtmlLangSetter";

export default function TamilLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-tamil" lang="ta">
      <HtmlLangSetter lang="ta" />
      {children}
    </div>
  );
}
