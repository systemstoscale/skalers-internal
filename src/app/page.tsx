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

// Business flow nodes showing the two sides of Skalers
const businessNodes: Node[] = [
  // === TOP: SKALERS.IO ===
  { id: 'skalers', type: 'ai', position: { x: 300, y: 0 }, data: { label: 'Skalers.io' } },
  { id: 'ai-agency', type: 'process', position: { x: 300, y: 80 }, data: { label: 'AI Agency' } },

  // === LEFT SIDE: SARA - CLIENT ACQUISITION ===
  { id: 'sara-header', type: 'sara', position: { x: 50, y: 180 }, data: { label: 'Sara' } },
  { id: 'acquisition', type: 'process', position: { x: 50, y: 260 }, data: { label: 'Client Acquisition' } },

  // Sara's products (uses Antigravity + Claude Code → No-Code tools)
  { id: '10x-leads', type: 'product', position: { x: -100, y: 360 }, data: { label: '10xLeads.io' } },
  { id: '10x-content', type: 'product', position: { x: 50, y: 360 }, data: { label: '10xContent.io' } },
  { id: 'nocode-tools', type: 'tool', position: { x: 200, y: 360 }, data: { label: 'No-Code Tools' } },

  // Sara's target clients
  { id: 'low-revenue', type: 'client', position: { x: 50, y: 460 }, data: { label: 'Early-Stage Clients' } },
  { id: 'need-leads', type: 'critical', position: { x: 50, y: 540 }, data: { label: 'Need Lead Gen' } },

  // === RIGHT SIDE: MAX - CLIENT FULFILLMENT ===
  { id: 'max-header', type: 'max', position: { x: 550, y: 180 }, data: { label: 'Max' } },
  { id: 'fulfillment', type: 'process', position: { x: 550, y: 260 }, data: { label: 'Client Fulfillment' } },

  // Max's tools (coding-focused)
  { id: 'nextjs', type: 'tool', position: { x: 400, y: 360 }, data: { label: 'Next.js' } },
  { id: 'supabase', type: 'tool', position: { x: 550, y: 360 }, data: { label: 'Supabase' } },
  { id: 'cloudflare', type: 'tool', position: { x: 700, y: 360 }, data: { label: 'Cloudflare' } },

  // Max's target clients
  { id: 'high-revenue', type: 'client', position: { x: 550, y: 460 }, data: { label: '7-Figure+ Clients' } },
  { id: 'need-fulfillment', type: 'success', position: { x: 550, y: 540 }, data: { label: 'Need Fulfillment' } },

  // === BOTTOM: SHARED OUTCOME ===
  { id: 'agency-growth', type: 'startEnd', position: { x: 300, y: 660 }, data: { label: 'Agency Growth' } },
];

