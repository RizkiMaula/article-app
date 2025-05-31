import AuthGuard from '@/app/components/fragments/AuthGuard';

export default function Page() {
  return (
    <AuthGuard requiredRole="Admin">
      <div>
        <h1>Articles</h1>
      </div>
    </AuthGuard>
  );
}
