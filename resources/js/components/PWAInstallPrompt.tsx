// resources/js/components/PWAInstallPrompt.tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [visible, setVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // iOS detection
        const ua = window.navigator.userAgent.toLowerCase();
        const ios = /iphone|ipad|ipod/.test(ua) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
        setIsIOS(ios);

        // already installed? (standalone mode)
        const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
        setIsStandalone(standalone);

        // Android/Chrome beforeinstallprompt
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setVisible(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('✅ User accepted install');
        } else {
            console.log('❌ User dismissed install');
        }
        setDeferredPrompt(null);
        setVisible(false);
    };

    // Already installed → don’t show anything
    if (isStandalone) return null;

    // Android/Chrome flow
    if (visible && deferredPrompt && !isIOS) {
        return (
            <div className="flex w-full flex-col border-t py-2">
                <span className="mb-2 text-sm font-medium">Install this app for quick access</span>
                <Button
                    className="text-true-primary flex w-fit items-center gap-2 bg-white font-semibold transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                    variant="secondary"
                    onClick={handleInstall}
                >
                    <img className="size-5" src="/assets/icons/app-download-icon.png" alt="Install" />
                    Install
                </Button>
            </div>
        );
    }

    // iOS Safari flow → show hint
    if (isIOS && !isStandalone) {
        return (
            <div className="flex w-full flex-col border-t py-3">
                <span className="mb-2 text-sm font-medium">Install this app for quick access</span>
                <Button
                    className="text-true-primary flex w-fit items-center gap-2 bg-white font-semibold transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                    variant="secondary"
                    onClick={() => setOpenDialog(true)}
                >
                    <img className="size-5" src="/assets/icons/app-download-icon.png" alt="Install" />
                    Install
                </Button>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="space-y-4 sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Install App</DialogTitle>
                            <DialogDescription>Follow these steps to add this app to your iPhone or iPad home screen:</DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col gap-3">
                            <div>
                                1. Tap the
                                <Badge variant="outline" className="mx-2 inline-flex items-center gap-1 text-sm">
                                    Share <img className="size-5" src="/assets/icons/ios-share.png" alt="Share" />
                                </Badge>
                                at the bottom in Safari
                            </div>

                            <div>
                                2. Scroll down and tap
                                <Badge variant="outline" className="mx-2 inline-flex items-center gap-1 text-sm">
                                    Add to Home Screen <PlusSquare className="ml-0.5" />
                                </Badge>
                            </div>

                            <div className="text-muted-foreground mt-2 text-sm">
                                After adding, the app will appear on your home screen like a native app.
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    return null;
}
