import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#202123',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            fontWeight: '700',
            color: 'white',
            display: 'flex',
          }}
        >
          FF
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
