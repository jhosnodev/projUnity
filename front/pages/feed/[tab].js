import { useRouter } from 'next/router';

export default function FeedTab() {
  const router = useRouter();
  const { tab } = router.query;

  // Maneja las pestañas aquí y renderiza el contenido correspondiente
  return (
    <div>
        
     {tab === 'my-feed' && <p>Contenido de My Feed</p>}
      {tab === 'for-your-feed' && <p>Contenido de For Your Feed</p>}
      {tab === 'global-feed' && <p>Contenido de Global Feed</p>} 
    </div>
  );
}
