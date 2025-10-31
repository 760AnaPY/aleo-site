import React from 'react';
import ZKSnarkDiagram from '../ZKSnarkDiagram';

const ZKDiagramSection = () => {
  return (
    <section id="zk-diagram" className="bg-[#0a0a0f] text-white px-8 pt-2 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <ZKSnarkDiagram />
        </div>
      </div>
    </section>
  );
};

export default ZKDiagramSection;