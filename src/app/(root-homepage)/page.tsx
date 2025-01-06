import EditorPanel from "./_compnents/EditorPanel";
import Header from "./_compnents/Header";
import OutputPnael from "./_compnents/OutputPnael";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
      <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
         <EditorPanel/>
         <OutputPnael/>
        </div>
      </div>
    </div>
  );
}