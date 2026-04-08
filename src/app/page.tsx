import WallCalendar from '@/components/WallCalendar';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '32px 16px 48px',
    }}>
      <WallCalendar />
    </main>
  );
}
