'use client';

import Link from 'next/link';
import {
  ReactFlow,
  Background,
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
  // Top: Max + Core Tools
  { id: 'max', type: 'max', position: { x: 300, y: 0 }, data: { label: 'Max' } },
  { id: 'core-tools', type: 'ai', position: { x: 300, y: 80 }, data: { label: 'Antigravity + Claude Code' } },
  { id: 'fulfillment', type: 'process', position: { x: 300, y: 160 }, data: { label: 'Client Fulfillment' } },

  // Coding tools
  { id: 'nextjs', type: 'tool', position: { x: 100, y: 260 }, data: { label: 'Next.js' } },
  { id: 'supabase', type: 'tool', position: { x: 250, y: 260 }, data: { label: 'Supabase' } },
  { id: 'cloudflare', type: 'tool', position: { x: 400, y: 260 }, data: { label: 'Cloudflare' } },
  { id: 'idea-framework', type: 'tool', position: { x: 550, y: 260 }, data: { label: 'IDEA Framework' } },

  // Next.js breakdown
  { id: 'react-apps', type: 'process', position: { x: 50, y: 360 }, data: { label: 'React Apps' } },
  { id: 'api-routes', type: 'process', position: { x: 150, y: 360 }, data: { label: 'API Routes' } },

  // Supabase breakdown
  { id: 'postgres', type: 'process', position: { x: 250, y: 360 }, data: { label: 'Postgres DB' } },
  { id: 'auth', type: 'process', position: { x: 350, y: 360 }, data: { label: 'Auth' } },

  // Cloudflare breakdown
  { id: 'd1-db', type: 'process', position: { x: 450, y: 360 }, data: { label: 'D1 Database' } },
  { id: 'r2-storage', type: 'process', position: { x: 550, y: 360 }, data: { label: 'R2 Storage' } },

  // IDEA Framework breakdown
  { id: 'instructions', type: 'process', position: { x: 500, y: 440 }, data: { label: 'Instructions' } },
  { id: 'executions', type: 'process', position: { x: 600, y: 440 }, data: { label: 'Executions' } },

  // Deliverables
  { id: 'ai-systems', type: 'ai', position: { x: 200, y: 540 }, data: { label: 'AI Systems' } },
  { id: 'web-apps', type: 'success', position: { x: 400, y: 540 }, data: { label: 'Web Applications' } },

  // Target clients
  { id: 'target-clients', type: 'client', position: { x: 300, y: 640 }, data: { label: '7-Figure+ Clients' } },
  { id: 'have-clients', type: 'success', position: { x: 300, y: 720 }, data: { label: 'Have Clients, Need Systems' } },

  // Outcome
  { id: 'delivered', type: 'startEnd', position: { x: 300, y: 820 }, data: { label: 'Systems Delivered' } },
];

