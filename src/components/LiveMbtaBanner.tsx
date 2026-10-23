import React, { useState, useEffect } from 'react';
import { fetchActiveAlerts, MbtaAlert } from '../services/mbtaApi';
import { SubwayLine } from '../types';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, RefreshCw, Train } from 'lucide-react';

export const LiveMbtaBanner: React.FC = () => {
  const [alerts, setAlerts] = useState<MbtaAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadAlerts = async () => {
    setLoading(true);
    const liveAlerts = await fetchActiveAlerts();
    setAlerts(liveAlerts);
    setLoading(false);
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  useEffect(() => {
    loadAlerts();
    // Auto refresh every 2 minutes
    const interval = setInterval(loadAlerts, 120000);
    return () => clearInterval(interval);
  }, []);

  // Compute status for each line
  const lines: { line: SubwayLine; prefix: string; bg: string; text: string; dot: string }[] = [
    { line: 'Red', prefix: 'Red', bg: 'bg-[#DA291C]/15 border-[#DA291C]/40', text: 'text-rose-300', dot: 'bg-[#DA291C]' },
    { line: 'Orange', prefix: 'Orange', bg: 'bg-[#ED8B00]/15 border-[#ED8B00]/40', text: 'text-amber-300', dot: 'bg-[#ED8B00]' },
    { line: 'Green', prefix: 'Green', bg: 'bg-[#00843D]/15 border-[#00843D]/40', text: 'text-emerald-300', dot: 'bg-[#00843D]' },
    { line: 'Blue', prefix: 'Blue', bg: 'bg-[#003DA5]/15 border-[#003DA5]/40', text: 'text-sky-300', dot: 'bg-[#003DA5]' },
  ];

  const getLineAlerts = (prefix: string) => {
    return alerts.filter((a) =>
      a.routes.some((r) => r.toLowerCase().startsWith(prefix.toLowerCase()))
    );
  };

  const highSeverityAlerts = alerts.filter((a) => a.severity >= 3);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm">
      {/* Header Bar */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Train className="w-3.5 h-3.5 text-slate-400" />
            <span>MBTA V3 Live Feed:</span>
          </div>

          {/* Line Status Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {lines.map(({ line, prefix, bg, text, dot }) => {
              const lineAlerts = getLineAlerts(prefix);
              const hasMajorIssue = lineAlerts.some((a) => a.severity >= 5);
              const hasNotice = lineAlerts.length > 0;

              return (
                <div
                  key={line}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${bg} ${text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  <span>{line}</span>
                  {hasMajorIssue ? (
                    <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                  ) : hasNotice ? (
                    <span className="text-[10px] opacity-75">({lineAlerts.length})</span>
                  ) : (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Last sync & Toggle Details */}
        <div className="flex items-center gap-3 ml-auto text-slate-400">
          <span className="text-[11px] hidden sm:inline">
            Sync: {loading ? 'Fetching...' : lastUpdated || 'Just now'}
          </span>

          <button
            onClick={loadAlerts}
            disabled={loading}
            title="Refresh MBTA Status"
            className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>{alerts.length} Transit Notices</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Alerts Drawer */}
      {expanded && (
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 space-y-2.5 max-h-60 overflow-y-auto">
          {alerts.length === 0 ? (
            <p className="text-xs text-slate-400">All MBTA Subway lines operating on normal schedule with zero active delays.</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        alert.severity >= 5
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {alert.serviceEffect || alert.effect}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Lines: {alert.routes.join(', ') || 'Rapid Transit'}
                    </span>
                  </div>
                  {alert.url && (
                    <a
                      href={alert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline text-[11px]"
                    >
                      MBTA Advisory ↗
                    </a>
                  )}
                </div>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {alert.header}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
