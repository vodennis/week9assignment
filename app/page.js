import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Check Out These Great Videos!!</h1>
      <Link href="/videos">Go to Video List</Link>
    </div>
  );
}
