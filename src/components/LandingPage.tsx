import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Car, Clock, MapPin, Shield, Smartphone, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onLogin: (role: 'student' | 'admin') => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const features = [
    {
      icon: MapPin,
      title: "Real-Time Availability",
      description: "Check parking slot availability instantly before arriving on campus"
    },
    {
      icon: Smartphone,
      title: "Easy Booking",
      description: "Reserve your parking spot with just a few clicks from any device"
    },
    {
      icon: Clock,
      title: "Time-Based Allocation",
      description: "Book slots for specific durations and get automatic reminders"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your booking is guaranteed with our secure reservation system"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Admins can track usage patterns and optimize parking resources"
    },
    {
      icon: Car,
      title: "Auto-Assignment",
      description: "Get the best available spot automatically assigned to you"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container relative z-10 py-20 px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
                <Car className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-5xl font-bold text-foreground">SmartPark</h1>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8">
              The intelligent parking management system for modern campuses. 
              Save time, reduce stress, and never worry about finding a parking spot again.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onLogin('student')}
                className="bg-gradient-primary text-lg px-8 hover:shadow-glow transition-shadow"
              >
                Student Portal
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onLogin('admin')}
                className="text-lg px-8 hover:bg-gradient-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                Admin Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose SmartPark?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive parking solution addresses all the challenges students face 
            when looking for parking on campus.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-primary group-hover:shadow-glow transition-shadow">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="opacity-90">Parking Slots</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2000+</div>
              <div className="opacity-90">Daily Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="opacity-90">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="opacity-90">Availability</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-16 px-4 text-center">
        <Card className="p-12 bg-gradient-subtle">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already enjoying hassle-free parking on campus.
            Sign in now to reserve your spot!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onLogin('student')}
              className="bg-gradient-primary px-8"
            >
              Access Student Portal
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onLogin('admin')}
              className="px-8"
            >
              Admin Login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}