const fulfillmentEdges: Edge[] = [
  // Top flow
  { id: 'e-max-tools', source: 'max', target: 'core-tools', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-tools-fulfill', source: 'core-tools', target: 'fulfillment', animated: true, style: { stroke: '#f8d380' } },
  { id: 'e-fulfill-nextjs', source: 'fulfillment', target: 'nextjs', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-fulfill-supabase', source: 'fulfillment', target: 'supabase', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-fulfill-cloudflare', source: 'fulfillment', target: 'cloudflare', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-fulfill-idea', source: 'fulfillment', target: 'idea-framework', animated: true, style: { stroke: '#3b82f6' } },

  // Next.js breakdown
  { id: 'e-nextjs-react', source: 'nextjs', target: 'react-apps', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-nextjs-api', source: 'nextjs', target: 'api-routes', animated: true, style: { stroke: '#8b5cf6' } },

  // Supabase breakdown
  { id: 'e-supabase-postgres', source: 'supabase', target: 'postgres', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-supabase-auth', source: 'supabase', target: 'auth', animated: true, style: { stroke: '#8b5cf6' } },

  // Cloudflare breakdown
  { id: 'e-cloudflare-d1', source: 'cloudflare', target: 'd1-db', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-cloudflare-r2', source: 'cloudflare', target: 'r2-storage', animated: true, style: { stroke: '#8b5cf6' } },

  // IDEA Framework breakdown
  { id: 'e-idea-inst', source: 'idea-framework', target: 'instructions', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-idea-exec', source: 'idea-framework', target: 'executions', animated: true, style: { stroke: '#8b5cf6' } },

  // Convergence to deliverables
  { id: 'e-react-ai', source: 'react-apps', target: 'ai-systems', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-api-web', source: 'api-routes', target: 'web-apps', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-postgres-ai', source: 'postgres', target: 'ai-systems', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-d1-web', source: 'd1-db', target: 'web-apps', animated: true, style: { stroke: '#3b82f6' } },

  // Deliverables to clients
  { id: 'e-ai-target', source: 'ai-systems', target: 'target-clients', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-web-target', source: 'web-apps', target: 'target-clients', animated: true, style: { stroke: '#3b82f6' } },

  // Final flow
  { id: 'e-target-have', source: 'target-clients', target: 'have-clients', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-have-delivered', source: 'have-clients', target: 'delivered', animated: true, style: { stroke: '#22c55e' } },
];

const responsibilities = [
  {
    title: 'Antigravity + Claude Code',
    description: 'Core AI development tools for building advanced systems',
    tasks: [
      'Use Antigravity for AI-powered development',
      'Build with Claude Code for coding tasks',
      'Create complex automations and systems',
      'Deploy production-ready applications',
    ],
    status: 'active',
  },
  {
    title: 'Next.js Development',
    description: 'Build production web applications with React',
    tasks: [
      'Create React applications',
      'Build API routes and backends',
      'Server-side rendering and optimization',
      'Deploy to Vercel or Cloudflare',
    ],
    status: 'active',
  },
  {
    title: 'Supabase Backend',
    description: 'Backend as a service with Postgres database',
    tasks: [
      'Design database schemas',
      'Set up authentication flows',
      'Build real-time features',
      'Manage user data and permissions',
    ],
    status: 'active',
  },
  {
    title: 'Cloudflare Infrastructure',
    description: 'Edge computing and storage solutions',
    tasks: [
      'D1 edge SQL databases',
      'R2 object storage for files',
      'Workers for serverless functions',
      'Global CDN and performance',
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
  { name: 'AWC (Alexandra Weber Coaching)', type: 'AI Coaching Systems', status: 'active' },
  { name: 'Mark Dhamma Partnership', type: 'Skalers Partnership', status: 'active' },
];

const maxKpis = [
  { label: 'Content Pieces', description: 'Weekly content created', target: '10+' },
  { label: 'Calls Booked', description: 'Sales calls scheduled', target: '5+' },
  { label: 'Close Rate', description: 'Deals closed / calls', target: '30%+' },
  { label: 'Client NPS', description: 'Net promoter score', target: '9+' },
  { label: 'Delivery Time', description: 'Days to first deliverable', target: '<14' },
  { label: 'Revenue', description: 'Monthly recurring', target: '$20K+' },
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
              Uses Antigravity + Claude Code with advanced coding tools (Next.js, Supabase, Cloudflare D1/R2)
              to build AI systems for 7-figure+ clients.
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

      {/* Key Metrics */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Performance Indicators</h2>
            <p className="text-[#999]">Metrics Max is responsible for tracking</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {maxKpis.map((kpi) => (
              <div key={kpi.label} className="card text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{kpi.target}</div>
                <div className="font-semibold text-white text-sm mb-1">{kpi.label}</div>
                <div className="text-[#888] text-xs">{kpi.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fulfillment Flow */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Fulfillment Workflow</h2>
            <p className="text-[#999]">Antigravity + Claude Code with advanced coding tools</p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-blue-500 to-blue-600" />
              <span className="text-blue-400">Max&apos;s Domain</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-[#f8d380] to-[#fbbf24]" />
              <span className="text-[#f8d380]">AI Core</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-purple-500 to-purple-600" />
              <span className="text-purple-400">Coding Tools</span>
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
              nodesDraggable={true}
              nodesConnectable={false}
              elementsSelectable={true}
              panOnDrag={true}
              zoomOnScroll={true}
            >
              <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#333" />
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <p className="text-[#999]">Advanced coding tools for fulfillment</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-[#f8d380] mb-1">Antigravity</div>
              <div className="text-[#888] text-xs">AI Dev Env</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-[#f8d380] mb-1">Claude Code</div>
              <div className="text-[#888] text-xs">AI Coding</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-blue-400 mb-1">Next.js</div>
              <div className="text-[#888] text-xs">React Framework</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-green-400 mb-1">Supabase</div>
              <div className="text-[#888] text-xs">Backend</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-orange-400 mb-1">Cloudflare D1</div>
              <div className="text-[#888] text-xs">Edge DB</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-orange-400 mb-1">Cloudflare R2</div>
              <div className="text-[#888] text-xs">Storage</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-orange-400 mb-1">Workers</div>
              <div className="text-[#888] text-xs">Edge Functions</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-purple-400 mb-1">Vercel</div>
              <div className="text-[#888] text-xs">Deployment</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-blue-400 mb-1">TypeScript</div>
              <div className="text-[#888] text-xs">Type Safety</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-cyan-400 mb-1">Tailwind</div>
              <div className="text-[#888] text-xs">CSS Framework</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-pink-400 mb-1">React Flow</div>
              <div className="text-[#888] text-xs">Diagrams</div>
            </div>
            <div className="card text-center !p-4">
              <div className="text-lg font-bold text-green-400 mb-1">Cursor</div>
              <div className="text-[#888] text-xs">AI IDE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#333] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/acquisition" className="btn-sara text-sm">
            &larr; View Acquisition (Sara)
          </Link>
          <Link href="/" className="text-[#666] hover:text-white text-sm">
            Back to Overview
          </Link>
        </div>
      </footer>
    </div>
  );
}
