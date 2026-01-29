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

// Sarah's acquisition workflow
const acquisitionNodes: Node[] = [
  // Top: Sarah
  { id: 'sarah', type: 'sarah', position: { x: 300, y: 0 }, data: { label: 'Sarah' } },
  { id: 'acquisition', type: 'process', position: { x: 300, y: 80 }, data: { label: 'Client Acquisition' } },

  // Three main systems
  { id: 'leads-system', type: 'product', position: { x: 100, y: 180 }, data: { label: '10xLeads.io' } },
  { id: 'content-system', type: 'product', position: { x: 300, y: 180 }, data: { label: '10xContent.io' } },
  { id: 'automation-system', type: 'tool', position: { x: 500, y: 180 }, data: { label: 'Automation Setup' } },

  // Leads System breakdown
  { id: 'scrape', type: 'process', position: { x: 0, y: 280 }, data: { label: 'Scrape Data' } },
  { id: 'enrich', type: 'process', position: { x: 100, y: 360 }, data: { label: 'Enrich Leads' } },
  { id: 'outreach', type: 'process', position: { x: 0, y: 440 }, data: { label: 'Automated Outreach' } },

  // Content System breakdown
  { id: 'video-in', type: 'process', position: { x: 250, y: 280 }, data: { label: '1 Video Input' } },
  { id: 'ai-process', type: 'ai', position: { x: 300, y: 360 }, data: { label: 'AI Processing' } },
  { id: 'multi-content', type: 'success', position: { x: 350, y: 440 }, data: { label: '30+ Pieces' } },

  // Automation breakdown
  { id: 'ghl', type: 'tool', position: { x: 450, y: 280 }, data: { label: 'GoHighLevel' } },
  { id: 'manychat', type: 'tool', position: { x: 550, y: 280 }, data: { label: 'ManyChat' } },
  { id: 'vapi', type: 'tool', position: { x: 500, y: 360 }, data: { label: 'Vapi Voice AI' } },
  { id: 'ai-bots', type: 'ai', position: { x: 500, y: 440 }, data: { label: 'AI Chatbots' } },

  // Target clients
  { id: 'target-clients', type: 'client', position: { x: 300, y: 560 }, data: { label: 'Early-Stage B2B' } },
  { id: 'need-leads', type: 'critical', position: { x: 300, y: 640 }, data: { label: 'Need Lead Generation' } },

  // Outcome
  { id: 'new-clients', type: 'startEnd', position: { x: 300, y: 740 }, data: { label: 'New Skalers Clients' } },
];

