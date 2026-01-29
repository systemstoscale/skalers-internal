'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

// Base node styles
const baseNodeStyle = "px-4 py-3 rounded-xl font-medium text-sm shadow-lg border-2 min-w-[140px] text-center";

// ============================================
// VERTICAL FLOW NODES (Top/Bottom handles)
// ============================================

// Start/End Node - Rounded pill shape
export const StartEndNode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400 text-white`}>
      <Handle type="target" position={Position.Top} className="!bg-emerald-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-emerald-400" />
      {data.label as string}
    </div>
  );
});
StartEndNode.displayName = 'StartEndNode';

// Process Node - Standard rectangle
export const ProcessNode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400 text-white`}>
      <Handle type="target" position={Position.Top} className="!bg-blue-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-400" />
      {data.label as string}
    </div>
  );
});
ProcessNode.displayName = 'ProcessNode';

// Decision Node - Diamond shape styling (keeps all sides for branching)
export const DecisionNode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400 text-white rotate-0`}>
      <Handle type="target" position={Position.Top} className="!bg-amber-400" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-amber-400" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-amber-400" />
      <Handle type="source" position={Position.Left} id="left" className="!bg-amber-400" />
      <div className="flex items-center justify-center gap-1">
        <span className="text-amber-200">?</span>
        {data.label as string}
      </div>
    </div>
  );
});
DecisionNode.displayName = 'DecisionNode';

// Critical Node - Red pulsing for urgent items
export const CriticalNode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white pulse-critical`}>
      <Handle type="target" position={Position.Top} className="!bg-red-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-red-400" />
      <div className="flex items-center justify-center gap-2">
        {data.label as string}
      </div>
    </div>
  );
});
CriticalNode.displayName = 'CriticalNode';

// Success Node - Green for positive outcomes
export const SuccessNode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} bg-gradient-to-r from-green-500 to-green-600 border-green-400 text-white`}>
      <Handle type="target" position={Position.Top} className="!bg-green-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-green-400" />
      <div className="flex items-center justify-center gap-2">
        {data.label as string}
      </div>
    </div>
  );
});
SuccessNode.displayName = 'SuccessNode';

// AI Node - Special styling for AI/Skalers
export const AINode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} bg-gradient-to-r from-[#f8d380] to-[#fbbf24] border-[#f8d380] text-[#222] glow-gold`}>
      <Handle type="target" position={Position.Top} className="!bg-[#f8d380]" />
      <Handle type="source" position={Position.Bottom} className="!bg-[#f8d380]" />
      <div className="flex items-center justify-center gap-2">
        {data.label as string}
      </div>
    </div>
  );
});
AINode.displayName = 'AINode';

// Sara Node - Pink for acquisition
export const SaraNode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} bg-gradient-to-r from-pink-500 to-pink-600 border-pink-400 text-white glow-pink`}>
      <Handle type="target" position={Position.Top} className="!bg-pink-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-pink-400" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-pink-400" />
      <Handle type="source" position={Position.Left} id="left" className="!bg-pink-400" />
      <div className="flex items-center justify-center gap-2">
        {data.label as string}
      </div>
    </div>
  );
});
SaraNode.displayName = 'SaraNode';

// Max Node - Blue for fulfillment
export const MaxNode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400 text-white glow-blue`}>
      <Handle type="target" position={Position.Top} className="!bg-blue-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-400" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-blue-400" />
      <Handle type="source" position={Position.Left} id="left" className="!bg-blue-400" />
      <div className="flex items-center justify-center gap-2">
        {data.label as string}
      </div>
    </div>
  );
});
MaxNode.displayName = 'MaxNode';

// Tool Node - Purple for tools/systems
export const ToolNode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400 text-white`}>
      <Handle type="target" position={Position.Top} className="!bg-purple-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-purple-400" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-purple-400" />
      <Handle type="target" position={Position.Right} id="right" className="!bg-purple-400" />
      <div className="flex items-center justify-center gap-2">
        {data.label as string}
      </div>
    </div>
  );
});
ToolNode.displayName = 'ToolNode';

// Client Node - Cyan for clients
export const ClientNode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} bg-gradient-to-r from-cyan-500 to-cyan-600 border-cyan-400 text-white`}>
      <Handle type="target" position={Position.Top} className="!bg-cyan-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-400" />
      <div className="flex items-center justify-center gap-2">
        {data.label as string}
      </div>
    </div>
  );
});
ClientNode.displayName = 'ClientNode';

// Product Node - Indigo for products
export const ProductNode = memo(({ data }: NodeProps) => {
  return (
    <div className={`${baseNodeStyle} bg-gradient-to-r from-indigo-500 to-indigo-600 border-indigo-400 text-white`}>
      <Handle type="target" position={Position.Top} className="!bg-indigo-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-indigo-400" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-indigo-400" />
      <div className="flex items-center justify-center gap-2">
        {data.label as string}
      </div>
    </div>
  );
});
ProductNode.displayName = 'ProductNode';

// Default node types
export const nodeTypes = {
  startEnd: StartEndNode,
  process: ProcessNode,
  decision: DecisionNode,
  critical: CriticalNode,
  success: SuccessNode,
  ai: AINode,
  sara: SaraNode,
  max: MaxNode,
  tool: ToolNode,
  client: ClientNode,
  product: ProductNode,
};
