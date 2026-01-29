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

// Sara's acquisition workflow - spread out for no overlap
const initialAcquisitionNodes: Node[] = [
  // Top: Sara + Core Tools
  { id: 'sara', type: 'sara', position: { x: 300, y: 0 }, data: { label: 'Sara' } },
  { id: 'core-tools', type: 'ai', position: { x: 300, y: 100 }, data: { label: 'Antigravity + Claude Code' } },
  { id: 'acquisition', type: 'process', position: { x: 300, y: 200 }, data: { label: 'Client Acquisition' } },

  // Three main systems
  { id: 'leads-system', type: 'product', position: { x: 50, y: 320 }, data: { label: '10xLeads.io' } },
  { id: 'content-system', type: 'product', position: { x: 300, y: 320 }, data: { label: '10xContent.io' } },
  { id: 'nocode-tools', type: 'tool', position: { x: 550, y: 320 }, data: { label: 'No-Code Tools' } },

  // Leads System breakdown
  { id: 'scrape', type: 'process', position: { x: -80, y: 440 }, data: { label: 'Scrape Data' } },
  { id: 'enrich', type: 'process', position: { x: 50, y: 540 }, data: { label: 'Enrich Leads' } },
  { id: 'outreach', type: 'process', position: { x: -80, y: 640 }, data: { label: 'Automated Outreach' } },

  // Content System breakdown
  { id: 'video-in', type: 'process', position: { x: 230, y: 440 }, data: { label: '1 Video Input' } },
  { id: 'ai-process', type: 'ai', position: { x: 300, y: 540 }, data: { label: 'AI Processing' } },
  { id: 'multi-content', type: 'success', position: { x: 370, y: 640 }, data: { label: '30+ Pieces' } },

  // No-code tools breakdown
  { id: 'n8n', type: 'tool', position: { x: 480, y: 440 }, data: { label: 'N8N' } },
  { id: 'ghl', type: 'tool', position: { x: 620, y: 440 }, data: { label: 'GoHighLevel' } },
  { id: 'manychat', type: 'tool', position: { x: 480, y: 540 }, data: { label: 'ManyChat' } },
  { id: 'closebot', type: 'tool', position: { x: 620, y: 540 }, data: { label: 'Closebot' } },

  // Target clients - two paths
  { id: 'b2b-clients', type: 'client', position: { x: 100, y: 780 }, data: { label: 'B2B Clients' } },
  { id: 'b2c-clients', type: 'client', position: { x: 500, y: 780 }, data: { label: 'B2C Clients' } },
  { id: 'need-growth', type: 'critical', position: { x: 300, y: 880 }, data: { label: 'Need Growth Systems' } },

  // Outcome
  { id: 'new-clients', type: 'startEnd', position: { x: 300, y: 1000 }, data: { label: 'New Skalers Clients' } },
];

