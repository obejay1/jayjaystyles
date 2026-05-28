export default function Loading({ fullScreen = false }: { fullScreen?: boolean }) {
  if (fullScreen) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16
      }}>
        <div className="spinner" />
        <p style={{ color: '#888', fontSize: 16 }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      gap: 12
    }}>
      <div className="spinner" />
      <p style={{ color: '#888', fontSize: 14 }}>Loading...</p>
    </div>
  );
}