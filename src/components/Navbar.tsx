import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Car, Menu, X, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  userRole: 'student' | 'admin' | null;
  onRoleChange: (role: 'student' | 'admin') => void;
  onLogout: () => void;
}

export function Navbar({ userRole, onRoleChange, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Car className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">SmartPark</h1>
            <p className="text-xs text-muted-foreground">Campus Parking System</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {!userRole ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => onRoleChange('student')}
                className="hover:bg-gradient-primary hover:text-primary-foreground hover:border-primary"
              >
                <User className="w-4 h-4 mr-2" />
                Student Login
              </Button>
              <Button 
                onClick={() => onRoleChange('admin')}
                className="bg-gradient-primary"
              >
                <User className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {userRole === 'admin' ? 'Admin' : 'Student'} Portal
                </span>
              </div>
              <Button 
                variant="outline" 
                onClick={onLogout}
                className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        'md:hidden overflow-hidden transition-all duration-200',
        isMenuOpen ? 'max-h-64' : 'max-h-0'
      )}>
        <div className="container py-4 space-y-2 border-t">
          {!userRole ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => {
                  onRoleChange('student');
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <User className="w-4 h-4 mr-2" />
                Student Login
              </Button>
              <Button 
                onClick={() => {
                  onRoleChange('admin');
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start bg-gradient-primary"
              >
                <User className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {userRole === 'admin' ? 'Admin' : 'Student'} Portal
                </span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}