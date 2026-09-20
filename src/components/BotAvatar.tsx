interface BotAvatarProps {
  id: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export function BotAvatar({ id, size = 'md', className = '', showBadge = false }: BotAvatarProps) {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl'
  };

  const normalizedId = id.toLowerCase();

  // Custom original vector avatars
  const renderIcon = () => {
    switch (normalizedId) {
      case 'nova':
        return (
          // Creative prism star
          <svg viewBox="0 0 40 40" fill="none" className="w-3/5 h-3/5" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4L24 16L36 20L24 24L20 36L16 24L4 20L16 16L20 4Z" fill="#8B5CF6" />
            <circle cx="20" cy="20" r="4" fill="#FFFFFF" />
            <circle cx="10" cy="10" r="2" fill="#C4B5FD" />
            <circle cx="30" cy="30" r="2" fill="#C4B5FD" />
          </svg>
        );
      case 'byte':
        return (
          // Logical circuit chip
          <svg viewBox="0 0 40 40" fill="none" className="w-3/5 h-3/5" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="9" width="22" height="22" rx="5" fill="#0284C7" />
            <rect x="14" y="14" width="12" height="12" rx="3" fill="#E0F2FE" />
            <path d="M20 4V9M20 31V36M4 20H9M31 20H36" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="20" cy="20" r="2.5" fill="#0284C7" />
          </svg>
        );
      case 'lumi':
        return (
          // Spontaneous friendly sun-spark
          <svg viewBox="0 0 40 40" fill="none" className="w-3/5 h-3/5" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="10" fill="#F59E0B" />
            <circle cx="17" cy="18" r="2" fill="#FFFFFF" />
            <circle cx="23" cy="18" r="2" fill="#FFFFFF" />
            <path d="M16 23C17.5 25 22.5 25 24 23" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M20 4V7M20 33V36M4 20H7M33 20H36M9 9L11 11M29 29L31 31M9 31L11 29M29 11L31 9" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'pixel':
        return (
          // Detailed observer matrix
          <svg viewBox="0 0 40 40" fill="none" className="w-3/5 h-3/5" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="7" width="26" height="26" rx="6" fill="#16A34A" />
            <rect x="12" y="12" width="6" height="6" rx="1.5" fill="#DCFCE7" />
            <rect x="22" y="12" width="6" height="6" rx="1.5" fill="#DCFCE7" />
            <rect x="12" y="22" width="6" height="6" rx="1.5" fill="#DCFCE7" />
            <rect x="22" y="22" width="6" height="6" rx="1.5" fill="#FFFFFF" />
          </svg>
        );
      case 'player':
      default:
        return (
          // Player avatar
          <svg viewBox="0 0 40 40" fill="none" className="w-3/5 h-3/5" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="15" r="7" fill="#7C3AED" />
            <path d="M8 33C8 27.5 13.5 24 20 24C26.5 24 32 27.5 32 33" fill="#7C3AED" />
            <circle cx="20" cy="15" r="3.5" fill="#EDE9FE" />
          </svg>
        );
    }
  };

  const bgStyles: Record<string, string> = {
    nova: 'bg-[#F3E8FF] border-[#DDD6FE]',
    byte: 'bg-[#E0F2FE] border-[#BAE6FD]',
    lumi: 'bg-[#FEF3C7] border-[#FDE68A]',
    pixel: 'bg-[#DCFCE7] border-[#BBF7D0]',
    player: 'bg-[#EDE9FE] border-[#C4B5FD]'
  };

  const selectedBg = bgStyles[normalizedId] || bgStyles.player;

  return (
    <div className={`relative inline-flex items-center justify-center rounded-2xl border shadow-sm ${selectedBg} ${sizeMap[size]} ${className}`}>
      {renderIcon()}
      {showBadge && (
        <span
          className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-xs"
          title="Active Bot"
        />
      )}
    </div>
  );
}
