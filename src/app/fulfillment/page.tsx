'use client';

import Link from 'next/link';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from '@/components/FlowNodes';

// Max's fulfillment workflow
const fulfillmentNodes: Node[] = [
  // Top: Max
  { id: 'max', type: 'max', position: { x: 300, y: 0 }, data: { label: 'Max' } },
  { id: 'fulfillment', type: 'process', position: { x: 300, y: 80 }, data: { label: 'Client Fulfillment' } },

  // Core tools
  { id: 'antigravity', type: 'tool', position: { x: 100, y: 180 }, data: { label: 'Anti-Gravity' } },
  { id: 'claude-code', type: 'ai', position: { x: 300, y: 180 }, data: { label: 'Claude Code' } },
  { id: 'idea-framework', type: 'tool', position: { x: 500, y: 180 }, data: { label: 'IDEA Framework' } },

  // Anti-Gravity breakdown
  { id: 'ag-dev', type: 'process', position: { x: 50, y: 280 }, data: { label: 'Dev Environment' } },
  { id: 'ag-context', type: 'process', position: { x: 150, y: 280 }, data: { label: 'Context Loading' } },

  // Claude Code breakdown
  { id: 'cc-coding', type: 'process', position: { x: 250, y: 280 }, data: { label: 'AI Coding' } },
  { id: 'cc-automation', type: 'process', position: { x: 350, y: 280 }, data: { label: 'Automation' } },

  // IDEA Framework breakdown
  { id: 'instructions', type: 'process', position: { x: 450, y: 280 }, data: { label: 'Instructions' } },
  { id: 'decisions', type: 'decision', position: { x: 550, y: 280 }, data: { label: 'Decisions' } },
  { id: 'executions', type: 'process', position: { x: 500, y: 380 }, data: { label: 'Executions' } },

  // Deliverables
  { id: 'ai-systems', type: 'ai', position: { x: 200, y: 480 }, data: { label: 'AI Systems' } },
  { id: 'automations', type: 'success', position: { x: 400, y: 480 }, data: { label: 'Custom Automations' } },

  // Target clients
  { id: 'target-clients', type: 'client', position: { x: 300, y: 580 }, data: { label: '7-Figure+ Clients' } },
  { id: 'have-clients', type: 'success', position: { x: 300, y: 660 }, data: { label: 'Have Clients, Need Systems' } },

  // Outcome
  { id: 'delivered', type: 'startEnd', position: { x: 300, y: 760 }, data: { label: 'Systems Delivered' } },
];

