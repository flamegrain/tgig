import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { JobListing, SubwayLine } from '../types';
import { MBTA_LINE_PATHS, MBTA_STATIONS, MBTA_COLORS } from '../data/mbtaData';
import { RotateCcw } from 'lucide-react';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type TileTheme = 'dark' | 'street' | 'topo';

interface MapComponentProps {
  jobs: JobListing[];
  selectedJob: JobListing | null;
  onSelectJob: (job: JobListing) => void;
  activeLineFilter: SubwayLine | 'All';
}

// 100% Free, NO API KEY REQUIRED, High-Speed CloudFront Global CDN Maps from Esri
const TILE_PROVIDERS: Record<
  TileTheme,
  { name: string; base: string; reference?: string; attribution: string }
> = {
  dark: {
    name: '🌙 Dark Canvas',
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    reference:
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri &copy; DeLorme, NAVTEQ',
  },
  street: {
    name: '🗺️ Boston Streets',
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri &copy; OpenStreetMap contributors',
  },
  topo: {
    name: '☀️ Topographic',
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, USGS, NOAA',
  },
};

export const MapComponent: React.FC<MapComponentProps> = ({
  jobs,
  selectedJob,
  onSelectJob,
  activeLineFilter,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);
  const refTileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const transitLayerRef = useRef<L.LayerGroup | null>(null);

  const [currentTheme, setCurrentTheme] = useState<TileTheme>('dark');

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    (mapContainerRef.current as any)._leaflet_id = null;

    // Center Boston & Cambridge
    const map = L.map(mapContainerRef.current, {
      center: [42.360, -71.085],
      zoom: 13,
      zoomControl: false,
    });

    const activeConfig = TILE_PROVIDERS[currentTheme];

    // Add Base Tile Layer (notice {z}/{y}/{x} for ArcGIS REST services)
    const baseTile = L.tileLayer(activeConfig.base, {
      attribution: activeConfig.attribution,
      maxZoom: 19,
    }).addTo(map);
    baseTileLayerRef.current = baseTile;

    // Add Reference Label Tile Layer if available (for street/city names in dark mode)
    if (activeConfig.reference) {
      const refTile = L.tileLayer(activeConfig.reference, {
        maxZoom: 19,
        pane: 'tilePane',
      }).addTo(map);
      refTileLayerRef.current = refTile;
    }

    // Transit & Markers layers (above tiles)
    transitLayerRef.current = L.layerGroup().addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Guarantee container dimension calculation
    const timers = [
      setTimeout(() => map.invalidateSize(), 100),
      setTimeout(() => map.invalidateSize(), 300),
      setTimeout(() => map.invalidateSize(), 700),
    ];

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Switch Tile Theme
  const switchTheme = (theme: TileTheme) => {
    setCurrentTheme(theme);
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove old layers
    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current);
      baseTileLayerRef.current = null;
    }
    if (refTileLayerRef.current) {
      map.removeLayer(refTileLayerRef.current);
      refTileLayerRef.current = null;
    }

    const config = TILE_PROVIDERS[theme];
    const newBase = L.tileLayer(config.base, {
      attribution: config.attribution,
      maxZoom: 19,
    }).addTo(map);
    newBase.bringToBack();
    baseTileLayerRef.current = newBase;

    if (config.reference) {
      const newRef = L.tileLayer(config.reference, {
        maxZoom: 19,
        pane: 'tilePane',
      }).addTo(map);
      refTileLayerRef.current = newRef;
    }
  };

  // Reset Center
  const resetCenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([42.360, -71.085], 13, { duration: 1 });
    }
  };

  // Render MBTA Transit Lines & Stations
  useEffect(() => {
    const map = mapInstanceRef.current;
    const transitLayer = transitLayerRef.current;
    if (!map || !transitLayer) return;

    transitLayer.clearLayers();

    // 1. Draw Subway Polylines
    MBTA_LINE_PATHS.forEach(({ line, path }) => {
      const isLineVisible = activeLineFilter === 'All' || activeLineFilter === line;
      const opacity = isLineVisible ? 0.95 : 0.2;
      const weight = isLineVisible ? 6 : 2;
      const color = MBTA_COLORS[line];

      const polyline = L.polyline(path, {
        color: color,
        weight: weight,
        opacity: opacity,
        smoothFactor: 1,
        lineCap: 'round',
        lineJoin: 'round',
      });

      polyline.bindTooltip(
        `<span style="font-weight:700; color:${color}">MBTA ${line} Line</span>`,
        { sticky: true, className: 'transit-tooltip' }
      );

      transitLayer.addLayer(polyline);
    });

    // 2. Draw MBTA Subway Stations
    MBTA_STATIONS.forEach((station) => {
      const hasMatchingLine =
        activeLineFilter === 'All' || station.lines.includes(activeLineFilter);
      const primaryColor = MBTA_COLORS[station.lines[0]];

      const stationIcon = L.divIcon({
        className: 'station-marker',
        html: `
          <div style="
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: ${hasMatchingLine ? '#ffffff' : '#64748b'};
            border: 3px solid ${primaryColor};
            box-shadow: 0 0 8px ${primaryColor};
            transform: translate(-50%, -50%);
          "></div>
        `,
        iconSize: [14, 14],
      });

      const marker = L.marker(station.coords, {
        icon: stationIcon,
        opacity: hasMatchingLine ? 1 : 0.35,
      });

      const unis = station.nearbyUniversities
        ? `<div style="font-size:11px; color:#38bdf8; margin-top:3px;">🎓 ${station.nearbyUniversities.join(', ')}</div>`
        : '';

      const linesBadges = station.lines
        .map(
          (l) =>
            `<span style="background:${MBTA_COLORS[l]}25; color:${MBTA_COLORS[l]}; border:1px solid ${MBTA_COLORS[l]}60; padding:1px 6px; border-radius:9999px; font-weight:700; font-size:10px;">${l}</span>`
        )
        .join(' ');

      marker.bindPopup(`
        <div style="padding: 6px;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
            <strong style="font-size:14px; color:#f8fafc;">${station.name}</strong>
            <div style="display:flex; gap:4px;">${linesBadges}</div>
          </div>
          ${unis}
          <div style="font-size:11px; color:#94a3b8; margin-top:4px;">MBTA Subway Station</div>
        </div>
      `);

      transitLayer.addLayer(marker);
    });
  }, [activeLineFilter]);

  // Render Job Markers with Hourly Wage Badges
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    jobs.forEach((job) => {
      const isSelected = selectedJob?.id === job.id;

      let badgeBg = 'bg-amber-500';
      let borderGlow = 'border-amber-400';
      let shadowEffect = 'shadow-[0_0_12px_rgba(245,158,11,0.6)]';

      if (job.hourlyWage >= 30) {
        badgeBg = 'bg-emerald-500';
        borderGlow = 'border-emerald-300';
        shadowEffect = 'shadow-[0_0_15px_rgba(16,185,129,0.8)]';
      } else if (job.hourlyWage >= 20) {
        badgeBg = 'bg-cyan-500';
        borderGlow = 'border-cyan-300';
        shadowEffect = 'shadow-[0_0_15px_rgba(6,182,212,0.7)]';
      }

      const activeRing = isSelected
        ? 'scale-125 ring-4 ring-white z-50 animate-bounce'
        : 'hover:scale-110';

      const jobIcon = L.divIcon({
        className: 'job-custom-pin',
        html: `
          <div class="transition-all duration-200 cursor-pointer ${activeRing}">
            <div class="flex items-center gap-1 px-2.5 py-1 rounded-full text-slate-950 font-extrabold text-xs border ${borderGlow} ${badgeBg} ${shadowEffect} whitespace-nowrap">
              <span>$${job.hourlyWage}/hr</span>
            </div>
            <div class="w-2 h-2 mx-auto bg-white rounded-full mt-0.5 shadow-md"></div>
          </div>
        `,
        iconSize: [64, 34],
        iconAnchor: [32, 30],
      });

      const marker = L.marker(job.coords, { icon: jobIcon });

      marker.on('click', () => {
        onSelectJob(job);
      });

      marker.bindPopup(`
        <div style="padding: 6px; max-width: 240px;">
          <div style="font-size:11px; font-weight:700; color:#38bdf8; text-transform:uppercase; letter-spacing:0.5px;">${job.company}</div>
          <div style="font-size:14px; font-weight:700; color:#f8fafc; margin-top:2px; line-height:1.2;">${job.title}</div>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-top:8px;">
            <span style="font-size:16px; font-weight:800; color:#10b981;">$${job.hourlyWage}/hr</span>
            <span style="font-size:11px; color:#cbd5e1; background:#334155; padding:2px 6px; border-radius:6px;">
              🚇 ${job.nearestStation.walkMinutes}m to ${job.nearestStation.name}
            </span>
          </div>
          <div style="font-size:11px; color:#94a3b8; margin-top:6px;">
            ⭐ ${job.employerRating} (${job.employerReviewCount} reviews) • ${job.workAuth}
          </div>
        </div>
      `);

      markersLayer.addLayer(marker);
    });
  }, [jobs, selectedJob, onSelectJob]);

  // Center on selected job
  useEffect(() => {
    if (selectedJob && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedJob.coords, 14, {
        duration: 1.2,
      });
    }
  }, [selectedJob]);

  return (
    <div
      className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#1e2430]"
      style={{ minHeight: '520px' }}
    >
      {/* Map Element */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-0"
        style={{ width: '100%', height: '100%', minHeight: '520px' }}
      />

      {/* Top Floating Controls */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-750 p-1.5 rounded-xl shadow-lg">
        {/* Tile Provider Switcher */}
        <div className="flex items-center gap-1">
          {(Object.keys(TILE_PROVIDERS) as TileTheme[]).map((theme) => (
            <button
              key={theme}
              onClick={() => switchTheme(theme)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                currentTheme === theme
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {TILE_PROVIDERS[theme].name}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-slate-700 mx-1" />

        {/* Reset View Button */}
        <button
          onClick={resetCenter}
          title="Reset to Central Boston"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Wage Color Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-xl text-xs space-y-1.5 pointer-events-auto">
        <div className="font-bold text-slate-300 text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between gap-4">
          <span>Hourly Wage</span>
          <span className="text-[10px] text-emerald-400 font-semibold">{jobs.length} Active Gigs</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-glow-green"></span>
          <span>$30+/hr (Tutoring, Tech, RA)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
          <span>$20 - $29/hr (IT, Desk, Events)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span>$15 - $19/hr (Cafe, Books, Retail)</span>
        </div>
      </div>
    </div>
  );
};
