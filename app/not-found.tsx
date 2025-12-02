import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Page not dound</h2>
      <p>Search for requested resource was not successful</p>
      <Link href="/">Return to main page</Link>
    </div>
  );
}
