import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Stethoscope, Clock, TrendingUp, AlertCircle } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import QueueManagement from "@/components/QueueManagement";
import DoctorManagement from "@/components/DoctorManagement";
import AppointmentManagement from "@/components/AppointmentManagement";

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onLogout={onLogout} />
      
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="queue" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Queue
            </TabsTrigger>
            <TabsTrigger value="doctors" className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Doctors
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Patients in Queue</p>
                      <p className="text-3xl font-bold text-warning">8</p>
                      <p className="text-xs text-muted-foreground mt-1">+2 from yesterday</p>
                    </div>
                    <Users className="w-8 h-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
                      <p className="text-3xl font-bold text-primary">12</p>
                      <p className="text-xs text-muted-foreground mt-1">3 completed</p>
                    </div>
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Available Doctors</p>
                      <p className="text-3xl font-bold text-success">6</p>
                      <p className="text-xs text-muted-foreground mt-1">out of 8 total</p>
                    </div>
                    <Stethoscope className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg. Wait Time</p>
                      <p className="text-3xl font-bold text-foreground">25m</p>
                      <p className="text-xs text-muted-foreground mt-1">-5m from yesterday</p>
                    </div>
                    <Clock className="w-8 h-8 text-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-urgent" />
                    Urgent Notifications
                  </CardTitle>
                  <CardDescription>Priority alerts requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-urgent/10 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-urgent" />
                      <div>
                        <p className="text-sm font-medium">Patient waiting over 45 minutes</p>
                        <p className="text-xs text-muted-foreground">Queue #3 - Robert Wilson</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                      <Clock className="w-5 h-5 text-warning" />
                      <div>
                        <p className="text-sm font-medium">Dr. Chen running 20 minutes late</p>
                        <p className="text-xs text-muted-foreground">Affects 3 upcoming appointments</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Emergency appointment needed</p>
                        <p className="text-xs text-muted-foreground">Patient called requesting urgent care</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => setActiveTab("queue")}
                    >
                      <Users className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm font-medium">Add Patient to Queue</p>
                    </div>
                    <div 
                      className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => setActiveTab("appointments")}
                    >
                      <Calendar className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm font-medium">Book Appointment</p>
                    </div>
                    <div 
                      className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => setActiveTab("doctors")}
                    >
                      <Stethoscope className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm font-medium">Doctor Availability</p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                      <AlertCircle className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm font-medium">Emergency Protocol</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="queue">
            <QueueManagement />
          </TabsContent>

          <TabsContent value="doctors">
            <DoctorManagement />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;