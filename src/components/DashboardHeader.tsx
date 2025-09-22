import { Button } from "@/components/ui/button";
import { Stethoscope, LogOut, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DashboardHeader = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <header className="bg-card border-b shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MedFlow Front Desk</h1>
              <p className="text-sm text-muted-foreground">Patient & Appointment Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-urgent text-urgent-foreground text-xs">
                  3
                </Badge>
              </Button>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Sarah Johnson</p>
              <p className="text-xs text-muted-foreground">Front Desk Staff</p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;