const businessEdges: Edge[] = [
  // Top connections
  { id: 'e-skalers-agency', source: 'skalers', target: 'ai-agency', animated: true, style: { stroke: '#f8d380' } },

  // Agency to both sides
  { id: 'e-agency-sara', source: 'ai-agency', target: 'sara-header', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-agency-max', source: 'ai-agency', target: 'max-header', animated: true, style: { stroke: '#3b82f6' } },

  // Sara's flow
  { id: 'e-sara-acq', source: 'sara-header', target: 'acquisition', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-acq-leads', source: 'acquisition', target: '10x-leads', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-acq-content', source: 'acquisition', target: '10x-content', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-acq-nocode', source: 'acquisition', target: 'nocode-tools', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-products-low', source: '10x-content', target: 'low-revenue', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-low-need', source: 'low-revenue', target: 'need-leads', animated: true, style: { stroke: '#ec4899' } },

  // Max's flow
  { id: 'e-max-fulfill', source: 'max-header', target: 'fulfillment', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-fulfill-nextjs', source: 'fulfillment', target: 'nextjs', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-fulfill-supabase', source: 'fulfillment', target: 'supabase', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-fulfill-cloudflare', source: 'fulfillment', target: 'cloudflare', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-tools-high', source: 'supabase', target: 'high-revenue', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e-high-need', source: 'high-revenue', target: 'need-fulfillment', animated: true, style: { stroke: '#3b82f6' } },

  // Bottom convergence
  { id: 'e-need-leads-growth', source: 'need-leads', target: 'agency-growth', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e-need-fulfill-growth', source: 'need-fulfillment', target: 'agency-growth', animated: true, style: { stroke: '#3b82f6' } },
];

const saraTools = [
  { name: 'Antigravity', description: 'AI development environment', status: 'active' },
  { name: 'Claude Code', description: 'AI-powered coding assistant', status: 'active' },
  { name: 'N8N', description: 'Workflow automation platform', status: 'active' },
  { name: 'GoHighLevel', description: 'CRM, automations, funnels', status: 'active' },
  { name: 'ManyChat', description: 'Instagram/FB DM automation', status: 'active' },
  { name: 'Closebot', description: 'AI sales chatbot', status: 'active' },
  { name: 'Vapi', description: 'AI voice agents & calling', status: 'active' },
  { name: 'Instantly', description: 'Cold email at scale', status: 'active' },
  { name: 'Apollo.io', description: 'Lead database & enrichment', status: 'active' },
  { name: 'Clay', description: 'Data enrichment workflows', status: 'active' },
  { name: 'Airtable', description: 'Database & automation', status: 'active' },
  { name: 'Zapier', description: 'Simple integrations', status: 'active' },
];

const maxTools = [
  { name: 'Antigravity', description: 'AI development environment', status: 'active' },
  { name: 'Claude Code', description: 'AI-powered coding assistant', status: 'active' },
  { name: 'Next.js', description: 'React framework for web apps', status: 'active' },
  { name: 'Supabase', description: 'Backend as a service (Postgres)', status: 'active' },
  { name: 'Cloudflare D1', description: 'Edge SQL database', status: 'active' },
  { name: 'Cloudflare R2', description: 'Object storage', status: 'active' },
  { name: 'Cloudflare Workers', description: 'Serverless edge functions', status: 'active' },
  { name: 'Vercel', description: 'Deployment & hosting', status: 'active' },
  { name: 'TypeScript', description: 'Type-safe JavaScript', status: 'active' },
  { name: 'Tailwind CSS', description: 'Utility-first CSS', status: 'active' },
  { name: 'React Flow', description: 'Interactive diagrams', status: 'active' },
  { name: 'Cursor', description: 'AI-powered IDE', status: 'active' },
];

export default function Home() {
  const [nodes] = useNodesState(businessNodes);
  const [edges] = useEdgesState(businessEdges);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8d380]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#333] text-sm text-[#f8d380] mb-6">
              <span className="animate-pulse">*</span>
              Internal Operations Dashboard
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Skalers.io
              <span className="block bg-gradient-to-r from-[#f8d380] to-[#fbbf24] bg-clip-text text-transparent">
                Operations
              </span>
            </h1>
            <p className="text-xl text-[#999] mb-8 leading-relaxed">
              AI systems for 10x leverage. Clear separation of responsibilities between
              client acquisition and client fulfillment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/acquisition" className="btn-sara">
                Acquisition (Sara)
              </Link>
              <Link href="/fulfillment" className="btn-max">
                Fulfillment (Max)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Two Sides Overview */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sara's Side */}
            <div className="card card-sara">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Sara</h2>
                  <p className="text-pink-400">Client Acquisition</p>
                </div>
              </div>
              <p className="text-[#999] mb-6">
                Responsible for bringing in new clients using Antigravity + Claude Code
                connected to no-code tools. Focus on early-stage B2B businesses.
              </p>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[#888] uppercase tracking-wider">Target Clients</h3>
                <ul className="space-y-2 text-[#ccc]">
                  <li className="flex gap-2">
                    <span className="text-pink-400">*</span>
                    Early-stage businesses (pre-7 figures)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-400">*</span>
                    Need help with lead generation
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-400">*</span>
                    B2B companies primarily
                  </li>
                </ul>
              </div>
              <Link href="/acquisition" className="btn-sara mt-6 inline-block">
                View Details
              </Link>
            </div>

            {/* Max's Side */}
            <div className="card card-max">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Max</h2>
                  <p className="text-blue-400">Client Fulfillment</p>
                </div>
              </div>
              <p className="text-[#999] mb-6">
                Responsible for delivering results using Antigravity + Claude Code with
                advanced coding tools (Next.js, Supabase, Cloudflare). Focus on 7-figure+ clients.
              </p>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[#888] uppercase tracking-wider">Target Clients</h3>
                <ul className="space-y-2 text-[#ccc]">
                  <li className="flex gap-2">
                    <span className="text-blue-400">*</span>
                    7-figure+ businesses
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">*</span>
                    Already have clients/customers
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-400">*</span>
                    Need AI fulfillment systems
                  </li>
                </ul>
              </div>
              <Link href="/fulfillment" className="btn-max mt-6 inline-block">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Flow Diagram */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Business Structure</h2>
          <p className="text-[#999]">How the two sides of Skalers.io work together</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-pink-500 to-pink-600" />
            <span className="text-pink-400">Sara (Acquisition)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-blue-500 to-blue-600" />
            <span className="text-blue-400">Max (Fulfillment)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-r from-[#f8d380] to-[#fbbf24]" />
            <span className="text-[#f8d380]">Skalers.io</span>
          </div>
        </div>

        {/* React Flow Diagram */}
        <div className="h-[500px] md:h-[700px] w-full rounded-xl border border-[#333] overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.25}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
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
      </section>

      {/* Tools Overview */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tools & Systems</h2>
            <p className="text-[#999]">The tech stack powering both sides of the business</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sara's Tools */}
            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-4">Sara&apos;s Tools</h3>
              <div className="space-y-3">
                {saraTools.map((tool) => (
                  <div key={tool.name} className="card !p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{tool.name}</div>
                      <div className="text-sm text-[#888]">{tool.description}</div>
                    </div>
                    <span className={`status-${tool.status}`}>
                      {tool.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Max's Tools */}
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Max&apos;s Tools</h3>
              <div className="space-y-3">
                {maxTools.map((tool) => (
                  <div key={tool.name} className="card !p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{tool.name}</div>
                      <div className="text-sm text-[#888]">{tool.description}</div>
                    </div>
                    <span className={`status-${tool.status}`}>
                      {tool.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Products</h2>
          <p className="text-[#999]">We use these ourselves to show clients what we can build for them</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-bold text-lg text-[#f8d380] mb-2">Skalers.io</h3>
            <p className="text-[#999] text-sm mb-4">Main agency brand - AI systems for 10x leverage</p>
            <span className="status-active">Active</span>
          </div>
          <div className="card card-sara">
            <h3 className="font-bold text-lg text-pink-400 mb-2">10xContent.io</h3>
            <p className="text-[#999] text-sm mb-2">1 video to 30+ pieces across all platforms</p>
            <p className="text-xs text-pink-400 mb-3">→ Use as example for content clients</p>
            <span className="status-building">Building</span>
          </div>
          <div className="card card-sara">
            <h3 className="font-bold text-lg text-pink-400 mb-2">10xLeads.io</h3>
            <p className="text-[#999] text-sm mb-2">Scrape, enrich, outreach on autopilot</p>
            <p className="text-xs text-pink-400 mb-3">→ Use as example for lead gen clients</p>
            <span className="status-building">Building</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#f8d380]/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Check Current Status</h2>
          <p className="text-[#999] mb-8 max-w-2xl mx-auto">
            See what&apos;s currently being worked on and the priorities for each team member.
          </p>
          <Link href="/status" className="btn-primary">
            View Status
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#333] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[#666] text-sm">
            <span className="text-[#f8d380]">Skalers.io</span> - AI Systems for 10x Leverage
          </div>
          <div className="text-[#666] text-sm">
            Internal Reference Document
          </div>
        </div>
      </footer>
    </div>
  );
}
