import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
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
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            fontSize: '80px',
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