const acquisitionEdges: Edge[] = [
  // Top flow
  { id: 'e-sara-tools', source: 'sara', target: 'core-tools', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-tools-acq', source: 'core-tools', target: 'acquisition', animated: true, style: { stroke: '#f8d380' } },
  { id: 'e-acq-leads', source: 'acquisition', target: 'leads-system', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-acq-content', source: 'acquisition', target: 'content-system', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-acq-nocode', source: 'acquisition', target: 'nocode-tools', animated: true, style: { stroke: '#ec4899' } },

  // Leads system flow
  { id: 'e-leads-scrape', source: 'leads-system', target: 'scrape', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e-scrape-enrich', source: 'scrape', target: 'enrich', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e-enrich-outreach', source: 'enrich', target: 'outreach', animated: true, style: { stroke: '#6366f1' } },

  // Content system flow
  { id: 'e-content-video', source: 'content-system', target: 'video-in', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e-video-ai', source: 'video-in', target: 'ai-process', animated: true, style: { stroke: '#f8d380' } },
  { id: 'e-ai-multi', source: 'ai-process', target: 'multi-content', animated: true, style: { stroke: '#22c55e' } },

  // No-code tools flow
  { id: 'e-nocode-n8n', source: 'nocode-tools', target: 'n8n', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-nocode-ghl', source: 'nocode-tools', target: 'ghl', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-n8n-manychat', source: 'n8n', target: 'manychat', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e-ghl-closebot', source: 'ghl', target: 'closebot', animated: true, style: { stroke: '#8b5cf6' } },

  // B2B path (10xLeads → cold outreach)
  { id: 'e-outreach-b2b', source: 'outreach', target: 'b2b-clients', animated: true, style: { stroke: '#6366f1' } },

  // B2C path (10xContent + automations)
  { id: 'e-multi-b2c', source: 'multi-content', target: 'b2c-clients', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-closebot-b2c', source: 'closebot', target: 'b2c-clients', animated: true, style: { stroke: '#8b5cf6' } },

  // Final flow
  { id: 'e-b2b-need', source: 'b2b-clients', target: 'need-growth', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e-b2c-need', source: 'b2c-clients', target: 'need-growth', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-need-new', source: 'need-growth', target: 'new-clients', animated: true, style: { stroke: '#22c55e' } },
];

const responsibilities = [
  {
    title: 'Antigravity + Claude Code',
    description: 'Core AI development tools for building and connecting systems',
    tasks: [
      'Use Antigravity for AI-powered development',
      'Connect to no-code tools via Claude Code',
      'Build automations and workflows',
      'Create client acquisition systems',
    ],
    status: 'active',
  },
  {
    title: '10xLeads.io (B2B)',
    description: 'Cold email & cold DM outreach for B2B client acquisition',
    tasks: [
      'Scrape and enrich B2B lead data',
      'Set up cold email campaigns (Instantly)',
      'Configure cold DM sequences',
      'Monitor deliverability and responses',
    ],
    status: 'building',
  },
  {
    title: '10xContent.io (B2C)',
    description: 'Content repurposing for B2C businesses on social media',
    tasks: [
      'Transform 1 video into 30+ pieces',
      'Optimize for each social platform',
      'Quality control on AI outputs',
      'Client onboarding and training',
    ],
    status: 'building',
  },
  {
    title: 'N8N Workflows',
    description: 'Workflow automation platform for connecting tools',
    tasks: [
      'Build automation workflows',
      'Connect APIs and services',
      'Set up triggers and actions',
      'Monitor and debug workflows',
    ],
    status: 'active',
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
    title: 'ManyChat & Closebot (B2C)',
    description: 'Social media automation and AI chatbots for B2C businesses',
    tasks: [
      'Build Instagram/Facebook DM flows',
      'Set up AI-powered chat responses',
      'Automate lead qualification',
      'Connect to GHL for booking',
    ],
    status: 'active',
  },
  {
    title: 'Vapi Voice Agents',
    description: 'AI-powered phone calling and voice automation',
    tasks: [
      'Set up AI voice agents for calls',
      'Configure call flows and scripts',
      'Integrate with CRM for call tracking',
      'Train agents on client-specific knowledge',
    ],
    status: 'active',
  },
  {
    title: 'Cold Outreach Stack',
    description: 'Instantly, Apollo, Clay for automated outreach',
    tasks: [
      'Build lead lists with Apollo.io',
      'Enrich data with Clay workflows',
      'Set up email sequences in Instantly',
      'Monitor deliverability and responses',
    ],
    status: 'active',
  },
];

export default function AcquisitionPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialAcquisitionNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(acquisitionEdges);

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
                <h1 className="text-4xl font-bold text-white">Sara</h1>
                <p className="text-pink-400 text-lg">Client Acquisition</p>
              </div>
            </div>
            <p className="text-xl text-[#999] mb-8 leading-relaxed">
              Uses Antigravity + Claude Code to help <span className="text-indigo-400">B2B clients</span> with cold outreach (10xLeads)
              and <span className="text-pink-400">B2C clients</span> with content & automation (10xContent, ManyChat, Closebot).
            </p>
          </div>
        </div>
      </section>

      {/* Target Clients */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Target Clients</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* B2B Path */}
            <div className="card" style={{ borderColor: '#6366f1' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  B2B
                </div>
                <h3 className="font-bold text-lg text-indigo-400">B2B Businesses</h3>
              </div>
              <p className="text-[#999] text-sm mb-4">Companies selling to other businesses</p>
              <div className="space-y-2">
                <div className="text-sm text-[#ccc]">
                  <span className="text-indigo-400 font-semibold">Tool:</span> 10xLeads.io
                </div>
                <div className="text-sm text-[#ccc]">
                  <span className="text-indigo-400 font-semibold">Method:</span> Cold emails & cold DMs
                </div>
                <div className="text-sm text-[#ccc]">
                  <span className="text-indigo-400 font-semibold">Stack:</span> Apollo, Clay, Instantly
                </div>
              </div>
            </div>

            {/* B2C Path */}
            <div className="card card-sara">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold">
                  B2C
                </div>
                <h3 className="font-bold text-lg text-pink-400">B2C Businesses</h3>
              </div>
              <p className="text-[#999] text-sm mb-4">Companies selling to consumers</p>
              <div className="space-y-2">
                <div className="text-sm text-[#ccc]">
                  <span className="text-pink-400 font-semibold">Tool:</span> 10xContent.io
                </div>
                <div className="text-sm text-[#ccc]">
                  <span className="text-pink-400 font-semibold">Method:</span> Content + social automation
                </div>
                <div className="text-sm text-[#ccc]">
                  <span className="text-pink-400 font-semibold">Stack:</span> ManyChat, Closebot, GHL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Whiteboard Version */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Simple Flow (Whiteboard Version)</h2>
          <p className="text-[#999]">Easy to draw and explain to clients</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Simple linear flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {/* Step 1 */}
            <div className="card card-sara text-center min-w-[140px]">
              <div className="text-2xl mb-2">1</div>
              <div className="font-bold">Find Leads</div>
              <div className="text-xs text-[#888] mt-1">Apollo, Clay</div>
            </div>

            <div className="text-pink-400 text-2xl rotate-90 md:rotate-0">→</div>

            {/* Step 2 */}
            <div className="card card-sara text-center min-w-[140px]">
              <div className="text-2xl mb-2">2</div>
              <div className="font-bold">Reach Out</div>
              <div className="text-xs text-[#888] mt-1">Instantly, Vapi</div>
            </div>

            <div className="text-pink-400 text-2xl rotate-90 md:rotate-0">→</div>

            {/* Step 3 */}
            <div className="card card-sara text-center min-w-[140px]">
              <div className="text-2xl mb-2">3</div>
              <div className="font-bold">Qualify</div>
              <div className="text-xs text-[#888] mt-1">ManyChat, Closebot</div>
            </div>

            <div className="text-pink-400 text-2xl rotate-90 md:rotate-0">→</div>

            {/* Step 4 */}
            <div className="card card-sara text-center min-w-[140px]">
              <div className="text-2xl mb-2">4</div>
              <div className="font-bold">Book Call</div>
              <div className="text-xs text-[#888] mt-1">GHL Calendar</div>
            </div>

            <div className="text-green-400 text-2xl rotate-90 md:rotate-0">→</div>

            {/* Step 5 */}
            <div className="card text-center min-w-[140px] border-green-500 bg-gradient-to-br from-green-500/10 to-green-500/5">
              <div className="text-2xl mb-2 text-green-400">✓</div>
              <div className="font-bold text-green-400">New Client</div>
              <div className="text-xs text-[#888] mt-1">Max closes</div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 text-center">
            <p className="text-[#888] text-sm">
              <span className="text-pink-400 font-semibold">Sara</span> runs steps 1-4 &nbsp;|&nbsp;
              <span className="text-blue-400 font-semibold">Max</span> closes the deal
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Acquisition Flow */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Detailed Workflow</h2>
            <p className="text-[#999]">Drag nodes to rearrange • Full system view</p>
          </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-pink-500 to-pink-600" />
            <span className="text-pink-400">Sara&apos;s Domain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-[#f8d380] to-[#fbbf24]" />
            <span className="text-[#f8d380]">AI Core</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-purple-500 to-purple-600" />
            <span className="text-purple-400">No-Code Tools</span>
          </div>
        </div>

        <div className="h-[500px] md:h-[700px] w-full rounded-xl border border-[#333] overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
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