const acquisitionEdges: Edge[] = [
  // Top flow
  { id: 'e-sarah-acq', source: 'sarah', target: 'acquisition', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-acq-leads', source: 'acquisition', target: 'leads-system', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-acq-content', source: 'acquisition', target: 'content-system', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-acq-auto', source: 'acquisition', target: 'automation-system', animated: true, style: { stroke: '#ec4899' } },

  // Leads system flow
  { id: 'e-leads-scrape', source: 'leads-system', target: 'scrape', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e-scrape-enrich', source: 'scrape', target: 'enrich', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e-enrich-outreach', source: 'enrich', target: 'outreach', animated: true, style: { stroke: '#6366f1' } },

  // Content system flow
  { id: 'e-content-video', source: 'content-system', target: 'video-in', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e-video-ai', source: 'video-in', target: 'ai-process', animated: true, style: { stroke: '#f8d380' } },
  { id: 'e-ai-multi', source: 'ai-process', target: 'multi-content', animated: true, style: { stroke: '#22c55e' } },

  // Automation flow
  { id: 'e-auto-ghl', source: 'automation-system', target: 'ghl', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-auto-many', source: 'automation-system', target: 'manychat', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-ghl-vapi', source: 'ghl', target: 'vapi', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-many-bots', source: 'manychat', target: 'ai-bots', animated: true, style: { stroke: '#f8d380' } },

  // Convergence to target
  { id: 'e-outreach-target', source: 'outreach', target: 'target-clients', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-multi-target', source: 'multi-content', target: 'target-clients', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-bots-target', source: 'ai-bots', target: 'target-clients', animated: true, style: { stroke: '#ec4899' } },

  // Final flow
  { id: 'e-target-need', source: 'target-clients', target: 'need-leads', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-need-new', source: 'need-leads', target: 'new-clients', animated: true, style: { stroke: '#22c55e' } },
];

const responsibilities = [
  {
    title: '10xLeads.io',
    description: 'Build and operate the leads machine for B2B client acquisition',
    tasks: [
      'Learn the scraping and enrichment workflows',
      'Set up outreach campaigns',
      'Monitor and optimize conversion rates',
      'Onboard new clients to the system',
    ],
    status: 'building',
  },
  {
    title: '10xContent.io',
    description: 'Help clients repurpose their video content across platforms',
    tasks: [
      'Understand the content transformation pipeline',
      'Quality control on AI outputs',
      'Client communication and onboarding',
      'Platform-specific optimization',
    ],
    status: 'building',
  },
  {
    title: 'GoHighLevel Setup',
    description: 'Set up CRM and automation for clients',
    tasks: [
      'Configure pipelines and workflows',
      'Set up automated follow-ups',
      'Create landing pages and funnels',
      'Integrate with other tools',
    ],
    status: 'active',
  },
  {
    title: 'ManyChat & AI Bots',
    description: 'Social media automation and chatbot setup',
    tasks: [
      'Build conversation flows',
      'Set up AI-powered responses',
      'Instagram/Facebook automation',
      'Lead qualification bots',
    ],
    status: 'active',
  },
  {
    title: 'Vapi Voice AI',
    description: 'Voice AI agents for phone interactions',
    tasks: [
      'Design call flows',
      'Configure AI voice agents',
      'Appointment booking automation',
      'Call monitoring and optimization',
    ],
    status: 'planned',
  },
];

export default function AcquisitionPage() {
  const [nodes] = useNodesState(acquisitionNodes);
  const [edges] = useEdgesState(acquisitionEdges);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold text-2xl">
                S
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-white">Sarah</h1>
                <p className="text-pink-400 text-lg">Client Acquisition</p>
              </div>
            </div>
            <p className="text-xl text-[#999] mb-8 leading-relaxed">
              Responsible for bringing in new clients through automated lead generation,
              content systems, and AI-powered acquisition tools.
            </p>
          </div>
        </div>
      </section>

      {/* Target Clients */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Target Clients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card card-sarah">
              <h3 className="font-bold text-lg mb-2">Early-Stage Businesses</h3>
              <p className="text-[#999] text-sm">Pre-7 figure businesses that haven&apos;t cracked client acquisition yet</p>
            </div>
            <div className="card card-sarah">
              <h3 className="font-bold text-lg mb-2">B2B Companies</h3>
              <p className="text-[#999] text-sm">Business-to-business companies that need systematic lead generation</p>
            </div>
            <div className="card card-sarah">
              <h3 className="font-bold text-lg mb-2">Need Lead Gen</h3>
              <p className="text-[#999] text-sm">Businesses struggling with consistent client acquisition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Acquisition Flow */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Acquisition Workflow</h2>
          <p className="text-[#999]">The systems and tools Sarah uses for client acquisition</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-pink-500 to-pink-600" />
            <span className="text-pink-400">Sarah&apos;s Domain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-indigo-500 to-indigo-600" />
            <span className="text-indigo-400">Products</span>
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
      </section>

      {/* Responsibilities */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Responsibilities</h2>
            <p className="text-[#999]">Key areas of focus for client acquisition</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.map((item) => (
              <div key={item.title} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-pink-400">{item.title}</h3>
                  <span className={`status-${item.status}`}>{item.status}</span>
                </div>
                <p className="text-[#999] text-sm mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.tasks.map((task, i) => (
                    <li key={i} className="flex gap-2 text-sm text-[#ccc]">
                      <span className="text-pink-400">*</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Metrics to Track</h2>
          <p className="text-[#999]">How success is measured in client acquisition</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">Leads</div>
            <div className="text-[#888] text-sm">Generated per week</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">Calls</div>
            <div className="text-[#888] text-sm">Booked per week</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">Close %</div>
            <div className="text-[#888] text-sm">Conversion rate</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">CAC</div>
            <div className="text-[#888] text-sm">Cost per acquisition</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#333] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-[#666] hover:text-white text-sm">
            &larr; Back to Overview
          </Link>
          <Link href="/fulfillment" className="btn-max text-sm">
            View Fulfillment (Max) &rarr;
          </Link>
        </div>
      </footer>
    </div>
  );
}