const fulfillmentEdges: Edge[] = [
  // Top flow
  { id: 'e-max-fulfill', source: 'max', target: 'fulfillment', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-fulfill-ag', source: 'fulfillment', target: 'antigravity', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-fulfill-cc', source: 'fulfillment', target: 'claude-code', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-fulfill-idea', source: 'fulfillment', target: 'idea-framework', animated: true, style: { stroke: '#3b82f6' } },

  // Anti-Gravity breakdown
  { id: 'e-ag-dev', source: 'antigravity', target: 'ag-dev', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-ag-context', source: 'antigravity', target: 'ag-context', animated: true, style: { stroke: '#8b5cf6' } },

  // Claude Code breakdown
  { id: 'e-cc-coding', source: 'claude-code', target: 'cc-coding', animated: true, style: { stroke: '#f8d380' } },
  { id: 'e-cc-auto', source: 'claude-code', target: 'cc-automation', animated: true, style: { stroke: '#f8d380' } },

  // IDEA Framework breakdown
  { id: 'e-idea-inst', source: 'idea-framework', target: 'instructions', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-idea-dec', source: 'idea-framework', target: 'decisions', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-dec-exec', source: 'decisions', target: 'executions', sourceHandle: 'bottom', animated: true, style: { stroke: '#8b5cf6' } },

  // Convergence to deliverables
  { id: 'e-dev-ai', source: 'ag-dev', target: 'ai-systems', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-coding-ai', source: 'cc-coding', target: 'ai-systems', animated: true, style: { stroke: '#f8d380' } },
  { id: 'e-auto-automations', source: 'cc-automation', target: 'automations', animated: true, style: { stroke: '#f8d380' } },
  { id: 'e-exec-automations', source: 'executions', target: 'automations', animated: true, style: { stroke: '#8b5cf6' } },

  // Deliverables to clients
  { id: 'e-ai-target', source: 'ai-systems', target: 'target-clients', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-auto-target', source: 'automations', target: 'target-clients', animated: true, style: { stroke: '#3b82f6' } },

  // Final flow
  { id: 'e-target-have', source: 'target-clients', target: 'have-clients', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-have-delivered', source: 'have-clients', target: 'delivered', animated: true, style: { stroke: '#22c55e' } },
];

const responsibilities = [
  {
    title: 'AI System Building',
    description: 'Build custom AI systems for clients using Claude Code and Anti-Gravity',
    tasks: [
      'Understand client requirements',
      'Design system architecture',
      'Build using IDEA Framework',
      'Test and iterate',
      'Deploy and document',
    ],
    status: 'active',
  },
  {
    title: 'Client Projects',
    description: 'Deliver AI-powered solutions for agency clients',
    tasks: [
      'Discovery calls and scoping',
      'Project planning and milestones',
      'Development and delivery',
      'Training and handover',
      'Ongoing support',
    ],
    status: 'active',
  },
  {
    title: 'Product Development',
    description: 'Build and improve internal products (10xContent, 10xLeads)',
    tasks: [
      'Finish 10xContent.io (handoff to developer Monday)',
      'Build 10xLeads.io infrastructure',
      'Create documentation and training',
      'Iterate based on feedback',
    ],
    status: 'active',
  },
  {
    title: 'IDEA Framework Projects',
    description: 'Structure all work using Instructions, Decisions, Executions, AI',
    tasks: [
      'Write clear instructions for each project',
      'Make decisions and document rationale',
      'Create reusable execution scripts',
      'Let AI do the heavy lifting',
    ],
    status: 'active',
  },
];

const currentClients = [
  { name: 'Samuel Higgs (Advanced Chiro)', type: 'AI Practice Automation', status: 'active' },
  { name: 'Mark Dhamma Partnership', type: 'Skalers Partnership', status: 'active' },
];

export default function FulfillmentPage() {
  const [nodes] = useNodesState(fulfillmentNodes);
  const [edges] = useEdgesState(fulfillmentEdges);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                M
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-white">Max</h1>
                <p className="text-blue-400 text-lg">Client Fulfillment</p>
              </div>
            </div>
            <p className="text-xl text-[#999] mb-8 leading-relaxed">
              Responsible for delivering AI-powered systems to clients. Focus on 7-figure+
              businesses who already have customers but need fulfillment systems.
            </p>
          </div>
        </div>
      </section>

      {/* Target Clients */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Target Clients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card card-max">
              <h3 className="font-bold text-lg mb-2">7-Figure+ Businesses</h3>
              <p className="text-[#999] text-sm">Established businesses with proven revenue</p>
            </div>
            <div className="card card-max">
              <h3 className="font-bold text-lg mb-2">Already Have Clients</h3>
              <p className="text-[#999] text-sm">Don&apos;t need help with acquisition - need systems</p>
            </div>
            <div className="card card-max">
              <h3 className="font-bold text-lg mb-2">Need AI Fulfillment</h3>
              <p className="text-[#999] text-sm">Want to scale operations with AI-powered systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Clients */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Current Clients</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {currentClients.map((client) => (
            <div key={client.name} className="card flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">{client.name}</div>
                <div className="text-sm text-[#888]">{client.type}</div>
              </div>
              <span className="status-active">{client.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fulfillment Flow */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Fulfillment Workflow</h2>
            <p className="text-[#999]">The tools and frameworks Max uses for client delivery</p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-blue-500 to-blue-600" />
              <span className="text-blue-400">Max&apos;s Domain</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-[#f8d380] to-[#fbbf24]" />
              <span className="text-[#f8d380]">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-purple-500 to-purple-600" />
              <span className="text-purple-400">Tools</span>
            </div>
          </div>

          <div className="h-[500px] md:h-[700px] w-full rounded-xl border border-[#333] overflow-hidden">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              minZoom={0.25}
              maxZoom={1.5}
              fitViewOptions={{ padding: 0.2 }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              panOnDrag={true}
              zoomOnScroll={true}
            >
              <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#333" />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Responsibilities</h2>
          <p className="text-[#999]">Key areas of focus for client fulfillment</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {responsibilities.map((item) => (
            <div key={item.title} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-blue-400">{item.title}</h3>
                <span className={`status-${item.status}`}>{item.status}</span>
              </div>
              <p className="text-[#999] text-sm mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.tasks.map((task, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[#ccc]">
                    <span className="text-blue-400">*</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
            <p className="text-[#999]">The tools powering fulfillment</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">Anti-Gravity</div>
              <div className="text-[#888] text-sm">AI Dev Environment</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-[#f8d380] mb-2">Claude Code</div>
              <div className="text-[#888] text-sm">AI Coding Assistant</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">IDEA</div>
              <div className="text-[#888] text-sm">Framework</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">Airtable</div>
              <div className="text-[#888] text-sm">Databases</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#333] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/acquisition" className="btn-sarah text-sm">
            &larr; View Acquisition (Sarah)
          </Link>
          <Link href="/" className="text-[#666] hover:text-white text-sm">
            Back to Overview
          </Link>
        </div>
      </footer>
    </div>
  );
}
