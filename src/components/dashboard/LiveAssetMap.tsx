"use client"

import { darkProvider } from './map-provider';
import { Map, Marker } from 'pigeon-maps';

const assets = [
  { id: 1, name: 'Vehicle A-123', position: [-6.718, 146.995] as [number, number] },
  { id: 2, name: 'Vehicle B-456', position: [-6.725, 147.005] as [number, number] },
  { id: 3, name: 'Vehicle C-789', position: [-6.735, 147.025] as [number, number] },
];

const LiveAssetMap = () => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      <Map
        provider={darkProvider}
        width={1200}
        height={380}
        defaultCenter={[-6.726, 147.044]} 
        defaultZoom={13.0}
        attribution={false}
      >
        {assets.map((asset) => (
          <Marker
            key={asset.id}
            anchor={asset.position}
            width={50}
            height={50}
          >
            <div
              style={{
                position: 'absolute',
                left: '-25px',
                top: '-50px',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => alert(`📍 ${asset.name}`)}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: '#3B82F6',
                  borderRadius: '50%',
                  border: '3px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                }}
              />
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default LiveAssetMap;