import AuthGuard from '../components/fragments/AuthGuard';

export default function Page() {
  return (
    <AuthGuard requiredRoles={['User', 'Admin']}>
      <div>
        <h1>Profile</h1>
      </div>
    </AuthGuard>
  );
}
