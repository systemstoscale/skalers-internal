'use client';

import Link from 'next/link';

const maxPriorities = [
  {
    title: 'Monday: Developer Handoff for 10xContent.io',
    description: 'Call with developer to take over 10xContent.io - finish, launch, and ship the content machine',
    priority: 'high',
    status: 'scheduled',
    deadline: 'Monday',
  },
  {
    title: 'Finish 10xLeads.io',
    description: 'Complete the leads machine so Sara can learn it and use it for client acquisition',
    priority: 'high',
    status: 'in-progress',
    deadline: 'This week',
  },
  {
    title: 'Deliver AWC (awc.skalers.io)',
    description: 'Complete Alexandra Weber Coaching project with all client feedback and training',
    priority: 'high',
    status: 'active',
    deadline: 'On time',
  },
  {
    title: 'Close Prospects',
    description: 'Samuel Higgs, Mark Dhamma, Olga (Proescenic) - show what we can build',
    priority: 'high',
    status: 'in-progress',
    deadline: 'This week',
  },
  {
    title: 'Teach Sara the Systems',
    description: 'Document and train Sara on Antigravity, Claude Code, and no-code tools (N8N, GHL, ManyChat, Closebot)',
    priority: 'medium',
    status: 'pending',
    deadline: 'After 10xLeads.io',
  },
];

const saraPriorities: typeof maxPriorities = [
  {
    title: 'Learn Antigravity + Claude Code',
    description: 'Master the core AI tools that connect to all no-code platforms',
    priority: 'high',
    status: 'in-progress',
    deadline: 'This week',
  },
  {
    title: 'Learn 10xLeads.io',
    description: 'Once Max finishes the leads machine, learn how to set it up for B2B clients',
    priority: 'high',
    status: 'waiting',
    deadline: 'When ready',
  },
  {
    title: 'Learn 10xContent.io',
    description: 'Understand the content machine to offer to acquisition clients',
    priority: 'high',
    status: 'waiting',
    deadline: 'When ready',
  },
  {
    title: 'N8N + GoHighLevel',
    description: 'Learn workflow automation and CRM setup for clients',
    priority: 'medium',
    status: 'pending',
    deadline: 'TBD',
  },
  {
    title: 'ManyChat & Closebot',
    description: 'Learn social media automation and AI sales chatbots',
    priority: 'medium',
    status: 'pending',
    deadline: 'TBD',
  },
];

const problemsToSolve = [
  {
    problem: 'Focus is spread too thin',
    owner: 'Max',
    solution: 'Clear separation: Sara handles acquisition, Max handles fulfillment',
    status: 'in-progress',
  },
  {
    problem: '10xContent.io not finished',
    owner: 'Max',
    solution: 'Monday call with developer to take over and ship it',
    status: 'scheduled',
  },
  {
    problem: '10xLeads.io not finished',
    owner: 'Max',
    solution: 'Priority this week - complete so Sara can use it',
    status: 'in-progress',
  },
  {
    problem: 'Sara needs training on systems',
    owner: 'Max',
    solution: 'Document everything and train Sara on each tool',
    status: 'pending',
  },
  {
    problem: 'Need to show clients what we can do',
    owner: 'Both',
    solution: 'Launch 10xContent.io and 10xLeads.io as proof of capability',
    status: 'in-progress',
  },
];

const priorityColors: Record<string, string> = {
  high: 'text-red-400',
  medium: 'text-yellow-400',
  low: 'text-green-400',
};

const statusColors: Record<string, string> = {
  'scheduled': 'status-building',
  'in-progress': 'status-building',
  'active': 'status-active',
  'pending': 'status-planned',
  'waiting': 'status-planned',
  'planned': 'status-planned',
};

