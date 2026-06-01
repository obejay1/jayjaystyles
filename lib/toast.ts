export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  if (typeof document === 'undefined') return;

  const containerId = 'jayjay-toast-container';
  let container = document.getElementById(containerId);
  
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    Object.assign(container.style, {
      position: 'fixed',
      top: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: '9999',
      pointerEvents: 'none', // Let clicks pass through the container
      width: 'max-content',
      maxWidth: '90vw',
    });
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#111827';
  
  Object.assign(toast.style, {
    background: bgColor,
    color: 'white',
    padding: '12px 24px',
    borderRadius: '999px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    fontWeight: '600',
    opacity: '0',
    transform: 'translateY(-20px)',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    pointerEvents: 'auto',
    textAlign: 'center'
  });

  toast.innerText = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      toast.remove();
      if (container?.childNodes.length === 0) container.remove();
    }, 300);
  }, 3000);
}