export default function StatusPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8d380]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Current
              <span className="block bg-gradient-to-r from-[#f8d380] to-[#fbbf24] bg-clip-text text-transparent">
                Status
              </span>
            </h1>
            <p className="text-xl text-[#999] mb-8 leading-relaxed">
              What&apos;s being worked on right now and what&apos;s coming next.
              A clear view of priorities for both Max and Sara.
            </p>
          </div>
        </div>
      </section>

      {/* Key Focus */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="card card-gold max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Current Focus</h2>
            <p className="text-[#999] mb-6">
              The main goal right now is to <strong className="text-white">reduce Max&apos;s spread</strong> by:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-[#222] rounded-lg p-4">
                <h3 className="font-semibold text-blue-400 mb-2">Max&apos;s Focus</h3>
                <ul className="space-y-1 text-sm text-[#ccc]">
                  <li>* Finish products (10xContent, 10xLeads)</li>
                  <li>* Fulfill with current clients</li>
                  <li>* Train Sara on systems</li>
                </ul>
              </div>
              <div className="bg-[#222] rounded-lg p-4">
                <h3 className="font-semibold text-pink-400 mb-2">Sara&apos;s Focus</h3>
                <ul className="space-y-1 text-sm text-[#ccc]">
                  <li>* Learn the acquisition systems</li>
                  <li>* Take over client acquisition</li>
                  <li>* Free up Max to focus on fulfillment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Priorities Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Max's Priorities */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                M
              </div>
              <h2 className="text-2xl font-bold text-blue-400">Max&apos;s Priorities</h2>
            </div>
            <div className="space-y-4">
              {maxPriorities.map((item, i) => (
                <div key={i} className="card">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <span className={statusColors[item.status]}>{item.status}</span>
                  </div>
                  <p className="text-[#888] text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold uppercase ${priorityColors[item.priority]}`}>
                      {item.priority} priority
                    </span>
                    <span className="text-[#666]">{item.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sara's Priorities */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold">
                S
              </div>
              <h2 className="text-2xl font-bold text-pink-400">Sara&apos;s Priorities</h2>
            </div>
            <div className="space-y-4">
              {saraPriorities.map((item, i) => (
                <div key={i} className="card">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <span className={statusColors[item.status]}>{item.status}</span>
                  </div>
                  <p className="text-[#888] text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold uppercase ${priorityColors[item.priority]}`}>
                      {item.priority} priority
                    </span>
                    <span className="text-[#666]">{item.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problems to Solve */}
      <section className="bg-[#111] border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Problems to Solve</h2>
            <p className="text-[#999]">Current challenges and how we&apos;re addressing them</p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {problemsToSolve.map((item, i) => (
              <div key={i} className="card">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-red-400 mb-1">Problem: {item.problem}</h3>
                    <p className="text-sm text-[#666]">Owner: {item.owner}</p>
                  </div>
                  <span className={statusColors[item.status]}>{item.status}</span>
                </div>
                <div className="bg-[#222] rounded-lg p-3">
                  <span className="text-sm text-[#888]">Solution: </span>
                  <span className="text-sm text-[#ccc]">{item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upcoming Timeline</h2>
          <p className="text-[#999]">Key milestones and deliverables</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#333]" />

            {/* Timeline items */}
            <div className="space-y-8">
              <div className="relative pl-12">
                <div className="absolute left-2.5 w-3 h-3 rounded-full bg-yellow-400" />
                <div className="card">
                  <h3 className="font-semibold text-white mb-1">Monday</h3>
                  <p className="text-[#888] text-sm">Developer call - handoff 10xContent.io</p>
                </div>
              </div>
              <div className="relative pl-12">
                <div className="absolute left-2.5 w-3 h-3 rounded-full bg-blue-400" />
                <div className="card">
                  <h3 className="font-semibold text-white mb-1">This Week</h3>
                  <p className="text-[#888] text-sm">Max finishes 10xLeads.io core functionality</p>
                </div>
              </div>
              <div className="relative pl-12">
                <div className="absolute left-2.5 w-3 h-3 rounded-full bg-pink-400" />
                <div className="card">
                  <h3 className="font-semibold text-white mb-1">Next Week</h3>
                  <p className="text-[#888] text-sm">Sara starts learning 10xLeads.io</p>
                </div>
              </div>
              <div className="relative pl-12">
                <div className="absolute left-2.5 w-3 h-3 rounded-full bg-green-400" />
                <div className="card">
                  <h3 className="font-semibold text-white mb-1">Coming Soon</h3>
                  <p className="text-[#888] text-sm">10xContent.io launches - show clients what we can do</p>
                </div>
              </div>
              <div className="relative pl-12">
                <div className="absolute left-2.5 w-3 h-3 rounded-full bg-[#f8d380]" />
                <div className="card">
                  <h3 className="font-semibold text-white mb-1">Goal State</h3>
                  <p className="text-[#888] text-sm">Sara handles acquisition, Max handles fulfillment - clear separation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gradient-to-br from-[#f8d380]/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold mb-8">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/acquisition" className="btn-sara">
              Sara&apos;s Page
            </Link>
            <Link href="/fulfillment" className="btn-max">
              Max&apos;s Page
            </Link>
            <Link href="/" className="btn-primary">
              Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#333] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[#666] text-sm">
            <span className="text-[#f8d380]">Skalers.io</span> - Status Dashboard
          </div>
          <div className="text-[#666] text-sm">
            Last updated: January 2025
          </div>
        </div>
      </footer>
    </div>
  );
}
